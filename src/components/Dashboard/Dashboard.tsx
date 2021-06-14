import SoftCheck from '../SearchApp/Softcheck';
import CreditReport from '../SearchApp/Creditreport';
// Ant Design Imports
import { UserProvider, WithUser } from '../../userContext';
import { certnTheme } from '../../Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';

// Components

// Styled Components

// Interfaces

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
`;

const Dashboard = (): JSX.Element => (
    <ThemeProvider theme={certnTheme}>
        <UserProvider>
            <AppDiv>
                <SoftCheck />
                <CreditReport />
            </AppDiv>
        </UserProvider>
    </ThemeProvider>
);

export default Dashboard;
