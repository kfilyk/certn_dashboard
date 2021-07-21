import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, notification } from 'antd';

import { COMPLETE } from 'constants/international';
import ConvictionsForm from './ConvictionsForm';
import ActionForm from './ActionForm';
import ApplicantDetailsForm from './ApplicantDetailsForm';
import AttachmentsCard from './AttachmentsCard';
import { getReportValues } from '../InternationalList';
import AddressDetailsCard from './AddressDetailsCard';

const DetailsForm = ({ form, onSave, onSubmit, isSaving, check, applicantName }) => {
    const {
        information = {},
        onboarding_id: onboardingId,
        document_types: documentTypes = [],
        agent_documents: agentDocuments = [],
        agent_status_options: agentStatusOptions = [],
        report_clearance_options: reportClearanceOptions = [],
    } = check;

    const [submitted, setSubmitted] = useState(false);
    const [addressErrorIds, setAddressErrorIds] = useState(null);
    const [attachments, setAttachments] = useState(agentDocuments);

    const { validateFieldsAndScroll, setFields } = form;

    const isValid = (err, values, isSubmit = false) => {
        let errorIds = null;
        // If there are address errors - we need to expand the <Collapse>
        if (err?.information?.addresses) {
            const { addresses = [] } = values.information || {};
            const addressErrors = err.information.addresses;
            // The errors don't contain the ids - so get from the addresses array
            errorIds = addressErrors
                .map((error, index) => (error ? addresses[index]?.id : undefined))
                .filter(Boolean);
            // We don't want a new empty array to appear different - so use null
            if (errorIds.length === 0) errorIds = null;
        }
        setAddressErrorIds(errorIds);

        // Custom error messages for agent status and report clearance when submitting
        const isComplete = values.agent_status === COMPLETE;
        const agent_status = {
            value: values.agent_status,
            errors: null,
        };
        if (isSubmit && !isComplete) {
            agent_status.errors = [
                new Error('The status must be ‘Complete’ before submitting'),
            ];
        }
        const report_clearance = {
            value: values.report_clearance,
            errors: null,
        };
        if (isSubmit && !values.report_clearance) {
            report_clearance.errors = [
                new Error('Please set the order result before submitting'),
            ];
        }
        setFields({
            agent_status,
            report_clearance,
        });

        if (err || agent_status.errors || report_clearance.errors) {
            notification.error({
                key: 'intl-form-error',
                message: 'Please fix the errors below.',
                duration: 3,
            });
            return false;
        }
        return true;
    };

    const handleSave = e => {
        e.preventDefault();
        setSubmitted(true);
        validateFieldsAndScroll((err, values) => {
            if (isValid(err, values, false)) {
                onSave(values);
            }
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        validateFieldsAndScroll((err, values) => {
            if (isValid(err, values, true)) {
                onSubmit(values);
            }
        });
    };

    const internalNotes = check.internal_notes || '';
    const {
        reportClearance,
        agentStatus,
        convictionSource,
        inquiryCountryCode,
        inquiryResults,
        countryName,
    } = getReportValues(check);

    return (
        <Form layout="vertical" hideRequiredMark>
            <ApplicantDetailsForm
                information={information}
                attachments={attachments}
                countryName={countryName}
                form={form}
            />
            <AddressDetailsCard
                information={information}
                form={form}
                addressErrorIds={addressErrorIds}
            />
            <AttachmentsCard
                documentTypes={documentTypes}
                attachments={attachments}
                setAttachments={setAttachments}
                onboardingId={onboardingId}
                applicantName={applicantName}
            />
            <ConvictionsForm
                form={form}
                submitted={submitted}
                convictionSource={convictionSource}
                inquiryCountryCode={inquiryCountryCode}
                inquiryResults={inquiryResults}
            />
            <ActionForm
                form={form}
                onSave={handleSave}
                onSubmit={handleSubmit}
                internalNotes={internalNotes}
                agentStatusOptions={agentStatusOptions}
                agentStatus={agentStatus}
                reportClearanceOptions={reportClearanceOptions}
                reportClearance={reportClearance}
                isSaving={isSaving}
            />
        </Form>
    );
};

DetailsForm.propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        validateFieldsAndScroll: PropTypes.func.isRequired,
        setFields: PropTypes.func.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    check: PropTypes.objectOf(PropTypes.any).isRequired,
    isSaving: PropTypes.bool,
    applicantName: PropTypes.string.isRequired,
};

DetailsForm.defaultProps = {
    isSaving: false,
};

export default Form.create()(DetailsForm);
