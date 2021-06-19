// Ant Design Imports
import { SearchBar } from './SearchBar';
// Components
import SearchTable from './SearchTable';
// Styled Components

// Interfaces

const Search = (): JSX.Element => (
    <div>
        <p>Welcome to the Search Page!</p>
        <SearchTable />
        <SearchBar />
    </div>
);

export default Search;
