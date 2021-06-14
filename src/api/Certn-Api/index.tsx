/* eslint-disable no-console */
// Actual API fetch requests here
import { Base64 } from 'js-base64';
import { UserData } from '../../interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getToken = () => {
    const authObj = JSON.parse(localStorage.getItem('certn-auth') || '""');
    return authObj === '' ? '' : authObj.token;
};

const userLogin = async (username: string, password: string): Promise<UserData> => {
    const response = await fetch(`https://demo-api.certn.co/api/v2/login/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: 'Basic ' + Base64.encode(username + ':' + password),
        },
    });
    if (!response.ok || !response) throw new Error(response.statusText);
    const responseData = response.json();
    return responseData;
};

const Softcheck = async (): Promise<void> => {
    console.log(getToken());
    const raw = JSON.stringify({
        request_softcheck: true,
        email: 'test@certn.co',
    });
    console.log('BODY: ');
    console.log(raw);
    try {
        // hr/v1: checks human resources;
        //`https://demo-api.certn.co/api/v2/applications/invite/` checks property management
        const response = await fetch(`https://demo-api.certn.co/hr/v1/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Token ' + getToken(),
            },
            body: raw,
        });

        const responseData = await response.json();
        console.log('data: ', responseData);
        console.log('Token: ', responseData.token);
        console.log('UserID: ', responseData.user.id);
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    } catch (err) {
        console.log('something went wrong');
    }
};

const Creditreport = async (): Promise<void> => {
    const raw = JSON.stringify({
        request_equifax: true,
        email: 'test@certn.co',
        information: {
            first_name: 'Andrew',
            last_name: 'McLeod',
            date_of_birth: '1970-06-28',
            addresses: [
                {
                    address: '4412 King Alfred Court',
                    city: 'Victoria',
                    province_state: 'BC',
                    country: 'CA',
                },
            ],
            sin_ssn: '123456789',
        },
    });
    console.log('BODY: ');
    console.log(raw);
    try {
        const response = await fetch(`https://demo-api.certn.co/hr/v1/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Token ' + getToken(),
            },
            body: raw,
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    } catch (err) {
        console.log('something went wrong');
    }
};

export { userLogin, Softcheck, Creditreport, getToken };
