// Ant Design
import { SearchOutlined, UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import {
    SearchForm,
    SearchWrapper,
    SearchButton,
    AdvancedSearchItem,
    AdvancedWapper,
    AdvancedSwitch,
} from './SearchSC';
import { useEffect } from 'react';
import { Input } from 'antd';

const regExp = /[a-zA-Z]/g;

let showAdvanced = false;

const toggleShow = () => {
    showAdvanced = !showAdvanced;

    console.warn('changed advanced toggle');
    console.warn(String(showAdvanced));
};

// Validator to check if it contains any letters, expand to include special non-dash chars later?
const validPhone = (rule: any, value: any) => {
    if (regExp.test(value)) {
        return Promise.reject('Must be a valid number');
    } else {
        return Promise.resolve();
    }
};

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
        enterButton={<AdvancedToggle />}
        style={{ width: '500' }}
    />
);

const AdvancedToggle = (): JSX.Element => <AdvancedSwitch onClick={() => toggleShow()}> Advanced </AdvancedSwitch>;

const AdvancedSearch = (): JSX.Element => (
    // Form for advanced Search, with form wrapper and items
    <AdvancedWapper name="Advanced Search">
        <AdvancedSearchItem name="firstname" label="First Name" rules={[{ type: 'string' }]}>
            <Input prefix={<UserOutlined />} placeholder="Candidate First Name" type="firstname" />
        </AdvancedSearchItem>
        <AdvancedSearchItem name="lastname" label="Last Name" rules={[{ type: 'string' }]}>
            <Input prefix={<UserOutlined />} placeholder="Candidate Last Name" type="lastname" />
        </AdvancedSearchItem>
        <AdvancedSearchItem name="phone" label="Phone Number" rules={[{ validator: validPhone }]}>
            <Input prefix={<PhoneOutlined />} placeholder="Candidate Phone #" type="phone" />
        </AdvancedSearchItem>
        <AdvancedSearchItem
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Please enter a valid email' }]}
        >
            <Input prefix={<MailOutlined />} placeholder="Candidate Email" type="email" />
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
            {showAdvanced ? <AdvancedSearch /> : null}
        </SearchWrapper>
    );
};

export default SearchBar;
