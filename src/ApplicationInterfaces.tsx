export interface Information {
    first_name: string;
    last_name: string;
}

export interface Address {
    id: string;
    created: Date;
    address: string;
    unit?: unknown;
    city: string;
    province_state: string;
    other_province_state: string;
    country: string;
    country_label: string;
    postal_code: string;
    rent_or_own: string;
    cost: number;
    start_date: string;
    end_date: Date;
    reason_for_leaving: string;
    landlords_first_name: number;
    landlords_last_name: string;
    landlords_phone?: unknown;
    landlords_email: string;
    reference?: unknown;
    full_address: string;
    information: Information;
    address_reference?: unknown;
    other_reason_for_leaving: string;
    auto_address: string;
    place_id?: unknown;
    verification?: unknown;
    consistency?: unknown;
    rent_or_own_label: string;
    reference_verified: boolean;
    county: string;
    current: boolean;
}

export interface IdentityNumber {
    id: string;
    country: string;
    number: string;
}

export interface Information {
    id: string;
    status: string;
    status_label: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    last_name_at_birth: string;
    former_names: string[];
    alias: string;
    date_of_birth: string;
    sin_ssn: string;
    phone_number: string;
    phone?: unknown;
    gender?: unknown;
    birth_city: string;
    birth_province_state: string;
    birth_country?: unknown;
    birth_other_province_state: string;
    mothers_maiden_name: string;
    rcmp_consent_form: string;
    mothers_first_name: string;
    mothers_last_name: string;
    fathers_first_name: string;
    fathers_last_name: string;
    grandfathers_first_name: string;
    brazil_fiscal_declaration_number: number;
    position_applied_for?: unknown;
    employment_sector?: unknown;
    philippines_social_security_number: number;
    colombian_national_id_number: number;
    serbian_id_number: number;
    license_number: number;
    license_valid?: unknown;
    license_prov_state: string;
    license_other_country?: unknown;
    license_type: string;
    addresses: Address[];
    employers: unknown[];
    educations: unknown[];
    credentials: unknown[];
    personal_references: unknown[];
    custom_questions: unknown[];
    identity_numbers: IdentityNumber[];
    documents: unknown[];
    skills: unknown[];
    cover_letter?: unknown;
    verification?: unknown;
    consistency?: unknown;
    disclosure_accepted: boolean;
    rcmp_consent_given: boolean;
    us_criminal_consent_given: boolean;
    mycrc_consent_given: boolean;
    international_criminal_consent_given: boolean;
    biometric_consent_given: boolean;
    terms_accepted: boolean;
    requested_disclosure_email: boolean;
    facebook_link: Url;
    twitter_link: Url;
    linkedin_link: Url;
    googleplus_link: Url;
    convictions: unknown[];
    conviction_explanation?: unknown;
    early_terminations: unknown[];
    early_termination_explanation?: unknown;
}

export interface ReferenceResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    address_reference_results: unknown[];
    employer_reference_results: unknown[];
    education_reference_results: unknown[];
    credential_reference_results: unknown[];
}

export interface InformationResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    description: string;
    upgradable: boolean;
}

export interface BehaviouralResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    hard_working_score?: unknown;
    critical_thinking_score?: unknown;
    organization_score?: unknown;
    culture_fit_score?: unknown;
    accountability_score?: unknown;
    accountability_score_label: string;
    critical_thinking_score_label: string;
    organization_score_label: string;
    culture_fit_score_label: string;
    hard_working_score_label: string;
    neutral_flags?: unknown;
    description: string;
    hard_working_score_description: string;
    critical_thinking_score_description: string;
    organization_score_description: string;
    accountability_score_description: string;
    culture_fit_score_description: string;
    accountability_score_risk_label: string;
    critical_thinking_score_risk_label: string;
    organization_score_risk_label: string;
    culture_fit_score_risk_label: string;
    hard_working_score_risk_label: string;
    upgradable: boolean;
}

export interface Address {
    id: string;
    unit?: unknown;
    address: string;
    city: string;
    province_state: string;
    other_province_state: string;
    country: string;
    postal_code: string;
    county: string;
    raw_address?: unknown;
    po_box?: unknown;
    type: string;
    full_address: string;
    source: string;
}

export interface Employer {
    id: string;
    position: string;
    company_name: string;
    start_date: string;
    end_date: string;
    source: string;
}

export interface Url {
    id: string;
    site_url: string;
    domain?: unknown;
    site_name: string;
    site_category?: unknown;
    source: string;
}

export interface Name {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    source: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    start_date: string;
    end_date: string;
    description?: unknown;
    activities_societies?: unknown;
    source: string;
}

export interface Source {
    id: string;
    category: string;
    domain?: unknown;
    classification?: unknown;
    content?: unknown;
    origin_url: string;
    source_name: string;
}

