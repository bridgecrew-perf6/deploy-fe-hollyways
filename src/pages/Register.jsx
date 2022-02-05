// import React, { useContext, useState } from 'react'
// import { UserContext } from "../context/UserContext";
// import { useHistory } from "react-router-dom";
import React, { useState } from 'react'
import { Button, Modal, Form, Alert } from 'react-bootstrap'
import FormLoginModal from '../Components/FormLoginModal';

// Get API config here ...
import { API } from '../config/api'

// State Function Component
function RegisterForm() {
//   let history = useHistory();

    const title = "Register";
    document.title = "Holy Ways | " + title;

    //   const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);

    // Store data with useState here ...
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const { fullname, email, password } = form;

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }


const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      // Create Configuration Content-type here ...
      // Content-type: application/json
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      // Convert form data to string here ...
      const body = JSON.stringify(form)

      // Insert data user to database here ...
      const response = await API.post("/register", body, config)

      console.log(response)

      // Notification
      if (response.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
        console.log(error)
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <Form class="form-register" onSubmit={handleOnSubmit}>
        <Form.Group className="title mb-4">
          <h2>Register</h2>
        </Form.Group>

        {message && message}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            onChange={handleOnChange}
            name="email" type="email"
            placeholder="Enter email"
            value={email}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            onChange={handleOnChange}
            name="password" type="password"
            placeholder="Password"
            value={password}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            onChange={handleOnChange}
            value={fullname}
            name="fullname" type="text"
            placeholder="Full Name"
            />
        </Form.Group>


        {/* <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            onChange={handleOnChange}
            name="fullname" type="text"
            placeholder="Full Name"
            value={name}/>
        </Form.Group> */}

        <Form.Group className="d-grid gap-2 my-4">
          <Button variant="danger" type="submit">
          Register
          </Button>
        </Form.Group>

        <Form.Text className="">
          <div className="text-login d-flex justify-conten-center my-auto">
            <Login />
          </div>
        </Form.Text>
      </Form>
    )
  }

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-register"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
      </Modal>
    );
  }

  function Register() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div to="/register" className="register">
                <Button onClick={() => setModalShow(true)} variant="outline-danger">Register</Button>
            </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

      </>
    );
}

function Login() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <div className='button-click d-grid gap-2'>
          <Button
            className='button'
                style={{ color: "black", border: "none", margin: "auto" }}
                onClick={() => setModalShow(true)}
                variant="link">
                Already have account? Click Here
              </Button>
            </div>

        <FormLoginModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  }


export default Register