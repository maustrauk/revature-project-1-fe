import React, { useState } from 'react';
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import logo from '../assets/logo.svg';
import { URL } from "../utils/backend";
import { useHistory } from "react-router";

import Loading from "../components/modals/Loading";


const AddReimb = (props) => {

    const {user, isLoading, setIsLoading, wrongCred, setWrongCred} = props.myHooks;

    const {push} = useHistory();

    const initialReimb = {
        reimbAmount: "",
        reimbDescription: "",
        reimbReceipt: "",
        reimbAuthor: user.userId,
        reimbResolver: "",
        reimbTypeId: 1,
        reimbStatusId: ""
    }

    const [validated, setValidated] = useState(false);
    const [reimbData, setReimbData] = useState(initialReimb);

    const submitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            setIsLoading(true);
            console.log("reimbData:", reimbData);
            axios
            .post(`${URL}add.reimb-list`, reimbData)
            .then((res) => {
                const data = res.data;
                console.log("Data:",data);
                if (data !== null) {
                    setWrongCred(false);
                    setIsLoading(false);
                    push('/dashboard');
                } else {
                    setWrongCred(true);
                    setIsLoading(false);
                    push('/add-reimb');
                }
                
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
          }

        setValidated(true);
    }

    const changeHandler = (event) => {
        const {name, value, type, checked} = event.target;
        let correctValue = value;
        if (type === "checkbox") {
            correctValue = checked;
        }
        if (type === "file") {
            const tempStringArr = value.split("\\");
            const tempString = tempStringArr[tempStringArr.length - 1];
            correctValue = tempString;
        }
        setReimbData({...reimbData, [name]: correctValue});    
    }

    const onBackClick = (event) => {
        event.preventDefault();
        push('/dashboard');
    }

    return (
    <div>
        <Loading isLoading={isLoading}/>
            <Container className="form-signup">
            <Container className="py-5 text-center" >
                <img className="d-block mx-auto mb-4" src={logo} alt="logo" width="72" height="93"/>
                <h2>Sign up form</h2>
                <p className="lead">Please enter yours personal information</p>
            </Container>
            <Container className="row g-5">
                <Container className="col-md-12 col-lg-12">
                    <h4 className="mb-3">Personal information</h4>
                    <Form onSubmit={submitHandler} noValidate validated={validated}>
                        <Container className="row g-3">            
                            <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Reimbursement Amount:
                                </Form.Label>
                                <Form.Control type="number" name="reimbAmount" min="0.01" step="0.01" value={reimbData.reimbAmount} onChange={changeHandler}  required/>
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Reimbursement Type:
                                </Form.Label>
                                <Form.Check type="radio" name="reimbTypeId" onChange={changeHandler} value={1} label="LODGING" checked/>
                                <Form.Check type="radio" name="reimbTypeId" onChange={changeHandler} value={2} label="TRAVEL" />
                                <Form.Check type="radio" name="reimbTypeId" onChange={changeHandler} value={3} label="FOOD" />
                                <Form.Check type="radio" name="reimbTypeId" onChange={changeHandler} value={4} label="OTHER" />
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Description:
                                </Form.Label>
                                <Form.Control as="textarea" name="reimbDescription" maxLength="250" rows="5" value={reimbData.reimbDescription} onChange={changeHandler}/>
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Reciept:
                                </Form.Label>
                                <Form.Control type="file" name="reimbReceipt" accept="image/jpeg" onChange={changeHandler}/>
                            </Form.Group>
                            <Form.Group className="col-12">
                                        <Form.Label className="form-label">
                                            Manager User Name:
                                        </Form.Label>
                                        <Form.Control type="text" name="reimbResolver" placeholder="Manager User Name" value={reimbData.reimbResolver} onChange={changeHandler}  required/>
                                    </Form.Group>
                        </Container>
                        <Alert variant="danger" show={wrongCred}>Wrong Manager User Name</Alert>
                        <hr className="my-4"/>
                        <Container className="d-flex justify-content-center mb-2">
                            <Button variant="primary" type="submit" className="w-25">
                                Add Reimbursement
                            </Button>
                            <Button variant="secondary" onClick={onBackClick} className="w-25">
                                Back to Dashboard
                            </Button>
                        </Container>
                    </Form>
                </Container> 
            </Container>
        </Container>
    </div>);
}

export default AddReimb;