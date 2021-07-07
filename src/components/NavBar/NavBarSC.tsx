import styled from 'styled-components';

import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

export const NavBarWrapper = styled.div`
    width: 100%;
    height: 80px;
    background-color: ${(props) => props.theme.color.white};
    display: flex;
    padding-left: 5%;
    justify-content: space-between;
    text-align: center;
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
    padding: 0 20px 0 0;
    // text-align: center;
    letter-spacing: 0.75px;

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
    margin: 0 40px 0 20px;
`;

export const FlexWrapper = styled.div`
    display: flex;
`;
