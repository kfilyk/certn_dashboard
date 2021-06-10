import React from 'react';
import Login from './components/Login/Login';
import { UserProvider } from './userContext';
import { certnTheme } from './Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';

import 'antd/dist/antd.css';
// Browser routing typically happens in this file.

import { notification } from 'antd';

notification.config({
    placement: 'topRight',
    duration: 3,
});

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
`;

export function App(): JSX.Element {
    return (
        <ThemeProvider theme={certnTheme}>
            <UserProvider>
                <AppDiv>
                    <Login />
                </AppDiv>
            </UserProvider>
        </ThemeProvider>
    );
}
