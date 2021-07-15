/* eslint-disable no-console */
// Actual API fetch requests here
import { Base64 } from 'js-base64';
import {
    UserData,
    AdvApplicationInfo,
    ApplicationPageData,
    CriticalChecksInfo,
    LinkInfo,
    ConsentDocument,
} from '../../interfaces';
import { MutipleApplicationSearchResults, Result } from '../../ApplicationInterfaces';
const version = 'v1';
const getToken = (): string => {
    const authObj = JSON.parse(localStorage.getItem('certn-auth') || '""');
    return authObj === '' ? '' : 'Token ' + authObj.token;
};

const userLogin = async (username: string, password: string): Promise<UserData> => {
    const response = await fetch(`https://demo-api.certn.co/api/v2/login/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Basic ' + Base64.encode(username + ':' + password),
        },
    });
    if (!response.ok || !response) throw new Error(response.statusText);
    const responseData = response.json();
    return responseData;
};

//Dead code or no longer in use?
const Softcheck = async (): Promise<void> => {
    const raw = JSON.stringify({
        request_softcheck: true,
        email: 'test@certn.co',
    });
    try {
        // hr/v1: checks human resources;
        //`https://demo-api.certn.co/api/v2/applications/invite/` checks property management
        const response = await fetch(`https://demo-api.certn.co/hr/v1/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: getToken(),
            },
            body: raw,
        });
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    } catch (err) {
        console.log('something went wrong: ' + err);
    }
};

//Dead code or no longer in use?
const Creditreport = async (): Promise<void> => {
    const raw = JSON.stringify({
        request_equifax: true,
        email: 'test@certn.co',
        information: {
            first_name: 'Andrew',
            last_name: 'McLeod',
            date_of_birth: '1970-06-28',
            addresses: [
                {
                    address: '4412 King Alfred Court',
                    city: 'Victoria',
                    province_state: 'BC',
                    country: 'CA',
                },
            ],
            sin_ssn: '123456789',
        },
    });
    try {
        const response = await fetch(`https://demo-api.certn.co/hr/v1/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: getToken(),
            },
            body: raw,
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    } catch (err) {
        console.log('something went wrong: ' + err);
    }
};

/**
 * This is a helper function that builds the desired applicant information from Certn's API response.
 *
 * @param response
 * @returns AdvApplicationInfo
 */
const buildAdvApplicationInfo = (response: Result): AdvApplicationInfo => {
    const applicant = response.application.applicant;
    const owner = response.application.owner;
    const application: AdvApplicationInfo = {
        application_id: response.application.id,
        key: applicant.id,
        email: applicant.email ? applicant.email : '-',
        firstName: applicant.first_name ? applicant.first_name : '-',
        lastName: applicant.last_name ? applicant.last_name : '-',
        phone: applicant.phone_number ? applicant.phone_number.toString() : '-',
        created: response.application.created ? response.application.created.toString() : '-',
        updated: response.application.modified ? response.application.modified.toString() : '-',
        status: response.report_status,
        orderedBy: owner.email,
        team: owner.team.name,
    };
    return application;
};
/**
 * This is a helper function that iterates through an array of applicants in the desired format.
 * This is helpful for the the search page where the search table needs to display many applicants.
 *
 * @param response_data
 * @returns Array of AdvApplicationInfo
 */
const pruneApplicationsData = (response_data: MutipleApplicationSearchResults): Array<AdvApplicationInfo> => {
    const pruned_applications: Array<AdvApplicationInfo> = [];
    response_data.results.forEach((response) => {
        const application: AdvApplicationInfo = buildAdvApplicationInfo(response);
        pruned_applications.push(application);
    });
    return pruned_applications;
};

/**
 * The search string must be a string of words seperate by one whitesapce.
 * Parameters are searched with the logical operator AND. The implications of this is that all the
 * keywords in the search string must appear in an application for a result to be included.
 * Searching with an empty string will return all applicants.
 *
 * Note: To add pagination a small refactor should be done.
 * Note: This function should be renamed to getApplicants
 *
 * @param search
 * @returns An array of AdvApplicationInfo
 */
