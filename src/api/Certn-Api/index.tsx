/* eslint-disable no-console */
// Actual API fetch requests here
import { Base64 } from 'js-base64';
import { UserData } from '../../interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getToken = (): string => {
    const authObj = JSON.parse(localStorage.getItem('certn-auth') || '""'); // instead of localstorage, use cookies: session storage eliminates local storage when browser closes
    console.log('Token', authObj.token);
    return authObj === '' ? '' : 'Token ' + authObj.token;
    // # check if object instead of empty string // this keeps breaking because localstorage not updating token to token of current session. Use cookies with timer - creates a token and stays signed in for a duration.
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
    const raw = JSON.stringify({
        request_softcheck: true,
        email: 'test@certn.co',
    });
    try {
        // hr/v1: checks human resources;
        //`https://demo-api.certn.co/api/v2/applications/invite/` checks property management
        const response = await fetch(`https://demo-api.certn.co/hr/v1/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: getToken(),
            },
            body: raw,
        });
        const responseData = await response.json();
        console.log('data: ', responseData);
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    } catch (err) {
        console.log('something went wrong: ' + err);
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
    try {
        const response = await fetch(`https://demo-api.certn.co/hr/v1/applications/invite/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: getToken(),
            },
            body: raw,
        });

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
    } catch (err) {
        console.log('something went wrong: ' + err);
    }
};

const Activeapplicants = async (): Promise<void> => {
    try {
        const response = await fetch(
            `https://demo-api.certn.co/hr/v1/applicants/?adjudication_status!=ARCHIVED&ordering=created`,
            //`https://demo-api.certn.co/hr/v1/applicants/?adjudication_status!=ARCHIVED&ordering=-created&search=phone@test.com`,
            //`https://demo-api.certn.co/hr/v1/applicants/?adjudication_status!=ARCHIVED&ordering=created&search=benjamin%20gambling`,
            //`https://demo-api.certn.co/hr/v1/applicants/?adjudication_status!=ARCHIVED&report_status=COMPLETE`,
            //`https://demo-api.certn.co/hr/v1/applicants/?adjudication_status!=ARCHIVED&ordering=information__first_name&report_status=COMPLETE`,
            //"^applicant_account__email", "^information__first_name","^information__last_name","^application__owner__email","^application__team__name",
            //`https://demo-api.certn.co/hr/v1/applicants/?adjudication_status!=ARCHIVED&request_softcheck=True&under_review_us=True`,

            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: getToken(), //  'Token xyz...' // Basic a2VsdmluZmlseWtAZ21haWwuY29tOlNlbmc0OTkhISE', //', //'Bearer 47914591cbc760b9897070f8221af66176296352'
                },
            }
        );

        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        console.log(responseData);
    } catch (err) {
        console.log('something went wrong: ' + err);
    }
};

export { userLogin, Softcheck, Creditreport, getToken, Activeapplicants };
