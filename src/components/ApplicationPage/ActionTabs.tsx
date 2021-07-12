import { Alert, Form, message } from 'antd';
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

const actionVariables = {
    onboarding: {
        text: 'Onboarding Link',
    },
    report: {
        text: 'Report Link',
        link: 'www.reportlink.com',
    },
};

interface ActionTabProps {
    action: string;
    email: string;
    links: LinkInfo;
    docs: ConsentDocument[];
}

export const ActionTabs = ({ action, email, links, docs }: ActionTabProps): JSX.Element => {
    const textT = action == 'onboarding' ? actionVariables.onboarding.text : actionVariables.report.text;
    const linkT = action == 'onboarding' ? links.onboarding_link : actionVariables.report.link;

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

    return (
        <FormWrapper>
            {action === 'documents' ? (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send documents to the following email</StyledParaN>
                    <InputWrapper value={email} disabled={email === '-'} />
                    <ButtonWrapper type="primary" disabled={email === '-'}>
                        Send
                    </ButtonWrapper>
                    {email === '-' ? <Alert type="error" message={`No email found for the applicant.`} /> : ''}
                    <br />
                    <StyledParaNB> Documents to Send</StyledParaNB>
                    <PDFViewer docs={docs} />
                </Form>
            ) : (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email </StyledParaN>
                    <div>
                        <InputWrapper value={email} disabled={email === '-'} />
                        <ButtonWrapper type="primary" disabled={linkT === null || email === '-'}>
                            Send
                        </ButtonWrapper>
                    </div>
                    {email === '-' ? <Alert type="error" message={`No email found for the applicant.`} /> : ''}
                    <br />
                    <StyledParaNB> {textT} </StyledParaNB>
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
                </Form>
            )}
        </FormWrapper>
    );
};
