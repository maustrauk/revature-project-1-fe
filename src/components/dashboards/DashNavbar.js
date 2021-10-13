import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useHistory } from 'react-router';

const DashNavbar = (props) => {

    const {user, setIsPending, setIsApproved, setIsDenied} = props.myHooks;

    const {push} = useHistory();

    const setAll = (status) => {
        setIsPending(status);
        setIsApproved(status);
        setIsDenied(status);
    }


    const onBrandClick = (event) => {
        event.preventDefault();
        setAll(false);
        push('/dashboard');
    };

    const onAddClick = (event) => {
        event.preventDefault();
        setAll(false);
        push('/add-reimb');
    }

    const onPendingClick = (event) => {
        event.preventDefault();
        setAll(false);
        setIsPending(true);
    }

    const onDeniedClick = (event) => {
        event.preventDefault();
        setAll(false);
        setIsDenied(true);
    }

    const onApprovedClick = (event) => {
        event.preventDefault();
        setAll(false);
        setIsApproved(true);
    }



    return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#" onClick={onBrandClick}>Project 1</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link disabled>Reimbursement  Action:</Nav.Link>
                        <Nav.Link  href="#" onClick={onAddClick}>Add</Nav.Link>
                        <Nav.Link  href="#" onClick={onPendingClick}>Show Pending</Nav.Link>
                        <Nav.Link  href="#" onClick={onDeniedClick}>Show Denied</Nav.Link>
                        <Nav.Link  href="#" onClick={onApprovedClick}>Show Approved</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link disabled>{user.userName}</Nav.Link>
                        <Nav.Link href="/">Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>);
}

export default DashNavbar;