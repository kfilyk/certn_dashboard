import styled from 'styled-components';
import { Spin } from 'antd';

export const Spinner = styled(Spin)`
    .ant-spin-dot-item {
        background-color: ${(props) => props.theme.color.green[400]};
    }
    color: ${(props) => props.theme.color.green[400]};
`;

export const Dot = styled.span`
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: block;
`;

export const TableWrapper = styled.div`
    width: 85%;
    margin: 5%;
    .pointer:hover {
        cursor: pointer;
    }
`;