const getApplications = async (search: string): Promise<Array<AdvApplicationInfo>> => {
    const base_url = `https://demo-api.certn.co/hr/${version}/applicants/?search=`;
    const search_url = base_url + search.split(' ').join('+');
    let pruned_applications: Array<AdvApplicationInfo> = [];
    try {
        const response = await fetch(search_url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: getToken(),
            },
        });

        const response_data = await response.json();
        if (!response.ok) {
            throw new Error(response_data.message);
        }
        pruned_applications = pruneApplicationsData(response_data);
    } catch (err) {
        console.log('something went wrong: ' + err);
    }
    return pruned_applications;
};

/*
 * Function designed to simulate a call to the api in search of a list of all documents associated to a given application
 * Will be turned into a proper call once endpoint is implemented
 */
const getListOfPdfsMOCK = async (): Promise<Array<ConsentDocument>> => {
    const returnDocuments: Array<ConsentDocument> = [];
    for (let i = 0; i < 20; i = i + 1) {
        const interationTitle = 'Mock Consent Doc ' + i; // random generation

        const sudoConsentDoc: ConsentDocument = {
            title: interationTitle,
            document_url: 'http://example.com/sample.pdf',
        };
        returnDocuments.push(sudoConsentDoc);
    }

    return returnDocuments;
};

/**
 * This is a helper function used to build an object that represents the cirtical checks of an applicant.
 *
 * @param response_data
 * @returns CriticalChecksInfo
 */
const buildCriticalChecks = (response_data: Result): CriticalChecksInfo => {
    const critical_checks: CriticalChecksInfo = {
        us_criminal_record_check_result: {
            status: response_data.report_summary.us_criminal_record_check_result.status,
            result: response_data.report_summary.us_criminal_record_check_result.result,
        },
        international_criminal_record_check_result: {
            status: response_data.report_summary.international_criminal_record_check_result.status,
            result: response_data.report_summary.international_criminal_record_check_result.result,
        },
        ssn_verification_result: {
            status: response_data.report_summary.ssn_verification_result.status,
            result: response_data.report_summary.ssn_verification_result.result,
        },
        reference_result: {
            status: response_data.report_summary.reference_result.status,
            result: response_data.report_summary.reference_result.result,
        },
        motor_vehicle_record_result: {
            status: response_data.report_summary.motor_vehicle_record_result.status,
            result: response_data.report_summary.motor_vehicle_record_result.result,
        },
        equifax_result: {
            status: response_data.report_summary.equifax_result.status,
            result: response_data.report_summary.equifax_result.result,
        },
        certn_verification: {
            status: response_data.report_summary.certn_verification.status,
            employment_verification: response_data.report_summary.certn_verification.employment_verification,
            education_verification: response_data.report_summary.certn_verification.education_verification,
            credential_verification: response_data.report_summary.certn_verification.credential_verification,
        },
    };

    return critical_checks;
};

const buildLinkInfo = (response_data: Result): LinkInfo => {
    const applicant = response_data.application.applicant;
    return {
        onboarding_link: applicant.application_url,
        report_link: applicant.report_url,
    };
};

/**
 * This is a helper function which builds the applicant information for the Application Page
 *
 * @param response_data
 * @returns ApplicationPageData
 */

const getApplicantData = (response_data: Result): ApplicationPageData => {
    const application_page_data: ApplicationPageData = {
        critical_checks: buildCriticalChecks(response_data),
        application_info: buildAdvApplicationInfo(response_data),
        application_links: buildLinkInfo(response_data),
    };
    return application_page_data;
};

/**
 * This function retrieves the applicant information for a single applicant given and applicant id.
 *
 * @param applicant_id
 * @returns ApplicationPageData
 */
const getApplicant = async (applicant_id: string): Promise<ApplicationPageData> => {
    // Note to get a signle applicant we need to pass in application.applicant.id and not application.id
    const search_url = `https://demo-api.certn.co/hr/${version}/applicants/${applicant_id}`;
    let application_page_data: ApplicationPageData = {} as ApplicationPageData;
    const response = await fetch(search_url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: getToken(),
        },
    });

    const response_data = await response.json();
    if (!response.ok) {
        throw new Error(response_data.message);
    }
    const result: Result = response_data;
    application_page_data = getApplicantData(result);
    return application_page_data;
};

export { userLogin, Softcheck, Creditreport, getToken, getApplications, getApplicant, getListOfPdfsMOCK };
