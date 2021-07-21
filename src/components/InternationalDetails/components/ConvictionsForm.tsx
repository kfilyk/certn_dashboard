import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Form, Input } from 'antd';

import { Section } from './styled';
import CountrySelect from 'components/CountrySelect';

const Row = styled.div`
    display: flex;
    align-items: flex-start;
    
    .ant-select, .ant-input {
        width: 200px;
    }
`;

const ConvictionsForm = ({
    form,
    convictionSource,
    inquiryCountryCode,
    inquiryResults,
    submitted,
}) => {
    const [convictionSourceValue, setConvictionSource] = useState(convictionSource);
    const [inquiryCountryValue, setInquiryCountry] = useState(inquiryCountryCode);
    const [inquiryResultsValue, setInquiryResults] = useState(inquiryResults);

    const { getFieldDecorator, validateFields } = form;

    // If one has a value -> all required. If none have values -> not required
    const required = Boolean(
        convictionSourceValue || inquiryCountryValue || inquiryResultsValue,
    );

    // When any convictions fields change, we need to validate all 3 fields
    // But only do this after submitting as it is a nicer UX
    useEffect(() => {
        if (submitted) {
            validateFields(
                ['conviction_source', 'inquiry_country_code', 'inquiry_results'],
                { force: true },
            );
        }
    }, [
        convictionSourceValue,
        inquiryCountryValue,
        inquiryResultsValue,
        submitted,
        validateFields,
    ]);

    // Only show the validation after submitting, nicer UX
    const validateTrigger = submitted ? 'onChange' : 'onSubmit';

    return (
        <Section title="Convictions">
            <Row>
                <Form.Item label="Country of inquiry">
                    {getFieldDecorator('inquiry_country_code', {
                        initialValue: inquiryCountryValue || undefined,
                        validateTrigger,
                        rules: [
                            {
                                required,
                                message: 'Please choose a country',
                            },
                        ],
                    })(
                        <CountrySelect
                            placeholder="Select country"
                            onChange={value => setInquiryCountry(value)}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Source">
                    {getFieldDecorator('conviction_source', {
                        initialValue: convictionSourceValue,
                        validateTrigger,
                        rules: [
                            {
                                required,
                                message: 'Please enter the source',
                            },
                        ],
                    })(
                        <Input
                            placeholder="Enter the source"
                            onChange={e => setConvictionSource(e.target.value)}
                        />,
                    )}
                </Form.Item>
            </Row>
            <Form.Item label="Inquiry results">
                {getFieldDecorator(`inquiry_results`, {
                    initialValue: inquiryResultsValue,
                    validateTrigger,
                    rules: [
                        {
                            required,
                            message: 'Please enter the inquiry results',
                        },
                    ],
                })(
                    <Input.TextArea
                        onChange={e => setInquiryResults(e.target.value)}
                        autoSize={{ minRows: 4 }}
                        style={{ marginBottom: 0 }}
                    />,
                )}
            </Form.Item>
        </Section>
    );
};

ConvictionsForm.propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        validateFields: PropTypes.func.isRequired,
    }).isRequired,
    submitted: PropTypes.bool.isRequired,
    convictionSource: PropTypes.string,
    inquiryCountryCode: PropTypes.string,
    inquiryResults: PropTypes.string,
};

ConvictionsForm.defaultProps = {
    convictionSource: '',
    inquiryCountryCode: undefined,
    inquiryResults: '',
};

export default ConvictionsForm;
