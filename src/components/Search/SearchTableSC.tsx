import styled from 'styled-components';
import { Pagination } from 'antd';
// Font Sizes and Line height are text-lg
export const CustomPagination = styled(Pagination)`
    button {
        background: transparent !important;
        border: none !important;
        font-size: 1.125rem;
        line-height: 1.75;
        color: ${(props) => props.theme.color.gray[400]};
    }
    button > span {
        padding-top: 0.6rem;
        border-top: 2px solid transparent;
    }
    button>span: hover {
        color: ${(props) => props.theme.color.green[400]};
    }
    li {
        padding-top: 0.5rem;
        font-weight: 500;
        background: transparent !important;
        border: none !important;
        font-size: 1.125rem;
        line-height: 1.75;
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
