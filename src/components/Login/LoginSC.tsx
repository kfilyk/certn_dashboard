import styled from 'styled-components';
import { Button } from 'antd';

export const StyledPara = styled.p`
    color: ${(props) => props.theme.color.green[400]};
`;

export const Image = styled.img`
    height: 15vmin;
    margin: 20px 0;
    pointer-events: none;
`;

export const LoginDiv = styled.div`
    background-color: #e4fbf5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSize.xl.size};
    line-height: ${(props) => props.theme.fontSize.xl.lineHeight};
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
    font-size: ${(props) => props.theme.fontSize.base.size};
    line-height: ${(props) => props.theme.fontSize.base.lineHeight};
`;
