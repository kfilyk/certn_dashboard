import React, { useState, useEffect } from 'react';
// import { setConstantValue } from 'typescript';
import { Softcheck } from '../../api/Certn-Api-Mock/index';

const SoftCheck = () => {
    const [displayButton, setDisplayButton] = useState({
        display: false
    })

    const [showH1, setShowH1] = useState({
        display: false
    })

    useEffect( () => { 
        if (displayButton.display == false ){
            setShowH1({display: false})
        } else {
            setShowH1({display: true})
        }

    }, [displayButton.display]) // triggers when changed. if [], triggers on initialization


    const buttonHandler = (event: React.FormEvent<HTMLButtonElement>) => {
        if (displayButton.display == false) {
            setDisplayButton({display: true})
        } else {
            setDisplayButton({display: false})
        }
    }

    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const result = Softcheck('Bearer 47914591cbc760b9897070f8221af66176296352');
        console.log(result);
    }

    return (

        <div>
        <button onClick={buttonHandler}>Show SoftCheck</button>

        <form>
            {displayButton.display && <button type="submit" onClick={submit}>Generate SoftCheck</button>}
        </form>
        {displayButton.display && <h1>Hello</h1>}
        </div>
    );
}

export default SoftCheck;