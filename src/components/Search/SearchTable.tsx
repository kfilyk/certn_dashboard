// Ant Design Imports
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

// Styled Components

interface User {
    key: number;
    email: string;
    firstName: string;
    lastName: string;
    created: string;
    updated: string;
    status: boolean;
    orderedBy: string;
}

const columns: ColumnsType<User> = [
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
    },
    {
        title: 'Created',
        dataIndex: 'created',
    },
    {
        title: 'Updated',
        dataIndex: 'updated',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Ordered By',
        dataIndex: 'orderedBy',
    },
];

const today: string = new Date().toISOString().slice(0, 10);

const data: User[] = [];
for (let i = 0; i < 50; i = i + 1) {
    data.push({
        key: i,
        email: 'jack@jack.com',
        firstName: 'Jack' + i,
        lastName: 'Black',
        created: today,
        updated: today,
        status: true,
        orderedBy: 'Jim Joe',
    });
}

const SearchTable = (): JSX.Element => (
    <div style={{ width: '75%', margin: '12.5%' }}>
        <Table<User> columns={columns} dataSource={data} />
    </div>
);

export default SearchTable;
