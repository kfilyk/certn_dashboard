import SoftCheck from '../SearchApp/Softcheck';
import CreditReport from '../SearchApp/Creditreport';
// Ant Design Imports
import { UserProvider, WithUser } from '../../userContext';
import { certnTheme } from '../../Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import { LogoutButton } from '../Login/LoginSC';
import { Redirect } from 'react-router-dom';

// Components

// Styled Components

// Interfaces

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
`;

const Dashboard = (): JSX.Element => {
    const { token, userLogout } = WithUser();

    return (
        <ThemeProvider theme={certnTheme}>
            <UserProvider>
                <AppDiv>
                    {token ? (
                        <LogoutButton onClick={() => userLogout()}>Log out</LogoutButton>
                    ) : (
                        <Redirect to="/login" />
                    )}
                    <SoftCheck />
                    <CreditReport />
                </AppDiv>
            </UserProvider>
        </ThemeProvider>
    );
};

export default Dashboard;
