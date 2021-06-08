/* eslint-disable no-console */
// Actual API fetch requests here
import { Base64 } from 'js-base64';
import { UserData } from '../../interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getToken = () => localStorage.getItem('certn-token');

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

export { userLogin };
