import { Menu } from 'antd';
import { ActionListWrapper } from './ApplicationActionsSC';
import { useState } from 'react';
// Ant Design Imports
import 'antd/dist/antd.css';
import { ActionTabs } from './ActionTabs';

export const ApplicationActions = (): JSX.Element => {
    const [selectedAction, setSelectedAction] = useState<string>('onboarding');

    //currently shows dummy text corresponding to each of the 3 pages based on the selected action
    //Each should be replaced with their relevant page when complete.
    return (
        <div>
            <ActionListWrapper>
                <Menu onClick={(e) => setSelectedAction(e.key)} defaultSelectedKeys={['onboarding']} mode="inline">
                    <Menu.ItemGroup key="header" title="Application Actions">
                        <Menu.Item key="onboarding">Send Onboarding Link</Menu.Item>
                        <Menu.Item key="report">Send Report Link</Menu.Item>
                        <Menu.Item key="documents">Send Consent Documents</Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </ActionListWrapper>
            <ActionTabs action={selectedAction} email="jane.cooper@certn.co" />
        </div>
    );
};
