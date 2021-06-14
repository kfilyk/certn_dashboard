import { Softcheck } from '../../api/Certn-Api/index';

const SoftCheck = (): JSX.Element => {
    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        // eslint-disable-next-line no-console
        console.log('Generating softcheck...');
        event.preventDefault();
        Softcheck();
    };

    return (
        <div>
            <form>
                <button type="submit" onClick={submit}>
                    Generate SoftCheck
                </button>
            </form>
        </div>
    );
};

export default SoftCheck;
