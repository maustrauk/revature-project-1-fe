import React from "react";
import Container from 'react-bootstrap/Container';


import Login from "../forms/Login";

const HomePage = (props) => {

    return (
        <Container className="home-page">
            <h1 className="header">Welcome To Project 1: Expense Reimbursement System</h1>
            <Login myProps = {props}/>
        </Container>
    );
}

export default HomePage;