import React from 'react';

import Modal from 'react-bootstrap/Modal';

const ReceiptModal = (props) => {

    const {showReciept, setShowReciept, receipt} = props;

    const handleClose = () => setShowReciept(false);

    return (
    <Modal show={showReciept} onHide={handleClose} animation={false}>
       <Modal.Header closeButton>
          <Modal.Title>Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={`data:image/jpeg;base64,${receipt}`} alt="receipt" className="img-fluid"/>
        </Modal.Body>
    </Modal>);
}

export default ReceiptModal;