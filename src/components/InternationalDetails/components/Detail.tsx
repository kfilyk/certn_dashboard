import React from 'react';
import PropTypes from 'prop-types';
import { DetailLabel, DetailValue, StyledDetail } from './styled';

const Detail = ({ label, value, footerLabel, flexBasis = '20%' }) => {
    let val = value;
    if (value === undefined || value === null || value === '') {
        val = '-';
    }
    return (
        <StyledDetail style={{ flexBasis, maxWidth: flexBasis }}>
            <DetailLabel>{label}</DetailLabel>
            <DetailValue>{val}</DetailValue>
            {footerLabel && <DetailLabel>{footerLabel}</DetailLabel>}
        </StyledDetail>
    );
};

Detail.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.node,
    ]),
    footerLabel: PropTypes.string,
    flexBasis: PropTypes.string,
};

Detail.defaultProps = {
    value: undefined,
    footerLabel: undefined,
    flexBasis: '20%',
};

export default Detail;
