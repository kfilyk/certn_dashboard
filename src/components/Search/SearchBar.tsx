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
import { Input } from 'antd';
import { useState } from 'react';

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

// const BasicSearch = (): JSX.Element => (
//     <SearchForm name="basic" prefix={<SearchOutlined />} placeholder="Input search text" style={{ width: '500' }} />
// );

// Declare types of args to be passed
type toggleProps = {
    showAd: boolean;
    setShowAd: any;
};

// Basic search form with advanced mode toggle
const BasicSearch = ({ showAd, setShowAd }: toggleProps): JSX.Element => (
    <SearchForm
        name="basic"
        prefix={<SearchOutlined />}
        placeholder="Input search text"
        enterButton={<AdvancedToggle showAd={showAd} setShowAd={setShowAd} />}
        style={{ width: '500' }}
    />
);

// Toggles the advanced search inputs
const AdvancedToggle = ({ showAd, setShowAd }: toggleProps): JSX.Element => (
    <AdvancedSwitch onClick={() => setShowAd(!showAd)}> Advanced </AdvancedSwitch>
);

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

// const AdvancedToggle = (initialValue = false): [boolean, () => void] => {
//     const [toggle, setToggle] = useState(initialValue);

//     const toggleButton = useCallback(() => {
//         setToggle(!toggle);
//     }, [toggle]);

//     return [toggle, toggleButton];
// };

// Actual Searchbar element, contains basic search bar form, submit button and advanced search form
const SearchBar = (): JSX.Element => {
    // const [advanced, setAdvanced] = AdvancedToggle();

    // return (
    //     <SearchWrapper>
    //         <BasicSearch />
    //         <AdvancedSwitch onClick={setAdvanced}>{advanced ? 'Basic' : 'Advanced'}</AdvancedSwitch>
    //         {advanced && <AdvancedSearch />}
    //         <SearchCommit />
    const [showAd, setshowAd] = useState(false);
    return (
        <SearchWrapper>
            <BasicSearch showAd={showAd} setShowAd={setshowAd} />
            <SearchCommit />
            {showAd && <AdvancedSearch />}
        </SearchWrapper>
    );
};

export default SearchBar;
