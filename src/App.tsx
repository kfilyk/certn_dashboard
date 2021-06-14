import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { UserProvider, WithUser } from './userContext';
import { certnTheme } from './Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { notification } from 'antd';

notification.config({
    placement: 'topRight',
    duration: 3,
});

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
`;

export function App(): JSX.Element {
    const { token } = WithUser();
    //<h1>Token: {token}</h1>
    return (
        <Router>
            <ThemeProvider theme={certnTheme}>
                <UserProvider>
                    <Switch>
                        <AppDiv>
                            {token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
                            <Route path="/login" component={Login} />
                            <Route path="/dashboard" component={Dashboard} />
                        </AppDiv>
                    </Switch>
                </UserProvider>
            </ThemeProvider>
        </Router>
    );
}
//<Route exact path="/">
