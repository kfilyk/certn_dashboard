import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Table } from 'antd';
import { useHistory } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 100%;
    height: 100%;
    .ant-table-body {
        overflow-x: auto !important;
        border-radius: 4px;
        background: white;
    }
    tr.ant-table-row > td {
        border: 0 none !important;
        padding: 10px 20px;
    }
    tr.ant-table-row:hover > td {
        background-color: rgba(0, 0, 0, 0.04) !important;
        cursor: pointer;
    }
`;

const ResultsTable = ({ tableData, isLoading }) => {
    const history = useHistory();
    const columns = [
        {
            title: 'Applicant Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Applicant Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Country',
            dataIndex: 'countryName',
            sorter: true,
        },
        {
            title: '',
            dataIndex: 'status',
            sorter: false,
        },
    ];

    const paginationConfig = {
        showSizeChanger: true,
        pageSizeOptions: [25, 50, 100],
        defaultCurrent: 1,
        defaultPageSize: 25,
    };

    const onRow = ({ id }) => ({
        onClick: () => history.push(`/international/${id}`),
    });

    return (
        <StyledTable
            columns={columns}
            dataSource={tableData}
            rowKey="id"
            bordered={false}
            loading={!!isLoading}
            onRow={onRow}
            pagination={paginationConfig}
        />
    );
};

ResultsTable.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object),
    isLoading: PropTypes.bool,
};

ResultsTable.defaultProps = {
    tableData: [],
    isLoading: false,
};

export default ResultsTable;
