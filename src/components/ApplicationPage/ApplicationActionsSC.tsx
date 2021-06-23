import { Menu, Form, Input, Button } from 'antd';
import styled from 'styled-components';

//likely temporary styling
export const ActionListWrapper = styled(Menu)`
    margin: 50px;
    border: 1px solid gray;
    width: 25%;

    .ant-menu > .ant-menu-item-selected,
    .ant-menu > .ant-menu-submenu-selected {
        color: ${(props) => props.theme.color.green[900]};
        background-color: ${(props) => props.theme.color.green[100]};
    }

    .ant-menu > .ant-menu-item:hover,
    .ant-menu > .ant-menu-submenu:hover {
        color: ${(props) => props.theme.color.green[600]};
    }

    .ant-menu-vertical .ant-menu-item::after,
    .ant-menu-vertical-left .ant-menu-item::after,
    .ant-menu-vertical-right .ant-menu-item::after,
    .ant-menu-inline .ant-menu-item::after {
        border-right: 0px;
    }
`;

export const FormWrapper = styled(Form)`
    margin: 50px;
    border: 1px solid gray;
    width: 30%;
`;

export const InputWrapper = styled(Input)`
    margin: 25px;
    border: 1px solid gray;
    width: 60%;
`;

export const InputLinkWrapper = styled(Input)`
    margin: 5px 25px 25px 25px;
    border: 1px solid gray;
    width: 80%;
`;

export const ButtonWrapper = styled(Button)`
    width: 20%;
    background: ${(props) => props.theme.color.green.default};
    border-color: ${(props) => props.theme.color.green.default};
    :hover {
        background: ${(props) => props.theme.color.green[400]};
        border-color: ${(props) => props.theme.color.green[400]};
    }
`;

export const StyledParaB = styled.p`
    color: ${(props) => props.theme.color.black};
    margin-left: 25px;
    font-weight: bold;
    font-size: 30px;
    padding-top: 20px;
    margin-bottom: 10px;
`;

export const StyledParaN = styled.p`
    margin-left: 25px;
    margin-bottom: 1px;
`;

export const StyledParaNB = styled.p`
    margin-left: 25px;
    margin-bottom: 1px;
    font-weight: bold;
`;
