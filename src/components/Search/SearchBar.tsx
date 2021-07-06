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
import { Form, Input } from 'antd';

const regExp = /[a-zA-Z]/g;

// Validator to check if it contains any letters, expand to include special non-dash chars later?
const validPhone = (rule: any, value: any) => {
    if (regExp.test(value)) {
        return Promise.reject('Must be a valid number');
    } else {
        return Promise.resolve();
    }
};

interface SearchFormProps {
    onSubmit: (values: {
        basic: string;
        firstname: string;
        lastname: string;
        phone: string;
        email: string;
    }) => Promise<void>;
}

// Actual Searchbar element, contains basic search bar form, submit button and advanced search form
const SearchBar = (Props: any): JSX.Element => {
    const AdvancedSearch = (): JSX.Element => (
        // Form for advanced Search, with form wrapper and items
        <>
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
        </>
    );

    return (
        <SearchWrapper>
            {/* <AdvancedWrapper> needs to take the place of Form, but its not working at the moment */}
            <Form name="search" initialValues={{ remember: true }} onFinish={Props.onSubmit}>
                <BasicSearchWrapper>
                    <TextWrapper>
                        <p>Search Applications</p>
                    </TextWrapper>
                    <InputWrapper>
                        <Form.Item name="basic">
                            <SearchForm prefix={<SearchOutlined />} placeholder="Search All Fields..." allowClear />
                        </Form.Item>
                        <AdvancedSwitch onClick={() => Props.setAdvanced(!Props.advanced)}>
                            {Props.advanced ? (
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
                {Props.advanced && <AdvancedSearch />}
                <SearchButton type="primary" htmlType="submit">
                    Search
                </SearchButton>
            </Form>
        </SearchWrapper>
    );
};

export default SearchBar;
