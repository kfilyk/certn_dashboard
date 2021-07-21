import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import {
    cityRules,
    nameOptionalRules,
    nameRequiredRules,
    phoneRules,
    provinceRules,
    requiredRules,
    dateRequiredRules,
    PASSPORT,
} from 'constants/international';
import styled from 'styled-components/macro';
import DateInput from 'components/DateInput';
import ProvinceStateSelect from 'components/ProvinceStateSelect';
import CountrySelect from 'components/CountrySelect';
import { SectionContent, Section } from './styled';
import SinSsnFormItem from './SinSsnFormItem';
import PassportDetails from './PassportDetails';

const propTypes = {
    information: PropTypes.objectOf(PropTypes.any).isRequired,
    countryName: PropTypes.string.isRequired,
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
        validateFields: PropTypes.func.isRequired,
    }).isRequired,
};

const validateTrigger = 'onChange';

const PassportTitle = styled.div`
    flex-basis: 100%;
    font-weight: bold;
    font-size: 14px;
    padding: 16px 0;
`;

const ApplicantDetailsForm = ({ information, attachments, countryName, form }) => {
    const [countryCode, setCountryCode] = useState(information.birth_country);

    const { getFieldDecorator } = form;

    const onCountryChange = value => {
        setCountryCode(value);
    };

    const passports = [];
    // Find the passports - there could be multiple in theory
    attachments.forEach(doc => {
        const {
            id,
            file_name: name,
            document_type: type,
            document_number: docNumber,
            document_issuing_province_state: provinceState,
            document_issuing_country: country,
            document_expiration: expires = '',
        } = doc;
        if (type === PASSPORT) {
            passports.push({
                id,
                name,
                provinceState,
                docNumber,
                country,
                expires,
            });
        }
    });

    return (
        <Section title={`Applicant details for ${countryName}`}>
            <SectionContent>
                <Form.Item label="First name">
                    {getFieldDecorator('information.first_name', {
                        initialValue: information.first_name,
                        rules: nameRequiredRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Middle name">
                    {getFieldDecorator('information.middle_name', {
                        initialValue: information.middle_name,
                        rules: nameOptionalRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Last name">
                    {getFieldDecorator('information.last_name', {
                        initialValue: information.last_name,
                        rules: nameRequiredRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Maiden name">
                    {getFieldDecorator('information.mothers_maiden_name', {
                        initialValue: information.mothers_maiden_name,
                        rules: nameOptionalRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Alias/nickname">
                    {getFieldDecorator('information.alias', {
                        initialValue: information.alias,
                        rules: nameOptionalRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Date of birth">
                    {getFieldDecorator('information.date_of_birth', {
                        initialValue: information.date_of_birth,
                        validateTrigger,
                        rules: dateRequiredRules,
                    })(<DateInput />)}
                </Form.Item>
                <Form.Item label="Country of birth">
                    {getFieldDecorator('information.birth_country', {
                        initialValue: countryCode,
                        rules: requiredRules,
                        validateTrigger,
                    })(<CountrySelect allowClear={false} onChange={onCountryChange} />)}
                </Form.Item>
                <Form.Item label="Province of birth">
                    {getFieldDecorator('information.birth_province_state', {
                        initialValue: information.birth_province_state,
                        rules: provinceRules,
                        validateTrigger,
                    })(
                        <ProvinceStateSelect
                            countryCode={countryCode}
                            allowClear={false}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="City of birth">
                    {getFieldDecorator('information.birth_city', {
                        initialValue: information.birth_city,
                        rules: cityRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Phone number">
                    {getFieldDecorator('information.phone_number', {
                        initialValue: information.phone_number,
                        rules: phoneRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Sex">
                    {getFieldDecorator('information.gender', {
                        initialValue: information.gender,
                        rules: requiredRules,
                    })(
                        <Select>
                            <Select.Option value="M">Male</Select.Option>
                            <Select.Option value="F">Female</Select.Option>
                        </Select>,
                    )}
                </Form.Item>
                <SinSsnFormItem
                    getFieldDecorator={getFieldDecorator}
                    identityNumbers={information.identity_numbers}
                    validateTrigger={validateTrigger}
                />
                {passports.map((passport, index) => (
                    <React.Fragment key={passport.id}>
                        <PassportTitle>Passport: {passport.name}</PassportTitle>
                        <PassportDetails
                            form={form}
                            passport={passport}
                            passIndex={index}
                        />
                    </React.Fragment>
                ))}
            </SectionContent>
        </Section>
    );
};

ApplicantDetailsForm.propTypes = propTypes;

export default ApplicantDetailsForm;
