import React, { useState } from "react";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import logo from '../assets/logo.svg';
import { URL } from "../utils/backend";
import { useHistory } from "react-router";

import Loading from "../components/modals/Loading";

import sendEmail from "../utils/emailSender";

const initialUserData = {
    userName: "",
    userPassword: "",
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userRoleId: 1
  };


const SignUp = (props) => {

    const {myHooks} = props;

    const {push} = useHistory();

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
                console.log("signup.user response:",data);
                if (data !== null) {
                    myHooks.setWrongCred(false);
                    myHooks.setIsLoading(false);
                    sendEmail(userData, "", 2);
                    push('/');
                } else {
                    myHooks.setWrongCred(true);
                    myHooks.setIsLoading(false);
                    push('/signup');
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
        const {name, value} = event.target;
        setUserData({...userData, [name]: value});
    };

    const onBackClick = (event) => {
        event.preventDefault();
        myHooks.setWrongCred(false);
        push('/');
    };

    return (
        <div>
            <Loading isLoading={myHooks.isLoading}/> 
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
                                            Password:
                                        </Form.Label>
                                        <Form.Control type="password" name="userPassword" placeholder="Password" value={userData.userPassword} onChange={changeHandler}  required/>
                                    </Form.Group>
                                    <Form.Group className="col-12">
                                        <Form.Label className="form-label">
                                            Email:
                                        </Form.Label>
                                        <Form.Control type="email" name="userEmail" placeholder="email@example.com" value={userData.userEmail} onChange={changeHandler}  required/>
                                    </Form.Group>
                                </Container>
                                <Alert variant="danger" show={myHooks.wrongCred}>User Name already exist</Alert>
                                <hr className="my-4"/>
                                <Container className="buttons">
                                    <Button variant="primary" type="submit">
                                        Sign Up
                                    </Button>
                                    <Button variant="secondary" onClick={onBackClick}>
                                        Back to Login
                                    </Button>
                                </Container>
                            </Form>
                        </Container> 
                    </Container>
                </Container>
        </div>);
}

export default SignUp;