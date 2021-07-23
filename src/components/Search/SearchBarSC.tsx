import styled from 'styled-components';
import { Input, Button, Form } from 'antd';

export const SearchWrapper = styled.div<{ disabled: boolean }>`
    margin: 50px 5% 0 5%;

    //needed to ensure the forms and search button line up
    height: 104px;
    display: flex;

    ${(props) =>
        props.disabled
            ? `.ant-input-affix-wrapper-disabled:hover {
        border: 1px solid props.theme.color.gray[300]};
    }`
            : `.ant-input-affix-wrapper:focus,
            .ant-input-affix-wrapper-focused,
            .ant-input-affix-wrapper:hover {
                border-color: ${props.theme.color.green[400]} !important;
                box-shadow: 0 0 0 2px rgb(47 185 154 / 20%);
            }`}
`;

export const SearchForm = styled(Input)`
    right-border: none;
    border-radius: 4px 0 0 4px;
    height: 42px;
`;

export const SearchButton = styled(Button)`
    align-self: center;
    background-color: ${(props) => props.theme.color.green[400]};
    color: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.green[400]};
    border-radius: 6px;
    margin-left: 20px;
    font-size: ${(props) => props.theme.fontSize.base.size};
    line-height: ${(props) => props.theme.fontSize.base.lineHeight};
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    height: 42px;
    width: 123px;

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
    height: 42px;
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
        font-size: ${(props) => props.theme.fontSize.sm.size};
        line-height: ${(props) => props.theme.fontSize.sm.lineHeight};
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

    span.ant-input-affix-wrapper {
        height: 42px;
    }

    label {
        font-weight: ${(props) => props.theme.fontWeights.bold};
        font-size: ${(props) => props.theme.fontSize.sm.size};
        line-height: ${(props) => props.theme.fontSize.sm.lineHeight};
    }
`;

export const BasicSearchItem = styled(Form.Item)`
    flex-grow: 1;
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
        font-weight: ${(props) => props.theme.fontWeights.bold};
        font-size: ${(props) => props.theme.fontSize.sm.size};
        line-height: ${(props) => props.theme.fontSize.sm.lineHeight};
    }
`;