export interface RiskInformationResult {
    id: string;
    confidence: string;
    addresses: Address[];
    employers: Employer[];
    urls: Url[];
    names: Name[];
    educations: Education[];
    emails: unknown[];
    phone_numbers: unknown[];
    sources: Source[];
}

export interface RiskEvaluation {
    id: string;
    overall_score: string;
    risk_information_result: RiskInformationResult;
    criminal_results: unknown[];
}

export interface ScanStatus {
    criminal_scan: string;
    criminal_scan_label: string;
    fraud_scan: string;
    fraud_scan_label: string;
    sex_offender_scan: string;
    sex_offender_scan_label: string;
    known_affiliation_scan: string;
    known_affliation_scan_label: string;
    ofac_global_terrorist_scan: string;
    ofac_global_terrorist_scan_label: string;
    politically_exposed_person_scan: string;
    politically_exposed_person_scan_label: string;
    public_safety_scan: string;
    public_safety_scan_label: string;
    global_clearance_scan: string;
    global_clearance_scan_label: string;
    other_scan: string;
    other_scan_label: string;
    public_profile_scan: string;
    public_profile_scan_label: string;
    public_court_records: string;
    public_court_records_label: string;
}

export interface RiskResult {
    id: string;
    status: string;
    overall_score: string;
    risk_evaluations: RiskEvaluation[];
    red_flags: unknown[];
    green_flags: string[];
    description: string;
    risk_description: string;
    similarity_description: string;
    match_description: string;
    scan_status: ScanStatus;
}

export interface SsnVerificationResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    ssn_id_document_reports: unknown[];
}

export interface SoquijResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    court_matches: unknown[];
}

export interface EquifaxResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    created: Date;
    credit_score?: unknown;
    credit_check_date?: unknown;
    credit_check_failed: boolean;
    credit_check_errors?: unknown;
    get_status_display: string;
    upgradable: boolean;
    credit_check_warnings?: unknown;
    revolving_credit_total_balance?: unknown;
    revolving_credit_max_total_limit?: unknown;
    revolving_credit_percent_credit_used?: unknown;
    revolving_credit_number_of_cards?: unknown;
    revolving_credit_past_due_amount?: unknown;
    revolving_credit_late_payments_30?: unknown;
    revolving_credit_late_payments_60?: unknown;
    revolving_credit_late_payments_90?: unknown;
    revolving_credit_monthly_payments?: unknown;
    other_credit_total_balance?: unknown;
    other_credit_max_total_limit?: unknown;
    other_credit_percent_credit_used?: unknown;
    other_credit_number_of_cards?: unknown;
    other_credit_past_due_amount?: unknown;
    other_credit_late_payments_30?: unknown;
    other_credit_late_payments_60?: unknown;
    other_credit_late_payments_90?: unknown;
    other_credit_monthly_payments?: unknown;
    mortgage_loans_total_balance?: unknown;
    mortgage_loans_max_total_limit?: unknown;
    mortgage_loans_percent_credit_used?: unknown;
    mortgage_loans_number_of_mortgages?: unknown;
    mortgage_loans_past_due_amount?: unknown;
    mortgage_loans_late_payments_30?: unknown;
    mortgage_loans_late_payments_60?: unknown;
    mortgage_loans_late_payments_90?: unknown;
    mortgage_loans_monthly_payments?: unknown;
    auto_loans_total_balance?: unknown;
    auto_loans_max_total_limit?: unknown;
    auto_loans_percent_credit_used?: unknown;
    auto_loans_number_of_loans?: unknown;
    auto_loans_past_due_amount?: unknown;
    auto_loans_late_payments_30?: unknown;
    auto_loans_late_payments_60?: unknown;
    auto_loans_late_payments_90?: unknown;
    auto_loans_monthly_payments?: unknown;
    student_loans_total_balance?: unknown;
    student_loans_max_total_limit?: unknown;
    student_loans_percent_credit_used?: unknown;
    student_loans_number_of_loans?: unknown;
    student_loans_past_due_amount?: unknown;
    student_loans_late_payments_30?: unknown;
    student_loans_late_payments_60?: unknown;
    student_loans_late_payments_90?: unknown;
    student_loans_monthly_payments?: unknown;
    other_debts_total_balance?: unknown;
    other_debts_max_total_limit?: unknown;
    other_debts_percent_credit_used?: unknown;
    other_debts_number_of_debts?: unknown;
    other_debts_past_due_amount?: unknown;
    other_debts_late_payments_30?: unknown;
    other_debts_late_payments_60?: unknown;
    other_debts_late_payments_90?: unknown;
    other_debts_monthly_payments?: unknown;
    description: string;
    total_debt?: unknown;
    trades: unknown[];
    collections: unknown[];
    deposit_alerts: unknown[];
    addresses: unknown[];
    employers: unknown[];
    bankruptcies: unknown[];
    judgments: unknown[];
    liens: unknown[];
    legal_items: unknown[];
    secured_loans: unknown[];
    fraud_warnings: unknown[];
    non_sufficient_funds: unknown[];
    credit_file_metadatas: unknown[];
    other_incomes: unknown[];
    consumer_statements: unknown[];
    bank_accounts: unknown[];
    local_inquiries: unknown[];
    foreign_inquiries: unknown[];
}

