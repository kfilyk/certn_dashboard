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
    ATErrorWrapper,
    InputButtonWrapper,
} from './ApplicationActionsSC';
import { PDFViewer } from './PDFViewer';
import { ConsentDocument } from '../../interfaces';
import { sendEmail } from '../../api/Certn-Api-Mock/index-mock';
import { useState } from 'react';

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
    const [checked, setChecked] = useState<string[]>([]); //array of selected consent docs

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

    return (
        <FormWrapper>
            {action === 'documents' ? (
                <Form onFinish={handleEmailSending} onValuesChange={handleChange}>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send documents to the following email</StyledParaN>
                    <InputButtonWrapper>
                        <InputWrapper value={email} disabled={email === '-'} />
                        <ButtonWrapper
                            type="primary"
                            htmlType="submit"
                            disabled={email === '-' || checked.length === 0}
                        >
                            Send
                        </ButtonWrapper>
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
                <Form onFinish={handleEmailSending}>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email: </StyledParaN>
                    <InputButtonWrapper>
                        <InputWrapper value={email} disabled={email === '-'} />
                        <ButtonWrapper type="primary" htmlType="submit" disabled={linkT === null || email === '-'}>
                            Send
                        </ButtonWrapper>
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
