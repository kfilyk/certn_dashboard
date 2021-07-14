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

const Search = (): JSX.Element => {
    const [advanced, setAdvanced] = useState(false);
    const [results, setResults] = useState<AdvApplicationInfo[]>();
    const [loading, setLoading] = useState({ search: false });
    const [page, setPage] = useState<number>(1);
    const [searchString, setSearchString] = useState<string>('');

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
        const apiResults = await getApplications(fullString, page);
        setLoading({ search: false });
        setResults(apiResults.applications);
        setSearchString(fullString);
    };

    const onSubmitPageChangeNext = async (): Promise<void> => {
        const newPage: number = page + 1;
        setPage(newPage);
        setLoading({ search: true });
        const apiResultsPage = await getApplications(searchString, newPage);
        setLoading({ search: false });
        setResults(apiResultsPage.applications);
    };

    const onSubmitPageChangeBack = async (): Promise<void> => {
        const newPage: number = page - 1;
        setPage(newPage);
        setLoading({ search: true });
        const apiResultsPage = await getApplications(searchString, newPage);
        setLoading({ search: false });
        setResults(apiResultsPage.applications);
    };

    return (
        <div>
            <SearchBar onSubmit={submit} advanced={advanced} setAdvanced={setAdvanced} />
            <SearchTable
                results={results}
                loading={loading}
                page={page}
                setPage={setPage}
                onSubmitPageChangeNext={onSubmitPageChangeNext}
                onSubmitPageChangeBack={onSubmitPageChangeBack}
            />
        </div>
    );
};

export default Search;
