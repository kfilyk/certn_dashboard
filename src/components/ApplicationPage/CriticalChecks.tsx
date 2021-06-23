/* eslint-disable no-console */
import { CriticalChecksInfo, CriticalChecksResult, CertnVerification } from '../../interfaces';
// Ant Design Imports
import 'antd/dist/antd.css';
import { Collapse, List } from 'antd';
import {
    CompleteHeader,
    CompleteBadge,
    PendingHeader,
    PendingBadge,
    FailureHeader,
    FailureBadge,
} from './ApplicationPageSC';
import styled from 'styled-components';

// Temp until all components for application page are completed
const CollapseWrapper = styled.div`
    margin: 50px;
    border: 1px solid gray;
    width: 15%;
`;

// Interfaces
type ChecksProps = {
    checks: CriticalChecksInfo;
};

type SimplifiedChecks = {
    result: string | undefined;
    name: string;
};

// Map between API name and correctly formatted name
const criticalCheckTitles = {
    us_criminal_record_check_result: 'US Criminal Record Check',
    international_criminal_record_check_result: 'Criminal Record Search',
    ssn_verification_result: 'SSN Verification',
    reference_result: 'References Check',
    motor_vehicle_record_result: 'Motor Vehicle Records (USA)',
    equifax_result: 'Equifax Credit Report',
    employment_verification: 'Employment Verification',
    education_verification: 'Education Verification',
    credential_verification: 'Credential Verification',
} as Record<string, string>;

// Assign critical check to correct status panel (complete, pending, or failure)
const sortChecks = (
    acc: Record<string, Array<string>>,
    curr: SimplifiedChecks,
    _index: number,
    _arr: Array<SimplifiedChecks>
): Record<string, Array<string>> => {
    switch (curr.result) {
        case 'CLEARED':
            acc.complete.push(curr.name in criticalCheckTitles ? criticalCheckTitles[curr.name] : curr.name);
            return acc;
        case 'NONE':
            acc.pending.push(curr.name in criticalCheckTitles ? criticalCheckTitles[curr.name] : curr.name);
            return acc;
        case 'UNVERIFIED':
            acc.failure.push(curr.name in criticalCheckTitles ? criticalCheckTitles[curr.name] : curr.name);
            return acc;
        default:
            return acc;
    }
};

export const CriticalChecks = ({ checks }: ChecksProps): JSX.Element => {
    const { Panel } = Collapse;
    const formattedChecks = [] as Array<{ result: string | undefined; name: string }>; // Store name of critical check and its status

    Object.keys(checks).forEach((key: string) => {
        // 3 of the 9 checks must be pulled differently since they are all bundled under `certn_verification` as {name : string}...
        if (key == 'certn_verification') {
            Object.keys(checks[key]).forEach((innerKey: string) => {
                if (
                    ['employment_verification', 'education_verification', 'credential_verification'].includes(innerKey)
                ) {
                    const item = (checks as unknown as Record<string, CertnVerification>)[key];
                    formattedChecks.push({
                        result: (item as unknown as Record<string, string>)[innerKey],
                        name: innerKey,
                    });
                }
            });
            // ...while the remaining 6 checks follow the same {name : {result: string, status: string}} format
        } else {
            formattedChecks.push({
                result: (checks as unknown as Record<string, CriticalChecksResult>)[key].result,
                name: key,
            });
        }
    });

    // Get list of checks for each status panel
    const { complete, pending, failure } = formattedChecks.reduce(sortChecks, {
        complete: [],
        pending: [],
        failure: [],
    });

    return (
        <CollapseWrapper>
            <Collapse defaultActiveKey={['1', '2', '3']}>
                <Panel
                    header={
                        <CompleteHeader>
                            Complete
                            <CompleteBadge count={complete.length} />
                        </CompleteHeader>
                    }
                    key="1"
                >
                    <List dataSource={complete} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
                <Panel
                    header={
                        <PendingHeader>
                            In Progress
                            <PendingBadge count={pending.length} />
                        </PendingHeader>
                    }
                    key="2"
                >
                    <List dataSource={pending} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
                <Panel
                    header={
                        <FailureHeader>
                            Failure
                            <FailureBadge count={failure.length} />
                        </FailureHeader>
                    }
                    key="3"
                >
                    <List dataSource={failure} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
            </Collapse>
        </CollapseWrapper>
    );
};
