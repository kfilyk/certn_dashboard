// Ant Design
import { SearchOutlined } from '@ant-design/icons';
import { SearchForm, SearchWrapper, SearchButton, AdvancedSearchItem, AdvancedWapper } from './SearchSC';
import { Input } from 'antd';

interface SearchProps {
    onSubmit: (values: {
        basic: string;
        firstname: string;
        lastname: string;
        phone: string;
        email: string;
    }) => Promise<void>;
}

const BasicSearch = (): JSX.Element => (
    <SearchForm
        name="basic"
        prefix={<SearchOutlined />}
        placeholder="Input search text"
        enterButton="Advanced"
        style={{ width: '500' }}
    />
);

const AdvancedSearch = (): JSX.Element => (
    // Form for advanced Search, with form wrapper and items
    <AdvancedWapper name="Advanced Search">
        <AdvancedSearchItem name="firstname" label="First Name">
            <Input placeholder="Candidate First Name" type="firstname" />
        </AdvancedSearchItem>
        <AdvancedSearchItem name="lastname" label="Last Name">
            <Input placeholder="Candidate First Name" type="lastname" />
        </AdvancedSearchItem>
        <AdvancedSearchItem name="phone" label="Phone Number">
            <Input placeholder="Candidate Phone Number" type="phone" />
        </AdvancedSearchItem>
        <AdvancedSearchItem name="email" label="Email">
            <Input placeholder="Candidate Email" type="email" />
        </AdvancedSearchItem>
    </AdvancedWapper>
);

// button for sending search
const SearchCommit = (): JSX.Element => (
    <SearchButton type="primary" htmlType="submit">
        Search
    </SearchButton>
);

// Actual Searchbar element, contains basic search bar form, submit button and advanced search form
const SearchBar = (): JSX.Element => {
    return (
        <SearchWrapper>
            <BasicSearch />
            <SearchCommit />
            <AdvancedSearch />
        </SearchWrapper>
    );
};

export default SearchBar;
