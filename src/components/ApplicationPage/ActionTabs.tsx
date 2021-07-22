import { useState } from 'react';
import { Alert, Form, message, Spin } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { LinkInfo } from '../../interfaces';
import {
    FormWrapper,
    InputWrapper,
    InputLinkWrapper,
    ButtonWrapper,
    ModalWrapper,
    StyledParaB,
    StyledParaN,
    StyledParaNB,
    ATErrorWrapper,
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

    return (
        <FormWrapper>
            {action === 'documents' ? (
                <Form onFinish={sendConsent}>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send documents to the following email</StyledParaN>
                    <InputButtonWrapper>
                        <InputWrapper value={email} disabled={email === '-'} />
                        <ButtonWrapper type="primary" disabled={email === '-' || docs.length === 0}>
                            Send
                        </ButtonWrapper>
                    </InputButtonWrapper>
                    <InputButtonWrapper>
                        <ButtonWrapper onClick={displayModal}>Edit Email</ButtonWrapper>
                        <ModalWrapper
                            title=""
                            visible={showModal}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        ></ModalWrapper>
                    </InputButtonWrapper>
                    {email === '-' ? (
                        <ATErrorWrapper>
                            <Alert type="error" message={`No email found for the applicant.`} />
                        </ATErrorWrapper>
                    ) : (
                        ''
                    )}

                    <StyledParaNB> Documents to Send</StyledParaNB>
                    <Spin spinning={loading}>
                        <PDFViewer docs={docs} />
                    </Spin>
                </Form>
            ) : (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email: </StyledParaN>
                    <InputButtonWrapper>
                        <InputWrapper value={email} disabled={email === '-'} />
                        <ButtonWrapper type="primary" disabled={linkT === null || email === '-'}>
                            Send
                        </ButtonWrapper>
                    </InputButtonWrapper>
                    <InputButtonWrapper>
                        <ButtonWrapper onClick={displayModal}>Edit Email</ButtonWrapper>
                        <ModalWrapper
                            title=""
                            visible={showModal}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        ></ModalWrapper>
                    </InputButtonWrapper>
                    {email === '-' ? (
                        <ATErrorWrapper>
                            <Alert type="error" message={`No email found for the applicant.`} />
                        </ATErrorWrapper>
                    ) : (
                        ''
                    )}
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
