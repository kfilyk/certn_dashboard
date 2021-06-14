import React, { useEffect } from 'react';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { UserProvider, WithUser } from './userContext';
import { certnTheme } from './Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { notification } from 'antd';

notification.config({
    placement: 'topRight',
    duration: 3,
});

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
`;

export function App(): JSX.Element {
    //const [token, setToken] = useState(0);

    //const { token } = WithUser();
    const token = '55';

    useEffect(() => {
        // Update the document title using the browser API
        //token = { WithUser() };
    });

    return (
        <Router>
            <Switch>
                <ThemeProvider theme={certnTheme}>
                    <UserProvider>
                        <AppDiv>
                            <h1>Token: {token}</h1>
                            {token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
                            <Route path="/login" component={Login} />
                            <Route path="/dashboard" component={Dashboard} />
                        </AppDiv>
                    </UserProvider>
                </ThemeProvider>
            </Switch>
        </Router>
    );
}
//<Route exact path="/">
