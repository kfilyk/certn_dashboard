interface UserData {
    expiry: string;
    token: string;
    user: Record<string, unknown>;
}

interface StoredAuth {
    storedToken: string;
    storedExpiry: string;
}

interface Applications {
    count: number;
    applications: Array<AdvApplicationInfo>;
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

/**
 * Interface that holds the status and result of each critical check
 *
 * Note: the "result" is not currently being used
 *
 * @interface
 */
interface CriticalChecksResult {
    status: string;
    result: string;
}

/**
 * Interface that holds the status of the employment, education, and credential verifications
 *
 * These require their own interface as they are formatted differently from the other 6 critical checks
 * (see CriticalChecksInfo below)
 *
 * @interface
 */
interface CertnVerification {
    status: string;
    employment_verification: string;
    education_verification: string;
    credential_verification: string;
}

/**
 * Interface that holds the critical checks along with their corresponding status and result
 *
 * @interface
 */
interface CriticalChecksInfo {
    us_criminal_record_check_result: CriticalChecksResult;
    international_criminal_record_check_result: CriticalChecksResult;
    ssn_verification_result: CriticalChecksResult;
    reference_result: CriticalChecksResult;
    motor_vehicle_record_result: CriticalChecksResult;
    equifax_result: CriticalChecksResult;
    certn_verification: CertnVerification;
}

/**
 * Interface that holds the links associated with an application (currently: onboarding and report)
 *
 * @interface
 */
interface LinkInfo {
    onboarding_link: string;
    report_link: string;
}

/**
 * Interface that holds the required information for an applicant
 *
 * report_summary - status/result of each critical check corresponding to this application
 * application - information displayed on the Search page and Application page for this applicant
 *
 * @interface
 */
interface Applicant {
    report_summary: CriticalChecksInfo;
    application: Application;
}

interface ApplicationPageData {
    critical_checks: CriticalChecksInfo;
    application_info: AdvApplicationInfo;
    application_links: LinkInfo;
}

interface ConsentDocument {
    title: string;
    document_url: string;
    isCached: boolean;
    cacheIndexLocation: number;
    size: number;
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
        application_url: string;
        report_url: string;
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

/**
 * Interface that specifies the variables that will be used when sending emails
 *
 * email_type - which Application action this email came from (currently: onboarding, report, or documents)
 * to - email address the email will be sent to
 * url - onboarding link or report link
 * consent_doc_urls - array of consent documents being sent
 *
 * @interface
 */
interface EmailInfo {
    email_type: string;
    to: string;
    url: string;
    consent_doc_urls: string[];
}

export type {
    UserData,
    StoredAuth,
    AdvApplicationInfo,
    CriticalChecksResult,
    CertnVerification,
    CriticalChecksInfo,
    LinkInfo,
    ApplicationPageData,
    Application,
    Applicant,
    ConsentDocument,
    Applications,
    EmailInfo,
};
