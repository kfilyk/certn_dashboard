import { Activeapplicants } from '../../api/Certn-Api/index';

const ActiveApplicants = (): JSX.Element => {
    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Activeapplicants();
    };

    return (
        <div>
            <form>
                <button type="submit" onClick={submit}>
                    Get Active Applicants
                </button>
            </form>
        </div>
    );
};

export default ActiveApplicants;
