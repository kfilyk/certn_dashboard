import { Alert, Form, message, Spin } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { LinkInfo } from '../../interfaces';
import {
    FormWrapper,
    InputWrapper,
    InputLinkWrapper,
    ButtonWrapper,
    StyledParaB,
    StyledParaN,
    StyledParaNB,
} from './ApplicationActionsSC';
import { PDFViewer } from './PDFViewer';
import { ConsentDocument } from '../../interfaces';
import { sendEmail } from '../../api/Certn-Api-Mock/index-mock';

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

    // Handles calling of sendEmail function whenever the "send" buttons are clicked. "values" contains consent doc info in the form: {URL : selected (true/false)}
    const handleEmailSending = async (values: any) => {
        let response = '';
        const selectedDocs: ConsentDocument[] = [];
        for (let i = 0; i < docs.length; i += 1) {
            // check if each consent document is in 'values', and if its selected, if so, add to array
            if (values[docs[i].document_url]) {
                selectedDocs.push(docs[i]);
            }
        }

        try {
            //sendEmail should return some sort of status, but until the actual API is hooked up it only returns debug text
            response = await sendEmail({
                email_type: action,
                to: email,
                url: action == 'onboarding' || action == 'report' ? linkT : '',
                consent_docs: selectedDocs,
            });
        } catch (e) {
            message.error({
                content: response,
            });
        }
        message.success({
            content: response,
        });
    };

    return (
        <FormWrapper>
            {action === 'documents' ? (
                <Form onFinish={handleEmailSending}>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send documents to the following email</StyledParaN>

                    <div style={{ display: 'flex', justifyContent: 'right', flex: 2, margin: '5px 25px 25px 25px' }}>
                        <InputWrapper value={email} disabled={email === '-'} />
                        <ButtonWrapper type="primary" htmlType="submit" disabled={email === '-' || docs.length === 0}>
                            Send
                        </ButtonWrapper>
                        {email === '-' ? <Alert type="error" message={`No email found for the applicant.`} /> : ''}
                    </div>
                    <StyledParaNB> Documents to Send</StyledParaNB>
                    <Spin spinning={loading}>
                        <PDFViewer docs={docs} />
                    </Spin>
                </Form>
            ) : (
                <Form onFinish={handleEmailSending}>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email </StyledParaN>
                    <div style={{ display: 'flex', justifyContent: 'right', flex: 2, margin: '5px 25px 25px 25px' }}>
                        <InputWrapper value={email} disabled={email === '-'} />
                        <ButtonWrapper type="primary" htmlType="submit" disabled={linkT === null || email === '-'}>
                            Send
                        </ButtonWrapper>
                    </div>
                    {email === '-' ? <Alert type="error" message={`No email found for the applicant.`} /> : ''}
                    <StyledParaNB> {textT} </StyledParaNB>
                    <div style={{ display: 'flex', justifyContent: 'right', flex: 2, margin: '5px 25px 25px 25px' }}>
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
                        />
                        {linkT === null ? <Alert type="error" message={`No ${textT} found for the applicant.`} /> : ''}
                    </div>
                </Form>
            )}
        </FormWrapper>
    );
};
