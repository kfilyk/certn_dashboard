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
    application_id: string;
    key: string; // applicant_id
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    created: string; //this could be of type Date ?
    updated: string; //this could be of type Date ?
    status: string;
    orderedBy: string;
    team: string;
}

interface CriticalChecksResult {
    status: string;
    result: string;
}

interface CertnVerification {
    status: string;
    employment_verification: string;
    education_verification: string;
    credential_verification: string;
}

interface CriticalChecksInfo {
    us_criminal_record_check_result: CriticalChecksResult;
    international_criminal_record_check_result: CriticalChecksResult;
    ssn_verification_result: CriticalChecksResult;
    reference_result: CriticalChecksResult;
    motor_vehicle_record_result: CriticalChecksResult;
    equifax_result: CriticalChecksResult;
    certn_verification: CertnVerification;
}

interface Applicant {
    report_summary: CriticalChecksInfo;
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

export type {
    UserData,
    StoredAuth,
    AdvApplicationInfo,
    CriticalChecksResult,
    CertnVerification,
    CriticalChecksInfo,
    Applicant,
    Application,
};
