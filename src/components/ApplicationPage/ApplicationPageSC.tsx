import { certnTheme } from '../../Theme/certn-theme';
import styled from 'styled-components';
import { Badge, Button } from 'antd';

export const APSpinWrapper = styled.div`
    height: 100%;
    .ant-spin-nested-loading,
    .ant-spin-container {
        height: 100%;
    }
`;
export const ApplicationPageWrapper = styled.div`
    background-color: ${(props) => props.theme.color.green[50]};
    padding: 50px;
    height: 100%;
    min-width: 800px;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
`;

export const CollapseWrapper = styled.div`
    margin-left: 25px;
    min-width: 220px;
    max-width: 300px;
    border-radius: 10px;

    .ant-collapse {
        border: 1px solid ${(props) => props.theme.color.gray[100]};
        border-radius: 10px;
    }
`;

export const CompleteHeader = styled.span`
    color: ${(props) => props.theme.color.green[600]};
    font-weight: bold;
`;

export const CompleteBadge = styled(Badge)`
    margin-left: 5px;
    .ant-badge-count {
        background-color: ${(props) => props.theme.color.green[100]};
        color: ${(props) => props.theme.color.green[600]};
        font-weight: bold;
    }
`;

export const PendingHeader = styled.span`
    color: ${(props) => props.theme.color.yellow[600]};
    font-weight: bold;
`;

export const PendingBadge = styled(Badge)`
    margin-left: 5px;
    .ant-badge-count {
        background-color: ${(props) => props.theme.color.yellow[100]};
        color: ${(props) => props.theme.color.yellow[600]};
        font-weight: bold;
    }
`;

export const FailureHeader = styled.span`
    color: ${(props) => props.theme.color.red[600]};
    font-weight: bold;
`;

export const FailureBadge = styled(Badge)`
    margin-left: 5px;
    .ant-badge-count {
        background-color: ${(props) => props.theme.color.red[100]};
        color: ${(props) => props.theme.color.red[600]};
        font-weight: bold;
    }
`;

export const APErrorWrapper = styled.div`
    box-shadow: inset 0px 13px 12px white;
    text-align: center;
    padding-top: 30vh;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.red[50]};
`;

export const APMessageWrapper = styled.p`
    font-size: 30px;
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
