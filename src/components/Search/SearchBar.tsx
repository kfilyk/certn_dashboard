// Ant Design
import { SearchOutlined } from '@ant-design/icons';
import { SearchForm, SearchWrapper, SearchButton } from './SearchSC';

const SearchBar = (): JSX.Element => (
    <SearchWrapper>
        <SearchForm
            prefix={<SearchOutlined />}
            placeholder="Input search text"
            enterButton="Advanced"
            style={{ width: '500' }}
        />
        <SearchButton type="primary"> Search</SearchButton>
    </SearchWrapper>
);

export default SearchBar;
