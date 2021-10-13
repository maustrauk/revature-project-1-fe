import React from 'react';

import EmployeeDashboard from './EmployeeDashboard';
import ManagerDashboard from './ManagerDashboard';
import DashNavbar from './DashNavbar';

const Dashboard = (props) => {

    const {myHooks} = props;

    return (
    <div>
        <DashNavbar myHooks={myHooks}/>
       {myHooks.user.userRoleId === 1 ? <EmployeeDashboard myHooks={myHooks}/> : <ManagerDashboard myHooks={myHooks}/>}
    </div>);
}

export default Dashboard;