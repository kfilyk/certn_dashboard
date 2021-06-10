import React from 'react';
import Login from './components/Login/Login';
import { UserProvider } from './userContext';
import { myTheme } from './Theme/my-theme';
import { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.css';
// Browser routing typically happens in this file.

import { notification } from 'antd';

notification.config({
    placement: 'topRight',
    duration: 3,
});

export function App(): JSX.Element {
    return (
        <ThemeProvider theme={myTheme}>
            <UserProvider>
                <div>
                    <Login />
                </div>
            </UserProvider>
        </ThemeProvider>
    );
}
