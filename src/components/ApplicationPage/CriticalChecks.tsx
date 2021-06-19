/* eslint-disable no-console */
import { ChecksInfo } from '../../interfaces';
// Ant Design Imports
import 'antd/dist/antd.css';
import { Collapse, List } from 'antd';
import styled from 'styled-components';

// Temp until all components for application page are completed
const CollapseWrapper = styled.div`
    margin: 50px;
    border: 1px solid gray;
    width: 15%;
`;

// Interfaces
type ChecksProps = {
    checks: ChecksInfo;
};

export const CriticalChecks = ({ checks }: ChecksProps): JSX.Element => {
    const { Panel } = Collapse;
    const { complete, pending, failure } = checks;

    return (
        <CollapseWrapper>
            <Collapse defaultActiveKey={['1', '2', '3']}>
                <Panel header="Complete" key="1">
                    <List dataSource={complete} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
                <Panel header="In Progress" key="2">
                    <List dataSource={pending} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
                <Panel header="Failure" key="3">
                    <List dataSource={failure} renderItem={(item) => <List.Item>{item}</List.Item>} />
                </Panel>
            </Collapse>
        </CollapseWrapper>
    );
};
