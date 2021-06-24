import { AdvApplicationInfo, ApplicationPageData, CriticalChecksInfo } from '../../interfaces';

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

export const ApplicationPageDataDefault: ApplicationPageData = {
    critical_checks: ChecksInfoDefault,
    application_info: TableInfoDefault,
};
