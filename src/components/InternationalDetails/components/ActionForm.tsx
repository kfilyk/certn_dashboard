import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Select, Input } from 'antd';
import styled from 'styled-components/macro';
import colors from 'styles/colors';
import { Section } from './styled';
import { COMPLETE } from 'constants/international';
import SearchSelect from 'components/SearchSelect';

const { Option } = Select;

const BottomRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .ant-select, .ant-form-explain {
        width: 200px;
    }
`;

const ButtonBar = styled.div`
    width: 100%;
    padding: 25px 0 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const SaveButton = styled(Button)`
    min-width: 185px;
    margin-right: 10px;
    color: ${colors.primary};
    background-color: #fff;
    border-color: ${colors.primary};
`;

const SubmitButton = styled(Button)`
    min-width: 100px;
`;

const propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        validateFields: PropTypes.func.isRequired,
        setFields: PropTypes.func.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    internalNotes: PropTypes.string,
    agentStatusOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
    agentStatus: PropTypes.string,
    reportClearanceOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
    ).isRequired,
    reportClearance: PropTypes.string,
};

const defaultProps = {
    internalNotes: '',
    agentStatus: undefined,
    reportClearance: undefined,
};

const ActionForm = ({
    form,
    internalNotes,
    agentStatusOptions,
    agentStatus,
    reportClearanceOptions,
    reportClearance,
    isSaving,
    onSave,
    onSubmit,
}) => {
    const { getFieldDecorator } = form;

    const onAgentStatusChange = value => {
        if (value === COMPLETE) {
            form.setFields({
                agent_status: { value, errors: null },
            });
        }
    };

    const onOrderResultChange = value => {
        if (value) {
            form.setFields({
                report_clearance: { value, errors: null },
            });
        }
    };

    return (
        <Section title="Action bar">
            <Form.Item label="Internal notes">
                {getFieldDecorator(`internal_notes`, {
                    initialValue: internalNotes,
                })(<Input.TextArea autoSize={{ minRows: 4 }} style={{ marginBottom: 0 }} />)}
            </Form.Item>
            <BottomRow>
                <Form.Item label="Order status">
                    {getFieldDecorator('agent_status', {
                        initialValue: agentStatus || undefined,
                    })(
                        <SearchSelect
                            placeholder="Please select"
                            onChange={onAgentStatusChange}
                        >
                            {agentStatusOptions.map(({ value: optValue, label }) => (
                                <Select.Option value={optValue} key={optValue}>
                                    {label}
                                </Select.Option>
                            ))}
                        </SearchSelect>,
                    )}
                </Form.Item>
                <Form.Item label="Order result">
                    {getFieldDecorator('report_clearance', {
                        initialValue: reportClearance || undefined,
                    })(
                        <SearchSelect
                            placeholder="Please select"
                            onChange={onOrderResultChange}
                        >
                            {reportClearanceOptions.map(({ value, label }) => (
                                <Option value={value} key={value}>
                                    {label}
                                </Option>
                            ))}
                        </SearchSelect>,
                    )}
                </Form.Item>
            </BottomRow>
            <ButtonBar>
                <SaveButton onClick={onSave} loading={isSaving}>
                    Save and close
                </SaveButton>
                <SubmitButton type="primary" onClick={onSubmit} loading={isSaving}>
                    Submit
                </SubmitButton>
            </ButtonBar>
        </Section>
    );
};

ActionForm.propTypes = propTypes;
ActionForm.defaultProps = defaultProps;

export default ActionForm;
