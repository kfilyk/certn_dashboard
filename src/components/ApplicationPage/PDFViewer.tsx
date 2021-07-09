import { useState } from 'react';
import { ModalWrapper } from './ApplicationActionsSC';
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
                    <div className="list-container">
                        <Checkbox></Checkbox>
                        <List.Item onClick={displayModal}>
                            <List.Item.Meta
                                title={<a href={item.url_mock}>{item.title}</a>}
                                description={item.key_string}
                            />
                        </List.Item>
                    </div>
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
