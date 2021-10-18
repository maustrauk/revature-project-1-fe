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

import sendEmail from '../utils/emailSender';

const AddUser = (props) => {

    const initialUserData = {
        userName: "",
        userPassword:  Math.random().toString(36).slice(-8),
        userFirstName: "",
        userLastName: "",
        userEmail: "",
        userRoleId: 1
      };


    const {push} = useHistory();

    const {myHooks} = props;

    const [validated, setValidated] = useState(false);
    const [userData, setUserData] = useState(initialUserData);


    const submitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            myHooks.setIsLoading(true);
            axios
            .post(`${URL}signup.user`, userData)
            .then((res) => {
                const data = res.data;
                console.log(data);
                if (data !== null) {
                    myHooks.setWrongCred(false);
                    myHooks.setIsLoading(false);
                    sendEmail(userData, myHooks.user.userFirstName, 1);
                    push('/dashboard');
                } else {
                    myHooks.setWrongCred(true);
                    myHooks.setIsLoading(false);
                    push('/add-user');
                }
                
            })
            .catch((err) => {
                console.log(err);
                myHooks.setIsLoading(false);
            });
          }

        setValidated(true);
        };

    const changeHandler = (event) => {
        const {name, value, type, checked} = event.target;
        let correctValue = value;
        if (type === "checkbox") {
            correctValue = checked;
        }
        setUserData({...userData, [name]: correctValue});
    };
    
    const onBackClick = (event) => {
        event.preventDefault();
        myHooks.setWrongCred(false);
        push('/dashboard');
    };


    return (<div>
        <Loading isLoading={myHooks.isLoading}/>
                <Container className="form-signup">
                    <Container className="py-5 text-center" >
                        <img className="d-block mx-auto mb-4" src={logo} alt="logo" width="72" height="93"/>
                        <h2>Add user form</h2>
                        <p className="lead">Please enter user personal information</p>
                    </Container>
                    <Container className="row g-5">
                        <Container className="col-md-12 col-lg-12">
                            <h4 className="mb-3">Personal information</h4>
                            <Form onSubmit={submitHandler} noValidate validated={validated}>
                                <Container className="row g-3">            
                                    <Form.Group className="col-sm-6">
                                        <Form.Label className="form-label">
                                            First name:
                                        </Form.Label>
                                        <Form.Control type="text" name="userFirstName" placeholder="First Name" value={userData.userFirstName} onChange={changeHandler}  required/>
                                    </Form.Group>
                                    <Form.Group className="col-sm-6">
                                        <Form.Label className="form-label">
                                            Last name:
                                        </Form.Label>
                                        <Form.Control type="text" name="userLastName" placeholder="Last Name" value={userData.userLastName} onChange={changeHandler}  required/>
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Form.Label className="form-label">
                                            User name:
                                        </Form.Label>
                                        <Form.Control type="text" name="userName" placeholder="User Name" value={userData.userName} onChange={changeHandler}  required/>
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Form.Label className="form-label">
                                            Email:
                                        </Form.Label>
                                        <Form.Control type="email" name="userEmail" placeholder="email@example.com" value={userData.userEmail} onChange={changeHandler}  required/>
                                    </Form.Group>
                                </Container>
                                <Form.Group className="col-12">
                                <Form.Label className="form-label">
                                   Reimbursement Type:
                                </Form.Label>
                                <Form.Check type="radio" name="userRoleId" onChange={changeHandler} value={1} label="Manager" />
                                <Form.Check type="radio" name="userRoleId" onChange={changeHandler} value={2} label="Employee" checked/>
                            </Form.Group>
                                <Alert variant="danger" show={myHooks.wrongCred}>User Name already exist</Alert>
                                <hr className="my-4"/>
                                <Container className="d-flex justify-content-center mb-2">
                                    <Button variant="primary" type="submit" className="w-25">
                                       Add User
                                    </Button>
                                    <Button variant="secondary" onClick={onBackClick} className="w-25">
                                        Back to dashboard
                                    </Button>
                                </Container>
                            </Form>
                        </Container> 
                    </Container>
                </Container>
    </div>);
}

export default AddUser;