import React, { useState } from 'react';
import axios from "axios";

import Card from 'react-bootstrap/Card';
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

    return (
    <div className={isDisplayed()}>
       <Card>
       {myHooks.user.userRoleId === 1 ?
            <Card.Header>Status: {rStatus[reimb.reimbStatusId]}</Card.Header> :
            <Card.Header>UserName: {reimbUser.userName} Status: {rStatus[reimb.reimbStatusId]}</Card.Header>
       }
        <Card.Body>
            <Card.Title>{rType[reimb.reimbTypeId]}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Last updated: {reimb.reimbSubmitted}</Card.Subtitle>
            <Card.Text>
                Description: {reimb.reimbDescription}
            </Card.Text>
            <Card.Text>
                Ammount: {reimb.reimbAmount}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{reimb.reimbReceipt !== null ?
            <div>
                <Button variant="primary" onClick={onClickShow}>Show Receipt</Button>
                <ReceiptModal showReciept={showReciept} setShowReciept={setShowReciept} receipt={reimb.reimbReceipt}/>
            </div> : null}
        </Card.Footer>
        {(myHooks.user.userRoleId === 2 && reimb.reimbStatusId === 3) ?
            <div>
                <Button variant="primary" onClick={onClickApprove}>Approve</Button>
                <Button variant="primary" onClick={onClickDeny}>Deny</Button>
            </div> : null
        }
        </Card>
        {managerFunc}
    </div>);
}

export default Reimbursement;