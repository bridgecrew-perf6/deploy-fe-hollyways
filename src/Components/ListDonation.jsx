import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom';

import { API } from "../config/api";
import Card from './CardList'

function ListDonation() {
    const [funds, setFunds] = useState([]);
    let history = useHistory();

    const useName = () => {
        const location = useLocation();
        return location.pathname;
    }

    const getFunds = async () => {
        try {
            const response = await API.get("/getfundsuserdonate");
            setFunds(response.data.data);
            // console.log(response.data.data[1].userDonate[0].payment.donateAmount)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFunds();
    }, []);

    // const handleDelete = (id) => {
    //     console.log(id)
    //     history.push(`/formupdate/${id}`)
    //     // <Link to={`/viewfund/${id}`} />
    // }

    return (
        <Container id="list-donation-scroll" className='list-donation'>
            <Row className='title text-center' id='name-list-donation'>
                <h3>Donate Now</h3>
            </Row>
            <Row className="d-flex justify-content-center">
                {
                    funds.map(funds => {
                        // console.log(funds)
                        return (
                            <Col className="md-4 mb-4 justify-content-center">
                                <Card
                                    id={funds.id}
                                    title={funds.title}
                                    thumbnail={funds.thumbnail}
                                    description= {funds.description}
                                    money={funds.goal}
                                    goDetail={
                                        // () => history.push(`/detaildonations/${funds.id}`)
                                         () => history.push(`/detaildonations/${funds.id}`)

                                    }
                                    buttonName="Donate Now"
                                    // remove= {handleDelete(funds.id)}
                                />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default ListDonation