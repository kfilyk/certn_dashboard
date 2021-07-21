import styled from 'styled-components/macro';
import { Card } from 'antd';

export const Section = styled(Card)`
    .ant-card-head {
        border-bottom: 0 none;

        .ant-card-head-title {
            padding: 24px 0 0 0;
        }
    }
    .ant-card-body {
        padding: 16px 24px;

        .ant-row.ant-form-item {
            padding-right: 16px;
            margin-bottom: 14px;
        }
    }
`;

export const SectionContent = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    font-family: 'Open Sans', sans-serif;

    .ant-form-item {
        flex: 0 1 20%;
        padding-right: 16px;
    }
`;

export const SectionContentColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    font-family: 'Open Sans', sans-serif;
`;

export const StyledDetail = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0 16px 48px 0;
`;

export const DetailLabel = styled.div`
    font-size: 12px;
    line-height: 14px;
    color: #134247;
`;

export const DetailValue = styled.div`
    font-size: 14px;
    line-height: 16px;
    color: #161616;
    margin: 4px 0 8px;
    display: flex;

    > img {
        max-width: 100%;
        max-height: 400px;
        object-fit: contain;
    }
`;

export const ModalTitle = styled.span`
    display: block;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 16px;
    color: black;
`;

export const ModalContent = styled.span`
    display: block;
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: black;
`;
