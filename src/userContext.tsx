/* eslint-disable no-console */
import React, { createContext, useContext, useState } from 'react';
import { UserData } from './interfaces';
import { useHistory } from 'react-router-dom';

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

const UserContext = createContext<ContextProps>({
    token: getToken(),
    user: {},
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
    const [user, setUser] = useState({});
    const [expiry, setExpiry] = useState(getExpiry());
    const history = useHistory();

    const setUserData = (userData: UserData) => {
        setExpiry(userData.expiry);
        setUser(userData.user);
        setToken(userData.token);
        const auth = {
            token: userData.token,
            expiry: userData.expiry,
        };
        localStorage.setItem('certn-auth', JSON.stringify(auth));
    };

    const userLogout = () => {
        localStorage.removeItem('certn-auth');
        setExpiry('');
        setUser('');
        setToken('');
        history.push('/login');
    };

    return (
        <UserContext.Provider value={{ token, user, expiry, setUserData, userLogout }}>{children}</UserContext.Provider>
    );
};

const WithUser = (): ContextProps => useContext(UserContext);

export { UserProvider, WithUser };