import styled from 'styled-components';

export const Image = styled.img`
    height: 20vmin;
    pointer-events: none;
    margin: 200px 0 50px;
`;

export const HeadHomeButton = styled.a`
    font-weight: ${(props) => props.theme.fontWeights.semiBold};
    font-size: ${(props) => props.theme.fontSize.base.size};
    line-height: ${(props) => props.theme.fontSize.base.lineHeight};
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.white};
    background-color: ${(props) => props.theme.color.green.default};
    border: none;
    border-radius: 5px;
    padding: 10px 20px;

    :hover {
        color: ${(props) => props.theme.color.white};
        background-color: ${(props) => props.theme.color.green[400]};
        border: none;
    }
`;

export const NotFoundText = styled.h1`
    text-align: center;
    font-size: ${(props) => props.theme.fontSize.xl4.size};
    line-height: ${(props) => props.theme.fontSize.xl4.lineHeight};
    color: ${(props) => props.theme.color.black};
`;

export const NotFoundWrapper = styled.div`
    background-color: ${(props) => props.theme.color.green[50]};
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
