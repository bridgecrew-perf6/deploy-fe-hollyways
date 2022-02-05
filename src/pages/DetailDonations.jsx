import React, {useState, useEffect} from 'react'
import {Row, Container } from 'react-bootstrap'
import Header from '../Components/Header'
import DetailDonate from '../Components/DetailDonate'
import CardDonatur from '../Components/CardDonatur'
import { API } from "../config/api"

function DetailDonations(props) {

    const [fund, setFund] = useState([]);
    const [userDonate, setUserDonate] = useState([]);
    const [paymentApproved, setPaymentApproved] = useState(null)
    const [totalDonate, setTotalDonate] = useState()

    const getFund = async () => {
        try {
            let id = props.match.params.id

            const response = await API.get(`/getfundsuserdonateone/${id}`);
            setFund(response.data.data)
            setUserDonate(response.data.data.userDonate)

            console.log(response)

            const paymentApproved = response.data.data.userDonate.filter(e => e.payment.status === "success")
            setPaymentApproved(paymentApproved.length)
            // console.log(paymentApproved)

            // console.log(paymentApproved.length)

            const price = paymentApproved.map(price => {
                return price.payment.donateAmount
            })
            .reduce((previousPrice, currentPrice) => previousPrice + currentPrice, 0);
            setTotalDonate(price)

            console.log(price)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getFund();
    }, []);

    function taskDate(dateMilli) {
        var d = (new Date(dateMilli) + '').split(' ');
        d[2] = d[2] + ',';

        return [d[0], d[1], d[2], d[3]].join(' ');
    }

    // console.log(fund)
    return (
        <div>
            <Header />
            <DetailDonate
                id={fund.id}
                title={fund.title}
                thumbnail={fund.thumbnail}
                goal={fund.goal}
                description={fund.description}
                totalDonatur={paymentApproved}
                totalDonate={totalDonate}
            />
            <Container>
                <Row className='list-not-aproved mt-5'>
                    <div className="title">
                        <h3>List Donations ({paymentApproved})</h3>
                    </div>
                    <div className="card-list">
                        {
                            userDonate.filter(e => e.payment.status === "success")
                                .map((e) => {
                                    // console.log(e)
                                    return (
                                        <CardDonatur
                                            id={e.id}
                                            name={e.fullName}
                                            money={e.payment.donateAmount}
                                            date={taskDate(e.payment.createdAt)}
                                            // idUser={}
                                        />
                                    )
                            })
                        }
                    </div>
                    <Row className="text-center">
                        <p>Load More</p>
                    </Row>
                </Row>
            </Container>
        </div>
    )
}

export default DetailDonations
