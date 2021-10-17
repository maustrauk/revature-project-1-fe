import React from "react";
import { MDBFooter } from "mdbreact";


const MyFooter = (props) => {
    return(
        <MDBFooter className="font-small pt-4 mt-4 text-center">
            <p className="text-dark fw-bold fs-4">&copy; {new Date().getFullYear()} ERS</p>
        </MDBFooter>
    );
}

export default MyFooter;