import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Progress } from 'antd';
import { UploadStatus } from 'constants/international';

const StyledUploadProgress = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 0 20px 0 3px;
`;

const StyledLabel = styled.div`
    font-size: 14px;
    line-height: 16px;
    color: #000;
`;

const StyledProgress = styled(Progress)`
    .ant-progress-inner {
        height: 4px;
        background-color: #e5e5e5;
        border-radius: 0;
    }
    .ant-progress-bg {
        border-radius: 0;
    }
    &.ant-progress-status-normal,
    &.ant-progress-status-active {
        .ant-progress-bg {
            background-color: #1bb793;
        }
        .ant-progress-text {
            display: none;
        }
    }
`;

const UploadProgressBar = ({ name, percent, status }) => {
    if (status === UploadStatus.NONE) {
        return null;
    }

    return (
        <StyledUploadProgress>
            <StyledLabel>{name}</StyledLabel>
            <StyledProgress percent={percent} status={status} />
        </StyledUploadProgress>
    );
};

UploadProgressBar.propTypes = {
    name: PropTypes.string.isRequired,
    percent: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
};

export default UploadProgressBar;
