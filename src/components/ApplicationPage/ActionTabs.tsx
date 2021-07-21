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
}

/**
 * This exports the form that conditionally builds the three action tabs on the application
 * The two primary conditionals are for judging if it is a Link tab or the Consent Documents tab
 * This is determined by the use of the value of the action parameter
 * The parameter values for the Link tab will change between the Onboarding to Report Link tabs
 */
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
