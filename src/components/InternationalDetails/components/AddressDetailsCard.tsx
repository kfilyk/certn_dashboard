import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import styled from 'styled-components/macro';

import { SectionContent, Section } from './styled';
import AddressHeader from './AddressHeader';
import AddressForm from './AddressForm';

const AddressCollapse = styled(Collapse)`
    width: 100%;
    background-color: transparent;
    border: 0 none;
    border-radius: 0;
    .ant-collapse-item {
        border-radius: 0 !important;
        .ant-collapse-header {
            padding: 10px 16px;
        }
    }
    .ant-collapse-content {
        border-top: 0 none;
    }
`;

const AddressDetailsCard = ({ information, form, addressErrorIds }) => {
    const [activeKey, setActiveKey] = useState([]);
    const { addresses = [] } = information;

    useEffect(() => {
        if (addressErrorIds && addressErrorIds.length > 0) {
            setActiveKey(addressErrorIds);
        }
    }, [setActiveKey, addressErrorIds]);

    return (
        <Section title="Address history and details">
            <SectionContent>
                {addresses.length === 0 ? (
                    '-'
                ) : (
                    <AddressCollapse
                        activeKey={activeKey}
                        onChange={value => setActiveKey(value)}
                        expandIconPosition="right"
                        destroyInactivePanel={false}
                    >
                        {addresses.map((address, index) => (
                            <Collapse.Panel key={address.id} header={<AddressHeader address={address} />} forceRender>
                                <AddressForm address={address} index={index} form={form} />
                            </Collapse.Panel>
                        ))}
                    </AddressCollapse>
                )}
            </SectionContent>
        </Section>
    );
};

AddressDetailsCard.propTypes = {
    information: PropTypes.objectOf(PropTypes.any).isRequired,
    form: PropTypes.shape({
        getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    addressErrorIds: PropTypes.arrayOf(PropTypes.string),
};

AddressDetailsCard.defaultProps = {
    addressErrorIds: null,
};

export default AddressDetailsCard;
