// Ant Design
import {
    SearchOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import {
    SearchForm,
    SearchWrapper,
    SearchButton,
    AdvancedSearchItem,
    AdvancedWapper,
    AdvancedSwitch,
    ToggleButtonWrapper,
    BasicSearchWrapper,
    InputWrapper,
    TextWrapper,
} from './SearchBarSC';
import { Input } from 'antd';
import { useCallback, useState } from 'react';

const regExp = /[a-zA-Z]/g;

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

const AdvancedSearch = (): JSX.Element => (
    // Form for advanced Search, with form wrapper and items
    <AdvancedWapper name="Advanced Search">
        <AdvancedSearchItem name="firstname" label="First Name" rules={[{ type: 'string' }]}>
            <Input prefix={<UserOutlined />} placeholder="Candidate First Name" type="firstname" allowClear />
        </AdvancedSearchItem>
        <AdvancedSearchItem name="lastname" label="Last Name" rules={[{ type: 'string' }]}>
            <Input prefix={<UserOutlined />} placeholder="Candidate Last Name" type="lastname" allowClear />
        </AdvancedSearchItem>
        <AdvancedSearchItem name="phone" label="Phone Number" rules={[{ validator: validPhone }]}>
            <Input prefix={<PhoneOutlined />} placeholder="Candidate Phone #" type="phone" allowClear />
        </AdvancedSearchItem>
        <AdvancedSearchItem
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Please enter a valid email' }]}
        >
            <Input prefix={<MailOutlined />} placeholder="Candidate Email" type="email" allowClear />
        </AdvancedSearchItem>
    </AdvancedWapper>
);

// button for sending search
const SearchCommit = (): JSX.Element => (
    <SearchButton type="primary" htmlType="submit">
        Search
    </SearchButton>
);

const AdvancedToggle = (initialValue = false): [boolean, () => void] => {
    const [toggle, setToggle] = useState(initialValue);

    const toggleButton = useCallback(() => {
        setToggle(!toggle);
    }, [toggle]);

    return [toggle, toggleButton];
};

// Actual Searchbar element, contains basic search bar form, submit button and advanced search form
const SearchBar = (): JSX.Element => {
    const [advanced, setAdvanced] = AdvancedToggle();

    return (
        <SearchWrapper>
            <BasicSearchWrapper>
                <TextWrapper>
                    <p>Search Applications</p>
                </TextWrapper>
                <InputWrapper>
                    <SearchForm
                        name="basic"
                        prefix={<SearchOutlined />}
                        placeholder="Search All Fields..."
                        allowClear
                    />
                    <AdvancedSwitch onClick={setAdvanced}>
                        {advanced ? (
                            <ToggleButtonWrapper>
                                <MenuFoldOutlined /> <p>Basic</p>
                            </ToggleButtonWrapper>
                        ) : (
                            <ToggleButtonWrapper>
                                <MenuUnfoldOutlined /> <p>Advanced</p>
                            </ToggleButtonWrapper>
                        )}
                    </AdvancedSwitch>
                </InputWrapper>
            </BasicSearchWrapper>
            {advanced && <AdvancedSearch />}
            <SearchCommit />
        </SearchWrapper>
    );
};

export default SearchBar;
