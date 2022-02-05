import React from 'react'
import { Button, Modal, Form, Image } from 'react-bootstrap'
// import { useParams } from 'react-router-dom'

import paymentImage from "../images/Rectangle 61.png"

  function AprovedModal({ show, handleClose, setConfirmApprove }) {
    //   const [modalShow, setModalShow] = useState(false);

      const handleApprove = (e) => {
        e.preventDefault()
        setConfirmApprove(true)
    }

      return (
          <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                </Modal.Header >
              <Modal.Body>
                  <Form>
                    <Form.Text className='text'>
                        <h5>Approve Payment</h5>
                    </Form.Text>

                    <Form.Group className="my-3" controlId="formBasicText">
                        <Form.Control type="text" placeholder="450000" />
                    </Form.Group>

                    <Form.Group className="my-3 d-flex align-items-center" controlId="image">
                        <Image className='image mx-3' src={ paymentImage } alt='Payment Image'/>
                    </Form.Group>

                    <Form.Group className="d-grid gap-2 my-4 mt-5">
                        <Button onClick={handleApprove} variant="danger" type="submit">
                            Aproved
                        </Button>
                      </Form.Group>
                    </Form>
                </Modal.Body>
          </Modal>

    );
  }

export default AprovedModal

