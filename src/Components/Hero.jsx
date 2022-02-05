import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-scroll";

import hero from "../images/hero.png";

function Hero() {
    return (
        <Container fluid className='main-hero'>
            <Container className='hero'>
                <Row>
                    <Col md={7}>
                        <div className='title'>
                            <h1>While you are still standing, try to reach out to the people who are falling.</h1>
                        </div>
                        <div className="description">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        </div>
                        <div className="btn">
                            <Link to="list-donation-scroll" spy={true} smooth={true}>
                                <Button variant="">Donate Now</Button>
                            </Link>
                        </div>

                    </Col>
                    <Col md={4} className='d-flex justify-content-end'>
                        <div className="hero-image">
                            <img src={ hero } alt="heroImage"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Hero
