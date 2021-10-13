import React from 'react';

import Reimbursement from './Reimbursement';

const Reimbursements = (props) => {
    const {reimbList} = props.myHooks;
    return (
    <div>
        Reimb List:
        {reimbList.map(element => <Reimbursement key={element.reimbId} reimb={element} myHooks={props.myHooks}/>)}
    </div>);
}

export default Reimbursements;