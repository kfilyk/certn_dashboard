import { useState } from 'react';
import { ButtonWrapper, ModalWrapper } from './ApplicationActionsSC';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import test from '../../deleteBeforeRelease/test.pdf';
import { List, Checkbox } from 'antd';
import { ConsentDocument } from '../../interfaces';
import './PDFViewer.css';

interface PDFViewerProps {
    docs: ConsentDocument[];
}

interface cachedDocumentsBuffer {
    maxNumberOfCachedPDFs: number;
    nextWriteLocation: number;
    sessionStoredPDFS: ConsentDocument[];
}

const cachedPDFs: ConsentDocument[] = [];
const pdfBuffer: cachedDocumentsBuffer = {
    maxNumberOfCachedPDFs: 3,
    nextWriteLocation: 0,
    sessionStoredPDFS: cachedPDFs,
};

// Aquires remote PDF via get request and stores reference location to a string to be cached in session storage.
// Currently un-imlpementable due to CORS errors caused by server side constraints
const downloadPDF = async (title: string, targetUrl: string): Promise<string> => {
    return targetUrl; // disable get request by returning the target url for testing and compilation purposes
    const response: string = await fetch(targetUrl, {
        method: 'GET',
        headers: {
            'Content-type': 'application/pdf',
        },
    })
        .then(function (resp) {
            const returnBlob: Promise<Blob> = resp.blob();
            return returnBlob;
        })
        .then(function (blob) {
            const returnFile: string = window.URL.createObjectURL(blob);
            return returnFile;
        });
    return response;
};

// store a requested pdf into session storage given the rolling array buffer and a ConsentDocument object
const storePDF = async (storgeBuffer: cachedDocumentsBuffer, targetConsentDoc: ConsentDocument): Promise<boolean> => {
    let returnBoolean = false;
    if (targetConsentDoc.isCached) {
        returnBoolean = true;
    } else {
        try {
            if (storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation] != null) {
                // if next write location is occupied, remote it from session storage and update the consent document meta data
                const removeDoc: ConsentDocument = storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation];
                removeDoc.cacheIndexLocation = -1;
                removeDoc.isCached = false;
                sessionStorage.removeItem(removeDoc.document_url);
            }
            const pdfReference: string = await downloadPDF(targetConsentDoc.title, targetConsentDoc.document_url);
            sessionStorage.setItem(targetConsentDoc.document_url, pdfReference);
            storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation] = targetConsentDoc;
            targetConsentDoc.isCached = true;
            targetConsentDoc.cacheIndexLocation = storgeBuffer.nextWriteLocation;
            storgeBuffer.nextWriteLocation = (storgeBuffer.nextWriteLocation + 1) % storgeBuffer.maxNumberOfCachedPDFs;
            returnBoolean = true;
        } catch (e) {
            returnBoolean = false;
        }
    }
    return returnBoolean;
};

export const PDFViewer = ({ docs }: PDFViewerProps): JSX.Element => {
    const data: ConsentDocument[] = docs;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pages, setPages] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState(1);

    const displayModal = (targetDoc: ConsentDocument) => {
        storePDF(pdfBuffer, targetDoc);
        setShowModal(true);
    };

    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const changePage = (offset: number) => {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    };
    const previousPage = () => {
        changePage(-1);
    };

    const nextPage = () => {
        changePage(1);
    };

    // eslint-disable-next-line no-shadow
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1);
    };

    //PDF will be implemented inside ModalWrapper above the <p>, which will be used to count the pages
    return (
        <div>
            <List
                dataSource={data}
                renderItem={(item: ConsentDocument) => (
                    <div className="list-container">
                        <Checkbox></Checkbox>
                        <List.Item onClick={() => displayModal(item)}>
                            <List.Item.Meta title={item.title} />
                        </List.Item>
                    </div>
                )}
            />
            <ModalWrapper title="Preview" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
                <Document file={test} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>
                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>
                <ButtonWrapper type="primary" disabled={pageNumber <= 1} onClick={previousPage}>
                    Previous
                </ButtonWrapper>
                <ButtonWrapper type="primary" disabled={pageNumber >= numPages!} onClick={nextPage}>
                    Next
                </ButtonWrapper>
            </ModalWrapper>
        </div>
    );
};
