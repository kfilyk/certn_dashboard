import styled from 'styled-components';
import { Input, Button } from 'antd';
const { Search } = Input;

export const SearchWrapper = styled.div`
    width: 500px;
    display: flex;
    margin-left 16px;
`;

export const SearchForm = styled(Search)`
    color: ${(props) => props.theme.color.green[400]};
    .ant-btn-primary {
        background-color: ${(props) => props.theme.color.gray[200]};
        border-color: ${(props) => props.theme.color.gray[200]};
        color: black;
    }
`;

export const SearchButton = styled(Button)`
    margin-left: 16px;
    background-color: ${(props) => props.theme.color.green[400]};
    color: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.green[400]};
    border-radius: 4px;
    :hover,
    :focus {
        background-color: ${(props) => props.theme.color.green[400]};
        border-color: ${(props) => props.theme.color.green[400]};
    }
`;
