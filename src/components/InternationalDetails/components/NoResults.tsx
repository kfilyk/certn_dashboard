import React from 'react';
import styled from 'styled-components/macro';
import BeachLogo from 'images/Beach';

const Page = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
    margin-top: 200px;
`;

const BeachIcon = styled(BeachLogo)`
    width: 105px;
    height: 105px;
`;

const Title = styled.h2`
    margin: 26px 0 16px;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #575859;
`;

const Text = styled.div`
    font-size: 16px;
`;

const NoResults = () => {
    const title = "You're all caught up!";
    const text = "When a new order comes in, we'll show it here.";
    return (
        <Page>
            <BeachIcon />
            <Title>{title}</Title>
            <Text>{text}</Text>
        </Page>
    );
};

export default NoResults;
