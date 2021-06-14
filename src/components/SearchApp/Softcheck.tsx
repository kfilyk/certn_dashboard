import { Softcheck } from '../../api/Certn-Api/index';

const SoftCheck = (): JSX.Element => {
    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const result = Softcheck();
        // eslint-disable-next-line no-console
        console.log(result);
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
