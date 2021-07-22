import { EditFilled } from '@ant-design/icons';
import { Input, Button, Modal } from 'antd';
import styled from 'styled-components';

//likely temporary styling
export const ActionListWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.color.gray[100]};
    width: 35%;
    max-width: 220px;
    margin-right: 25px;
    background-color: #fff;
    border-radius: 10px;

    .ant-menu {
        border-radius: 10px;
    }
    .ant-menu-item-selected,
    .ant-menu-submenu-selected,
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        color: ${(props) => props.theme.color.green[900]};
        background-color: ${(props) => props.theme.color.green[100]};
    }

    .ant-menu-item:hover,
    .ant-menu-submenu:hover {
        color: ${(props) => props.theme.color.green[600]};
    }

    .ant-menu-vertical .ant-menu-item::after,
    .ant-menu-vertical-left .ant-menu-item::after,
    .ant-menu-vertical-right .ant-menu-item::after,
    .ant-menu-inline .ant-menu-item::after {
        border-right: 0px;
    }
`;

export const ActionWrapper = styled.div`
    display: flex;
    flex-grow: 2;
    min-height: 640px;
`;

export const FormWrapper = styled.div`
    background-color: #fff;
    margin: 0px 25px 0px 25px;
    border: 1px solid ${(props) => props.theme.color.gray[100]};
    border-radius: 10px;
    width: 30%;
    flex-grow: 2;
`;

const { Search } = Input;

export const InputWrapperAT = styled(Search)`
    margin-right: 25px;
    width: 60%;
    flex-grow: 2;

    .ant-btn-primary {
        background: ${(props) => props.theme.color.gray[300]};
        border: 1px solid #d9d9d9;
        :hover {
            background-color: ${(props) => props.theme.color.gray[200]};
            border-color: ${(props) => props.theme.color.gray[200]};
        }
    }
`;

export const InputLinkWrapper = styled(Input)`
    width: 82.5%;
    align-items: right;
    flex-grow: 2;
`;

export const ButtonWrapper = styled(Button)`
    align-items: right;
    background: ${(props) => props.theme.color.green.default};
    border-color: ${(props) => props.theme.color.green.default};
    :hover {
        background: ${(props) => props.theme.color.green[400]};
        border-color: ${(props) => props.theme.color.green[400]};
    }
    :focus {
        background: ${(props) => props.theme.color.green.default};
        border-color: ${(props) => props.theme.color.green.default};
    }
`;

export const ModalWrapper = styled(Modal)`
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledParaB = styled.p`
    color: ${(props) => props.theme.color.black};
    margin-left: 25px;
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-size: ${(props) => props.theme.fontSize.xl3.size};
    padding-top: 20px;
    margin-bottom: 10px;
`;

export const StyledParaN = styled.p`
    margin: 0px 25px 1px 25px;
`;

export const StyledParaNB = styled.p`
    margin: 0px 25px 1px 25px;
    font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const ATErrorWrapper = styled.div`
    margin: 5px 25px 25px 25px;
`;

export const EEErrorWrapper = styled.div`
    margin: 0px 0px 8px 0px;
`;

export const InputButtonWrapper = styled.div`
    display: flex;
    justify-content: right;
    flex: 2;
    margin: 5px 25px 25px 25px;
    margin-left: 25px;
    margin-bottom: 5px;
    font-weight: ${(props) => props.theme.fontWeights.bold};
`;
