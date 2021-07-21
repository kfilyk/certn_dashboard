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
    const [results, setResults] = useState<AdvApplicationInfo[]>();
    const [loading, setLoading] = useState({ search: false });

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
        setResults(apiResults);
    };

    return (
        <SearchPageWrapper>
            <SearchBar onSubmit={submit} advanced={advanced} setAdvanced={setAdvanced} loading={loading.search} />
            <SearchTable results={results} loading={loading} />
        </SearchPageWrapper>
    );
};

export default Search;
