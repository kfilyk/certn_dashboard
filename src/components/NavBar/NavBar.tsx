import { WithUser } from '../../userContext';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Ant Design Imports
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Components
import logo from '../../logo.svg';

// Styled Components
import {
    NavBarWrapper,
    NavBarLink,
    NavBarFiller,
    ProfileButtonWrapper,
    EmailWrapper,
    NavBarLogout,
    NavBarLogoutWrapper,
    NavBarLogo,
} from './NavBarSC';

//Interfaces

const setEmail = (user: Record<string, unknown>) => (user ? (user.email as string) : '');

const NavBar = (): JSX.Element => {
    const { user, userLogout } = WithUser();
    const [email] = useState(setEmail(user));
    const history = useHistory();

    return (
        <NavBarWrapper id="navbar">
            <NavBarLogo src={logo} alt="logo" />
            <NavBarLink to="/search" activeClassName="selected" onClick={() => history.push('/search')}>
                Find Application
            </NavBarLink>
            <NavBarFiller />
            <NavBarLink to="/dashboard" activeClassName="selected" onClick={() => history.push('/dashboard')}>
                <ProfileButtonWrapper>
                    <Avatar icon={<UserOutlined />} />
                    <EmailWrapper>{email}</EmailWrapper>
                </ProfileButtonWrapper>
            </NavBarLink>
            <NavBarLogoutWrapper>
                <NavBarLogout onClick={() => userLogout()}>Log Out</NavBarLogout>
            </NavBarLogoutWrapper>
        </NavBarWrapper>
    );
};

export default NavBar;
