import React, { useState } from 'react';
import axios from "axios";

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { URL } from "../../utils/backend";
import { useHistory } from 'react-router';

import ReceiptModal from '../modals/ReceiptModal';

const Reimbursement = (props) => {

    const {push} = useHistory();

    const [showReciept, setShowReciept] = useState(false);

    const {reimb, managerFunc, myHooks} = props;
    const {isPending, isApproved, isDenied} = myHooks;

    const reimbUser = myHooks.emplList.filter(e => e.userId === reimb.reimbAuthor)[0];

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

    const setThisStatusId = (id) => {
        const approvedReimb = {...reimb, reimbStatusId: id}
        myHooks.setIsLoading(true);
        axios
            .post(`${URL}update.reimb-list`, approvedReimb)
            .then((res) => {
                const data = res.data;
                console.log("Data:",data);
                if (data != null) {
                    myHooks.setReimbList(data);
                }
                myHooks.setIsLoading(false);
                push('/dashboard');
            })
            .catch((err) => {
                console.log(err);
                myHooks.setIsLoading(false);
                push('/dashboard');
            });
    }

    const onClickApprove = (event) => {
        event.preventDefault();
        setThisStatusId(1);
    } 
   
    const onClickDeny = (event) => {
        event.preventDefault();
        setThisStatusId(2);
    }

    const onClickShow = (event) => {
        event.preventDefault();
        setShowReciept(true);
    }

    const createdAt = reimb.reimbSubmitted ? reimb.reimbSubmitted.slice(0, 16) : null;

    const updatedAt = reimb.reimbResolved ? reimb.reimbResolved.slice(0, 16) : null;

    //Components

    const UserStatus = () => {

        function classProps(id) {
            switch(id) {
                case 1:
                    return "text-success";
                case 2:
                    return "text-danger";
                case 3:
                    return "text-warning";
                default:
                    return "";
            }
        }

        return (
            <div className="ml-1">Status: 
                <span className={classProps(reimb.reimbStatusId)}> {rStatus[reimb.reimbStatusId]}</span>
            </div>
        );
    }

    return (
    <div className={isDisplayed()}>
       <Card className="m-4 p-4">
        {(myHooks.user.userRoleId === 2 && reimb.reimbStatusId === 3) ?
                <Container className="d-flex justify-content-center mb-2">
                    <Button variant="success" className="w-50" onClick={onClickApprove}>Approve</Button>
                    <Button variant="danger" className="ml-2 w-50" onClick={onClickDeny}>Deny</Button>
                </Container> : null
            }
       {myHooks.user.userRoleId === 1 ?
            <Card.Header className="w-100">
                 <UserStatus/>
            </Card.Header> :
            <Card.Header className="w-100 d-flex justify-content-between fs-4">
                <div>User:
                    <span className="text-primary"> {`${reimbUser.userFirstName} ${reimbUser.userLastName}` }</span>
                </div>
                <UserStatus/>
            </Card.Header>
       }
        <Card.Body>
            <Card.Title>Type: {rType[reimb.reimbTypeId]}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
                <div>Created at: {createdAt}</div>
                {reimb.reimbStatusId === 3 ? null : <div>Updated at: {updatedAt}</div>}
            </Card.Subtitle>
            <Card.Text>
                Description: {reimb.reimbDescription}
            </Card.Text>
            <Card.Text>
                Ammount: {reimb.reimbAmount}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="w-100 d-flex justify-content-center">{reimb.reimbReceipt !== null ?
            <div>
                <Button variant="primary" onClick={onClickShow}>Show Receipt</Button>
                <ReceiptModal showReciept={showReciept} setShowReciept={setShowReciept} receipt={reimb.reimbReceipt}/>
            </div> : null}
        </Card.Footer>
        </Card>
        {managerFunc}
    </div>);
}

export default Reimbursement;