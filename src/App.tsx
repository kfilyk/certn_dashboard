import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

import { UserProvider } from './userContext';
import { certnTheme } from './Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
// Browser routing typically happens in this file.

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
        <Router>
            <Switch>
                <ThemeProvider theme={certnTheme}>
                    <UserProvider>
                        <AppDiv>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/dashboard" component={Dashboard} />
                        </AppDiv>
                    </UserProvider>
                </ThemeProvider>
            </Switch>
        </Router>
    );
}
