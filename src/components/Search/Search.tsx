import { UserProvider } from '../../userContext';
import { certnTheme } from '../../Theme/certn-theme';
import styled, { ThemeProvider } from 'styled-components';

const AppDiv = styled.div`
    font-family: ${(props) => props.theme.fontFamily};
`;

const Search = (): JSX.Element => (
    <ThemeProvider theme={certnTheme}>
        <UserProvider>
            <AppDiv>
                <div>
                    <p>Welcome to the Search Page!</p>
                </div>
            </AppDiv>
        </UserProvider>
    </ThemeProvider>
);

export default Search;
