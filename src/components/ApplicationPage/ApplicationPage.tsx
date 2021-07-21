/**
 * @file Main component for the application page (/application). This file is responsible for
 * fetching the required application information from the Certn API. The application information
 * is parsed and then distributed amongst it's children components.
 */

import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getApplicant } from '../../api/Certn-Api';

// Ant Design Imports
import { Spin, notification } from 'antd';

// Components
import { ApplicationInfo } from './ApplicationInfo';
import { CriticalChecks } from './CriticalChecks';
import { ApplicationActions } from './ApplicationActions';

// Interfaces & Defaults
import { ChecksInfoDefault, TableInfoDefault, LinkInfoDefault } from './ApplicationPageDefaults';
import { AdvApplicationInfo, CriticalChecksInfo, LinkInfo } from '../../interfaces';

// Styled Components
import {
    APErrorButton,
    APErrorWrapper,
    APMessageWrapper,
    APErrorContentWrapper,
    ApplicationPageWrapper,
    APSpinWrapper,
} from './ApplicationPageSC';

export const ApplicationPage = (): JSX.Element => {
    const [id, setId] = useState('');
    const [loadingApplication, setLoadingApplication] = useState(true);
    const [success, setSuccess] = useState(false);
    const [tableInfo, setTableInfo] = useState<AdvApplicationInfo>(TableInfoDefault);
    const [criticalChecksInfo, setChecksInfo] = useState<CriticalChecksInfo>(ChecksInfoDefault);
    const [linkInfo, setLinkInfo] = useState<LinkInfo>(LinkInfoDefault);

    const history = useHistory();

    /**
     * Runs only on the first render, pulling the application ID from the url
     */
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

    /**
     * Doesn't run on initial render and is subsequently run anytime that the state variable ID is updated.
     */
    const isInitial = useRef(true);
    useEffect(() => {
        if (isInitial.current) {
            isInitial.current = false;
            return;
        }
        const fetchApplication = async (): Promise<void> => {
            try {
                setLoadingApplication(true);
                const response = await getApplicant(id);
                setTableInfo(response.application_info);
                setChecksInfo(response.critical_checks);
                setLinkInfo(response.application_links);
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

    /**
     * Helper function that determines if there is a failure or if the page is loading
     * @returns reactNode
     */
    const checkFailure = () => {
        if (loadingApplication) {
            return '';
        } else {
            return (
                <APErrorWrapper>
                    <APErrorContentWrapper>
                        <APMessageWrapper>
                            {id === '' ? 'No ID Provided' : 'Error Fetching Application'}
                        </APMessageWrapper>
                        <APErrorButton onClick={() => history.push('/search')}>Return to Search</APErrorButton>
                    </APErrorContentWrapper>
                </APErrorWrapper>
            );
        }
    };

    return (
        <APSpinWrapper>
            <Spin spinning={loadingApplication} tip="Loading Application...">
                {id === '' || !success ? (
                    checkFailure()
                ) : (
                    <ApplicationPageWrapper>
                        <ApplicationInfo info={tableInfo} />
                        <div style={{ display: 'flex', padding: '50px 0px 0px 0px' }}>
                            <ApplicationActions data={tableInfo} links={linkInfo} />
                            <CriticalChecks checks={criticalChecksInfo} />
                        </div>
                    </ApplicationPageWrapper>
                )}
            </Spin>
        </APSpinWrapper>
    );
};
