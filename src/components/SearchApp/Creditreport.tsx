// import { setConstantValue } from 'typescript';
import { Creditreport } from '../../api/Certn-Api/index';

const CreditReport = (): JSX.Element => {
    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        // eslint-disable-next-line no-console
        console.log('Generating credit check...');
        Creditreport();
    };

    return (
        <div>
            <form>
                <button type="submit" onClick={submit}>
                    Generate Credit Report
                </button>
            </form>
        </div>
    );
};

export default CreditReport;
