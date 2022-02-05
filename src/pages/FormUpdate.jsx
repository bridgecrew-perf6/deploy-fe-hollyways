import React, {useState, useEffect, useContext} from 'react'
import Header from '../Components/Header'
import { Form, Button, Container } from 'react-bootstrap'
import { useHistory, useParams } from "react-router";
import { UserContext } from '../context/UserContext';

import{API} from "../config/api"

function FormUpdate() {
    const [preview, setPreview] = useState(null);
    const [fund, setFund] = useState([]);
    let history = useHistory();
    const { id } = useParams();

    let FILE_PATH = 'http://localhost:5000/uploads/'
    // const {userId} = req.users.id
    // console.log(fund)


    const [form, setForm] = useState({
        title: "",
        description: "",
        goal: "",
        image: ""
    })

    const getFund = async (id) => {
        console.log(id)
        try {
            const response = await API.get(`/getfundsuserdonateone/${id}`)
            setPreview(FILE_PATH + response.data.data.thumbnail)
            // console.log(FILE_PATH + response.data.data.thumbnail)

            setForm({
                ...Form,
                title: response.data.data.title,
                description: response.data.data.description,
                goal: response.data.data.goal
            })
            setFund(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFund(id)
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });

        // Create image url for preview
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            // console.log(url)
            setPreview(url);
            console.log(url)
        }
    };
    // console.log(fund)


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.set("image", form.image[0], form.image[0].name)
            formData.set("title", form.title)
            formData.set("goal", form.goal)
            formData.set("description", form.description)
            // formData.set("adminId", userId)
            console.log(form)

            const response = await API.put(`/updatefund/${fund.id}`, formData, config)
            console.log(response)

            history.push("/raisefund");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Header />
            <Container className='form-fund my-5'>

                <Form className='main' onSubmit={handleSubmit}>
                    <div className="title my-5">
                        <h2>Make Raise Fund</h2>
                    </div>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Control name="title" type="text" placeholder="Title" value={form.title} onChange={ handleChange }/>
                    </Form.Group>

                    {preview && (
                        <div>
                        <img
                            src={preview}
                            style={{
                            maxWidth: "150px",
                            maxHeight: "150px",
                            objectFit: "cover",
                            }}
                            alt="preview"
                        />
                        </div>
                    )}

                    <Form.Group className="my-3" controlId="image">
                        <Form.Label className='custom-file-upload '>Attache Thumbnail</Form.Label>
                        <Form.Control name="image" type="file" placeholder="Attache Thumbnail" onChange={ handleChange }/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="goal-donation">
                        <Form.Control name="goal" type="number" placeholder="Goal Donation" value={form.goal} onChange={ handleChange }/>
                    </Form.Group>

                    <Form.Group className=" mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control name="description" as="textarea" rows={5}  placeholder='Description' value={form.description} style={{resize: 'none'}} onChange={ handleChange }/>
                    </Form.Group>

                    <div className="btn d-flex justify-content-end my-5">
                        <Button className="button" variant="danger" type="submit" style={{padding: '8px 200px'}}>
                            Public Fundraising
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default FormUpdate
