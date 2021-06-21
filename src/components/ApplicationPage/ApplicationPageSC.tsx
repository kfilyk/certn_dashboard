import styled from 'styled-components';
import { Badge } from 'antd';

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