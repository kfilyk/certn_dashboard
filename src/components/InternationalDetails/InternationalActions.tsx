import { get, patch, deleteRequest, post } from 'utils/request';
import { getAuthToken } from 'utils/auth';

export async function fetchList() {
    return get({
        path: 'api/v2/international_agent_checks/',
        headers: { authorization: `Token ${getAuthToken()}` },
    });
}

export async function fetchDetails(id) {
    return get({
        path: `api/v2/international_agent_checks/${id}`,
        headers: { authorization: `Token ${getAuthToken()}` },
    });
}

/**
 * Send the agent results as a patch request.
 * @param id the intl result id
 * @param {object} body the values object
 * @param {string} body.agent_status - ADDITIONAL_INFORMATION, WAITING_ON_SOURCE, COMPLETE
 * @param {string} body.report_clearance - CLEAR, REVIEW, UNVERIFIABLE
 * @param {string} body.internal_notes
 * @param {string} body.conviction_source
 * @param {string} body.inquiry_country_code - the 2 character code
 * @param {string} body.inquiry_results
 * @param {object} body.information - the information object
 * @param {array} body.information.addresses - the addresses array
 * @param {array} body.information.identity_numbers - the identity numbers array
 * @param {boolean} [body.submit=false]
 * @returns {Promise<*>}
 */
export async function patchDetails(id, body) {
    return patch({
        path: `api/v2/international_agent_checks/${id}/update_agent_results/`,
        headers: { authorization: `Token ${getAuthToken()}` },
        body,
    });
}

export async function fetchSignedS3Link(
    file,
    onboardingId,
    documentType,
    passportValues = {},
) {
    const data = {
        document_type: documentType,
        file_name: file.name,
        file_type: file.type,
        ...passportValues,
    };
    return post({
        path: `hr/v1/onboarding/${onboardingId}/documents/`,
        headers: { authorization: `Token ${getAuthToken()}` },
        body: data,
    });
}

export function checkUploadSuccessful(onboardingId, documentId) {
    return post({
        path: `hr/v1/onboarding/${onboardingId}/documents/${documentId}/`,
        headers: { authorization: `Token ${getAuthToken()}` },
    });
}

export function deleteDocument(onboardingId, documentId) {
    return deleteRequest({
        path: `hr/v1/onboarding/${onboardingId}/documents/${documentId}/`,
        headers: { authorization: `Token ${getAuthToken()}` },
    });
}