export interface Name {
    first_name: string;
    middle_name: string;
    last_name: string;
}

export interface PhoneNumber {
    raw_phone_number: number;
}

export interface Identity {
    name: Name;
    date_of_birth?: unknown;
    phone_number: PhoneNumber;
    sin_ssn?: unknown;
    drivers_licence?: unknown;
    current_address?: unknown;
    former_address?: unknown;
    customer_id: string;
}

export interface IdentityVerification {
    id: string;
    created: Date;
    modified: Date;
    status: string;
    result: string;
    reasons: unknown[];
    identity: Identity;
    status_label: string;
    result_label?: unknown;
    score?: unknown;
}

export interface Name {
    first_name: string;
    last_name: string;
}

export interface Identity {
    name: Name;
    date_of_birth?: unknown;
    current_address?: unknown;
}

export interface EnhancedIdentityVerification {
    id: string;
    created: Date;
    modified: Date;
    status: string;
    result: string;
    reasons: string[];
    identity: Identity;
    status_label: string;
    result_label: string;
    redirect_url?: Url;
    front?: unknown;
    back?: unknown;
    face?: unknown;
    document_type?: unknown;
    document_type_label?: unknown;
    document_number: number;
    issuing_country?: unknown;
    issuing_jurisdiction?: unknown;
    expiry_date?: unknown;
    first_name: string;
    last_name: string;
    date_of_birth?: unknown;
    address?: unknown;
    identity_verification_provider: string;
}

export interface RcmpResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    notes?: unknown;
    response?: unknown;
    response_label?: unknown;
    vulnerable_sector?: unknown;
    vulnerable_sector_label?: unknown;
    enhanced?: unknown;
    enhanced_label?: unknown;
    comments?: unknown;
    issued_date?: unknown;
    enhanced_comments?: unknown;
    vulnerable_sector_comments?: unknown;
    order_id?: unknown;
    reflow_status?: unknown;
    rcmp_result_document: string;
}

export interface Name {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
}

export interface Address {
    id: string;
    unit?: unknown;
    address: string;
    city: string;
    province_state: string;
    other_province_state: string;
    country: string;
    postal_code: string;
    county: string;
    raw_address?: unknown;
}

export interface IdDocument {
    type: string;
    number: string;
    issuing_country: string;
    issuing_province_state?: unknown;
    issue_date?: unknown;
    expiry_date?: unknown;
}

export interface SsnIdDocumentReport {
    id: string;
    names: Name[];
    addresses: Address[];
    id_documents: IdDocument[];
    dates_of_birth: unknown[];
    ssn_result: string;
    ssn_status: string;
}

export interface RecordCheckDetail {
    status: string;
    state: string;
    county: string;
    district?: unknown;
    details: string[];
    type: string;
    type_label: string;
}

export interface SingleStateCountyRecordCheckResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    record_check_details: unknown[];
}

export interface AllStateCountyRecordCheckResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    record_check_details: unknown[];
}

export interface ScanStatus {
    national_sex_offender_registry_scan: string;
    national_sex_offender_registry_scan_status: string;
    security_watch_list_scan: string;
    security_watch_list_scan_status: string;
    fraud_scan: string;
    fraud_scan_status: string;
    ofac_global_sanctions_scan: string;
    ofac_global_sanctions_scan_status: string;
    ssn_verification_scan: string;
    ssn_verification_scan_status: string;
    criminal_record_scan: string;
    criminal_record_scan_status: string;
    federal_record_scan: string;
    federal_record_scan_status: string;
    single_state_county_record_scan: string;
    single_state_county_record_scan_status: string;
    all_state_county_record_scan: string;
    all_state_county_record_scan_status: string;
}

export interface RecordCheckRequest {
    id: string;
    status: string;
    state: string;
    state_label: string;
    county: string;
    district?: unknown;
    fips_code: string;
    search_type: string;
    access_fee?: unknown;
    reference_id: string;
}

export interface UsCriminalRecordCheckResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags: string[];
    green_flags: unknown[];
    result: string;
    result_label: string;
    ssn_id_document_reports: SsnIdDocumentReport[];
    federal_record_check_result: string;
    record_check_details: RecordCheckDetail[];
    single_state_county_record_check_result: SingleStateCountyRecordCheckResult;
    all_state_county_record_check_result: AllStateCountyRecordCheckResult;
    criminal_cases: unknown[];
    scan_status: ScanStatus;
    record_check_requests: RecordCheckRequest[];
    notes?: unknown;
}

export interface InternationalCriminalRecordCheckResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    international_criminal_record_checks: unknown[];
}

