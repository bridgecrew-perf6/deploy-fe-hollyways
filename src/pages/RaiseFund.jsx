import React, {useState, useEffect, useContext} from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import { UserContext } from '../context/UserContext'

import Header from '../Components/Header'
import Card from '../Components/CardList'
import { API } from "../config/api";
import DeleteModal from '../Components/deleteModal';
import ButtonEditDelete from '../Components/ButtonEditDelete';

function RaiseFund() {
    let history = useHistory();
    const [funds, setFunds] = useState([]);
    const [state] = useContext(UserContext)
    // console.log(state.user.id)

    const [idDelete, setIdDelete] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const getFunds = async () => {
        try {
            const response = await API.get("/getfundsuserdonate");
            setFunds(response.data.data);
            // console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFunds();
    }, []);

    const handleDelete = (id) => {
        console.log(id)
        setIdDelete(id)
        handleShow()
    }

    const deleteById = async (id) => {
        try {
            await API.delete(`/deletefund/${id}`)
            getFunds()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (confirmDelete) {
            handleClose()
            deleteById(idDelete)
            setConfirmDelete(null)
        }
    }, [confirmDelete])

    const handleDetail = (id) => {
        console.log(id)
        history.push(`/viewfund/${id}`)
        // <Link to={`/viewfund/${id}`} />
    }

    const handleEdit = (id) => {
        history.push(`/formupdate/${id}`)
    }

    return (
        <div>
            <Header />
            <Container className='raise-fund my-5'>
                <Row className='my-4'>
                    <Col className="title">
                        <h3>My Raise Fund</h3>
                    </Col>
                    <Col className="button d-flex justify-content-end">
                        <Link to="/formfund">
                            <Button variant="danger">Make Raise Fund</Button>
                        </Link>
                    </Col>
                </Row>

                <Row>
                    {state.user.status === "user" ? (
                        funds.filter(funds => funds.adminId === state.user.id)
                        .map(funds => {
                            // console.log(funds)
                            return (
                                <Col className="md-4">
                                    <Card
                                        id={funds.id}
                                        title={funds.title}
                                        thumbnail={funds.thumbnail}
                                        description={funds.description}
                                        money={funds.goal}
                                        goDetail = {handleDetail(funds.id)}
                                        buttonName="View Fund"
                                        remove={() => handleDelete(funds.id)}
                                    >
                                        {state.isLogin ? (
                                            <ButtonEditDelete remove={() => handleDelete(funds.id)} edit={ () => handleEdit(funds.id) }/>
                                        ) : (
                                                <div></div>
                                            )
                                        }
                                    </Card>
                                </Col>
                            )
                        })
                    ) : (
                        funds.map(funds => {
                            // console.log(funds)
                            return (
                                <Col className="md-4">
                                    <Card
                                        id={funds.id}
                                        title={funds.title}
                                        thumbnail={funds.thumbnail}
                                        description={funds.description}
                                        money={funds.goal}
                                        goDetail = {handleDetail}
                                        buttonName="View Fund"
                                    >
                                    </Card>
                                    {state.isLogin ? (
                                        <ButtonEditDelete remove={() => handleDelete(funds.id)} edit={ () => handleEdit(funds.id) }/>
                                    ) : (
                                            <div></div>
                                        )
                                    }
                                </Col>
                            )
                        })
                    )};
                </Row>
            </Container>
            <DeleteModal setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
        </div>
    )
}

export default RaiseFund