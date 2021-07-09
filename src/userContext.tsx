import React, { createContext, useContext, useState } from 'react';
import { UserData } from './interfaces';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';

type Props = {
    children: React.ReactNode;
};

type ContextProps = {
    token: string;
    user: Record<string, unknown>;
    expiry: string;
    setUserData: (userData: UserData) => void;
    userLogout: () => void;
};

const getToken = (): string => {
    const initialAuth = JSON.parse(localStorage.getItem('certn-auth') || '""');
    return initialAuth !== '' ? initialAuth.token : '';
};

const getExpiry = (): string => {
    const initialAuth = JSON.parse(localStorage.getItem('certn-auth') || '""');
    return initialAuth !== '' ? initialAuth.expiry : '';
};

const getUser = (): Record<string, unknown> => {
    const initialAuth = JSON.parse(localStorage.getItem('certn-auth') || '""');
    return initialAuth !== '' ? initialAuth.user : '';
};

const UserContext = createContext<ContextProps>({
    token: getToken(),
    user: getUser(),
    expiry: getExpiry(),
    setUserData: () => {
        // Set in provider
    },
    userLogout: () => {
        // Set in provider
    },
});

const UserProvider = ({ children }: Props): JSX.Element => {
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [expiry, setExpiry] = useState(getExpiry());
    const history = useHistory();

    const setUserData = (userData: UserData) => {
        setExpiry(userData.expiry);
        setUser(userData.user);
        setToken(userData.token);
        const auth = {
            token: userData.token,
            expiry: userData.expiry,
            user: userData.user,
        };
        localStorage.setItem('certn-auth', JSON.stringify(auth));
    };

    const userLogout = () => {
        localStorage.removeItem('certn-auth');
        setExpiry('');
        setUser({});
        setToken('');
        history.push('/login');
    };
    // during every page refresh, check if user logged in
    const session_expiry = setInterval(() => {
        const exp = getExpiry(); // get current expiry value
        if (exp !== '') {
            if (Date.parse(exp) < Date.now()) {
                userLogout();
                clearInterval(session_expiry);
                notification.error({
                    message: 'Session Timeout',
                    description: 'Please relogin in order to access Certn support.',
                });
            }
        } else {
            clearInterval(session_expiry);
        }
    }, 300000); // On successful user login, start a new expiryTimer. // checks every 5 minutes: 1000ms*60s*5m

    return (
        <UserContext.Provider value={{ token, user, expiry, setUserData, userLogout }}>{children}</UserContext.Provider>
    );
};

const WithUser = (): ContextProps => useContext(UserContext);

export { UserProvider, WithUser };