export interface MotorVehicleRecordResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    licence?: unknown;
    abstract?: unknown;
    restrictions: unknown[];
    violations: unknown[];
    date_of_birth?: unknown;
    hair_colour?: unknown;
    eye_colour?: unknown;
    height?: unknown;
    weight?: unknown;
    name: string;
    addresses: unknown[];
    medical_certificates: unknown[];
}

export interface VerificationResult {
    id: string;
    status: string;
    status_label: string;
    overall_score: string;
    overall_score_label: string;
    red_flags?: unknown;
    green_flags?: unknown;
    result: string;
    result_label: string;
    employer_verification_results: unknown[];
    education_verification_results: unknown[];
    credential_verification_results: unknown[];
    certn_verification: string;
    certn_verification_label: string;
}

export interface InstantVerifyEmployment {
    instant_verify_employment_result: unknown[];
    status: string;
    result: string;
}

export interface InstantVerifyEducation {
    instant_verify_education_result: unknown[];
    status: string;
    result: string;
}

export interface InstantVerifyCredential {
    instant_verify_credential_result: unknown[];
    status: string;
    result: string;
}

export interface InstantVerifyResult {
    instant_verify_employment: InstantVerifyEmployment;
    instant_verify_education: InstantVerifyEducation;
    instant_verify_credential: InstantVerifyCredential;
}

export interface ApplicantAccount {
    id: string;
    email: string;
    email_verified: boolean;
    phone_number: number;
}

export interface HrOnboardingSession {
    id: string;
    verification_token: string;
    tracks: string[];
}

export interface Applicant {
    id: string;
    status: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: number;
    certn_score?: unknown;
    application_url: Url;
    report_url: Url;
    hr_onboarding_session: HrOnboardingSession;
}

export interface ComplianceRegion {
    id: string;
    name: string;
    country: string;
    sub_region: string;
    default: boolean;
    score_value_field: string;
    score_label_field: string;
    show_legal_us: boolean;
    show_credit_report: boolean;
    show_fcra: boolean;
    require_address_history: boolean;
}

export interface SettingsConfig {
    get_org_name: string;
    org_name: string;
    org_logo_link: string;
    org_primary_color: string;
    whitelabel_report: boolean;
    whitelabel_emails: boolean;
    compact_pdf_report: boolean;
    behavioural_test_req: boolean;
    emergency_contact_req: boolean;
    personal_ref_req: boolean;
    education_req: boolean;
    tenancy_years_amount_req: number;
    tenancy_ref_amount_req: number;
    tenancy_ref_email_req: boolean;
    tenancy_ref_phone_req: boolean;
    employer_years_amount_req: number;
    employer_ref_req: boolean;
    employer_ref_email_req: boolean;
    employer_ref_phone_req: boolean;
    document_required: boolean;
    cover_letter_req: boolean;
    government_id_req: boolean;
    proof_of_income_req: boolean;
    resume_req: boolean;
    visa_req: boolean;
    personal_ref_amount_req: number;
    passport_req: boolean;
    hide_detailed_financial: boolean;
    hide_sin_ssn: boolean;
    hide_date_of_birth: boolean;
    enable_rcmp_reflow: boolean;
    hide_id_verification_photos: boolean;
    hide_current_address: boolean;
    require_id_with_address: boolean;
    hide_activity_log: boolean;
    redirect_url: Url;
    custom_tracks: unknown[];
    my_crc_region?: unknown;
    request_base: boolean;
    request_behavioural: boolean;
    request_softcheck: boolean;
    request_equifax: boolean;
    request_identity_verification: boolean;
    request_enhanced_identity_verification: boolean;
    request_criminal_record_check: boolean;
    request_enhanced_criminal_record_check: boolean;
    request_vulnerable_sector_criminal_record_check: boolean;
    request_motor_vehicle_records: boolean;
    request_education_verification: boolean;
    request_employment_verification: boolean;
    request_us_criminal_softcheck: boolean;
    request_us_ssn_verification: boolean;
    request_employer_references: boolean;
    request_address_references: boolean;
    request_employer_phone_references: boolean;
    request_address_phone_references: boolean;
    request_international_criminal_record_check: boolean;
    request_soquij: boolean;
    request_instant_verify_employment: boolean;
    request_instant_verify_education: boolean;
    request_instant_verify_credential: boolean;
    employer_references_min: number;
    employer_references_max: number;
    address_references_min: number;
    address_references_max: number;
    employment_verification_min: number;
    employment_verification_max: number;
    education_verification_min: number;
    education_verification_max: number;
    credential_verification_min: number;
    credential_verification_max: number;
    credential_verification_level: string;
    education_verification_level: string;
    employer_references_years: number;
    address_references_years: number;
    employment_verification_years: number;
    employment_verification_years_or_individually: string;
    address_references_years_or_individually: string;
    employer_references_years_or_individually: string;
    us_criminal_record_check_years: number;
    applicant_login: boolean;
    exclude_softcheck_possible_matches: boolean;
    workable_fast_complete: boolean;
    review_all_negative_mvr_results: boolean;
    limit_education_verifications: boolean;
}

