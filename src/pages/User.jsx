import React, {useState, useContext, useEffect} from 'react'
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap'

import Header from "../Components/Header";
import axios from 'axios';

import profileImage from "../images/profile.png"

import { UserContext } from "../context/UserContext"
import {API} from "../config/api"
// import { useContext } from 'react'

function User() {
    const [state] = useContext(UserContext)

    const [payment, setPayment] = useState([])
    const [fund, setFund] = useState([])
    const [dataUser, setDataUser] = useState([])

    const getPayment = async () => {
        try {
            let id = state.user.id

            // let dataFund = `/getpaymentusersone/${id}`
            // let dataDonate = `/getdonates`

            // const requestDataFund = await API.get(dataFund)
            // const requestDataDonate = await API.get(dataDonate)

            // const responseData = axios.all([requestDataFund, requestDataDonate]).then(axios.spread((...responses) => {
            //     const requestDataFund = responses[0]
            //     const requestDataDonate = responses[1]
            //     // const responesThree = responses[2]
            //     console.log(requestDataDonate)
            //     console.log(requestDataFund)
            // }));

            // console.log(responseData)

            let response = await API.get(`/getpaymentusersone/${id}`);
            setFund(response.data.showUsers[0].fund)

            console.log(response.data.showUsers[0].fund)

            let response1 = await API.get(`/getdonates`);
            // console.log(response1.data.showDonate)

            let paymentByUser = response1.data.showDonate.filter(payment => payment.userId === state.user.id)
            // console.log(paymentByUser)

            setPayment(paymentByUser)

            let dataAll = [
                fund,
                payment = {
                    payment
                }
            ]
            console.log(dataAll)

            setDataUser(dataAll)


        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPayment();
    }, []);

    function convertDate(dateMilli) {
        // console.log(dateMilli)

        var d = (new Date(dateMilli) + '').split(' ');
        d[2] = d[2] + ',';

        return [d[0], d[1], d[2], d[3]].join(' ');
    }

    // console.log(data)
    return (
        <div>
            <Header />
            <Container className='my-5'>
                <Row className='profile'>
                    <Col className='profile-image'>
                        <div className='title my-4'>
                            <h3>My Profile</h3>
                        </div>
                        <Row>
                            <Col className='image' md={3}>
                                <Image src={profileImage} rounded />
                            </Col>

                            <Col className='list-bio'>
                                <ul>
                                    <li>
                                        <h4>Full Name</h4>
                                        <p>{ state.user.fullName }</p>
                                    </li>
                                    <li>
                                        <h4>Email</h4>
                                        <p>{state.user.email}</p>
                                    </li>
                                    <li>
                                        <h4>Phone</h4>
                                        <p>083896833122</p>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>

                    <Col className='history'>
                        <div className='title my-4'>
                            <h3>History Donation</h3>
                        </div>

                        {
                                dataUser.map(data => {
                                    console.log(data)
                                    return (
                                        <Card className="mb-5" style={{ width: '30rem' }}>
                                            <Card.Body>
                                                <Card.Title className="title-card mb-4">
                                                   {fund.title}
                                                </Card.Title>
                                                <Card.Subtitle className=" mb-4">
                                                    {/* {convertDate(payment.payments.createdAt)} */}
                                                </Card.Subtitle>
                                                <div className='btn d-flex justify-content-between'>
                                                    <Card.Text className="total my-auto">
                                                        {/* Total : {data.payment.donateAmount} */}
                                                    </Card.Text>
                                                    {/* {payment.payments.status === "success" ? ( */}
                                                        <Button className="my-auto" variant="btn btn-outline-success">Finished</Button>
                                                    {/* ) : ( */}
                                                        <Button className="my-auto" variant="btn btn-outline-danger">Pending</Button>
                                                    {/* )} */}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    )
                            })
                        }
                    </Col>
                </Row>
         </Container>
        </div>
    )
}

function donateCard(props) {

}

export default User