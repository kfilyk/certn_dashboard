/* eslint-disable no-console */
// Ant Design Imports

import { useEffect, useState } from 'react';
import { Spin, notification } from 'antd';

// Components
import { ApplicationInfo } from './ApplicationInfo';
import { CriticalChecks } from './CriticalChecks';

// Interfaces
import { ChecksInfoDefault, TableInfoDefault, ApplicationPageDataDefault } from './ApplicationPageDefaults';
import { AdvApplicationInfo, ApplicationPageData, CriticalChecksInfo } from '../../interfaces';

// Temp
import { fakeApi } from './ApiMock';

// Styled Components

export const ApplicationPage = (): JSX.Element => {
    const [id, setId] = useState('');
    const [loadingApplication, setLoadingApplication] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [applicationPageData, setApplicationPageData] = useState<ApplicationPageData>(ApplicationPageDataDefault);
    const [tableInfo, setTableInfo] = useState<AdvApplicationInfo>(TableInfoDefault);
    const [criticalChecksInfo, setChecksInfo] = useState<CriticalChecksInfo>(ChecksInfoDefault);

    // Runs only on initial render, will get id from URL. Ticket 54: https://trello.com/c/rf1HCmik/54-54-display-api-data
    useEffect(() => {
        // Get the id from the URL, will be passed by the search page
        setId('fakeId');
    }, []);

    // Runs when the id changes, will make an api call. Currently mock data. Ticket 54: https://trello.com/c/rf1HCmik/54-54-display-api-data
    useEffect(() => {
        const fetchApplication = async (): Promise<void> => {
            try {
                // Make api call
                // https://demo-api.certn.co/hr/v1/applications/<application_id>
                setLoadingApplication(true);
                console.log('id' + id);
                const response = await fakeApi(id);
                console.log(response);
                setApplicationPageData(response);
                setTableInfo(response.application_info);
                setChecksInfo(response.critical_checks);
                setLoadingApplication(false);
            } catch (e) {
                console.log(e);
                setLoadingApplication(false);
                notification.error({
                    message: 'Lookup Failed!',
                    description: 'There was an issue fetching the datails of the requested application',
                });
            }
        };
        fetchApplication();
    }, [id]);

    return (
        <Spin spinning={loadingApplication} tip="Loading Application">
            <ApplicationInfo info={tableInfo} />
            <CriticalChecks checks={criticalChecksInfo} />
        </Spin>
    );
};
