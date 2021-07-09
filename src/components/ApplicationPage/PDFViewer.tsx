import { useState } from 'react';
import { PreviewCheckbox, ModalWrapper } from './ApplicationActionsSC';
import { List } from 'antd';
import { ConsentDocument } from '../../interfaces';
import './PDFViewer.css';

export const PDFViewer = (Props: any): JSX.Element => {
    const data: ConsentDocument[] = Props.docs;
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
            <List
                dataSource={data}
                renderItem={(item: ConsentDocument) => (
                    <List.Item onClick={displayModal}>
                        <PreviewCheckbox> </PreviewCheckbox>
                        <List.Item.Meta
                            title={<a href={item.url_mock}>{item.title}</a>}
                            description={item.key_string}
                        />
                    </List.Item>
                )}
            />
            <ModalWrapper title="Preview" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    Page {page} of {pages}
                </p>
            </ModalWrapper>
        </div>
    );
};
