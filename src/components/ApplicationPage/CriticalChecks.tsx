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
    margin-left: 25px;
    min-width: 220px;
    max-width: 300px;
    border-radius: 10px;

    .ant-collapse {
        border: 1px solid ${(props) => props.theme.color.gray[100]};
        border-radius: 10px;
    }
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _index: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _arr: Array<SimplifiedChecks>
): Record<string, Array<string>> => {
    switch (curr.result) {
        case 'ERROR':
        case 'RETURNED':
        case 'VERIFIED':
        case 'SYSTEM UNABLE TO VERIFY':
        case 'PARTIALLY VERIFIED':
        case 'UNVERIFIED':
            acc.complete.push(curr.name in criticalCheckTitles ? criticalCheckTitles[curr.name] : curr.name);
            return acc;
        case 'ANALYZING':
        case 'PARTIAL':
        case 'PENDING':
        case 'VERIFICATION PENDING':
            acc.pending.push(curr.name in criticalCheckTitles ? criticalCheckTitles[curr.name] : curr.name);
            return acc;
        case 'NONE':
        case 'UPGRADE':
        case 'UPGRADE TO VERIFY':
            return acc;
        default:
            acc.failure.push(curr.name in criticalCheckTitles ? criticalCheckTitles[curr.name] : curr.name);
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
                result: (checks as unknown as Record<string, CriticalChecksResult>)[key].status, // pull the status instead of the result because it is more granular
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

    // Close panels that are empty
    const setActivePanels = (checkArrays: string[][]): string[] => {
        // eslint-disable-next-line prefer-const
        let initialActivePanels: string[] = [];
        checkArrays.forEach((check, i) => {
            if (check.length > 0) initialActivePanels.push((i + 1).toString());
        });
        return initialActivePanels;
    };

    return (
        <CollapseWrapper>
            <Collapse defaultActiveKey={setActivePanels([failure, complete, pending])}>
                <Panel
                    collapsible={failure.length > 0 ? 'header' : 'disabled'}
                    header={
                        <FailureHeader>
                            Failure
                            <FailureBadge showZero count={failure.length} />
                        </FailureHeader>
                    }
                    key="1"
                >
                    <List dataSource={failure} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
                <Panel
                    collapsible={complete.length > 0 ? 'header' : 'disabled'}
                    header={
                        <CompleteHeader>
                            Complete
                            <CompleteBadge showZero count={complete.length} />
                        </CompleteHeader>
                    }
                    key="2"
                >
                    <List dataSource={complete} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
                <Panel
                    collapsible={pending.length > 0 ? 'header' : 'disabled'}
                    header={
                        <PendingHeader>
                            In Progress
                            <PendingBadge showZero count={pending.length} />
                        </PendingHeader>
                    }
                    key="3"
                >
                    <List dataSource={pending} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
            </Collapse>
        </CollapseWrapper>
    );
};