export interface BillingPlan {
    pm_request_softcheck_price: string;
    hr_request_softcheck_price: string;
    pm_request_equifax_price: string;
    hr_request_equifax_price: string;
    pm_request_identity_verification_price: string;
    hr_request_identity_verification_price: string;
    pm_request_enhanced_identity_verification_price: string;
    hr_request_enhanced_identity_verification_price: string;
    pm_request_criminal_record_check_price: string;
    hr_request_criminal_record_check_price: string;
    pm_request_vulnerable_sector_criminal_record_check_price: string;
    hr_request_vulnerable_sector_criminal_record_check_price: string;
    pm_request_motor_vehicle_records_price: string;
    hr_request_motor_vehicle_records_price: string;
    pm_request_us_criminal_softcheck_price: string;
    hr_request_us_criminal_softcheck_price: string;
    pm_request_us_ssn_verification_price: string;
    hr_request_us_ssn_verification_price: string;
    pm_request_education_verification_price: string;
    hr_request_education_verification_price: string;
    pm_request_credential_verification_price: string;
    hr_request_credential_verification_price: string;
    pm_request_employment_verification_price: string;
    hr_request_employment_verification_price: string;
    pm_request_us_criminal_record_check_tier_1_price: string;
    hr_request_us_criminal_record_check_tier_1_price: string;
    pm_request_us_criminal_record_check_tier_2_price: string;
    hr_request_us_criminal_record_check_tier_2_price: string;
    pm_request_us_criminal_record_check_tier_3_seven_year_price: string;
    hr_request_us_criminal_record_check_tier_3_seven_year_price: string;
    pm_request_us_criminal_record_check_tier_3_ten_year_price: string;
    hr_request_us_criminal_record_check_tier_3_ten_year_price: string;
    pm_request_employer_references_price: string;
    hr_request_employer_references_price: string;
    pm_request_address_references_price: string;
    hr_request_address_references_price: string;
    pm_request_education_reference_price: string;
    hr_request_education_reference_price: string;
    pm_request_credential_reference_price: string;
    hr_request_credential_reference_price: string;
    pm_request_employer_phone_references_price: string;
    hr_request_employer_phone_references_price: string;
    pm_request_address_phone_references_price: string;
    hr_request_address_phone_references_price: string;
    pm_request_enhanced_criminal_record_check_price: string;
    hr_request_enhanced_criminal_record_check_price: string;
    pm_request_instant_verify_employment_price: string;
    pm_request_instant_verify_education_price: string;
    pm_request_instant_verify_credential_price: string;
    hr_request_instant_verify_employment_price: string;
    hr_request_instant_verify_education_price: string;
    hr_request_instant_verify_credential_price: string;
    pm_request_soquij_price: string;
    hr_request_soquij_price: string;
    stripe_public_api_key: string;
}

export interface Team {
    id: string;
    name: string;
    country: string;
    industry: string;
    team_type: string;
    internal_name: string;
    app_url: Url;
    compliance_region: ComplianceRegion;
    settings_config: SettingsConfig;
    billing_plan: BillingPlan;
    google_analytics_key: string;
    adwords_key: string;
    adwords_conversion_key: string;
    external_domain: string;
}

export interface Owner {
    id: string;
    email: string;
    team: Team;
}

export interface Address {
    address: string;
    city: string;
    province_state: string;
    country: string;
}

export interface TestCollection {
    name: string;
    us_test: boolean;
    team: Team;
    superteam?: unknown;
    integration: string;
    request_base: boolean;
    request_behavioural: boolean;
    request_equifax: boolean;
    request_softcheck: boolean;
    request_us_criminal_softcheck: boolean;
    request_us_ssn_verification: boolean;
    request_identity_verification: boolean;
    request_enhanced_identity_verification: boolean;
    request_criminal_record_check: boolean;
    request_enhanced_criminal_record_check: boolean;
    request_vulnerable_sector_criminal_record_check: boolean;
    request_us_criminal_record_check_tier_1: boolean;
    request_us_criminal_record_check_tier_2: boolean;
    request_us_criminal_record_check_tier_3: boolean;
    request_international_criminal_record_check: boolean;
    request_soquij: boolean;
    request_motor_vehicle_records: boolean;
    request_education_verification: boolean;
    request_credential_verification: boolean;
    request_employment_verification: boolean;
    request_employer_references: boolean;
    request_address_references: boolean;
    request_employer_phone_references: boolean;
    request_address_phone_references: boolean;
    request_instant_verify_employment: boolean;
    request_instant_verify_education: boolean;
    address_questionaire_id?: unknown;
    employer_questionaire_id?: unknown;
    employer_references_min: number;
    employer_references_max: number;
    address_references_min: number;
    address_references_max: number;
    employment_verification_min: number;
    employment_verification_max: number;
    education_verification_min: number;
    education_verification_max: number;
    credential_verification_min: number;
    credential_verification_max: number;
    credential_verification_level?: unknown;
    education_verification_level?: unknown;
    employer_references_years?: unknown;
    address_references_years?: unknown;
    employment_verification_years?: unknown;
    address_references_years_or_individually: string;
    employer_references_years_or_individually: string;
    employment_verification_years_or_individually?: unknown;
    requested_countries: unknown[];
    us_criminal_record_check_years?: unknown;
    international_follow_up_applicant_country_select: boolean;
    international_follow_up_cost_threshold?: unknown;
}

