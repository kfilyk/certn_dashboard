import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Button, Form, notification, Select, Tooltip, Upload } from 'antd';

import { PASSPORT, UploadStatus } from 'constants/international';
import SearchSelect from 'components/SearchSelect';
import { checkUploadSuccessful, fetchSignedS3Link } from '../InternationalActions';
import PassportForm from './PassportForm';

const UploadRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    padding: 16px 0;
`;

const DocumentTypeWrapper = styled.div`
    flex-basis: ${({ fill }) => (fill ? '100%' : 'auto')};
    margin: ${({ fill }) => (fill ? '0 16px 20px 0' : '0 16px 0 0')};
    .ant-select {
        width: 200px;
    }
`;

const isDocumentTypeValid = fileType =>
    /jpg|jpeg|png|gif|pdf|doc|docx|ppt|pptx|odt|xls|xlsx|txt|text/.test(fileType);

let timeoutId = 0;

const UploadDocument = ({
    addDocument,
    attachments,
    documentTypes,
    onboardingId,
    setProgress,
    form,
}) => {
    const [documentType, setDocumentType] = useState();
    const [s3UploadLink, setS3UploadLink] = useState();
    const [s3UploadFields, setS3UploadFields] = useState({});
    const [preparedDocument, setPreparedDocument] = useState();

    const isPassport = documentType === PASSPORT;

    const isPassportError = () => {
        if (isPassport) {
            form.validateFields();
            const errors = form.getFieldsError();
            return Boolean(
                errors.document_number ||
                    errors.document_expiration ||
                    errors.document_issuing_country ||
                    errors.document_issuing_province_state,
            );
        }
        return false;
    };

    const setProgressStart = name => {
        // Uploading starting - clear timer and set percent to 0
        clearTimeout(timeoutId);
        setProgress({ name, percent: 0, status: UploadStatus.ACTIVE });
    };

    const setProgressDone = status => {
        setProgress({ status });
        // Clear the progress after 3 seconds
        timeoutId = setTimeout(() => {
            setProgress({ name: '', percent: 0, status: UploadStatus.NONE });
        }, 3000);
    };

    const s3GetUploadLink = file => {
        const { name, type, size } = file;
        let passportValues = {};
        // Validate passport fields if necessary
        if (isPassport) {
            if (isPassportError()) {
                return false;
            }
            passportValues = form.getFieldsValue();
            passportValues.document_expiration = passportValues.document_expiration.format(
                'YYYY-MM-DD',
            );
        }
        // Check file size requirements
        if (size === 0 || size >= 10485760) {
            notification.warn({
                key: 'intl-filesize',
                message:
                    size === 0
                        ? 'Please choose a non-empty file'
                        : 'File must be less than 10 MB',
                duration: 3,
            });
            return false;
        }
        // Check if there is already a file with the same file name and document type
        if (
            attachments.some(
                att => att.file_name === name && att.document_type === documentType,
            )
        ) {
            notification.warn({
                key: 'intl-duplicate-filename',
                message: 'Duplicate file name',
                duration: 3,
            });
            return false;
        }
        // Validate document type
        if (!isDocumentTypeValid(type)) {
            notification.warn({
                key: 'intl-invalid-file-tye',
                message: 'Invalid file type',
                duration: 3,
            });
            return false;
        }

        setProgressStart(name);

        return fetchSignedS3Link(file, onboardingId, documentType, passportValues)
            .then(response => {
                setS3UploadLink(response.url);
                setS3UploadFields(response.fields);
                setPreparedDocument(response.document);
                return response;
            })
            .catch(err => {
                console.error('Failed to fetch upload link', err);
                setProgressDone(UploadStatus.EXCEPTION);
                notification.error({
                    key: 'intl-upload-error',
                    message: 'Failed to upload document',
                });
                return err;
            });
    };

    const onChange = info => {
        const { name, status } = info.file;
        // This function gets called multiple times - we only care when upload is 'done'
        if (preparedDocument && status === 'done') {
            setProgress({ name, percent: 100, status: UploadStatus.ACTIVE });
            // Mark the upload as successful
            checkUploadSuccessful(onboardingId, preparedDocument.id)
                .then(() => {
                    addDocument(
                        preparedDocument.id,
                        preparedDocument.url,
                        preparedDocument.document_type,
                        preparedDocument.file_name,
                        preparedDocument.document_number,
                        preparedDocument.document_issuing_province_state,
                        preparedDocument.document_issuing_country,
                        preparedDocument.document_expiration,
                    );
                    setProgressDone(UploadStatus.SUCCESS);
                })
                .catch(err => {
                    console.error(err);
                    setProgressDone(UploadStatus.EXCEPTION);
                    notification.error({
                        key: 'intl-upload-success-error',
                        message: 'Failed to mark document as uploaded.',
                    });
                });
        }
    };

    const onDocumentTypeChange = value => {
        setDocumentType(value);
    };

    const onProgress = ({ percent }, { name }) => {
        setProgress({ status: UploadStatus.ACTIVE, name, percent });
    };

    const onUploadClick = ev => {
        if (isPassportError()) {
            ev.preventDefault();
            ev.stopPropagation();
            return false;
        }
        return true;
    };

    return (
        <UploadRow>
            <DocumentTypeWrapper fill={isPassport}>
                <SearchSelect
                    placeholder="Select document type"
                    onChange={onDocumentTypeChange}
                >
                    {documentTypes.map(({ value, label }) => (
                        <Select.Option key={value} value={value}>
                            {label}
                        </Select.Option>
                    ))}
                </SearchSelect>
            </DocumentTypeWrapper>
            {isPassport && <PassportForm form={form} />}
            <Upload
                multiple={false}
                accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.odt,.xls,.xlsx,.txt"
                action={s3UploadLink}
                data={s3UploadFields}
                beforeUpload={file => s3GetUploadLink(file)}
                onChange={onChange}
                onProgress={onProgress}
                showUploadList={false}
                disabled={!documentType}
            >
                <Tooltip title="Maximum file upload size: 10mb">
                    <Button
                        icon="plus"
                        disabled={!documentType}
                        onClick={onUploadClick}
                    >
                        Add new document
                    </Button>
                </Tooltip>
            </Upload>
        </UploadRow>
    );
};

UploadDocument.propTypes = {
    attachments: PropTypes.arrayOf(PropTypes.object).isRequired,
    documentTypes: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ).isRequired,
    addDocument: PropTypes.func.isRequired,
    setProgress: PropTypes.func.isRequired,
    onboardingId: PropTypes.string.isRequired,
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func,
        getFieldsValue: PropTypes.func,
        getFieldsError: PropTypes.func,
        validateFields: PropTypes.func,
    }).isRequired,
};

export default Form.create()(UploadDocument);
