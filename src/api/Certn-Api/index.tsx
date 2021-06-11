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

const Softcheck = async (token: string): Promise<void> => {
    console.log('TOKEN: ', token);
    const raw = JSON.stringify({
        request_softcheck: true,
        email: 'test@certn.co',
        /*
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
        */
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
                Authorization: token,
                //"Authorization":'Token 7a5c7eaef00fdbbc68fcc5a6560293c148d1808a7e6477bf700e8b9fdc8f9745'
                //"Authorization": 'Bearer '+token //'Bearer 47914591cbc760b9897070f8221af66176296352' //'Basic ' + Base64.encode(username + ":" + password)  //
            },
            body: raw,
            //redirect:'follow'
        });

        const responseData = await response.json();
        console.log('data: ', responseData);
        console.log('Token: ', responseData.token);
        console.log('UserID: ', responseData.user.id);
        if (!response.ok) {
            //console.log(responseData.message);
            throw new Error(responseData.message);
        }
        // auth.login(responseData.user.id, responseData.token);
        // history.push("/");
    } catch (err) {
        console.log('something went wrong');
        // setShowError({
        //     show: true,
        //     message: err.message
        // })
    }
};

const Creditreport = async (token: string): Promise<void> => {
    //console.log('TOKEN: ', token);
    const raw = JSON.stringify({
        request_equifax: true,
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
        const response = await fetch(`https://demo-api.certn.co/api/v2/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: token,
                //"Authorization":'Token 7a5c7eaef00fdbbc68fcc5a6560293c148d1808a7e6477bf700e8b9fdc8f9745'
                //"Authorization": 'Bearer '+token //'Bearer 47914591cbc760b9897070f8221af66176296352' //'Basic ' + Base64.encode(username + ":" + password)  //
            },
            body: raw,
            //redirect:'follow'
        });

        const responseData = await response.json();
        console.log('data: ', responseData);
        //console.log("Token: ", responseData.token)
        //console.log("UserID: ", responseData.user.id)
        if (!response.ok) {
            console.log(responseData.message);
            throw new Error(responseData.message);
        }
        // auth.login(responseData.user.id, responseData.token);
        // history.push("/");
    } catch (err) {
        console.log('something went wrong');
        // setShowError({
        //     show: true,
        //     message: err.message
        // })
    }
};

export { userLogin, Softcheck, Creditreport };
