import React, { useEffect } from 'react'
import {Container, Row, Col} from 'react-bootstrap'

import Navbar from '../Components/Navbar'

// import package here
import { io } from 'socket.io-client'

import Contact from "../Components/Contact"
import Chat from "../Components/Chat"

// init variable here
let socket

export default function ChatAdmin() {
    // code here
    useEffect(() => {
        socket = io('http://localhost:5000')

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <>
            <Navbar />
            <Container fluid style={{ height: '89.5vh' }}>
                <Row>
                    <Col md={3} style={{ height: '89.5vh' }} className="px-3 border-end border-dark overflow-auto">
                        {/* <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} /> */}
                        <Contact dataContact={""} clickContact={""} contact={" "} />
                    </Col>
                    <Col md={9} style={{ maxHeight: '89.5vh' }} className="px-0">
                        {/* <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} /> */}
                        <Chat contact={""} messages={""} user={""} sendMessage={""} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}