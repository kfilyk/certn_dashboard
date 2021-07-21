import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import styled from 'styled-components/macro';
import { OTHER, cityRules, provinceRules, requiredRules, getPostalCodeRules } from 'constants/international';
import DateInput from 'components/DateInput';
import ProvinceStateSelect from 'components/ProvinceStateSelect';
import CountrySelect from 'components/CountrySelect';

const Wrap = styled.div`
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;

    .ant-form-item {
        flex: 0 1 20%;
        min-width: 200px;
    }
`;

const propTypes = {
    address: PropTypes.shape({
        id: PropTypes.string.isRequired,
        current: PropTypes.bool,
        address: PropTypes.string,
        city: PropTypes.string,
        province_state: PropTypes.string,
        other_province_state: PropTypes.string,
        country: PropTypes.string,
        country_label: PropTypes.string,
        postal_code: PropTypes.string,
        start_date: PropTypes.string,
        end_date: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func,
        setFieldsValue: PropTypes.func,
        validateFields: PropTypes.func,
    }).isRequired,
};

const defaultProps = {};

const AddressForm = ({ address, index, form }): JSX.Element => {
    const [countryCode, setCountryCode] = useState(address.country);
    const { getFieldDecorator, validateFields } = form;

    let province = address.province_state || OTHER;
    if (province === OTHER) {
        province = address.other_province_state;
    }
    const base = `information.addresses[${index}]`;

    const onCountryChange = value => {
        if (value !== countryCode) {
            setCountryCode(value);
            form.setFieldsValue({
                [`${base}.province_state`]: null,
            });
        }
    };

    // Validate postal code when country changes
    useEffect(() => {
        validateFields([`${base}.postal_code`]);
    }, [base, countryCode, validateFields]);

    return (
        <Wrap>
            <Form.Item style={{ display: 'none' }}>
                {getFieldDecorator(`${base}.id`, {
                    initialValue: address.id,
                })(<Input />)}
            </Form.Item>
            <Form.Item label="Address">
                {getFieldDecorator(`${base}.address`, {
                    initialValue: address.address,
                })(<Input placeholder="Address" />)}
            </Form.Item>
            <Form.Item label="City">
                {getFieldDecorator(`${base}.city`, {
                    initialValue: address.city,
                    rules: cityRules,
                })(<Input placeholder="City" />)}
            </Form.Item>
            <Form.Item label="State/Region/Province">
                {getFieldDecorator(`${base}.province_state`, {
                    initialValue: province,
                    rules: provinceRules,
                })(<ProvinceStateSelect countryCode={countryCode} />)}
            </Form.Item>
            <Form.Item label="ZIP/Postal Code">
                {getFieldDecorator(`${base}.postal_code`, {
                    initialValue: address.postal_code,
                    rules: getPostalCodeRules(countryCode),
                    validateTrigger: 'onChange',
                })(<Input placeholder="ZIP/Postal code"/>)}
            </Form.Item>
            <Form.Item label="Country">
                {getFieldDecorator(`${base}.country`, {
                    initialValue: countryCode,
                    rules: requiredRules,
                })(<CountrySelect onChange={onCountryChange} />)}
            </Form.Item>
            <Form.Item label="From">
                {getFieldDecorator(`${base}.start_date`, {
                    initialValue: address.start_date,
                })(<DateInput />)}
            </Form.Item>
            <Form.Item label="To">
                {getFieldDecorator(`${base}.end_date`, {
                    initialValue: address.end_date,
                })(<DateInput />)}
            </Form.Item>
        </Wrap>
    );
};

AddressForm.propTypes = propTypes;
AddressForm.defaultProps = defaultProps;

export default AddressForm;
