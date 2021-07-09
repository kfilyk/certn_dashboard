import { useState } from 'react';
import { PreviewCheckbox, ButtonWrapper, ModalWrapper } from './ApplicationActionsSC';
import { List } from 'antd';
import { Document } from '../../interfaces';

export const PDFViewer = (Props: any): JSX.Element => {
    const data: Document[] = Props.docs;
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
                bordered={true}
                dataSource={data}
                renderItem={(item: Document) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
            <ButtonWrapper type="primary" onClick={displayModal}>
                {' '}
                Preview{' '}
            </ButtonWrapper>
            <ModalWrapper title="Preview" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
                <p>
                    Page {page} of {pages}
                </p>
            </ModalWrapper>
        </div>
    );
};
