import styled from 'styled-components';
import { Button } from 'antd';

export const LogoutButton = styled(Button)`
    color: ${(props) => props.theme.color.green[400]};
    position: absolute;
    top: 10px;
    right: 10px;
`;

export const StyledPara = styled.p`
    color: ${(props) => props.theme.color.green[400]};
`;

export const Image = styled.img`
    height: 15vmin;
    pointer-events: none;
`;

export const LoginDiv = styled.div`
    background-color: #e4fbf5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(3px + 2vmin);
    color: white;
`;

export const LoginButton = styled(Button)`
    width: 100%;
    background: ${(props) => props.theme.color.green.default};
    border-color: ${(props) => props.theme.color.green.default};
    :hover {
        background: ${(props) => props.theme.color.green[400]};
        border-color: ${(props) => props.theme.color.green[400]};
    }
`;

export const FormWrapper = styled.div`
    text-align: center;
`;

export const StyledLink = styled.a`
    color: ${(props) => props.theme.color.green.default};
`;
