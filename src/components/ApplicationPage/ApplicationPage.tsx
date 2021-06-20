// Ant Design Imports

import { useEffect } from 'react';
import { useState } from 'react';
import { AdvApplicationInfo, Applicant, Application, CriticalChecksInfo } from '../../interfaces';
import { ApplicationInfo } from './ApplicationInfo';
import { CriticalChecks } from './CriticalChecks';

// Components

// Styled Components

// Interfaces
export const TableInfoDefault: AdvApplicationInfo = {
    key: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    created: '',
    updated: '',
    status: '',
    orderedBy: '',
    team: '',
};

export const ChecksInfoDefault: CriticalChecksInfo = {
    us_criminal_record_check_result: {
        status: '',
        result: '',
    },
    international_criminal_record_check_result: {
        status: '',
        result: '',
    },
    ssn_verification_result: {
        status: '',
        result: '',
    },
    reference_result: {
        status: '',
        result: '',
    },
    motor_vehicle_record_result: {
        status: '',
        result: '',
    },
    equifax_result: {
        status: '',
        result: '',
    },
    certn_verification: {
        status: '',
        employment_verification: '',
        education_verification: '',
        credential_verification: '',
    },
};

export const ApplicationPage = (): JSX.Element => {
    const [id, setId] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [applicationInfo, setApplicationInfo] = useState({});
    const [tableInfo, setTableInfo] = useState<AdvApplicationInfo>(TableInfoDefault);
    const [criticalChecksInfo, setChecksInfo] = useState<CriticalChecksInfo>(ChecksInfoDefault);

    // Runs only on initial render, will get id from URL. Ticket 54: https://trello.com/c/rf1HCmik/54-54-display-api-data
    useEffect(() => {
        // Get the id from the URL, will be passed by the search page
        setId('fakeId');
    }, []);

    // Runs when the id changes, will make an api call. Currently mock data. Ticket 54: https://trello.com/c/rf1HCmik/54-54-display-api-data
    useEffect(() => {
        const fetchApplication = async (): Promise<void> => {
            try {
                // Make api call
                // https://demo-api.certn.co/hr/v1/applications/<application_id>
                const response = fakeApi(id);
                setApplicationInfo(response);
                setTableInfo(buildTableInfo(response.application));
                setChecksInfo(buildChecksInfo(response.report_summary));
            } catch (e) {
                // Handle failed request
            }
        };
        fetchApplication();
    }, [id]);

    // Extracts the info needed for the application info table from the api response
    const buildTableInfo = (resp: Application): AdvApplicationInfo => ({
        key: resp.id,
        email: resp.applicant.email,
        firstName: resp.applicant.first_name,
        lastName: resp.applicant.last_name,
        phone: resp.applicant.phone_number,
        created: resp.created,
        updated: resp.modified,
        status: resp.applicant.status,
        orderedBy: resp.owner.email, // Owner doesn't have friendly name, only email & id
        team: resp.team.name,
    });

    const buildChecksInfo = (resp: CriticalChecksInfo): CriticalChecksInfo => ({
        us_criminal_record_check_result: {
            status: resp.us_criminal_record_check_result.status,
            result: resp.us_criminal_record_check_result.result,
        },
        international_criminal_record_check_result: {
            status: resp.international_criminal_record_check_result.status,
            result: resp.international_criminal_record_check_result.result,
        },
        ssn_verification_result: {
            status: resp.ssn_verification_result.status,
            result: resp.ssn_verification_result.result,
        },
        reference_result: {
            status: resp.reference_result.status,
            result: resp.reference_result.result,
        },
        motor_vehicle_record_result: {
            status: resp.motor_vehicle_record_result.status,
            result: resp.motor_vehicle_record_result.result,
        },
        equifax_result: {
            status: resp.equifax_result.status,
            result: resp.equifax_result.result,
        },
        certn_verification: {
            status: resp.certn_verification.status,
            employment_verification: resp.certn_verification.employment_verification,
            education_verification: resp.certn_verification.education_verification,
            credential_verification: resp.certn_verification.credential_verification,
        },
    });

    return (
        <div>
            <ApplicationInfo info={tableInfo} />
            <CriticalChecks checks={criticalChecksInfo} />
        </div>
    );
};

// Temp dummy data
// Ignore, will get deleted with ticket 54: https://trello.com/c/rf1HCmik/54-54-display-api-data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fakeApi = (id: string) => mockApplicant;

const mockApiResp: Application = {
    created: '2021-06-14T00:00:00Z',
    modified: '2021-06-14T00:00:00Z',
    id: '95fa72c2-a439-4088-9d99-8399fe6426b0',
    applicant: {
        id: 'd76f9db1-7043-417a-809c-0aa5626d7438',
        status: 'Pending',
        first_name: 'Doug',
        last_name: 'Judy',
        phone_number: '250-555-5555',
        email: 'test@certn.co',
    },
    owner: {
        id: '24e840ba-ad59-479c-b28e-425a12e1af57',
        email: 'kelvinfilyk@gmail.com',
        team: {
            id: 'a47ffdb9-c782-4eac-95d1-15f0831af757',
            name: 'UVIC',
        },
    },
    is_active: false,
    is_selected: false,
    listing: {
        name: '',
        is_active: false,
        url_code: '',
    },
    team_id: 'a47ffdb9-c782-4eac-95d1-15f0831af757',
    team: {
        id: 'a47ffdb9-c782-4eac-95d1-15f0831af757',
        name: 'UVIC',
        country: 'CA',
    },
    complete: ['Criminal Record Search', 'Equifax Credit Report', 'US Criminal Record Check'],
    pending: ['References Check', 'Motor Vehicle Records (USA)', 'Education Verification'],
    failure: ['Credential Verification', 'Employment Verification', 'SSN Verification'],
};

const mockApplicant: Applicant = {
    report_summary: {
        us_criminal_record_check_result: {
            status: 'ANALYZING', // "ANALYZING" "ERROR" "PARTIAL" "RETURNED" "PENDING" "NONE"
            result: 'NONE', // "REVIEW" "CLEARED" "NONE"
        },
        international_criminal_record_check_result: {
            status: 'ANALYZING',
            result: 'NONE',
        },
        ssn_verification_result: {
            status: 'ANALYZING',
            result: 'NONE',
        },
        reference_result: {
            status: 'RETURNED',
            result: 'CLEARED',
        },
        motor_vehicle_record_result: {
            status: 'RETURNED',
            result: 'CLEARED',
        },
        equifax_result: {
            status: 'RETURNED',
            result: 'CLEARED',
        },
        certn_verification: {
            status: 'RETURNED',
            employment_verification: 'UNVERIFIED',
            education_verification: 'UNVERIFIED',
            credential_verification: 'UNVERIFIED',
        },
    },
    application: mockApiResp,
};
