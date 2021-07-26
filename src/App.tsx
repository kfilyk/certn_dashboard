import Search from './components/Search/Search';
import { ApplicationPage } from './components/ApplicationPage/ApplicationPage';
import Login from './components/Login/Login';
import { UserProvider, WithUser } from './userContext';
import { certnTheme } from './Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { notification, message } from 'antd';
import NavBar from './components/NavBar/NavBar';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

notification.config({
    placement: 'topRight',
    duration: 3,
});

message.config({
    maxCount: 1,
    duration: 3,
});

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PageWrapper = styled.div`
    background-color: ${(props) => props.theme.color.green[50]};
    padding: 0 2%;
    flex-grow: 1;
    overflow: scroll;
    overflow-x: scroll;

    @media ${(props) => props.theme.device.desktopLarge} {
        padding: 0 5%;
    }
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
            <>
                <NavBar />
                <PageWrapper>
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/search" />
                        </Route>
                        <Route path="/login">
                            <Redirect to="/search" />
                        </Route>
                        <Route path="/search" component={Search} />
                        <Route path="/application" component={ApplicationPage} />
                        <Route path="/oops" component={NotFoundPage} />
                        <Route>
                            <Redirect to="/oops" />
                        </Route>
                    </Switch>
                </PageWrapper>
            </>
        );
    }
};
