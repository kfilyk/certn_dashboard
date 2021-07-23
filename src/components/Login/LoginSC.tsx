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
    background-color: ${(props) => props.theme.color.green[50]};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSize.xl.size};
    line-height: ${(props) => props.theme.fontSize.xl.lineHeight};
    color: ${(props) => props.theme.color.white};
    .ant-input-affix-wrapper:focus,
    .ant-input-affix-wrapper-focused,
    .ant-input-affix-wrapper:hover {
        border-color: ${(props) => props.theme.color.green[400]} !important;
        box-shadow: 0 0 0 2px rgb(47 185 154 / 20%);
    }
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
    font-size: ${(props) => props.theme.fontSize.base.size};
    line-height: ${(props) => props.theme.fontSize.base.lineHeight};
    color: ${(props) => props.theme.color.black};
    :hover {
        color: ${(props) => props.theme.color.gray.default};
    }
`;
