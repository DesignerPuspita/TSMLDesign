import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_IMAGE_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ViewTheme = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [theme, setThemes] = useState({});
    const [file, setFile] = useState('');
    const [state, setState] = useState(
        {
            id: "",
            screen_color: "",
            button_color: "",
            os_type: "",
            company_name: "",
            background_color: "",
            page_name: "",
            image_1: "",
            image_2: "",
            image_3: "",
            status: ""
        }
    );
    async function fetchData() {
        let resultTheme = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-theme-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        setState({
            id: resultTheme.response.themeDetails.id,
            screen_color: resultTheme.response.themeDetails.screen_color,
            button_color: resultTheme.response.themeDetails.button_color,
            os_type: resultTheme.response.themeDetails.os_type,
            company_name: resultTheme.response.themeDetails.company_name,
            background_color: resultTheme.response.themeDetails.background_color,
            page_name: resultTheme.response.themeDetails.page_name,
            image_1: resultTheme.response.themeDetails.image_1,
            image_2: resultTheme.response.themeDetails.image_2,
            image_3: resultTheme.response.themeDetails.image_3,
            status: resultTheme.response.themeDetails.status ? "Active" : "Inactive"
        })
    }
    useEffect(() => {
        fetchData();
        console.log(state)
    }, [state.id])
    const handleNavigate = () => {
        navigate('/list-themes')
    }
    return (
        <AdminLayout>
            <Container fluid="true" style={{ padding: '25px 20px 25px 25px' }}>
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View Theme</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Theme List</span> / View User</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>OS Type</Form.Label>
                                <Form.Control value={state.os_type} disabled type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control value={state.company_name} disabled type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Page Name</Form.Label>
                                <Form.Control value={state.page_name} disabled type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>Screen Color</Form.Label>
                                <Form.Control value={state.screen_color} disabled type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Button Color</Form.Label>
                                <Form.Control value={state.button_color} disabled type="email" />
                            </Col>
                            <Col md>
                                <Form.Label>Background Color</Form.Label>
                                <Form.Control value={state.background_color} disabled type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Theme Image 1</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" />
                                    <Form.Control value={state.image_1} disabled />
                                </InputGroup>
                            </Col>
                            <Col md>
                                <Form.Label>Theme Image 2</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" />
                                    <Form.Control value={state.image_2} disabled />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            {(state.image_1 && typeof state.image_1 === 'string') ?
                                <Col lg="6" style={{ textAlign: 'left' }}>
                                    <Image style={{ width: '80px', height: '80px' }} src={ADMIN_BACKEND_BASE_URL + state.image_1} />
                                </Col> : <Col md></Col>
                            }
                            {(state.image_2 && typeof state.image_2 === 'string') &&
                                <Col lg="6" style={{ textAlign: 'left' }}>
                                    <Image style={{ width: '80px', height: '80px' }} src={ADMIN_BACKEND_BASE_URL + state.image_2} />
                                </Col>
                            }
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Theme Image 3</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" />
                                    <Form.Control value={state.image_3} disabled />
                                </InputGroup>
                            </Col>
                            <Col md>
                                <Form.Label>Status</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} disabledtype="text" />
                                    <Form.Control value={state.status} disabled />
                                </InputGroup>
                            </Col>
                        </Row>
                        {(state.image_3 && typeof state.image_3 === 'string') &&
                            <Col lg="6" style={{ textAlign: 'left' }}>
                                <Image style={{ width: '80px', height: '80px' }} src={ADMIN_BACKEND_BASE_URL + state.image_3} />
                            </Col>
                        }
                    </Form>
                </Row>
            </Container >
        </AdminLayout >
    )
}

const row_style = {
    marginTop: "20px"
}