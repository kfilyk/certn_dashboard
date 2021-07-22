import styled from 'styled-components';

export const PDFViewerWrapper = styled.div`
    height: 450px;
    .list-container:hover {
        background-color: ${(props) => props.theme.color.gray[50]};
        transition-duration: 0.5s;
    }

    .ant-form .ant-list {
        margin-top: 25px;
        height: 450px;
        overflow: auto;
        width: 100%;
    }

    .list-container {
        padding: 20px;
        position: relative;
        border-width: 0px;
        border-top: ${(props) => props.theme.color.gray[100]};
        border-top-width: 1px;
        border-style: solid;
    }

    .ant-list-item {
        display: inline-block;
        vertical-align: middle;
        padding: 0px;
        margin: 0px;
        width: 80%;
    }

    .ant-list-items {
        height: 450px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .scrollable-element {
        scrollbar-width: none;
    }

    .list-container .ant-checkbox-wrapper {
        display: inline-block;
        vertical-align: middle;
        margin: 0px;
        margin-right: 20px;
        height: 20px;
        font-size: 0px;
    }

    .list-container .ant-checkbox-wrapper hover {
        pointer-events: none;
    }
    /* when pdf doc is visible: position lower so it doesn't clip with top of window */
    .ant-modal {
        margin-top: 200px;
        margin-bottom: 200px;
    }
`;
