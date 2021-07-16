import { Form, message } from 'antd';
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
}
export const ActionTabs = ({ action, email, links }: ActionTabProps): JSX.Element => {
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
                    <div style={{ display: 'flex', justifyContent: 'right', flex: 2, margin: '5px 25px 25px 25px' }}>
                        <InputWrapper value={email} />
                        <ButtonWrapper type="primary">Send</ButtonWrapper>
                    </div>
                    <StyledParaNB> Documents to Send</StyledParaNB>
                    <PDFViewer />
                </Form>
            ) : (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email </StyledParaN>
                    <div style={{ display: 'flex', justifyContent: 'right', flex: 2, margin: '5px 25px 25px 25px' }}>
                        <InputWrapper value={email} />
                        <ButtonWrapper type="primary">Send</ButtonWrapper>
                    </div>
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
                            value={linkT}
                            onChange={() => {
                                message.error({
                                    content: 'URL cannot be edited!',
                                });
                            }}
                        />
                    </div>
                </Form>
            )}
        </FormWrapper>
    );
};
