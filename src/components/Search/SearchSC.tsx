import styled from 'styled-components';
import { Input, Button, Form } from 'antd';
const { Search } = Input;

export const SearchWrapper = styled.div`
    margin-top: 16px;
    margin-left: 16px;
    width: 100%;
    display: flex;
    align-items: center;
`;

export const SearchForm = styled(Search)`
    color: ${(props) => props.theme.color.green[400]};
    width: 25%;
    .ant-btn-primary {
        background-color: ${(props) => props.theme.color.gray[200]};
        border-color: ${(props) => props.theme.color.gray[200]};
        color: black;
    }
    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper:hover {
        border-color: ${(props) => props.theme.color.green[400]} !important;
        box-shadow: 0 0 0 2px rgb(47 185 154 / 20%);
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

export const AdvancedSwitch = styled.div`
    background-color: none;
    border-color: none;
    color: black;
`;

export const AdvancedSearchItem = styled(Form.Item)`
    margin-left: 16px;
    width: 20%;
    display: inline-block;
    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper:hover {
        border-color: ${(props) => props.theme.color.green[400]} !important;
        box-shadow: 0 0 0 2px rgb(47 185 154 / 20%);
    }
`;

export const AdvancedWapper = styled(Form)`
    margin-left: 0px;
    margin-bottom: 7px;
    width: 75%;
`;
