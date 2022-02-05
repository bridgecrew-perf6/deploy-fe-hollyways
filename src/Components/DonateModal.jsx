import React, { useState, useContext} from 'react'
import {useHistory, useParams} from "react-router-dom"
import { Button, Modal, Form, Image } from 'react-bootstrap'

import { UserContext } from '../context/UserContext';
import paymentImage from '../images/Group 14.png'

import{API} from "../config/api"

function MyVerticallyCenteredModal(props) {
    let history = useHistory();
    const { id } = useParams();
    const [preview, setPreview] = useState(null);
    const [state] = useContext(UserContext)

    const [form, setForm] = useState({
        donateAmount: "",
        image: "",
        status: "",
        userId: "",
        fundId: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                "Content-type": "multipart/form-data"
                }
            }

            // Create store data with FormData as object here ...
            const formData = new FormData()
            formData.set("donateAmount", form.donateAmount)
            formData.set("image", form.image[0], form.image[0].name)
            formData.set("status", "pending")
            formData.set("userId", state.user.id)
            formData.set("fundId", id)

            const response = await API.post("/adddonate", formData, config)
            console.log(response)

            history.push("/raisefund");

        } catch (error) {
            console.log(error);
        }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="donate-modal"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>

            <Form className='main' onSubmit={handleSubmit}>
                    <div className="title my-5">
                        <h2>Add Donate</h2>
                    </div>

            <Form.Group className="my-3" controlId="formBasicText">
                    <Form.Control name="donateAmount" type="text" placeholder="Nominal Donation" onChange={ handleChange }/>
            </Form.Group>

            {preview && (
                <div>
                    <img
                        src={preview}
                        style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "cover",
                        }}
                        alt="preview"
                    />
                </div>
            )}
            <Form.Group className="my-3 d-flex align-items-center" controlId="image">
                <Form.Label className='custom-file-upload '><strong>Attach Payment</strong>
                    <Image className='image mx-3' src={ paymentImage } alt='Payment Image'/>
                </Form.Label>
                <p>*transfers can be made to holyways accounts</p>
                <Form.Control name="image" type="file" onChange={ handleChange }/>
            </Form.Group>

            <Form.Group className="d-grid gap-2 my-4 mt-5">
                <Button variant="danger" type="submit">
                    Donate
                </Button>
          </Form.Group>
        </Form>
        </Modal.Body>
      </Modal>
    );
  }

  function DonateModal() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <div className="d-grid gap-2 my-5">
                <Button onClick={() => setModalShow(true)} variant="danger" size='lg'>Donate</Button>
            </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  }

export default DonateModal

