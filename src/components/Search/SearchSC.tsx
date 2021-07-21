import styled from 'styled-components';
import { Input, Button, Form } from 'antd';

export const SearchPageWrapper = styled.div`
    background-color: ${(props) => props.theme.color.green[50]};
    padding: 50px;
    height: 100%;
    min-width: 800px;
    display: flex;
    flex-direction: column;
    flex-grow: 2;
`;
