/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { ButtonWrapper, ModalWrapper } from './ApplicationActionsSC';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import test from '../../deleteBeforeRelease/test.pdf';
import { List, Checkbox } from 'antd';
import { ConsentDocument } from '../../interfaces';
import './PDFViewer.css';
import { ListItemTypeProps } from 'antd/lib/list/Item';

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

const downloadPDF = async (title: string, targetUrl: string): Promise<string> => {
    targetUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    console.log('Attempting to download file at ' + targetUrl);
    const returnString: Promise<string> = fetch(targetUrl, {
        method: 'GET',
    })
        .then(function (resp) {
            const returnBlob: Promise<Blob> = resp.blob();
            console.log('Return File String (in loop): ' + returnBlob);
            return returnBlob;
        })
        .then(function (blob) {
            const returnFile: string = window.URL.createObjectURL(blob);
            console.log('Return File String (in loop): ' + returnFile);
            return returnFile;
        });
    console.log('Return File String (out of loop): ' + returnString);
    return returnString;
};

// store a requested pdf into session storage given the rolling array buffer and a ConsentDocument object
const storePDF = async (storgeBuffer: cachedDocumentsBuffer, targetConsentDoc: ConsentDocument): Promise<boolean> => {
    let returnBoolean = false;
    if (targetConsentDoc.isCached) {
        returnBoolean = true;
    } else {
        try {
            if (storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation] != null) {
                // removes consent doc from session storage when number of stored PDFs exceeds set limit
                const removeDoc: ConsentDocument = storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation];
                removeDoc.cacheIndexLocation = -1;
                removeDoc.isCached = false;
                //sessionStorage.removeItem(removeDoc.document_url);
            }
            const pdfReference: Promise<string> = downloadPDF(targetConsentDoc.title, targetConsentDoc.document_url);
            //sessionStorage.setItem(targetConsentDoc.document_url, pdfReference);
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
