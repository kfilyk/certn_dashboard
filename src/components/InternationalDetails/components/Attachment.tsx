import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Icon, Modal } from 'antd';
import { getFileType } from 'utils/files';
import { ModalContent, ModalTitle } from './styled';

const Pill = styled.div`
    width: 300px;
    height: 36px;
    display: flex;
    align-items: center;
    padding: 8px 12px;
    margin: 0 16px 16px 0;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    cursor: pointer;

    &:hover {
        background-color: #fff;
        border-color: #32c29e;
    }
`;

const FileName = styled.div`
    flex: 1;
    padding: 0 6px 0 10px;
    font-size: 14px;
    line-height: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const FileTypeIcon = styled(Icon)`
    width: 16px;
    height: 16px;
    font-size: 16px;
`;

const DeleteIcon = styled(Icon)`
    width: 16px;
    height: 16px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    color: #595959;

    &:hover {
        opacity: 1;
        color: #e74c3c;
    }
`;

const Attachment = ({ fileName, url, onDelete, canDelete, applicantName }) => {
    const onClick = () => {
        window.open(url, `Attachment-${fileName}`);
    };
    const onDeleteWrapper = e => {
        e.preventDefault();
        e.stopPropagation();
        if (onDelete) {
            Modal.confirm({
                title: <ModalTitle>Confirm document deletion</ModalTitle>,
                content: (
                    <ModalContent>{`You're about to permanently delete this file from the application of ${applicantName}.`}</ModalContent>
                ),
                okText: 'Yes, delete',
                okType: 'danger',
                icon: null,
                centered: true,
                onOk: onDelete,
            });
        }
        return false;
    };

    const type = getFileType(fileName);
    return (
        <Pill onClick={onClick}>
            <FileTypeIcon type={type} />
            <FileName>{fileName}</FileName>
            {canDelete ? (
                <DeleteIcon
                    type="delete"
                    onClick={onDeleteWrapper}
                    title="Delete this document"
                />
            ) : null}
        </Pill>
    );
};

Attachment.propTypes = {
    fileName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    canDelete: PropTypes.bool,
    applicantName: PropTypes.string.isRequired,
};

Attachment.defaultProps = {
    onDelete: undefined,
    canDelete: true,
};

export default Attachment;
