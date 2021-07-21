import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Form, Input } from 'antd';
import moment from 'moment';
import styled from 'styled-components/macro';

import { CANADA, US } from 'utils/constants';
import { isDateInPast, API_DATE_FORMAT } from 'utils/dates';
import Regex from 'constants/regex';
import ProvinceStateSelect from 'components/ProvinceStateSelect';
import CountrySelect from 'components/CountrySelect';

const FormLayout = styled.div`
    display: flex;
    align-items: flex-start;

    .ant-select,
    .ant-input {
        width: 200px;
    }
`;

const PassportDetails = ({ form, passport, passIndex }) => {
    const [country, setCountry] = useState();

    const { getFieldDecorator, setFieldsValue } = form;

    const onCountryChange = value => {
        if (value !== country) {
            setFieldsValue({
                [`passports[${passIndex}].document_issuing_province_state`]: undefined,
            });
            setCountry(value);
        }
    };

    return (
        <Form layout="vertical">
            <FormLayout>
                <Form.Item style={{ display: 'none' }}>
                    {getFieldDecorator(`passports[${passIndex}].id`, {
                        initialValue: passport.id,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Passport Number">
                    {getFieldDecorator(`passports[${passIndex}].document_number`, {
                        validateTrigger: 'onChange',
                        initialValue: passport.docNumber,
                        rules: [
                            {
                                required: true,
                                pattern: Regex.passport,
                                message: 'Enter a passport number',
                            },
                        ],
                    })(<Input placeholder="Passport Number" />)}
                </Form.Item>
                <Form.Item label="Expires At">
                    {getFieldDecorator(`passports[${passIndex}].document_expiration`, {
                        validateTrigger: 'onChange',
                        initialValue: passport.expires
                            ? moment(passport.expires, API_DATE_FORMAT)
                            : '',
                        rules: [
                            {
                                required: true,
                                message: 'Enter the expiration date.',
                            },
                        ],
                    })(
                        <DatePicker
                            placeholder={API_DATE_FORMAT}
                            format={API_DATE_FORMAT}
                            disabledDate={dt => isDateInPast(dt)}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Issuing Country">
                    {getFieldDecorator(
                        `passports[${passIndex}].document_issuing_country`,
                        {
                            validateTrigger: 'onChange',
                            initialValue: passport.country,
                            rules: [
                                {
                                    required: true,
                                    message: 'Select the issuing country',
                                },
                            ],
                        },
                    )(
                        <CountrySelect
                            placeholder="Issuing Country"
                            onChange={onCountryChange}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Issuing Province/State">
                    {getFieldDecorator(
                        `passports[${passIndex}].document_issuing_province_state`,
                        {
                            validateTrigger: 'onChange',
                            initialValue: passport.provinceState,
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
                                                err =
                                                    'Enter the issuing province or state';
                                            }
                                        }
                                        callback(err);
                                    },
                                },
                            ],
                        },
                    )(<ProvinceStateSelect countryCode={country} />)}
                </Form.Item>
            </FormLayout>
        </Form>
    );
};

PassportDetails.propTypes = {
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func,
        setFieldsValue: PropTypes.func,
    }).isRequired,
    passIndex: PropTypes.number.isRequired,
    passport: PropTypes.shape({
        id: PropTypes.string,
        docNumber: PropTypes.string,
        expires: PropTypes.string,
        country: PropTypes.string,
        provinceState: PropTypes.string,
    }).isRequired,
};

export default PassportDetails;
