import { ConsentDocument } from '../../interfaces';

/*
 * Function designed to simulate a call to the api in search of a list of all documents associated to a given application
 * Will be turned into a proper call once endpoint is implemented
 */
const getListOfPdfs = async (): Promise<Array<ConsentDocument>> => {
    await sleep(1000);
    const returnDocuments: Array<ConsentDocument> = [];
    for (let i = 1; i <= 20; i = i + 1) {
        const interationTitle = 'Mock Consent Doc ' + i; // random generation
        const iterationKey = 'MOCK KEY ' + i;
        const consentDocURL = 'MOCK URL ' + i;

        const sudoConsentDoc: ConsentDocument = {
            title: interationTitle,
            key_string: iterationKey,
            url_mock: consentDocURL,
        };
        returnDocuments.push(sudoConsentDoc);
    }

    return new Promise((resolve, reject) => {
        if (returnDocuments.toString() != '') {
            resolve(returnDocuments);
        } else {
            reject(new Error('No Consent Docs Found'));
        }
    });
};

//simulate an API call to aquire a URL for a given Consent DOC
const getConsentDocURL = async (consentDoc_keyString: string): Promise<string> => {
    await sleep(1000);
    return new Promise((resolve, reject) => {
        if (consentDoc_keyString !== 'fail' && consentDoc_keyString !== '' && consentDoc_keyString !== null) {
            resolve('https:\\Mock-URL@fake.com'); // Swap for actual URL when available
        } else {
            reject(new Error('Invalid Id'));
        }
    });
};

// Mimics a delay for an api call
async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { getConsentDocURL, getListOfPdfs };
