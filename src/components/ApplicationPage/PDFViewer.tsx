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
                        <List.Item>
                            <List.Item.Meta title={item.title} />
                        </List.Item>
                        <ButtonWrapper type="primary" onClick={displayModal}>
                            Preview
                        </ButtonWrapper>
                    </div>
                )}
            />
            <ModalWrapper title="Preview" visible={showModal} footer={null} onCancel={handleCancel}>
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
