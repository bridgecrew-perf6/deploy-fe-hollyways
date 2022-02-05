import React from 'react'
import { Card, Col, Button } from 'react-bootstrap'

function CardDonatur(props) {
    return (
        <Card className='mb-3' id={props.id} status={props.status}>
            <Card.Body className='card-description d-flex justify-content-between'>
                <Col className='description'>
                    <div className="name">
                        <h5>{ props.name }</h5>
                    </div>
                    <div className="date my-3">
                        <h6><strong>{props.day}</strong> { props.date }</h6>
                    </div>
                    <div className="money">
                        <h6>Total : Rp. {props.money}</h6>
                    </div>
                </Col>
                {props.status === "pending" ? (
                    <Col className='btn d-flex justify-content-end my-auto'>
                        <div className="aproved-modal">
                            <Button onClick={() => props.approve(props.id) } variant='danger' style={{height: '40px', width: '130px'}}>View</Button>
                        </div>
                    </Col>
                ) : (
                        <div></div>
                )}
            </Card.Body>
        </Card>
    )
}

export default CardDonatur
