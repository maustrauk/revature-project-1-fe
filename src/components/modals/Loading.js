import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';


const Loading = (props) => {

    const {isLoading} = props;

    return (
        <Modal show={isLoading} >
            <Modal.Body>
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden"></span>
                    </Spinner>
                 </div>
            </Modal.Body>
        </Modal>
        );
}

export default Loading;