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
import { useRef } from 'react';

// Styled Components

export const ApplicationPage = (): JSX.Element => {
    const [id, setId] = useState('');
    const [loadingApplication, setLoadingApplication] = useState(true);
    const [success, setSuccess] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [applicationPageData, setApplicationPageData] = useState<ApplicationPageData>(ApplicationPageDataDefault);
    const [tableInfo, setTableInfo] = useState<AdvApplicationInfo>(TableInfoDefault);
    const [criticalChecksInfo, setChecksInfo] = useState<CriticalChecksInfo>(ChecksInfoDefault);

    // Runs only on initial render, will get id from URL. Ticket 54: https://trello.com/c/rf1HCmik/54-54-display-api-data
    useEffect(() => {
        // Get the id from the URL, will be passed by the search page
        const urlParams = new URLSearchParams(window.location.search);
        const urlId = urlParams.get('id');
        if (urlId === '' || urlId === null) {
            notification.error({
                message: 'No ID Provided!',
                description:
                    'Application ID was not found. Please return to the search page and select an application.',
            });
            setLoadingApplication(false);
        } else {
            setId(urlId);
        }
    }, []);

    // Doesn't run on initial render
    // Triggered anytime id changes
    const isInitial = useRef(true);
    useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }
        const fetchApplication = async (): Promise<void> => {
            try {
                // Make api call
                // https://demo-api.certn.co/hr/v1/applications/<application_id>
                setLoadingApplication(true);
                const response = await fakeApi(id);
                setApplicationPageData(response);
                setTableInfo(response.application_info);
                setChecksInfo(response.critical_checks);
                setSuccess(true);
            } catch (e) {
                notification.error({
                    message: 'Lookup Failed!',
                    description: 'There was an issue fetching the details of the requested application.',
                });
            }
            setLoadingApplication(false);
        };
        fetchApplication();
    }, [id]);

    const checkFailure = () => {
        if (loadingApplication) {
            return '';
        } else if (id === '') {
            return <div>No ID</div>;
        } else {
            return <div>Failed Api call</div>;
        }
    };

    return (
        <Spin spinning={loadingApplication} tip="Loading Application...">
            {id === '' || !success ? (
                <div>{checkFailure()}</div>
            ) : (
                <>
                    <ApplicationInfo info={tableInfo} />
                    <CriticalChecks checks={criticalChecksInfo} />
                </>
            )}
        </Spin>
    );
};
