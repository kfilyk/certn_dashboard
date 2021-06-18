/* eslint-disable no-console */
// Ant Design Imports

import 'antd/dist/antd.css';
import { Table } from 'antd';
import { AdvApplicationInfo } from '../../interfaces';
import { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import { certnTheme } from '../../Theme/certn-theme';

// Components

// Styled Components
const Dot = styled.span`
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: block;
`;

const TableWrapper = styled.div`
    margin: 50px;
    border: 1px solid gray;
`;

const dotColor = [
    {
        status: 'Completed',
        color: certnTheme.color.green.default,
    },
    {
        status: 'Pending',
        color: certnTheme.color.yellow.default,
    },
    {
        status: 'Failed',
        color: certnTheme.color.red.default,
    },
];

const columns: ColumnsType<AdvApplicationInfo> = [
    {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
    },
    {
        key: 'firstName',
        title: 'First Name',
        dataIndex: 'firstName',
    },
    {
        key: 'lastName',
        title: 'Last Name',
        dataIndex: 'lastName',
    },
    {
        key: 'phone',
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        key: 'created',
        title: 'Created',
        dataIndex: 'created',
    },
    {
        key: 'updated',
        title: 'Updated',
        dataIndex: 'updated',
    },
    {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        render: (status) => {
            const dot = dotColor.find((elem) => elem.status === status);
            return <Dot style={{ backgroundColor: dot?.color }} />;
        },
    },
    {
        key: 'orderedBy',
        title: 'Ordered By',
        dataIndex: 'orderedBy',
    },
    {
        key: 'team',
        title: 'Team',
        dataIndex: 'team',
    },
];

// Interfaces
type InfoProps = {
    info: AdvApplicationInfo;
};

export const ApplicationInfo = ({ info }: InfoProps): JSX.Element => {
    console.log(info);
    return (
        <TableWrapper>
            <Table<AdvApplicationInfo> pagination={false} columns={columns} dataSource={[info]} />
        </TableWrapper>
    );
};
