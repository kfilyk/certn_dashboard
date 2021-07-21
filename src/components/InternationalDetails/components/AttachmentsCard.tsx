import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import styled from 'styled-components/macro';

import { UploadStatus } from 'constants/international';
import { urlToFileName } from 'utils/files';
import { SectionContentColumn, Section } from './styled';
import Attachment from './Attachment';
import { deleteDocument } from '../InternationalActions';
import UploadProgressBar from './UploadProgress';
import UploadDocument from './UploadDocument';

const AttachmentsList = styled.div`
    flex: 1;
    font-size: 14px;
    padding: 16px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const AttachmentsCard = ({
    documentTypes,
    attachments,
    setAttachments,
    onboardingId,
    applicantName,
}) => {
    const [uploadProgress, setUploadProgress] = useState({
        name: '',
        percent: 0,
        status: UploadStatus.NONE,
    });

    const addDocument = (
        id,
        url,
        docType,
        fileName = null,
        documentNum,
        documentIssuingProvState,
        documentIssuingCountry,
        documentExpiration,
    ) => {
        setAttachments([
            ...attachments,
            {
                id,
                file_name: fileName || urlToFileName(url),
                document_type: docType,
                document_number: documentNum,
                document_issuing_province_state: documentIssuingProvState,
                document_issuing_country: documentIssuingCountry,
                document_expiration: documentExpiration,
                url,
                can_delete: true,
            },
        ]);
    };

    const onDelete = attachment => {
        deleteDocument(onboardingId, attachment.id)
            .then(() => {
                setAttachments(attachments.filter(att => att !== attachment));
            })
            .catch(err => {
                console.error(err);
                notification.error({
                    key: 'intl-delete-error',
                    message: 'Failed to delete document',
                });
            });
    };

    const setProgress = ({ status, name = undefined, percent = undefined }) => {
        const newProgress = {
            ...uploadProgress,
            status,
        };
        if (name !== undefined) newProgress.name = name;
        if (percent !== undefined) newProgress.percent = percent;
        setUploadProgress(newProgress);
    };

    if (!onboardingId) {
        return null;
    }

    return (
        <Section title="Attachments">
            <SectionContentColumn>
                <AttachmentsList>
                    {attachments.map(attachment => {
                        return (
                            <Attachment
                                key={attachment.id}
                                fileName={attachment.file_name}
                                url={attachment.url}
                                onDelete={() => {
                                    onDelete(attachment);
                                }}
                                canDelete={attachment.can_delete}
                                applicantName={applicantName}
                            />
                        );
                    })}
                </AttachmentsList>
                <UploadProgressBar {...uploadProgress} />
                <UploadDocument
                    addDocument={addDocument}
                    documentTypes={documentTypes}
                    onboardingId={onboardingId}
                    attachments={attachments}
                    setProgress={setProgress}
                />
            </SectionContentColumn>
        </Section>
    );
};

AttachmentsCard.propTypes = {
    attachments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            file_name: PropTypes.string,
            document_type: PropTypes.string,
            document_number: PropTypes.string,
            document_issuing_province_state: PropTypes.string,
            document_issuing_country: PropTypes.string,
            document_expiration: PropTypes.string,
            url: PropTypes.string,
            can_delete: PropTypes.bool,
        }),
    ).isRequired,
    setAttachments: PropTypes.func.isRequired,
    documentTypes: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        }),
    ).isRequired,
    onboardingId: PropTypes.string,
    applicantName: PropTypes.string,
};

AttachmentsCard.defaultProps = {
    onboardingId: '',
    applicantName: '',
};

export default AttachmentsCard;
