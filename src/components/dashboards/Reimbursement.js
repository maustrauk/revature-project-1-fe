import React from 'react';
import Card from 'react-bootstrap/Card';

const Reimbursement = (props) => {

    const {reimb, managerFunc, myHooks} = props;
    const {isPending, isApproved, isDenied} = myHooks;

    const rType = {
        1: "Lodging",
        2: "Travel",
        3: "Food",
        4: "Other"
    }

    const rStatus = {
        1: "Approved",
        2: "Denied",
        3: "Pending"
    }

    const isDisplayed = () => {
        if (isApproved) {
            if (reimb.reimbStatusId === 1) {
                return "d-block";
            } else {
                return "d-none";
            }
        } else if (isDenied) {
            if (reimb.reimbStatusId === 2) {
                return "d-block";
            } else {
                return "d-none";
            }
        } else if (isPending) {
            if (reimb.reimbStatusId === 3) {
                return "d-block";
            } else {
                return "d-none";
            }
        } else {
            return "d-block";
        }
    }

    return (
    <div className={isDisplayed()}>
       <Card>
       <Card.Header>Status: {rStatus[reimb.reimbStatusId]}</Card.Header>
        <Card.Body>
            <Card.Title>{rType[reimb.reimbTypeId]}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{reimb.reimbSubmitted}</Card.Subtitle>
            <Card.Text>
                {reimb.reimbDescription}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{reimb.reimbReceipt !== null ? "Receipt attached" : null}</Card.Footer>
        </Card>
        {managerFunc}
    </div>);
}

export default Reimbursement;