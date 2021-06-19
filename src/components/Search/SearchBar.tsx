// Ant Design
import { SearchOutlined } from '@ant-design/icons';
import { SearchForm, SearchWrapper, SearchButton, AdvancedSearchItem, AdvancedWapper } from './SearchSC';
import { Input } from 'antd';

const BasicSearch = (): JSX.Element => (
    <SearchForm
        prefix={<SearchOutlined />}
        placeholder="Input search text"
        enterButton="Advanced"
        style={{ width: '500' }}
    />
);

const AdvancedSearch = (): JSX.Element => (
    <AdvancedWapper>
        <AdvancedSearchItem label="First Name">
            <Input placeholder="Candidate First Name" />
        </AdvancedSearchItem>
        <AdvancedSearchItem label="Last Name">
            <Input placeholder="Candidate First Name" />
        </AdvancedSearchItem>
        <AdvancedSearchItem label="Phone Number">
            <Input placeholder="Candidate Phone Number" />
        </AdvancedSearchItem>
        <AdvancedSearchItem label="Email">
            <Input placeholder="Candidate Email" />
        </AdvancedSearchItem>
    </AdvancedWapper>
);

const SearchCommit = (): JSX.Element => <SearchButton type="primary">Search</SearchButton>;

const SearchBar = (): JSX.Element => (
    <SearchWrapper>
        <BasicSearch />
        <SearchCommit />
        <AdvancedSearch />
    </SearchWrapper>
);

export { SearchBar };
