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
    AdvancedSwitch,
    ToggleButtonWrapper,
    BasicSearchWrapper,
    InputWrapper,
    TextWrapper,
    BasicSearchItem,
} from './SearchBarSC';
import { Form, Input } from 'antd';
import { SearchSubmission } from './SearchTypes';

const regExp = /[a-zA-Z]/g;

// Validator to check if it contains any letters, expand to include special non-dash chars later?
//AntD forces the "rule" variable and we need to check what type it is
const validPhone = (rule: unknown, value: string) => {
    if (regExp.test(value) && value !== '' && value !== undefined) {
        return Promise.reject('Must be a valid number');
    } else {
        return Promise.resolve();
    }
};

interface SearchBarProps {
    onSubmit: (values: SearchSubmission) => Promise<void>;
    advanced: boolean;
    setAdvanced: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
}

// Actual Searchbar element, contains basic search bar form, submit button and advanced search form
const SearchBar: React.FC<SearchBarProps> = (props) => {
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
        <SearchWrapper disabled={props.advanced}>
            <Form
                name="search"
                initialValues={{ remember: true }}
                onFinish={props.onSubmit}
                style={{ display: 'flex' }}
            >
                <BasicSearchWrapper>
                    <TextWrapper>
                        <p>Search Applications</p>
                    </TextWrapper>
                    <InputWrapper>
                        <BasicSearchItem name="basic">
                            <SearchForm
                                prefix={<SearchOutlined />}
                                placeholder="Search All Fields..."
                                allowClear
                                disabled={props.advanced}
                            />
                        </BasicSearchItem>
                        <AdvancedSwitch onClick={() => props.setAdvanced(!props.advanced)}>
                            {props.advanced ? (
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
                {props.advanced && <AdvancedSearch />}
                <SearchButton type="primary" htmlType="submit" disabled={props.loading}>
                    Search
                </SearchButton>
            </Form>
        </SearchWrapper>
    );
};

export default SearchBar;
