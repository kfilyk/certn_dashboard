import React from 'react';
import PropTypes from 'prop-types';
import { OTHER } from 'constants/international';

const propTypes = {
    address: PropTypes.shape({
        current: PropTypes.bool,
        address: PropTypes.string,
        city: PropTypes.string,
        province_state: PropTypes.string,
        other_province_state: PropTypes.string,
        country: PropTypes.string,
        country_label: PropTypes.string,
        postal_code: PropTypes.string,
        full_address: PropTypes.string,
    }).isRequired,
};

const defaultProps = {};

const AddressPart = ({ value, separator, bold }) => {
    if (value) {
        const label = `${value}${separator}`;
        return <span style={{ fontWeight: bold ? 'bold' : 'normal' }}>{label}</span>;
    }
    return null;
};

AddressPart.propTypes = {
    value: PropTypes.string,
    separator: PropTypes.string,
    bold: PropTypes.bool,
};

AddressPart.defaultProps = {
    value: undefined,
    separator: ', ',
    bold: false,
};

const AddressHeader = ({ address }) => {
    const {
        address: street,
        city,
        country_label: country,
        province_state,
        other_province_state,
        postal_code: postalCode,
    } = address;
    const province = province_state === OTHER ? other_province_state : province_state;
    return (
        <>
            <AddressPart value={street} bold />
            <AddressPart value={city} />
            <AddressPart value={province} separator=" " />
            <AddressPart value={postalCode} />
            <AddressPart value={country} separator="" />
        </>
    );
};

AddressHeader.propTypes = propTypes;
AddressHeader.defaultProps = defaultProps;

export default AddressHeader;
