import { WithUser } from '../../userContext';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Ant Design Imports
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Components

// Styled Components
import {
    NavBarWrapper,
    NavBarLink,
    ProfileButtonWrapper,
    EmailWrapper,
    NavBarLogout,
    NavBarLogoutWrapper,
    FlexWrapper,
} from './NavBarSC';

//Interfaces

const NavBar = (): JSX.Element => {
    const { user, userLogout } = WithUser();
    const [email] = useState(user.email as string);
    const history = useHistory();

    return (
        <NavBarWrapper>
            <FlexWrapper>
                <NavBarLink to="/search" activeClassName="selected" onClick={() => history.push('/search')}>
                    Find Application
                </NavBarLink>
                <NavBarLink to="/application" activeClassName="selected" onClick={() => history.push('/application')}>
                    Application
                </NavBarLink>
            </FlexWrapper>
            <FlexWrapper>
                <NavBarLink to="/dashboard" activeClassName="selected" onClick={() => history.push('/dashboard')}>
                    <ProfileButtonWrapper>
                        <Avatar icon={<UserOutlined />} />
                        <EmailWrapper>{email}</EmailWrapper>
                    </ProfileButtonWrapper>
                </NavBarLink>
                <NavBarLogoutWrapper>
                    <NavBarLogout onClick={() => userLogout()}>Log Out</NavBarLogout>
                </NavBarLogoutWrapper>
            </FlexWrapper>
        </NavBarWrapper>
    );
};

export default NavBar;
