import React from 'react'
import { Container, Row, Col, Image, ProgressBar} from 'react-bootstrap'
import DonateModal from './DonateModal'
let FILE_PATH = 'http://localhost:5000/uploads/'

function DetailDonate(props) {
    return (
        <div>
            <Container className='view-fund my-5'>
                <Row className='main'>
                    <Col id={props.id} className='image'>
                        <Image src={FILE_PATH + props.thumbnail} style={{height: '550px', width: '600px'}} alt={props.thumbnail} rounded />
                    </Col>
                    <Col className='description'>
                        <div className="title mb-3">
                            <h3>{props.title}</h3>
                        </div>
                        <div className="progress-money progres d-flex justify-content-between mt-5 mb-2 ">
                            <div className="money-start">
                                <h5>{ props.totalDonate }</h5>
                            </div>
                            <div className='d-flex align-items-end'>
                                <p className="">Gathered From</p>
                            </div>
                            <div className="money-end">
                                <h5>{props.goal}</h5>
                            </div>
                        </div>

                        <div className="progress-bar">
                            <ProgressBar variant="danger" now={30} style={{ height: '7px' }} />
                        </div>

                        <div className="progress-count d-flex justify-content-between mt-3 mb-5">
                            <div className="count-start d-flex">
                                <h5>{props.totalDonatur}</h5>
                                <p className='d-flex align-items-end'> Donation</p>
                            </div>
                            <div className="money-end d-flex">
                                <h5 className="">150</h5>
                                <p>More Day</p>
                            </div>
                        </div>

                        <div className="desc">
                            <p>{props.description}</p>
                        </div>

                        {/* button donate */}
                        <DonateModal />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default DetailDonate