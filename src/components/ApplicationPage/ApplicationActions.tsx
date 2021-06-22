/* eslint-disable no-console */
import { Menu } from 'antd';
import { useState } from 'react';
// Ant Design Imports
import 'antd/dist/antd.css';
import styled from 'styled-components';

//likely temporary styling
const ActionListWrapper = styled.div`
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

export const ApplicationActions = (): JSX.Element => {
    const [selectedAction, setSelectedAction] = useState('1');

    //currently shows dummy text corresponding to each of the 3 pages based on the selected action
    //Each should be replaced with their relevant page when complete.
    return (
        <div>
            <ActionListWrapper>
                <Menu onClick={(e) => setSelectedAction(e.key)} defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">Send Onboarding Link</Menu.Item>
                    <Menu.Item key="2">Send Report Link</Menu.Item>
                    <Menu.Item key="3">Send Consent Documents</Menu.Item>
                </Menu>
            </ActionListWrapper>
            {selectedAction == '1' && <h1> Send Onboarding Link Page</h1>}
            {selectedAction == '2' && <h1> Send Report Link Page</h1>}
            {selectedAction == '3' && <h1> Send Consent Documents Page</h1>}
        </div>
    );
};
