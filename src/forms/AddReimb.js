import React, { useState } from 'react';
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import logo from '../assets/logo.svg';
import { URL } from "../utils/backend";
import { useHistory } from "react-router";

import Loading from "../components/Loading";

const initialReimb = {
    reimbAmount: "",
    reimbDescription: "",
    reimbReceipt: "",
    reimbAuthor: "",
    reimbResolver: "",
    reimbStatusId: "",
    reimbTypeId: ""
}

const AddReimb = (props) => {

    const {user, setReimbList, isLoading, setIsLoading, wrongCred, setWrongCred} = props.myHooks;

    const {push} = useHistory();

    const [validated, setValidated] = useState(false);
    const [reimbData, setReimbData] = useState(initialReimb);

    const submitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            setIsLoading(true);
            axios
            .post(`${URL}user.signup.check`, reimbData)
            .then((res) => {
                const data = res.data;
                console.log(data);
                if (data !== "Wrong credentials") {
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
        const {name, value} = event.target;
        setReimbData({...reimbData, [name]: value});    
    }

    const onBackClick = (event) => {
        event.preventDefault();
        push('/dashboard');
    }

    return (
    <div>
        {isLoading ? <Loading/> :
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
                                <Form.Control type="number" name="reimbAmount" min="0" value={reimbData.reimbAmount} onChange={changeHandler}  required/>
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Reimbursement Type:
                                </Form.Label>
                                <Form.Check type="radio" name="reimbTypeId" value={1} label="LODGING" checked/>
                                <Form.Check type="radio" name="reimbTypeId" value={2} label="TRAVEL" />
                                <Form.Check type="radio" name="reimbTypeId" value={3} label="FOOD" />
                                <Form.Check type="radio" name="reimbTypeId" value={4} label="OTHER" />
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Description:
                                </Form.Label>
                                <Form.Control as="textarea" name="reimbDescription" maxlength="250" rows="5" value={reimbData.reimbDescription} onChange={changeHandler}/>
                            </Form.Group>
                            <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Reciept:
                                </Form.Label>
                                <Form.Control type="file" name="reimbReceipt"/>
                            </Form.Group>
                            <Form.Group className="col-12">
                                        <Form.Label className="form-label">
                                            Manager User Name:
                                        </Form.Label>
                                        <Form.Control type="text" name="reimbResolver" placeholder="Manager User Name" value={reimbData.reimbResolver} onChange={changeHandler}  required/>
                                    </Form.Group>
                        </Container>
                        {wrongCred ? <p className="errors">Some errors</p> : null}
                        <hr className="my-4"/>
                        <Container className="buttons">
                            <Button variant="primary" type="submit">
                                Add Reimbursement
                            </Button>
                            <Button variant="secondary" onClick={onBackClick}>
                                Back to Dashboard
                            </Button>
                        </Container>
                    </Form>
                </Container> 
            </Container>
        </Container>
        }
    </div>);
}

export default AddReimb;