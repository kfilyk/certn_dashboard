import { useState } from 'react';
import { Alert, Form, message, Spin, Modal } from 'antd';
import { FileTextOutlined, EditFilled } from '@ant-design/icons';
import { LinkInfo } from '../../interfaces';
import {
    FormWrapper,
    InputLinkWrapper,
    ButtonWrapper,
    StyledParaB,
    StyledParaN,
    StyledParaNB,
    ATErrorWrapper,
    EEErrorWrapper,
    InputButtonWrapper,
    EmailEditButton,
    ATEmailWrapper,
    ModalInputWrapper,
} from './ApplicationActionsSC';
import { PDFViewer } from './PDFViewer';
import { ConsentDocument } from '../../interfaces';
import { updateEmail, sendEmail } from '../../api/Certn-Api-Mock/index-mock';

/**
 * This is an interface that specifies the variables that will be used for the three action tabs
 *
 * Action is used to define whether the onboarding link, report link or consent document tab will show
 *
 * Email is used to give the current email value of the application
 *
 * links is used to give the current onboarding link or report link of the application
 *
 * docs is used to give the current documents associated with the application
 *
 * loading is used for the PDF Viewer
 */
interface ActionTabProps {
    action: string;
    email: string;
    links: LinkInfo;
    docs: ConsentDocument[];
    loading: boolean;
    updateEmailMOCK(newEmail: string): string;
}

/**
 * This exports the form that conditionally builds the three action tabs on the application
 * The two primary conditionals are for judging if it is a Link tab or the Consent Documents tab
 * This is determined by the use of the value of the action parameter
 * The parameter values for the Link tab will change between the Onboarding to Report Link tabs
 */
export const ActionTabs = ({ action, email, links, docs, loading, updateEmailMOCK }: ActionTabProps): JSX.Element => {
    const [newEmail, setNewEmail] = useState('');
    const [updatingEmail, setUpdatingEmail] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [checked, setChecked] = useState<string[]>([]); //array of selected consent docs

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
    /**
     * Handles updating the list of selected consent docs whenever a list item is checked/unchecked.
     * 'any' is currently required as the values object contains arbitrarily named keys
     *
     * @param "values" contains the modified list item (the checked/unchecked consent doc) in the form: {URL : selected (true/false)}
     */
    const handleChange = async (values: any) => {
        for (const v in values) {
            if (values[v]) {
                setChecked(checked.concat(v));
            } else {
                setChecked(checked.filter((item) => item != v));
            }
        }
    };

    /**
     * Handles calling of sendEmail function with a constructed EmailInfo object whenever the "send" buttons are clicked.
     */
    const handleEmailSending = async () => {
        try {
            //sendEmail should return some sort of response/status once the proper API is hookedd up.
            await sendEmail({
                email_type: action,
                to: email,
                url: action === 'onboarding' || action === 'report' ? linkT : '',
                consent_doc_urls: action === 'documents' ? checked : [],
            });
            message.success({
                content: 'Sent ' + action + ' email to ' + email,
            });
        } catch (e) {
            message.error({
                content: 'Failed to send ' + action + ' email to ' + email,
            });
        }
    };

    const displayModal = () => {
        setNewEmail(email);
        setShowModal(true);
    };

    const handleOk = async () => {
        try {
            setUpdatingEmail(true);
            const response = await updateEmail(newEmail);
            message.success(`Successfully updated email to ${response}`);
            // Code below here is only used to mock the email change on the application page
            updateEmailMOCK(newEmail);
        } catch (e) {
            message.error('Failed to update email');
        }
        setNewEmail('');
        setUpdatingEmail(false);
        setShowModal(false);
    };

    const handleCancel = () => {
        setNewEmail('');
        setShowModal(false);
    };

    const editModal = () => (
        <Modal
            title="Edit Email"
            visible={showModal}
            onCancel={handleCancel}
            footer={
                <ButtonWrapper
                    type="primary"
                    onClick={handleOk}
                    disabled={newEmail === email || !newEmail || updatingEmail}
                >
                    Confirm
                </ButtonWrapper>
            }
        >
            <Spin spinning={updatingEmail}>
                <EEErrorWrapper>
                    <Alert
                        type="warning"
                        showIcon
                        message={`This action will change the email associated with this application`}
                    />
                </EEErrorWrapper>
                <ModalInputWrapper value={newEmail} type="email" onChange={(e) => setNewEmail(e.target.value)} />
            </Spin>
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
            <ATEmailWrapper>
                <span style={{ padding: '4px 11px 4px 11px' }}>{email}</span>
                <EmailEditButton onClick={displayModal}>
                    <EditFilled />
                </EmailEditButton>
            </ATEmailWrapper>
            <ButtonWrapper
                onClick={handleEmailSending}
                type="primary"
                disabled={email === '-' || (action === 'documents' && checked.length === 0)}
            >
                Send
            </ButtonWrapper>
        </InputButtonWrapper>
    );

    return (
        <FormWrapper>
            {action === 'documents' ? (
                <Form onValuesChange={handleChange}>
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
