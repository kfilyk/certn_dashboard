/* eslint-disable no-console */
// import { setConstantValue } from 'typescript';
import { Softcheck } from '../../api/Certn-Api/index';

const SoftCheck = (): JSX.Element => {
    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const result = Softcheck('Bearer 47914591cbc760b9897070f8221af66176296352');
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
