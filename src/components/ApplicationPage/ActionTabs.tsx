import { useState } from 'react';
import { Alert, Form, message, Spin, Modal, Input } from 'antd';
import { FileTextOutlined, EditFilled } from '@ant-design/icons';
import { LinkInfo } from '../../interfaces';
import {
    FormWrapper,
    InputWrapperAT,
    InputLinkWrapper,
    ButtonWrapper,
    StyledParaB,
    StyledParaN,
    StyledParaNB,
    ATErrorWrapper,
    EEErrorWrapper,
    InputButtonWrapper,
} from './ApplicationActionsSC';
import { PDFViewer } from './PDFViewer';
import { ConsentDocument } from '../../interfaces';

interface ActionTabProps {
    action: string;
    email: string;
    links: LinkInfo;
    docs: ConsentDocument[];
    loading: boolean;
}

export const ActionTabs = ({ action, email, links, docs, loading }: ActionTabProps): JSX.Element => {
    const textT = action == 'onboarding' ? 'Onboarding Link' : 'Report Link';
    const linkT = action == 'onboarding' ? links.onboarding_link : links.report_link;
    // eslint-disable-next-line no-param-reassign
    /* Copy function: https://stackoverflow.com/a/62958832
     * Creates empty textarea element, assigns URL as the value, copies URL, destroys textarea element
     * Displays AntD Message component for copy success
     */
    const copyToClipboard = (content: string) => {
        const el = document.createElement('textarea');
        el.value = content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        message.success({
            content: 'Copied to clipboard!',
        });
    };

    /* Temporary consent doc form specifier */
    const sendConsent = (values: FormData) => {
        // eslint-disable-next-line no-console
        console.log('Send the following forms to ' + email + ': ', values);
    };

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

    const editModal = () => (
        <Modal
            title="Edit Email"
            visible={showModal}
            onCancel={handleCancel}
            footer={
                <ButtonWrapper type="primary" onClick={handleOk}>
                    Confirm
                </ButtonWrapper>
            }
        >
            <EEErrorWrapper>
                <Alert
                    type="warning"
                    showIcon
                    message={`This action will change the email associated with this application`}
                />
            </EEErrorWrapper>
            <Input value={email} />
        </Modal>
    );

    const emailCheck = () =>
        email === '-' ? (
            <ATErrorWrapper>
                <Alert type="error" message={`No email found for the applicant.`} />
            </ATErrorWrapper>
        ) : (
            ''
        );

    const emailInput = () => (
        <InputButtonWrapper>
            <InputWrapperAT
                value={email}
                disabled={email === '-'}
                enterButton={<EditFilled style={{ color: 'gray' }} />}
                onSearch={displayModal}
            />
            <ButtonWrapper type="primary" disabled={email === '-' || docs.length === 0}>
                Send
            </ButtonWrapper>
        </InputButtonWrapper>
    );

    return (
        <FormWrapper>
            {action === 'documents' ? (
                <Form onFinish={sendConsent}>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send documents to the following email</StyledParaN>

                    {emailInput()}
                    {editModal()}
                    {emailCheck()}
                    <StyledParaNB> Documents to Send</StyledParaNB>
                    <Spin spinning={loading}>
                        <PDFViewer docs={docs} />
                    </Spin>
                </Form>
            ) : (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email: </StyledParaN>
                    {emailInput()}
                    {editModal()}
                    {emailCheck()}
                    <StyledParaNB> {textT} </StyledParaNB>
                    <InputButtonWrapper>
                        <InputLinkWrapper
                            prefix={
                                <FileTextOutlined
                                    onClick={() => {
                                        copyToClipboard(linkT);
                                    }}
                                />
                            }
                            disabled={linkT === null}
                            value={linkT}
                            onChange={() => {
                                message.error({
                                    content: 'URL cannot be edited!',
                                });
                            }}
                        />{' '}
                    </InputButtonWrapper>
                    {linkT === null ? (
                        <ATErrorWrapper>
                            <Alert type="error" message={`No ${textT} found for the applicant.`} />
                        </ATErrorWrapper>
                    ) : (
                        ''
                    )}
                </Form>
            )}
        </FormWrapper>
    );
};
