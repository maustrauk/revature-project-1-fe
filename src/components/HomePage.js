import React from "react";

import Container from 'react-bootstrap/Container';

import Login from "../forms/Login";

const HomePage = (props) => {

    return (
        <Container className="pt-4 mt-4 text-center">
            <h1 className="header">Welcome To Expense Reimbursement System</h1>
            <Login myProps = {props}/>
        </Container>
    );
}

export default HomePage;