export interface Listing {
    name: string;
    is_active: boolean;
    url_code: string;
    owner_id?: unknown;
    notification_list_ids: unknown[];
    start_date: Date;
    work_type?: unknown;
    address: Address;
    position_name: string;
    required_years_relevant_experience: number;
    required_skills_ids: unknown[];
    required_specializations_ids: unknown[];
    required_education_id?: unknown;
    salary?: unknown;
    sufficient_salary: boolean;
    high_risk_vulnerable_sector: boolean;
    job_safety_undue_risk: boolean;
    test_collection: TestCollection;
    team_id?: unknown;
}

export interface ComplianceRegion {
    id: string;
    name: string;
    country: string;
    sub_region: string;
    default: boolean;
    score_value_field: string;
    score_label_field: string;
    show_legal_us: boolean;
    show_credit_report: boolean;
    show_fcra: boolean;
    require_address_history: boolean;
}

export interface SettingsConfig {
    get_org_name: string;
    org_name: string;
    org_logo_link: string;
    org_primary_color: string;
    whitelabel_report: boolean;
    whitelabel_emails: boolean;
    compact_pdf_report: boolean;
    behavioural_test_req: boolean;
    emergency_contact_req: boolean;
    personal_ref_req: boolean;
    education_req: boolean;
    tenancy_years_amount_req: number;
    tenancy_ref_amount_req: number;
    tenancy_ref_email_req: boolean;
    tenancy_ref_phone_req: boolean;
    employer_years_amount_req: number;
    employer_ref_req: boolean;
    employer_ref_email_req: boolean;
    employer_ref_phone_req: boolean;
    document_required: boolean;
    cover_letter_req: boolean;
    government_id_req: boolean;
    proof_of_income_req: boolean;
    resume_req: boolean;
    visa_req: boolean;
    personal_ref_amount_req: number;
    passport_req: boolean;
    hide_detailed_financial: boolean;
    hide_sin_ssn: boolean;
    hide_date_of_birth: boolean;
    enable_rcmp_reflow: boolean;
    hide_id_verification_photos: boolean;
    hide_current_address: boolean;
    require_id_with_address: boolean;
    hide_activity_log: boolean;
    redirect_url: Url;
    custom_tracks: unknown[];
    my_crc_region?: unknown;
    request_base: boolean;
    request_behavioural: boolean;
    request_softcheck: boolean;
    request_equifax: boolean;
    request_identity_verification: boolean;
    request_enhanced_identity_verification: boolean;
    request_criminal_record_check: boolean;
    request_enhanced_criminal_record_check: boolean;
    request_vulnerable_sector_criminal_record_check: boolean;
    request_motor_vehicle_records: boolean;
    request_education_verification: boolean;
    request_employment_verification: boolean;
    request_us_criminal_softcheck: boolean;
    request_us_ssn_verification: boolean;
    request_employer_references: boolean;
    request_address_references: boolean;
    request_employer_phone_references: boolean;
    request_address_phone_references: boolean;
    request_international_criminal_record_check: boolean;
    request_soquij: boolean;
    request_instant_verify_employment: boolean;
    request_instant_verify_education: boolean;
    request_instant_verify_credential: boolean;
    employer_references_min: number;
    employer_references_max: number;
    address_references_min: number;
    address_references_max: number;
    employment_verification_min: number;
    employment_verification_max: number;
    education_verification_min: number;
    education_verification_max: number;
    credential_verification_min: number;
    credential_verification_max: number;
    credential_verification_level: string;
    education_verification_level: string;
    employer_references_years: number;
    address_references_years: number;
    employment_verification_years: number;
    employment_verification_years_or_individually: string;
    address_references_years_or_individually: string;
    employer_references_years_or_individually: string;
    us_criminal_record_check_years: number;
    applicant_login: boolean;
    exclude_softcheck_possible_matches: boolean;
    workable_fast_complete: boolean;
    review_all_negative_mvr_results: boolean;
    limit_education_verifications: boolean;
}

