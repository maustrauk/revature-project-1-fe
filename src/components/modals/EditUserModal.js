import React, { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import sendEmail from '../../utils/emailSender';
import { URL } from '../../utils/backend';
import { Container } from 'react-bootstrap';

const EditUserModal = (props) => {

    const {showUser, setShowUser, myHooks} = props;

    const {push} = useHistory();

    const [userData, setUserData] = useState(myHooks.user);
    const [validated, setValidated] = useState(false);

    const handleClose = (event) => {
        event.preventDefault();
        setUserData(myHooks.user);
        setShowUser(false);
    };

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setUserData({...userData, [name]: value});
    };

    const submitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            myHooks.setIsLoading(true);
            axios
            .post(`${URL}edit.user`, userData)
            .then((res) => {
                const data = res.data;
                console.log("edit.user response:",data);
                if (data !== null) {
                    myHooks.setWrongCred(false);
                    myHooks.setIsLoading(false);
                    sendEmail(userData, "", 2);
                    push('/');
                } else {
                    myHooks.setWrongCred(true);
                    myHooks.setIsLoading(false);
                }
                
            })
            .catch((err) => {
                console.log(err);
                myHooks.setIsLoading(false);
            });
          }

        setValidated(true);
    };

    return (
    <Modal show={showUser}>
       <Modal.Header>
          <Modal.Title>User name: {myHooks.user.userName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={submitHandler} noValidate validated={validated}>
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
                    Password:
                    </Form.Label>
                    <Form.Control type="text" name="userPassword" placeholder="Password hiden" value={userData.userPassword} onChange={changeHandler}  required/>
                </Form.Group>
                <Form.Group className="col-12">
                    <Form.Label className="form-label">
                        Email:
                    </Form.Label>
                    <Form.Control type="email" name="userEmail" placeholder="email@example.com" value={userData.userEmail} onChange={changeHandler}  required/>
                </Form.Group>
                <Container>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Container>
            </Form>
        </Modal.Body>
    </Modal>);
}

export default EditUserModal;