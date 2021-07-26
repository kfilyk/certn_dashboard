// Ant Design Imports
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { certnTheme } from '../../Theme/certn-theme';
import { useHistory } from 'react-router-dom';
import { AdvApplicationInfo } from '../../interfaces';
import { CustomPagination, Spinner, Dot, TableWrapper, PaginationWrapper } from './SearchTableSC';
// Styled Components
import { useEffect, useState } from 'react';

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
        status: 'PARTIAL', // Need to ask cetrn about PARTIAL
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

// Interface for props
interface SearchTableProps {
    loading: {
        search: boolean;
    };
    results: AdvApplicationInfo[] | undefined;
    onSubmitPageChange: (current: number) => Promise<void>;
    count: number;
}

const SearchTable: React.FC<SearchTableProps> = (props) => {
    //history for linking to application page with applicaiton ID
    const history = useHistory();
    //State for storing the data so the new dates work
    const [data, setData] = useState<AdvApplicationInfo[]>();

    // Changes the dates to nice dates whenever new pages on the table are loaded
    useEffect(() => {
        props.results &&
            props.results.forEach((result) => {
                result.created = checkDate(result.created);
                result.updated = checkDate(result.updated);
            });
        setData(props.results);
    }, [props.results]);

    // Function to change dates
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
            <Spinner spinning={props.loading.search} size="large" tip="Getting Applications...">
                <Table<AdvApplicationInfo>
                    rowClassName="pointer"
                    columns={columns}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => {
                            history.push(`/application?id=${record.key}`);
                        },
                    })}
                    pagination={false}
                />
            </Spinner>
            <PaginationWrapper>
                {props.count > 0 && (
                    <CustomPagination
                        disabled={props.loading.search}
                        showSizeChanger={false}
                        total={props.count}
                        onChange={props.onSubmitPageChange}
                    />
                )}
            </PaginationWrapper>
        </TableWrapper>
    );
};

export default SearchTable;
