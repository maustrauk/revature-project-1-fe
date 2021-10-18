import React from 'react';

import Container from 'react-bootstrap/Container';

import Reimbursement from './Reimbursement';

const Reimbursements = (props) => {
    const {reimbList} = props.myHooks;
    return (
    <Container className="d-flex flex-wrap justify-content-evenly">
        {reimbList.map(element => <Reimbursement key={element.reimbId} reimb={element} myHooks={props.myHooks}/>)}
    </Container>);
}

export default Reimbursements;