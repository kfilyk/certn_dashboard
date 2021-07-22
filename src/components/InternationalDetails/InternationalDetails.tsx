import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory, useParams } from 'react-router-dom';
import { notification, Spin, Modal } from 'antd';
//import { ModalContent, ModalTitle } from './components/styled';

//import { CANADA, isUSAOrCanada, US } from 'utils/constants';
const CANADA = 'CANADA';
const US = 'US';
//import { OTHER } from 'constants/international';
const OTHER = 'OT';
function isUSAOrCanada(country: string) {
    if (country == 'CANADA' || country == 'US') {
        return true;
    }
    return false;
}

interface Address {
    province_state: string;
    country: string;
}

/*
import DetailsForm from './components/DetailsForm';
import { fetchDetails, patchDetails } from './InternationalActions';
*/
const Page = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    .ant-card {
        margin-bottom: 10px;

        .ant-card-head-title {
            font-weight: bold;
            font-size: 14px;
        }
    }
`;

/**
 * Replace the sin and ssn values with identity_numbers.
 * Also makes sure the province_state and other_province_state fields
 * are properly set.
 * @param {object} values the form values being submitted
 * @param {object} values.information the information values
 * @return {*} the adjusted form values
 */
const adjustFormData = (values: any) => {
    const { information } = values;
    const { sin, ssn, addresses: formAddresses = [], ...rest } = information;
    const identity_numbers = [];
    if (sin) {
        identity_numbers.push({ country: CANADA, number: sin });
    }
    if (ssn) {
        identity_numbers.push({ country: US, number: ssn });
    }

    values.passports.forEach((passport: any) => {
        passport.document_expiration = passport.document_expiration.format('YYYY-MM-DD');
    });

    // Set the province_state and other_province_state based on the country
    const addresses = formAddresses.map((address: Address) => {
        const { province_state } = address;
        // set other_province_state to null for Canada & US
        if (isUSAOrCanada(address.country)) {
            return {
                ...address,
                other_province_state: null,
            };
        }
        // Set the province_state to 'OT' for non-Canada/US
        return {
            ...address,
            province_state: OTHER,
            other_province_state: province_state,
        };
    });

    return {
        ...values,
        information: {
            ...rest,
            identity_numbers,
            addresses,
        },
    };
};

const InternationalDetails = (): JSX.Element => {
    const history = useHistory();
    //const { id } = useParams();
    const [check, setCheck] = useState({});
    const [busy, setBusy] = useState(true);
    /*
    useEffect(() => {
        const loadDetails = async () => {
            setBusy(true);
            try {
                const result = await fetchDetails(id);
                setCheck(result);
                setBusy(false);
            } catch (err) {
                console.error(`Couldn't find details for ${id}`, err);
                setBusy(false);
                setCheck({});
            }
        };
        loadDetails();
    }, [id, setCheck, setBusy]);

    const applicantName = [check.information?.first_name, check.information?.last_name]
        .filter(Boolean)
        .join(' ');

    const onSave = async values => {
        const data = adjustFormData(values);
        try {
            await patchDetails(check.id, data);
            if (data.submit) {
                notification.success({
                    key: 'intl-submit-success',
                    message: 'Order submitted successfully!',
                    duration: 3,
                });
            } else {
                notification.success({
                    key: 'intl-save-success',
                    message: 'Order saved successfully!',
                    duration: 3,
                });
            }
            history.push(`/international`);
        } catch (err) {
            console.error(`Error saving notes and status for ${id}`, err);
        }
    };

    const onSubmit = data => {
        Modal.confirm({
            title: <ModalTitle>Confirm submission</ModalTitle>,
            content: (
                <ModalContent>{`You’re about to submit this application on behalf of ${applicantName}. Ensure all information is accurate and true.`}</ModalContent>
            ),
            okText: 'Submit',
            icon: null,
            centered: true,
            width: '465px',
            onOk() {
                onSave({
                    ...data,
                    submit: true,
                });
            },
        });
    };

    return (
        <Page>
            {busy ? (
                <Spin />
            ) : (
                <DetailsForm
                    onSave={onSave}
                    onSubmit={onSubmit}
                    isSaving={busy}
                    check={check}
                    applicantName={applicantName}
                />
            )}
        </Page>
    );
    */
    return <div></div>;
};

export default InternationalDetails;
