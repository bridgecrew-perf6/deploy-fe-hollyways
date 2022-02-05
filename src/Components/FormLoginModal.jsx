import React, {useState, useContext } from 'react'
import { Button, Form, Container, Modal } from 'react-bootstrap'
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

import App from '../App'

import { UserContext } from '../context/UserContext'
import {API} from "../config/api"

function FormLogin() {
    let history = useHistory();
    const [state, dispatch] = useContext(UserContext)
    //   console.log(state)

    const [message, setMessage] = useState(null);

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const {email, password} = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            });
    };

    const handleSubmit = async (e) =>  {
      try {
        e.preventDefault()

        const config = {
            headers: {
            "Content-type": "application/json"
            }
        }

        const body = JSON.stringify(form);

        const response = await API.post("/login", body, config)

        console.log(response.data.data)

        // Checking process
        if (response?.status === 200) {
            // Send data to useContext
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
            });

            // Status check
            if (response.data.data.status === "admin") {
                history.push("/raisefund");
            } else {
                history.push("/");
            }

            const alert = (
                <Alert variant="success" className="py-1">
                    Login success
                </Alert>
            );
            setMessage(alert);
        }

        } catch (error) {
        const alert = (
            <Alert variant="danger" className="py-1">
            Login failed
            </Alert>
        );
        setMessage(alert);
        console.log(error);
        }
    };

  return (
  <Container>
      {!state.isLogin ?
        (<>
        <Form onSubmit = {handleSubmit}>
          <Form.Group className="title mb-4">
            <h2>Login</h2>
          </Form.Group>

        {message && message}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={handleChange}
              name="email" id="email"
              type="email"
              placeholder="Email"
              value={email}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={handleChange}
              name="password" id="password"
              type="password"
              placeholder="Password"
              value={password}/>
          </Form.Group>

          <Form.Group className="d-grid gap-2 my-4">
            <Button variant="danger" type="submit">
              Login
            </Button>
          </Form.Group>

          <Form.Text className="">
            <p className='text-center'>Dont have account?
              <Link to="/register"> Click Here </Link>
            </p>
          </Form.Text>
          </Form>
          </>)
       : <App /> }
    </Container>
  )
}

function FormLoginModal(props) {
  return (
   <div>
     <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-login"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLogin />
        </Modal.Body>
      </Modal>
   </div>
 )
}

export default FormLoginModal