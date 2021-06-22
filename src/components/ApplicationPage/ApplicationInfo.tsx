import { useEffect, useState } from 'react';
import { AdvApplicationInfo } from '../../interfaces';
import { TableInfoDefault } from './ApplicationPageDefaults';

// Ant Design Imports
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { certnTheme } from '../../Theme/certn-theme';

// Styled Components
import styled from 'styled-components';
import { Dot } from './ApplicationPageSC';

// Temp until all components for application page are completed
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
    const [tableInfo, setTableInfo] = useState<AdvApplicationInfo>(TableInfoDefault);

    useEffect(() => {
        const formattedInfo = { ...info };
        formattedInfo.created = checkDate(formattedInfo.created);
        formattedInfo.updated = checkDate(formattedInfo.updated);
        setTableInfo(formattedInfo);
    }, [info]);

    const checkDate = (date: string): string => {
        const d = new Date(date);
        if (Object.prototype.toString.call(d) === '[object Date]') {
            if (isNaN(d.getTime())) {
                return 'N/A';
            } else {
                return d.toDateString();
            }
        }
        return 'N/A';
    };

    return (
        <TableWrapper>
            <Table<AdvApplicationInfo> size={'middle'} pagination={false} columns={columns} dataSource={[tableInfo]} />
        </TableWrapper>
    );
};
