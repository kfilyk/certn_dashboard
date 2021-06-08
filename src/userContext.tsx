import React, { createContext, useContext, useState } from 'react';

interface UserData {
  expiry: string;
  token: string;
  user: Record<string, unknown>;
}

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

const UserContext = createContext<ContextProps>({
  token: '',
  user: {},
  expiry: '',
  setUserData: () => {
    // Set in provider
  },
  userLogout: () => {
    // Set in provider
  },
});

const UserProvider = ({ children }: Props): JSX.Element => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [expiry, setExpiry] = useState('');

  const setUserData = (userData: UserData) => {
    setExpiry(userData.expiry);
    setUser(userData.user);
    setToken(userData.token);
    localStorage.setItem('certn-token', userData.token);
  };

  const userLogout = () => {
    localStorage.removeItem('certn-token');
    setExpiry('');
    setUser('');
    setToken('');
  };

  return (
    <UserContext.Provider
      value={{ token, user, expiry, setUserData, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

const WithUser = (): ContextProps => useContext(UserContext);

export { UserProvider, WithUser };
