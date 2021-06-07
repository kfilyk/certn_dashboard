import React, { useState, useEffect } from 'react';
// import { setConstantValue } from 'typescript';
import { Creditreport } from '../../api/Certn-Api-Mock/index';

const CreditReport = () => {
    const submit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const result = Creditreport('Bearer 47914591cbc760b9897070f8221af66176296352');
        console.log(result);
    }

    return (

        <div>
            <form>
                <button type="submit" onClick={submit}>Generate Credit Report</button>
            </form>
        </div>
    );
}

export default CreditReport;