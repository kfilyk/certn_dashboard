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
    maxedNumberOfPDFs: number;
    nextWriteLocation: number;
    sessionStoredPDFS: ConsentDocument[];
}

const storePDF = async (storgeBuffer: cachedDocumentsBuffer, targetPDF: ConsentDocument): Promise<boolean> => {
    let returnBoolean = false;
    if (targetPDF.isCached) {
        returnBoolean = true;
    } else {
        try {
            if (storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation] != null) {
                const removeDoc: ConsentDocument = storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation];
                removeDoc.cacheIndexLocation = -1;
                removeDoc.isCached = false;
                sessionStorage.removeItem(removeDoc.document_url);
            }

            sessionStorage.setItem(targetPDF.document_url);
            storgeBuffer.sessionStoredPDFS[storgeBuffer.nextWriteLocation] = targetPDF;
            targetPDF.isCached = true;
            targetPDF.cacheIndexLocation = storgeBuffer.nextWriteLocation;
            storgeBuffer.nextWriteLocation = (storgeBuffer.nextWriteLocation + 1) % storgeBuffer.maxedNumberOfPDFs;
            returnBoolean = true;
        } catch {
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

    const displayModal = () => {
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
                        <List.Item onClick={displayModal}>
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
