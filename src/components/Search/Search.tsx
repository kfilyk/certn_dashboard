import { UserProvider, WithUser } from '../../userContext';
import { certnTheme } from '../../Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { LogoutButton } from '../Login/LoginSC';

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
`;

const Search = (): JSX.Element => {
    const { token, userLogout } = WithUser();

    return (
        <ThemeProvider theme={certnTheme}>
            <UserProvider>
                <AppDiv>
                    {token ? (
                        <LogoutButton onClick={() => userLogout()}>Log Out</LogoutButton>
                    ) : (
                        <Redirect to="/login" />
                    )}
                    <div>
                        <p>Welcome to the Search Page!</p>
                    </div>
                </AppDiv>
            </UserProvider>
        </ThemeProvider>
    );
};

export default Search;
