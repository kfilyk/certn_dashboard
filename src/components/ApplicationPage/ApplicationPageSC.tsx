/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import { Badge, Button } from 'antd';

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
    height: calc(100vh - 80px);
    background-color: ${(props) => props.theme.color.red[50]};
`;

export const APMessageWrapper = styled.p`
    font-size: 30px;
    font-weight: ${(props) => props.theme.fontWeights.regular};
`;
//line-height: calc(100vh - 160px);
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
