import { CriticalChecksInfo, CriticalChecksResult, CertnVerification } from '../../interfaces';
// Ant Design Imports
import 'antd/dist/antd.css';
import { Collapse, List } from 'antd';
import {
    CollapseWrapper,
    CompleteHeader,
    CompleteBadge,
    PendingHeader,
    PendingBadge,
    FailureHeader,
    FailureBadge,
    FirstCriticalItem,
    FinalCriticalItem,
    MiddleCriticalItem,
} from './ApplicationPageSC';

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

    // Close panels that are empty
    const setActivePanels = (checkArrays: string[][]): string[] => {
        // eslint-disable-next-line prefer-const
        let initialActivePanels: string[] = [];
        checkArrays.forEach((check, i) => {
            if (check.length > 0) initialActivePanels.push((i + 1).toString());
        });
        return initialActivePanels;
    };

    // Render the individual items in the critical check status list
    const renderCriticalItems = (item: string, listLength: number, index: number) => {
        if (listLength === 1) {
            return <div>{item}</div>;
        } else if (listLength > 1 && index === 0) {
            return <FirstCriticalItem>{item}</FirstCriticalItem>;
        } else if (listLength === index + 1) {
            return <FinalCriticalItem>{item}</FinalCriticalItem>;
        } else {
            return <MiddleCriticalItem>{item}</MiddleCriticalItem>;
        }
    };

    return (
        <CollapseWrapper id="collapse-wrapper">
            <Collapse defaultActiveKey={setActivePanels([failure, complete, pending])}>
                <Panel
                    collapsible={failure.length > 0 ? undefined : 'disabled'}
                    header={
                        <FailureHeader>
                            Failure
                            <FailureBadge showZero count={failure.length} />
                        </FailureHeader>
                    }
                    key="1"
                >
                    <List dataSource={failure} renderItem={(item, i) => renderCriticalItems(item, failure.length, i)} />
                </Panel>
                <Panel
                    collapsible={complete.length > 0 ? undefined : 'disabled'}
                    header={
                        <CompleteHeader>
                            Complete
                            <CompleteBadge showZero count={complete.length} />
                        </CompleteHeader>
                    }
                    key="2"
                >
                    <List
                        dataSource={complete}
                        renderItem={(item, i) => renderCriticalItems(item, complete.length, i)}
                    />
                </Panel>
                <Panel
                    collapsible={pending.length > 0 ? undefined : 'disabled'}
                    header={
                        <PendingHeader>
                            In Progress
                            <PendingBadge showZero count={pending.length} />
                        </PendingHeader>
                    }
                    key="3"
                >
                    <List dataSource={pending} renderItem={(item, i) => renderCriticalItems(item, pending.length, i)} />
                </Panel>
            </Collapse>
        </CollapseWrapper>
    );
};
