import styled from 'styled-components';
import { Input, Button, Form } from 'antd';

export const SearchWrapper = styled.div`
    margin: 50px 5% 0 5%;
    height: 95px;
    display: flex;
    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused,
    .ant-input-affix-wrapper:hover {
        border-color: ${(props) => props.theme.color.green[400]} !important;
        box-shadow: 0 0 0 2px rgb(47 185 154 / 20%);
    }
`;

export const SearchForm = styled(Input)`
    color: ${(props) => props.theme.color.green[400]};
    right-border: none;
    border-radius: 4px 0 0 4px;
`;

export const SearchButton = styled(Button)`
    align-self: center;
    background-color: ${(props) => props.theme.color.green[400]};
    color: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.green[400]};
    border-radius: 4px;
    margin-left: 20px;
    :hover,
    :focus {
        background-color: ${(props) => props.theme.color.green[400]};
        border-color: ${(props) => props.theme.color.green[400]};
    }
`;

export const AdvancedSwitch = styled(Button)`
    display: flex;
    border-radius: 0 4px 4px 0;
    width: 125px;
    background-color: ${(props) => props.theme.color.gray[100]};
    color: ${(props) => props.theme.color.black};
    border-color: ${(props) => props.theme.color.gray[300]};

    :hover {
        background-color: ${(props) => props.theme.color.gray[100]};
        border-color: ${(props) => props.theme.color.gray[300]};
        color: ${(props) => props.theme.color.black};
    }

    :focus,
    :active {
        background-color: ${(props) => props.theme.color.gray[100]};
        border-color: ${(props) => props.theme.color.gray[300]};
        color: ${(props) => props.theme.color.black};
    }
`;

export const ToggleButtonWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: horizontal;
    align-items: center;
    justify-content: center;
    p {
        text-align: center;
        margin: 0;
        margin-left: 5px;
    }
`;

export const AdvancedSearchItem = styled(Form.Item)`
    margin-left: 16px;
    flex: 1;
    display: inline-block;
    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused,
    .ant-input-affix-wrapper:hover {
        border-color: ${(props) => props.theme.color.green[400]} !important;
        box-shadow: 0 0 0 2px rgb(47 185 154 / 20%);
    }

    label {
        font-weight: bold;
    }
`;

export const AdvancedWapper = styled(Form)`
    display: flex;
`;

export const BasicSearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
`;

export const InputWrapper = styled.div`
    display: flex;
    width: 100%;
`;

export const TextWrapper = styled.div`
    height: 32px;
    display: flex;
    p {
        align-self: center;
        margin: 0;
        font-weight: bold;
    }
`;
