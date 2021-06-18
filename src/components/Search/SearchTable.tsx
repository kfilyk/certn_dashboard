// Ant Design Imports
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { certnTheme } from '../../Theme/certn-theme';
import { useHistory } from 'react-router-dom';

// Styled Components
import styled from 'styled-components';

const Dot = styled.span`
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: block;
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

interface AdvApplicationInfo {
    key: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    created: string;
    updated: string;
    status: string;
    orderedBy: string;
    team: string;
}

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
            return <Dot style={{ backgroundColor: dot?.color, margin: 'auto' }} />;
        },
    },
    {
        title: 'Ordered By',
        dataIndex: 'orderedBy',
    },
    {
        key: 'team',
        title: 'Team',
        dataIndex: 'team',
    },
];

const today: string = new Date().toISOString().slice(0, 10);

const data: AdvApplicationInfo[] = [];
for (let i = 0; i < 100; i = i + 1) {
    let stat = '';
    let name = '';
    const ran: number = Math.floor(Math.random() * 3);
    switch (ran) {
        case 0:
            stat = 'Completed';
            name = 'Jack';
            break;
        case 1:
            stat = 'Pending';
            name = 'Joe';
            break;
        case 2:
            stat = 'Failed';
            name = 'Jim';
            break;
    }
    data.push({
        key: i,
        email: 'jack@jack.com',
        firstName: name + i,
        lastName: 'Black',
        phone: '123-456-7890',
        created: today,
        updated: today,
        status: stat,
        orderedBy: 'Jim Joe',
        team: 'Uvic',
    });
}

const SearchTable = (): JSX.Element => {
    //history for linking to application page with applicaiton ID
    const history = useHistory();

    return (
        <div style={{ width: '85%', margin: '7.5%' }}>
            <Table<AdvApplicationInfo>
                columns={columns}
                dataSource={data}
                onRow={(record) => ({
                    onClick: () => {
                        history.push(`/application?id=${record.key}`);
                    },
                })}
            />
        </div>
    );
};

export default SearchTable;
