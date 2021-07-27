import styled from 'styled-components';
import { Pagination, Spin } from 'antd';
// Font Sizes and Line height are text-lg
export const CustomPagination = styled(Pagination)`
    button {
        background: transparent !important;
        border: none !important;
        font-size: ${(props) => props.theme.fontSize.lg.size};
        line-height: ${(props) => props.theme.fontSize.lg.lineHeight};
        color: ${(props) => props.theme.color.gray[400]};
    }
    button > span {
        padding-top: 7px;
        border-top: 2px solid transparent;
    }
    button>span: hover {
        color: ${(props) => props.theme.color.green[400]};
    }
    li {
        padding-top: 10px;
        font-weight: 500;
        background: transparent !important;
        border: none !important;
        font-size: ${(props) => props.theme.fontSize.lg.size};
        line-height: ${(props) => props.theme.fontSize.lg.lineHeight};
    }
    li > a {
        color: ${(props) => props.theme.color.gray[400]};
    }
    li:hover,
    :focus {
        color: ${(props) => props.theme.color.green[400]};
    }
    li > a {
        border-top: 2px solid transparent;
    }
    li > a:hover {
        color: ${(props) => props.theme.color.green[400]};
    }
    li.ant-pagination-item-active > a {
        color: ${(props) => props.theme.color.green[400]};
        border-top: 2px solid ${(props) => props.theme.color.green[400]};
    }
`;

export const Spinner = styled(Spin)`
    .ant-spin-dot-item {
        background-color: ${(props) => props.theme.color.green[400]};
    }
    color: ${(props) => props.theme.color.green[400]};
`;

export const Dot = styled.span`
    height: 25px;
    width: 25px;
    background-color: ${(props) => props.theme.color.gray};
    border-radius: 50%;
    display: block;
`;

export const TableWrapper = styled.div`
    .pointer:hover {
        cursor: pointer;
    }
`;

export const PaginationWrapper = styled.div`
    margin: 15px 0;
    display: flex;
    justify-content: center;
`;
