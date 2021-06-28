import { Form } from 'antd';
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
        link: 'www.onboardinglink.com',
    },
    report: {
        text: 'Report Link',
        link: 'www.reportlink.com',
    },
};

interface ActionTabProps {
    action: string;
    email: string;
}

export const ActionTabs = ({ action, email }: ActionTabProps): JSX.Element => {
    const textT = action == 'onboarding' ? actionVariables.onboarding.text : actionVariables.report.text;

    const linkT = action == 'onboarding' ? actionVariables.onboarding.link : actionVariables.report.link;

    return (
        <FormWrapper>
            {action === 'documents' ? (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send documents to the following email</StyledParaN>
                    <InputWrapper value={email} />
                    <ButtonWrapper type="primary">Send</ButtonWrapper>
                    <StyledParaNB> Documents to Send</StyledParaNB>
                    <PDFViewer />
                </Form>
            ) : (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email </StyledParaN>
                    <div>
                        <InputWrapper value={email} />
                        <ButtonWrapper type="primary">Send</ButtonWrapper>
                    </div>
                    <StyledParaNB> {textT} </StyledParaNB>
                    <InputLinkWrapper addonBefore="http://" defaultValue={linkT} disabled />
                </Form>
            )}
        </FormWrapper>
    );
};
