import styled from 'styled-components';

import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

export const NavBarLogo = styled.img`
    height: 34px;
`;

export const NavBarWrapper = styled.div`
    width: 100%;
    min-height: 80px;
    background-color: ${(props) => props.theme.color.white};
    display: flex;
    align-items: center;
    padding: 0 2%;

    @media ${(props) => props.theme.device.desktopLarge} {
        padding: 0 5%;
    }
`;

export const NavBarLink = styled(NavLink)`
    color: ${(props) => props.theme.color.gray[400]};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    font-size: ${(props) => props.theme.fontSize.sm.size};
    line-height: ${(props) => props.theme.fontSize.sm.lineHeight};
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
    color: ${(props) => props.theme.color.gray[400]};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    font-size: ${(props) => props.theme.fontSize.sm.size};
    line-height: ${(props) => props.theme.fontSize.sm.lineHeight};
    letter-spacing: 0.75px;
    cursor: default;
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
    height: 34px;
    width: 104px;
    color: ${(props) => props.theme.color.gray[700]};
    background-color: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.gray[300]};
    border-radius: 6px;
    font-size: ${(props) => props.theme.fontSize.sm.size};
    line-height: ${(props) => props.theme.fontSize.sm.lineHeight};
    font-weight: ${(props) => props.theme.fontWeights.semiBold};

    span {
        margin: auto;
    }

    :hover {
        color: ${(props) => props.theme.color.gray[700]};
        background-color: ${(props) => props.theme.color.gray[50]};
        border-color: ${(props) => props.theme.color.gray[300]};
    }
`;

export const NavBarLogoutWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
`;

export const NavBarFiller = styled.div`
    flex-grow: 10;
    flex-shrink: 10;
`;
