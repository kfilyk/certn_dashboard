import { ConsentDocument } from '../../interfaces';
import AgentDocs from './GetAgentDocs_MOCKDATA.json';

interface AgentDocument {
    id?: string;
    created?: string;
    modified?: string;
    file_name: string;
    file_type?: string;
    document_type: string;
    url: string;
    document_expiration?: string;
    document_issuing_country?: string;
    document_issuing_province_state?: string;
    document_number?: string;
    can_delete?: string;
}

/*
 * Function designed to simulate a call to the api in search of a list of all documents associated to a given application
 * Will be turned into a proper call once endpoint is implemented
 */
const getListOfPdfs = async (): Promise<Array<ConsentDocument>> => {
    await sleep(1000);
    const returnDocuments: Array<ConsentDocument> = [];
    const mockReturnData_AgentDocs = JSON.parse(JSON.stringify(AgentDocs));
    mockReturnData_AgentDocs.agent_documents.forEach((agent_document: AgentDocument) => {
        if (agent_document.document_type == 'CONSENT') {
            const ConsentDocumentEntry: ConsentDocument = {
                title: agent_document.file_name,
                document_url: agent_document.url,
                isCached: false,
                cacheIndexLocation: -1,
                size: 0,
            };
            returnDocuments.push(ConsentDocumentEntry);
        }
    });
    for (let i = 1; i <= 10; i += 1) {
        const ConsentDocumentEntry: ConsentDocument = {
            title: 'File ' + i,
            document_url: 'URL ' + i,
            isCached: false,
            cacheIndexLocation: -1,
            size: 0,
        };
        returnDocuments.push(ConsentDocumentEntry);
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
