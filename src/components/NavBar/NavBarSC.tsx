import styled from 'styled-components';

import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

export const NavBarLogo = styled.img``;

export const NavBarWrapper = styled.div`
    width: 100%;
    min-height: 80px;
    background-color: ${(props) => props.theme.color.white};
    display: flex;
    padding-left: 5%;
    align-items: center;
`;

export const NavBarLink = styled(NavLink)`
    color: ${(props) => props.theme.color.gray[400]};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    cursor: pointer;
    letter-spacing: 0.75px;
    margin-left: 40px;

    &.selected {
        color: ${(props) => props.theme.color.green.default};
        :hover {
            color: ${(props) => props.theme.color.green.default};
        }
    }

    :hover {
        color: ${(props) => props.theme.color.green.default};
    }
`;

export const ProfileButtonWrapper = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    p {
        margin: 0;
    }
`;

export const EmailWrapper = styled.p`
    padding-left: 5px;
`;

export const NavBarLogout = styled(Button)`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.green.default};
    border: none;
    border-radius: 5px;

    :hover {
        color: ${(props) => props.theme.color.white};
        background-color: ${(props) => props.theme.color.green[400]};
        border: none;
    }
`;

export const NavBarLogoutWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 5% 0 40px;
`;

export const NavBarFiller = styled.div`
    flex-grow: 10;
    flex-shrink: 10;
`;
