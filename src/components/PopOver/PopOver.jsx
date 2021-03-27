import React, { useState } from 'react'

import { Modal } from 'react-bootstrap';


const PopOver = ({message , onClose}) => {
    const [show, setShow] = useState(true);
  
    const handleClose = () => {
        setShow(false);
        onClose();
    }
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body style={{fontSize: '20px', marginTop: '20px', marginBottom: '30px'}}>{message}</Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default PopOver
