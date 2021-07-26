/* eslint-disable no-console */
import { Menu } from 'antd';
import { ActionListWrapper, ActionWrapper } from './ApplicationActionsSC';
import { useState } from 'react';
// Ant Design Imports
import 'antd/dist/antd.css';
import { ActionTabs } from './ActionTabs';
import { getListOfPdfs } from '../../api/Certn-Api-Mock/index-mock';
// Interface Imports
import { ConsentDocument } from '../../interfaces';
import { AdvApplicationInfo, LinkInfo } from '../../interfaces';

// Interfaces
type LinkProps = {
    links: LinkInfo;
    data: AdvApplicationInfo;
    updateEmailMOCK(newEmail: string): string;
};

/**
 * This allows for the selection of one out of the three tabs that are present on the application page
 * The choice here defines the values assigned to variables in ActionTabs.tsx
 */
export const ApplicationActions = ({ links, data, updateEmailMOCK }: LinkProps): JSX.Element => {
    const [selectedAction, setSelectedAction] = useState<string>('onboarding');
    const [docs, setDocs] = useState<ConsentDocument[]>([]);
    const [loading, setLoading] = useState(true);

    const getDocs = async (): Promise<void> => {
        let apiResults: ConsentDocument[];
        try {
            apiResults = await getListOfPdfs();
        } catch (e) {
            apiResults = [];
        }
        setDocs(apiResults);
        setLoading(false);
    };

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
            <ActionTabs
                action={selectedAction}
                email={data.email}
                links={links}
                docs={docs}
                loading={loading}
                updateEmailMOCK={updateEmailMOCK}
            />
        </ActionWrapper>
    );
};
