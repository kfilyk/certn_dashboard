interface UserData {
    expiry: string;
    token: string;
    user: Record<string, unknown>;
}

interface StoredAuth {
    storedToken: string;
    storedExpiry: string;
}

interface AdvApplicationInfo {
    key: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    created: string;
    updated: string;
    status: string;
    orderedBy: string;
    team: string;
}

interface CriticalItem {
    status: string;
    result?: string;
    employment_verification?: string;
    education_verification?: string;
    credential_verification?: string;
}

interface CriticalChecksInfo {
    us_criminal_record_check_result: CriticalItem;
    international_criminal_record_check_result: CriticalItem;
    ssn_verification_result: CriticalItem;
    reference_result: CriticalItem;
    motor_vehicle_record_result: CriticalItem;
    equifax_result: CriticalItem;
    certn_verification: CriticalItem;
}

interface Applicant {
    report_summary: {
        us_criminal_record_check_result: {
            status: string;
            result: string;
        };
        international_criminal_record_check_result: {
            status: string;
            result: string;
        };
        ssn_verification_result: {
            status: string;
            result: string;
        };
        reference_result: {
            status: string;
            result: string;
        };
        motor_vehicle_record_result: {
            status: string;
            result: string;
        };
        equifax_result: {
            status: string;
            result: string;
        };
        certn_verification: {
            status: string;
            employment_verification: string;
            education_verification: string;
            credential_verification: string;
        };
    };
    application: Application;
}

interface Application {
    created: string;
    modified: string;
    id: string;
    applicant: {
        status: string;
        first_name: string;
        last_name: string;
        email: string;
        id: string;
        phone_number: string;
    };
    owner: {
        id: string;
        email: string;
        team: {
            id: string;
            name: string;
        };
    };
    listing: Record<string, unknown>;
    is_active: boolean;
    is_selected: boolean;
    team_id: string;
    team: {
        id: string;
        name: string;
        country: string;
    };
}

export type { UserData, StoredAuth, AdvApplicationInfo, CriticalItem, CriticalChecksInfo, Applicant, Application };
