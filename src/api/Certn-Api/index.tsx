/* eslint-disable no-console */
// Actual API fetch requests here
import { Base64 } from 'js-base64';
import { UserData, AdvApplicationInfo, Document } from '../../interfaces';
import { MutipleApplicationSearchResults } from '../../ApplicationInterfaces';

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

const pruneApplicationsData = (response_data: MutipleApplicationSearchResults) => {
    const pruned_applications: Array<AdvApplicationInfo> = [];
    response_data.results.forEach((response) => {
        const applicant = response.application.applicant;
        const owner = response.application.owner;
        const application: AdvApplicationInfo = {
            application_id: response.application.id,
            key: applicant.id, // applicant_id
            email: applicant.email,
            firstName: applicant.first_name,
            lastName: applicant.last_name,
            phone: applicant.phone_number ? applicant.phone_number.toString() : '',
            created: response.application.created ? response.application.created.toString() : '', // this could be of type Date if we update in interface
            updated: response.application.modified ? response.application.modified.toString() : '', // this could be of type Date if we update in interface
            status: response.report_status, // Waiting to hear from Ben (certn) if this is right
            orderedBy: owner.email, // Waiting to hear from Ben (certn) if it is possible to get name instead
            team: owner.team.settings_config.org_name,
        };
        pruned_applications.push(application);
    });
    return pruned_applications;
};

/**
 * search parameters are searched with the logical operator AND
 * Note: prequesting different pages will require adding on to the search query
 */
const getApplications = async (search: string): Promise<Array<AdvApplicationInfo>> => {
    const base_url = 'https://demo-api.certn.co/hr/v1/applicants/?search=';
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
    console.log(pruned_applications);
    return pruned_applications;
};

/*
 * Function designed to simulate a call to the api in search of a list of all documents associated to a given application
 * Will be turned into a proper call once endpoint is implemented
 */
const getListOfPdfsMOCK = async (numberOfEntries: number): Promise<Array<Document>> => {
    const returnDocuments: Array<Document> = [];
    for (let i = 0; i < numberOfEntries; i = i + 1) {
        const interationTitle = 'Mock Consent Doc ' + i; // random generation
        const iterationKey = 'MOCK KEY ' + i;

        const sudoConsentDoc: Document = {
            title: interationTitle,
            key_string: iterationKey,
            cached: false,
            path: '/DeleteBeforeRelease/MockPDF.pdf', //Please delete this file as well as the associated PDF when proper endpoint is created
        };
        returnDocuments.push(sudoConsentDoc);
    }

    return returnDocuments;
};

export { userLogin, Softcheck, Creditreport, getToken, getApplications, getListOfPdfsMOCK };
