//API requests
import { getApplications } from '../../api/Certn-Api/index';
// Ant Design Imports
// Components
import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchTable from './SearchTable';
// Styled Components

// Interfaces
import { SearchSubmission } from './SearchTypes';
import { AdvApplicationInfo } from '../../interfaces';

import { SearchPageWrapper } from './SearchSC';

const Search = (): JSX.Element => {
    const [advanced, setAdvanced] = useState(false);
    const [results, setResults] = useState<AdvApplicationInfo[]>([]);
    const [loading, setLoading] = useState({ search: false });
    const [searchString, setSearchString] = useState<string>('');
    const [count, setCount] = useState<number>(0);

    // Combines all searhc files into one string for the API
    // Only for initial search, not for changing pages
    const submit = async (values: SearchSubmission): Promise<void> => {
        values.basic === undefined && (values.basic = '');
        values.firstname === undefined && (values.firstname = '');
        values.lastname === undefined && (values.lastname = '');
        values.phone === undefined && (values.phone = '');
        values.email === undefined && (values.email = '');
        let fullString: string;
        advanced
            ? (fullString = values.firstname + ' ' + values.lastname + ' ' + values.phone + ' ' + values.email)
            : (fullString = values.basic);
        setLoading({ search: true });
        const apiResults = await getApplications(fullString);
        setLoading({ search: false });
        setResults(apiResults.applications);
        setCount(apiResults.count);
        setSearchString(fullString);
    };

    // Triggers on page change because the string has not changed
    const onSubmitPageChange = async (current: number): Promise<void> => {
        setLoading({ search: true });
        const apiResultsPage = await getApplications(searchString, current);
        setLoading({ search: false });
        setResults(apiResultsPage.applications);
    };

    return (
        <SearchPageWrapper>
            <SearchBar onSubmit={submit} advanced={advanced} setAdvanced={setAdvanced} loading={loading.search} />
            <SearchTable results={results} loading={loading} onSubmitPageChange={onSubmitPageChange} count={count} />
        </SearchPageWrapper>
    );
};

export default Search;