export interface BillingPlan {
    pm_request_softcheck_price: string;
    hr_request_softcheck_price: string;
    pm_request_equifax_price: string;
    hr_request_equifax_price: string;
    pm_request_identity_verification_price: string;
    hr_request_identity_verification_price: string;
    pm_request_enhanced_identity_verification_price: string;
    hr_request_enhanced_identity_verification_price: string;
    pm_request_criminal_record_check_price: string;
    hr_request_criminal_record_check_price: string;
    pm_request_vulnerable_sector_criminal_record_check_price: string;
    hr_request_vulnerable_sector_criminal_record_check_price: string;
    pm_request_motor_vehicle_records_price: string;
    hr_request_motor_vehicle_records_price: string;
    pm_request_us_criminal_softcheck_price: string;
    hr_request_us_criminal_softcheck_price: string;
    pm_request_us_ssn_verification_price: string;
    hr_request_us_ssn_verification_price: string;
    pm_request_education_verification_price: string;
    hr_request_education_verification_price: string;
    pm_request_credential_verification_price: string;
    hr_request_credential_verification_price: string;
    pm_request_employment_verification_price: string;
    hr_request_employment_verification_price: string;
    pm_request_us_criminal_record_check_tier_1_price: string;
    hr_request_us_criminal_record_check_tier_1_price: string;
    pm_request_us_criminal_record_check_tier_2_price: string;
    hr_request_us_criminal_record_check_tier_2_price: string;
    pm_request_us_criminal_record_check_tier_3_seven_year_price: string;
    hr_request_us_criminal_record_check_tier_3_seven_year_price: string;
    pm_request_us_criminal_record_check_tier_3_ten_year_price: string;
    hr_request_us_criminal_record_check_tier_3_ten_year_price: string;
    pm_request_employer_references_price: string;
    hr_request_employer_references_price: string;
    pm_request_address_references_price: string;
    hr_request_address_references_price: string;
    pm_request_education_reference_price: string;
    hr_request_education_reference_price: string;
    pm_request_credential_reference_price: string;
    hr_request_credential_reference_price: string;
    pm_request_employer_phone_references_price: string;
    hr_request_employer_phone_references_price: string;
    pm_request_address_phone_references_price: string;
    hr_request_address_phone_references_price: string;
    pm_request_enhanced_criminal_record_check_price: string;
    hr_request_enhanced_criminal_record_check_price: string;
    pm_request_instant_verify_employment_price: string;
    pm_request_instant_verify_education_price: string;
    pm_request_instant_verify_credential_price: string;
    hr_request_instant_verify_employment_price: string;
    hr_request_instant_verify_education_price: string;
    hr_request_instant_verify_credential_price: string;
    pm_request_soquij_price: string;
    hr_request_soquij_price: string;
    stripe_public_api_key: string;
}

export interface Team {
    id: string;
    name: string;
    country: string;
    industry: string;
    team_type: string;
    internal_name: string;
    app_url: Url;
    compliance_region: ComplianceRegion;
    settings_config: SettingsConfig;
    billing_plan: BillingPlan;
    google_analytics_key: string;
    adwords_key: string;
    adwords_conversion_key: string;
    external_domain: string;
}

export interface Application {
    created: Date;
    modified: Date;
    id: string;
    applicant: Applicant;
    owner: Owner;
    listing: Listing;
    is_active: boolean;
    is_selected: boolean;
    team_id: string;
    team: Team;
}

export interface ActivityLog {
    created: Date;
    modified: Date;
    id: string;
    status: string;
    status_label: string;
    date_label: string;
    time_label: string;
}

export interface AllStateCountyRecordCheckResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface SingleStateCountyRecordCheckResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface UsCriminalRecordCheckResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
    all_state_county_record_check_result: AllStateCountyRecordCheckResult;
    single_state_county_record_check_result: SingleStateCountyRecordCheckResult;
    federal_record_check_result: string;
}

export interface InternationalCriminalRecordCheckResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface SsnVerificationResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface InstantVerifyResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface ReferenceResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface RcmpResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface MotorVehicleRecordResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface EquifaxResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface RiskResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface SoquijResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface InformationResult {
    status: string;
    status_label: string;
    dispute: boolean;
    overall_score: string;
    overall_score_label: string;
    result: string;
    result_label: string;
}

export interface CertnVerification {
    status: string;
    status_label: string;
    dispute: boolean;
    education_verification_label: string;
    credential_verification_label: string;
    employment_verification_label: string;
    employment_verification: string;
    education_verification: string;
    credential_verification: string;
}

export interface ReportSummary {
    us_criminal_record_check_result: UsCriminalRecordCheckResult;
    international_criminal_record_check_result: InternationalCriminalRecordCheckResult;
    ssn_verification_result: SsnVerificationResult;
    instant_verify_result: InstantVerifyResult;
    reference_result: ReferenceResult;
    rcmp_result: RcmpResult;
    motor_vehicle_record_result: MotorVehicleRecordResult;
    equifax_result: EquifaxResult;
    risk_result: RiskResult;
    soquij_result: SoquijResult;
    information_result: InformationResult;
    certn_verification: CertnVerification;
    report_result: string;
    report_status: string;
    report_result_label: string;
    report_status_label: string;
    dispute: boolean;
}

