/* eslint-disable no-console */
import { Menu } from 'antd';
import { ActionListWrapper, ActionWrapper } from './ApplicationActionsSC';
import { useState } from 'react';
// Ant Design Imports
import 'antd/dist/antd.css';
import { ActionTabs } from './ActionTabs';
import { getListOfPdfsMOCK } from '../../api/Certn-Api';
import { Document } from '../../interfaces';

interface Loading {
    search: boolean;
}

export const ApplicationActions = (): JSX.Element => {
    const [selectedAction, setSelectedAction] = useState<string>('onboarding');
    const [docs, setDocs] = useState<Document[]>();
    const [loading, setLoading] = useState<Loading>({ search: false });

    const getDocs = async (): Promise<void> => {
        setLoading({ search: true });
        const apiResults = await getListOfPdfsMOCK();
        setLoading({ search: false });
        setDocs(apiResults);
    };

    //currently shows dummy text corresponding to each of the 3 pages based on the selected action
    //Each should be replaced with their relevant page when complete.
    return (
        <ActionWrapper>
            <ActionListWrapper>
                <Menu onClick={(e) => setSelectedAction(e.key)} defaultSelectedKeys={['onboarding']} mode="inline">
                    <Menu.ItemGroup key="header" title="Application Actions">
                        <Menu.Item key="onboarding">Send Onboarding Link</Menu.Item>
                        <Menu.Item key="report">Send Report Link</Menu.Item>
                        <Menu.Item key="documents" onClick={getDocs}>
                            Send Consent Documents
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
            </ActionListWrapper>
            <ActionTabs action={selectedAction} email="jane.cooper@certn.co" docs={docs} loading={loading} />
        </ActionWrapper>
    );
};
