/* eslint-disable no-console */
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
import { Spin } from 'antd';

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

export const ActionTabs = (Props: any): JSX.Element => {
    const textT = Props.action == 'onboarding' ? actionVariables.onboarding.text : actionVariables.report.text;

    const linkT = Props.action == 'onboarding' ? actionVariables.onboarding.link : actionVariables.report.link;

    return (
        <FormWrapper>
            {Props.action === 'documents' ? (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send documents to the following email</StyledParaN>
                    <InputWrapper value={Props.email} />
                    <ButtonWrapper type="primary">Send</ButtonWrapper>
                    <StyledParaNB> Documents to Send</StyledParaNB>
                    <Spin spinning={Props.loading.search}>
                        <PDFViewer docs={Props.docs} />
                    </Spin>
                </Form>
            ) : (
                <Form>
                    <StyledParaB>Recipient</StyledParaB>
                    <StyledParaN> Send {textT} to the following email </StyledParaN>
                    <div>
                        <InputWrapper value={Props.email} />
                        <ButtonWrapper type="primary">Send</ButtonWrapper>
                    </div>
                    <StyledParaNB> {textT} </StyledParaNB>
                    <InputLinkWrapper addonBefore="http://" defaultValue={linkT} disabled />
                </Form>
            )}
        </FormWrapper>
    );
};
