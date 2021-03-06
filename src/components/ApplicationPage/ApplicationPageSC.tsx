import { certnTheme } from '../../Theme/certn-theme';
import styled from 'styled-components';
import { Badge, Button, Spin } from 'antd';

export const APSpinWrapper = styled.div`
    height: 100%;
    .ant-spin-nested-loading,
    .ant-spin-container {
        height: 100%;
    }
`;
export const ApplicationPageWrapper = styled.div`
    background-color: ${(props) => props.theme.color.green[50]};
    padding-top: 50px;
    height: 100%;
    min-width: 850px;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
`;
export const CollapseWrapper = styled.div`
    margin-left: 25px;
    min-width: 245px;
    max-width: 300px;
    border-radius: 10px;

    .ant-collapse {
        border: 1px solid ${(props) => props.theme.color.gray[100]};
        border-radius: 10px;
    }
`;

export const MiddleCriticalItem = styled.div`
    padding: 16px 0px 16px 0px;
    border-bottom: 1px solid ${(props) => props.theme.color.gray[200]};
`;

export const FirstCriticalItem = styled.div`
    padding: 0px 0px 16px 0px;
    border-bottom: 1px solid ${(props) => props.theme.color.gray[200]};
`;

export const FinalCriticalItem = styled.div`
    padding-top: 16px;
`;

export const CompleteHeader = styled.span`
    color: ${(props) => props.theme.color.green[600]};
    font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const CompleteBadge = styled(Badge)`
    margin-left: 5px;
    .ant-badge-count {
        background-color: ${(props) => props.theme.color.green[100]};
        color: ${(props) => props.theme.color.green[600]};
        font-weight: ${(props) => props.theme.fontWeights.bold};
    }
`;

export const PendingHeader = styled.span`
    color: ${(props) => props.theme.color.yellow[600]};
    font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const PendingBadge = styled(Badge)`
    margin-left: 5px;
    .ant-badge-count {
        background-color: ${(props) => props.theme.color.yellow[100]};
        color: ${(props) => props.theme.color.yellow[600]};
        font-weight: ${(props) => props.theme.fontWeights.bold};
    }
`;

export const FailureHeader = styled.span`
    color: ${(props) => props.theme.color.red[600]};
    font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const FailureBadge = styled(Badge)`
    margin-left: 5px;
    .ant-badge-count {
        background-color: ${(props) => props.theme.color.red[100]};
        color: ${(props) => props.theme.color.red[600]};
        font-weight: ${(props) => props.theme.fontWeights.bold};
    }
`;

export const APErrorWrapper = styled.div`
    box-shadow: inset 0px 13px 12px white;
    text-align: center;
    padding-top: 200px;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.red[50]};
`;

export const APMessageWrapper = styled.p`
    font-size: ${(props) => props.theme.fontSize.xl3.size};
    line-height: ${(props) => props.theme.fontSize.xl3.lineHeight};
    font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const APErrorButton = styled(Button)`
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.green[400]};
    border: none;
    border-radius: 5px;

    :hover {
        color: ${(props) => props.theme.color.white};
        background-color: ${(props) => props.theme.color.green[300]};
        border: none;
    }
`;

export const APErrorContentWrapper = styled.div`
    margin: 0 auto;
    height: 150px;
    width: 400px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 13px 13px 20px 0px ${(props) => props.theme.color.red[200]};
    background-color: ${(props) => props.theme.color.red[100]};
`;

export const TableWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.color.gray[100]};
    padding: 0px;
    border-radius: 10px;

    .ant-table {
        border-radius: 10px;
    }
`;

export const Dot = styled.span`
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: block;
`;

export const dotColor = [
    {
        status: 'COMPLETE',
        color: certnTheme.color.green.default,
    },
    {
        status: 'SENT',
        color: certnTheme.color.yellow.default,
    },
    {
        status: 'FAIL',
        color: certnTheme.color.red.default,
    },
];

export const Spinner = styled(Spin)`
    .ant-spin-dot-item {
        background-color: ${(props) => props.theme.color.green[400]};
    }
    color: ${(props) => props.theme.color.green[400]};
`;
