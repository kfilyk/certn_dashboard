import React from 'react';
import PropTypes from 'prop-types';
import { DetailLabel, DetailValue, StyledDetail } from './styled';

const DetailImage = ({ label, src, flexBasis = '33%' }) => {
    return (
        <StyledDetail style={{ flexBasis, maxWidth: flexBasis }}>
            <DetailLabel>{label}</DetailLabel>
            <DetailValue>{src ? <img src={src} alt={label} /> : '-'}</DetailValue>
        </StyledDetail>
    );
};

DetailImage.propTypes = {
    label: PropTypes.string.isRequired,
    src: PropTypes.string,
    flexBasis: PropTypes.string,
};

DetailImage.defaultProps = {
    src: '',
    flexBasis: '33%',
};

export default DetailImage;
