import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

import about from '../images/about.png'


function About() {
    return (
        <Container className='main-about'>
            <Row className='about'>
                <Col md={4}>
                    <div className="image d-flex justify-content-start">
                        <Image src={about} alt="image about"/>
                    </div>
                </Col>

                <Col className='text'>
                    <div className="title text-center">
                        <h1>Your donation is very helpful for people affected by forest fires in Kalimantan.</h1>
                    </div>

                    <Row className='description'>
                        <Col className='mr-2'>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        </Col>
                        <Col >
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default About

