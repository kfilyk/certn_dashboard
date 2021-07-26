import styled from 'styled-components';

export const PDFViewerWrapper = styled.div`
    .ant-list-item:hover {
        background-color: ${(props) => props.theme.color.gray[50]};
        transition-duration: 0.5s;
    }

    .ant-form .ant-list {
        margin-top: 25px;
        height: 450px;
        overflow: auto;
        width: 100%;
    }

    .ant-list-items {
        height: 450px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .ant-list-item {
        border-width: 0px;
        border-top: ${(props) => props.theme.color.gray[100]};
        border-top-width: 1px;
        border-style: solid;
        width: 100%;
        padding: 20px;
        border-bottom-width: 0px;
    }

    .scrollable-element {
        scrollbar-width: none;
    }

    .ant-checkbox-wrapper {
        .ant-checkbox-input:focus + .ant-checkbox-inner,
        .ant-checkbox-input:hover + .ant-checkbox-inner,
        .ant-checkbox-inner:hover,
        .ant-checkbox-wrapper:hover,
        .ant-checkbox-inner:focus {
            border-color: ${(props) => props.theme.color.green[400]} !important;
        }
        .ant-checkbox-checked .ant-checkbox-inner {
            background-color: ${(props) => props.theme.color.green[400]};
            border-color: ${(props) => props.theme.color.green[400]} !important;
        }
    }

    .ant-list-item .ant-checkbox-wrapper {
        float: left;
        vertical-align: middle;
        margin-right: 20px;
    }

    .ant-list-item .ant-checkbox-wrapper hover {
        pointer-events: none;
    }

    .ant-list-item .ant-list-item-meta-title {
        vertical-align: middle;
        float: left;
        white-space: nowrap;
    }

    .ant-list-item .ant-btn {
        vertical-align: middle;
        float: right;
    }
`;