export interface Result {
    created: Date;
    modified: Date;
    last_updated: Date;
    submitted_time?: Date;
    id: string;
    is_submitted: boolean;
    applicant_type: string;
    status: string;
    status_label: string;
    result: string;
    result_label: string;
    report_status: string;
    certn_score?: unknown;
    certn_score_label: string;
    certn_score_value: string;
    country: string;
    tag?: unknown;
    requested_countries: unknown[];
    us_criminal_record_check_years: number;
    international_follow_up_applicant_country_select: boolean;
    early_termination?: unknown;
    early_termination_label: string;
    reliability_risk?: unknown;
    reliability_risk_label: string;
    workplace_misconduct?: unknown;
    workplace_misconduct_label: string;
    salary?: unknown;
    sufficient_salary?: unknown;
    high_risk_vulnerable_sector?: unknown;
    job_safety_undue_risk?: unknown;
    information: Information;
    employment_verification: string;
    education_verification: string;
    credential_verification: string;
    reference_result: ReferenceResult;
    information_result: InformationResult;
    behavioural_result: BehaviouralResult;
    risk_result: RiskResult;
    ssn_verification_result: SsnVerificationResult;
    soquij_result: SoquijResult;
    equifax_result: EquifaxResult;
    employment_verified?: unknown;
    identity_verified?: unknown;
    identity_verification: IdentityVerification;
    enhanced_identity_verification: EnhancedIdentityVerification;
    manual_id_verification?: unknown;
    rcmp_result: RcmpResult;
    us_criminal_record_check_result: UsCriminalRecordCheckResult;
    international_criminal_record_check_result: InternationalCriminalRecordCheckResult;
    motor_vehicle_record_result: MotorVehicleRecordResult;
    verification_result: VerificationResult;
    instant_verify_result: InstantVerifyResult;
    request_base: boolean;
    request_behavioural: boolean;
    request_softcheck: boolean;
    request_equifax: boolean;
    request_identity_verification: boolean;
    request_enhanced_identity_verification: boolean;
    request_criminal_record_check: boolean;
    request_enhanced_criminal_record_check: boolean;
    request_vulnerable_sector_criminal_record_check: boolean;
    request_motor_vehicle_records: boolean;
    request_education_verification: boolean;
    request_employment_verification: boolean;
    request_us_criminal_softcheck: boolean;
    request_us_ssn_verification: boolean;
    request_credential_verification: boolean;
    request_employer_references: boolean;
    request_address_references: boolean;
    request_employer_phone_references: boolean;
    request_address_phone_references: boolean;
    request_us_criminal_record_check_tier_1: boolean;
    request_us_criminal_record_check_tier_2: boolean;
    request_us_criminal_record_check_tier_3: boolean;
    request_international_criminal_record_check: boolean;
    request_soquij: boolean;
    request_instant_verify_employment: boolean;
    request_instant_verify_education: boolean;
    request_instant_verify_credential: boolean;
    address_questionaire_id?: unknown;
    employer_questionaire_id?: unknown;
    employer_references_min: number;
    employer_references_max: number;
    address_references_min: number;
    address_references_max: number;
    employment_verification_min: number;
    employment_verification_max: number;
    education_verification_min: number;
    education_verification_max: number;
    credential_verification_min: number;
    credential_verification_max: number;
    credential_verification_level: string;
    education_verification_level: string;
    employer_references_years: number;
    address_references_years: number;
    employment_verification_years: number;
    address_references_years_or_individually: string;
    employer_references_years_or_individually: string;
    employment_verification_years_or_individually: string;
    applicant_account: ApplicantAccount;
    application: Application;
    account_association_links: unknown[];
    allow_reminder_emails: boolean;
    email_references: boolean;
    dispute: boolean;
    under_review_us: boolean;
    under_review_rcmp: boolean;
    activity_log: ActivityLog[];
    adjudication_status: string;
    adjudication_status_label: string;
    facebook?: unknown;
    linkedin?: unknown;
    is_favourite: boolean;
    report_summary: ReportSummary;
    reliability_risk_description: string;
    workplace_misconduct_description: string;
    early_termination_description: string;
    applicant_result_description: string;
    applicant_result_summary: string;
    social_result_summary: string;
    behavioural_result_summary: string;
    identity_verified_summary: string;
    can_upgrade: boolean;
    is_equifax_eligible: boolean;
    can_resend_email: boolean;
    resend_email_time?: unknown;
    is_viewed: boolean;
    onboarding_link: string;
    notes?: unknown;
    comments: unknown[];
}

export interface RootObject {
    count: number;
    next: string;
    previous?: unknown;
    results: Result[];
}
