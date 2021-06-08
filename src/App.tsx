import React from 'react';
import Login from './components/Login/Login';
import { UserProvider } from './userContext';

import 'antd/dist/antd.css';
import './App.css';
// Browser routing typically happens in this file.

import { notification } from 'antd';

notification.config({
  placement: 'topRight',
  duration: 3,
});

export function App(): JSX.Element {
  return (
    <UserProvider>
      <div className='App'>
        <Login />
      </div>
    </UserProvider>
  );
}
