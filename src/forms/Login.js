import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import logo from '../assets/logo.svg';

import { URL } from "../utils/backend";

import Loading from "../components/modals/Loading";

const initialUserData = {
    userName: "",
    userPassword: "",
  };

const Login = (props) => {

    const { myHooks } = props.myProps;

    const {push} = useHistory();

    const [userData, setUserData] = useState(initialUserData);
    const [validated, setValidated] = useState(false);

    const submitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        // let config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*'
        //     }
        //   }

        if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            myHooks.setIsLoading(true);
            axios
            .post(`${URL}login.user`, userData)
            .then((res) => {
                const data = res.data;
                console.log(data);
                if (data !== null) {
                    const user = {
                        userId: data.userId,
                        userName: data.userName,
                        userFirstName: data.userFirstName,
                        userLastName: data.userLastName,
                        userEmail: data.userEmail,
                        userRoleId: data.userRoleId
                    };
                    myHooks.setUser(user);
                    myHooks.setWrongCred(false);
                    myHooks.setIsLoading(false);
                    push('/dashboard');
                } else {
                    myHooks.setWrongCred(true);
                    myHooks.setIsLoading(false);
                    push('/');
                }
            })
            .catch((err) => {
                console.log(err);
                myHooks.setIsLoading(false);
            });
          }

        setValidated(true);
    }

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setUserData({...userData, [name]: value});
    }

    const onSignUpClick = (event) => {
        event.preventDefault();
        myHooks.setWrongCred(false);
        push('/signup');
    }

    return(
        <div>
            <Loading isLoading={myHooks.isLoading}/>
                <Container className="p-5">
                    <Form onSubmit={submitHandler} noValidate validated={validated}>
                        <img className="mb-4" src={logo} alt="logo" width="72" height="93" />
                        <h1 className="h3 mb-3 fw-normal">Please sign in:</h1>
                        <Container className="d-flex flex-column w-50 align-items-center">
                            <Form.Group className="mb-3 w-50 ml-5">
                                <Form.Control type="text" name="userName" placeholder="Enter User Name" value={userData.userName} onChange={changeHandler}  required/>
                            </Form.Group>
                            <Form.Group className="mb-3 w-50 ml-5">
                                <Form.Control type="password" name="userPassword" placeholder="Enter Password" value={userData.userPassword} onChange={changeHandler} required/>
                            </Form.Group>
                        </Container>
                        <Alert variant="danger" show={myHooks.wrongCred}>Wrong User Name and/or Password</Alert>
                        <hr className="my-hr"/>
                        <Container className="ml-3">
                            <Button variant="primary" type="submit">
                                Sign In
                            </Button>
                            <Button variant="secondary" onClick={onSignUpClick}>
                                Sign up
                            </Button>
                        </Container>
                    </Form>
                </Container>
        </div>
    );
}

export default Login;