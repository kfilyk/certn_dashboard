import SoftCheck from '../SearchApp/Softcheck';
import CreditReport from '../SearchApp/Creditreport';
import ActiveApplicants from '../SearchApp/Activeapplicants';

// Ant Design Imports
import 'antd/dist/antd.css';

// Components

// Styled Components

// Interfaces

const Dashboard = (): JSX.Element => (
    <div>
        <SoftCheck />
        <CreditReport />
        <ActiveApplicants />
    </div>
);

export default Dashboard;
