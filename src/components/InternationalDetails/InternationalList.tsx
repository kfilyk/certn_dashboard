import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { AGENT_STATUS_NEW } from 'constants/international';
import ResultsTable from './components/ResultsTable';
import NoResults from './components/NoResults';
import { fetchList } from './InternationalActions';

const Page = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    align-items: stretch;
`;

export function getReportValues(check) {
    const record = check.record_check || {};
    const countryName = record.country;
    const countryCode = (check.record_check_request || {}).country;
    const report = record?.report || {};
    const reportClearance = report.report_clearance;
    const agentStatus = check.agent_status;
    const agentStatusLabel = check.agent_status_label;
    const values = {
        countryName,
        countryCode,
        reportClearance,
        agentStatus,
        agentStatusLabel,
    };
    const attributes = report.report_attributes?.[0];
    if (attributes) {
        const convictionSource = attributes.sources?.[0] || '';
        let inquiryCountryCode;
        let inquiryResults = '';
        (attributes.fields || []).forEach(({ label, inquiry_results }) => {
            if (label === 'Country') {
                inquiryCountryCode = inquiry_results;
            } else if (label === 'Inquiry Results') {
                inquiryResults = inquiry_results;
            }
        });
        return {
            ...values,
            convictionSource,
            inquiryCountryCode,
            inquiryResults,
        };
    }
    return values;
}

/**
 * Convert the data into the expected format for showing in a table.
 * @param {Array} apiData the data from the API
 * @returns Array of table data
 */
function convertData(apiData) {
    return (apiData || []).map((check) => {
        const { id, information = {}, applicant_account = {} } = check;
        const name = [information.first_name, information.last_name].filter(Boolean).join(' ');
        const { agentStatusLabel, countryName, countryCode } = getReportValues(check);
        const status = agentStatusLabel || AGENT_STATUS_NEW;
        const email = applicant_account.email || '-';
        return {
            id,
            name,
            email,
            status,
            countryName,
            countryCode,
        };
    });
}

const InternationalList = (): JSX.Element => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const showTable = loading || data.length > 0;
    const tableData = convertData(data);

    useEffect(() => {
        const loadResults = async () => {
            setLoading(true);
            try {
                const results = await fetchList();
                setLoading(false);
                setData(results);
            } catch (err) {
                console.error('Failed to load International Record Checks', err);
                setLoading(false);
                setData([]);
            }
        };
        loadResults();
    }, [setLoading, setData]);
    return <Page>{showTable ? <ResultsTable tableData={tableData} isLoading={loading} /> : <NoResults />}</Page>;
};

export default InternationalList;
