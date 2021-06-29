import { getApplications } from '../../api/Certn-Api/index';

const GetPrunedApplications = (): JSX.Element => {
    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        // eslint-disable-next-line no-console
        console.log('Getting list of all pruned applications...');
        event.preventDefault();
        getApplications('');
    };

    return (
        <div>
            <form>
                <button type="submit" onClick={submit}>
                    Get Pruned Applications
                </button>
            </form>
        </div>
    );
};

export default GetPrunedApplications;
