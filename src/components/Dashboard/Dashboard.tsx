import SoftCheck from '../SearchApp/Softcheck';
import CreditReport from '../SearchApp/Creditreport';
import GetPrunedApplications from '../SearchApp/GetPrunedApplications';

// Ant Design Imports
import 'antd/dist/antd.css';

// Components

// Styled Components

// Interfaces

const Dashboard = (): JSX.Element => (
    <div>
        <SoftCheck />
        <CreditReport />
        <GetPrunedApplications />
    </div>
);

export default Dashboard;
