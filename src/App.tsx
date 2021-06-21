import Dashboard from './components/Dashboard/Dashboard';
import Search from './components/Search/Search';
import { ApplicationPage } from './components/ApplicationPage/ApplicationPage';
import Login from './components/Login/Login';
import { UserProvider, WithUser } from './userContext';
import { certnTheme } from './Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { notification } from 'antd';
import NavBar from './components/NavBar/NavBar';

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
            <ThemeProvider theme={certnTheme}>
                <UserProvider>
                    <AppDiv>
                        <RouteWrapper />
                    </AppDiv>
                </UserProvider>
            </ThemeProvider>
        </Router>
    );
}

const RouteWrapper = (): JSX.Element => {
    const validAuth = () => {
        const { token } = WithUser();
        return token !== '';
    };

    if (!validAuth()) {
        return <Login />;
    } else {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/dashboard" />
                    </Route>
                    <Route path="/login">
                        <Redirect to="/dashboard" />
                    </Route>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/search" component={Search} />
                    <Route path="/application" component={ApplicationPage} />
                </Switch>
            </div>
        );
    }
};
