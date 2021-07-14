// Ant Design Imports
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { certnTheme } from '../../Theme/certn-theme';
import { useHistory } from 'react-router-dom';
import { AdvApplicationInfo } from '../../interfaces';
import { Spin } from 'antd';
import './SearchTable.css';

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
        status: 'COMPLETE',
        color: certnTheme.color.green.default,
    },
    {
        status: 'SENT',
        color: certnTheme.color.yellow.default,
    },
    {
        //Need to ask about this one, not too sure about it ("FAIL" might be wrong)
        status: 'FAIL',
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

interface SearchTableProps {
    loading: {
        search: boolean;
    };
    results: AdvApplicationInfo[] | undefined;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    onSubmitPageChangeNext: () => Promise<void>;
    onSubmitPageChangeBack: () => Promise<void>;
}

const SearchTable: React.FC<SearchTableProps> = (props) => {
    //history for linking to application page with applicaiton ID
    const history = useHistory();

    const data: AdvApplicationInfo[] | undefined = props.results;

    return (
        <div style={{ width: '85%', margin: '5%' }}>
            <Spin spinning={props.loading.search}>
                <Table<AdvApplicationInfo>
                    rowClassName="pointer"
                    columns={columns}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => {
                            history.push(`/application?id=${record.key}`);
                        },
                    })}
                />
            </Spin>
            {props.results && props.page > 1 && <button onClick={props.onSubmitPageChangeBack}>Previous Page</button>}
            {props.results && <button onClick={props.onSubmitPageChangeNext}>Next Page</button>}
        </div>
    );
};

export default SearchTable;
