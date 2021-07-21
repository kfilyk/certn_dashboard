import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form, Input } from 'antd';
import styled from 'styled-components/macro';

import { CANADA, US } from 'utils/constants';
import { isDateInPast } from 'utils/dates';
import Regex from 'constants/regex';
import ProvinceStateSelect from 'components/ProvinceStateSelect';
import CountrySelect from 'components/CountrySelect';

const FormLayout = styled.div`
    display: flex;
    align-items: flex-start;

    .ant-select, .ant-input {
        width: 200px;
    }
`;

const PassportForm = ({ form }) => {
    const [country, setCountry] = useState();

    const { getFieldDecorator, resetFields } = form;

    const onCountryChange = value => {
        if (value !== country) {
            setCountry(value);
            resetFields(['document_issuing_province_state']);
        }
    };

    return (
        <Form layout="vertical">
            <FormLayout>
                <Form.Item>
                    {getFieldDecorator('document_number', {
                        validateTrigger: 'onChange',
                        rules: [
                            {
                                required: true,
                                pattern: Regex.passport,
                                message: 'Enter a passport number',
                            },
                        ],
                    })(<Input placeholder="Passport Number" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('document_expiration', {
                        validateTrigger: 'onChange',
                        rules: [
                            {
                                required: true,
                                message: 'Enter the expiration date.',
                            },
                        ],
                    })(
                        <DatePicker
                            placeholder="YYYY-MM-DD"
                            format="YYYY-MM-DD"
                            disabledDate={dt => isDateInPast(dt)}
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('document_issuing_country', {
                        validateTrigger: 'onChange',
                        rules: [
                            {
                                required: true,
                                message: 'Select the issuing country',
                            },
                        ],
                    })(<CountrySelect placeholder="Issuing Country" onChange={onCountryChange} />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('document_issuing_province_state', {
                        validateTrigger: 'onChange',
                        rules: [
                            {
                                required: true,
                                validator: (rule, value, callback) => {
                                    let err;
                                    if (!value) {
                                        if (country === CANADA) {
                                            err = 'Select the issuing province';
                                        } else if (country === US) {
                                            err = 'Select the issuing state';
                                        } else {
                                            err = 'Enter the issuing province or state';
                                        }
                                    }
                                    callback(err);
                                },
                            },
                        ],
                    })(<ProvinceStateSelect countryCode={country} />)}
                </Form.Item>
            </FormLayout>
        </Form>
    );
};

PassportForm.propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func,
        resetFields: PropTypes.func,
    }).isRequired,
};

export default PassportForm;
