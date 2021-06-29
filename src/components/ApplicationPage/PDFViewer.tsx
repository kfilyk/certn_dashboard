import { useState } from 'react';
import { PreviewCheckbox, ButtonWrapper, ModalWrapper } from './ApplicationActionsSC';

export const PDFViewer = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pages, setPages] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const displayModal = () => {
        setShowModal(true);
    };

    const handleOk = () => {
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    //PDF will be implemented inside ModalWrapper above the <p>, which will be used to count the pages
    return (
        <div>
            <PreviewCheckbox>Consent Document 1</PreviewCheckbox>
            <ButtonWrapper type="primary" onClick={displayModal}>
                Preview
            </ButtonWrapper>
            <ModalWrapper title="Preview" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    Page {page} of {pages}
                </p>
            </ModalWrapper>
        </div>
    );
};
