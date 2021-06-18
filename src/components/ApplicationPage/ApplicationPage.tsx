// Ant Design Imports

import { useEffect } from 'react';
import { useState } from 'react';
import { AdvApplicationInfo, ApplicationAPIResponse } from '../../interfaces';
import { ApplicationInfo } from './ApplicationInfo';

// Components

// Styled Components

// Interfaces
const TableInfoDefault: AdvApplicationInfo = {
    key: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    created: '',
    updated: '',
    status: '',
    orderedBy: '',
    team: '',
};

export const ApplicationPage = (): JSX.Element => {
    const [id, setId] = useState('');
    const [applicationInfo, setApplicationInfo] = useState({});
    const [tableInfo, setTableInfo] = useState<AdvApplicationInfo>(TableInfoDefault);

    useEffect(() => {
        setId('fakeId');
    }, []);

    useEffect(() => {
        const fetchApplication = async (): Promise<void> => {
            try {
                // Make api call
                // https://demo-api.certn.co/hr/v1/applications/<application_id>
                const response = fakeApi(id);
                setApplicationInfo(response);
                setTableInfo(buildTableInfo(response));
            } catch (e) {
                // Handle failed request
            }
        };
        fetchApplication();
    }, [id]);

    const buildTableInfo = (resp: ApplicationAPIResponse): AdvApplicationInfo => ({
        key: resp.id,
        email: resp.applicant.email,
        firstName: resp.applicant.first_name,
        lastName: resp.applicant.last_name,
        phone: resp.applicant.phone_number,
        created: resp.created,
        updated: resp.modified,
        status: resp.applicant.status,
        orderedBy: resp.owner.email, // Owner doesn't have friendly name, only email & id
        team: resp.team.name,
    });

    return (
        <div>
            <ApplicationInfo info={tableInfo} />
        </div>
    );
};

// Temp dummy data
// Ignore, will get deleted with ticket 54: https://trello.com/c/rf1HCmik/54-54-display-api-data
const fakeApi = (id: string) => mockApiResp;

const mockApiResp: ApplicationAPIResponse = {
    created: '2021-06-14T00:00:00Z',
    modified: '2021-06-14T00:00:00Z',
    id: '95fa72c2-a439-4088-9d99-8399fe6426b0',
    applicant: {
        id: 'd76f9db1-7043-417a-809c-0aa5626d7438',
        status: 'Pending',
        first_name: 'Doug',
        last_name: 'Judy',
        phone_number: '250-555-5555',
        email: 'test@certn.co',
    },
    owner: {
        id: '24e840ba-ad59-479c-b28e-425a12e1af57',
        email: 'kelvinfilyk@gmail.com',
        team: {
            id: 'a47ffdb9-c782-4eac-95d1-15f0831af757',
            name: 'UVIC',
        },
    },
    is_active: false,
    is_selected: false,
    listing: {
        name: '',
        is_active: false,
        url_code: '',
    },
    team_id: 'a47ffdb9-c782-4eac-95d1-15f0831af757',
    team: {
        id: 'a47ffdb9-c782-4eac-95d1-15f0831af757',
        name: 'UVIC',
        country: 'CA',
    },
};
