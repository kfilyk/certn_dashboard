/* eslint-disable no-console */
// Actual API fetch requests here
import { Base64 } from 'js-base64';
import { UserData } from '../../interfaces';

const setCookie = async (cname: string, cvalue: string, expiry: number): Promise<void> => {
    const d = new Date();
    if (expiry == undefined) {
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    }
    d.setTime(d.getTime() + expiry * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    console.log('Set Cookie: ' + cname + '=' + cvalue, expires);

    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

const getCookie = (cname: string): string => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return ''; //Not sure what to return here
};

const newSession = (): void => {
    //If user was already log in (ie. flag login_status = true), then log in again
};

const checkSession = (): void => {
    if (getCookie('session') == '') {
        newSession();
    }
    console.log('Current Session' + getCookie('session'));
};
