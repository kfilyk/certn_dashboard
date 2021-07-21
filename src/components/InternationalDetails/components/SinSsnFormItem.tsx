import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import { CANADA, US } from 'utils/constants';
import { sinRules, ssnRules } from 'constants/international';

const propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    identityNumbers: PropTypes.arrayOf(
        PropTypes.shape({
            country: PropTypes.string,
            number: PropTypes.string,
        }),
    ),
    validateTrigger: PropTypes.string,
};

const defaultProps = {
    identityNumbers: [],
    validateTrigger: undefined,
};

/**
 * Renders a SIN form item always.
 * Only renders an SSN form item if identity numbers contain a US SSN number.
 */
const SinSsnFormItem = ({ getFieldDecorator, identityNumbers, validateTrigger }) => {
    const sin = identityNumbers.find(id => id.country === CANADA)?.number;
    const ssn = identityNumbers.find(id => id.country === US)?.number;
    return (
        <>
            <Form.Item label="SIN">
                {getFieldDecorator('information.sin', {
                    initialValue: sin,
                    rules: sinRules,
                    validateTrigger,
                })(<Input />)}
            </Form.Item>
            {ssn !== undefined && (
                <Form.Item label="SSN">
                    {getFieldDecorator('information.ssn', {
                        initialValue: ssn,
                        rules: ssnRules,
                        validateTrigger,
                    })(<Input />)}
                </Form.Item>
            )}
        </>
    );
};

SinSsnFormItem.propTypes = propTypes;
SinSsnFormItem.defaultProps = defaultProps;

export default SinSsnFormItem;
