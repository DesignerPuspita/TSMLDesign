import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_IMAGE_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ViewCustomer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [customers, setCustomers] = useState({});
    const [file, setFile] = useState('');
    const [state, setState] = useState(
        {
            id: "",
            user_code: "",
            name: "",
            email: "",
            phone_number: "",
            organization_name: "",
            organization_PAN: "",
            organization_GSTN: "",
            organization_address_registered: "",
            address: "",
            city: "",
            state: "",
            pin_code: "",
            zone: "",
            customer_type: "",
            business_nature: "",
            organization_address_plant: "",
            profile_image: "",
            status: ""
        }
    );
    const getCustomer = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-customer-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.customerInfoDetails) {
            let itemElements = {};
            itemElements = {
                id: result.response.customerInfoDetails.id,
                user_code: result.response.customerInfoDetails.user_code,
                name: result.response.customerInfoDetails.name,
                email: result.response.customerInfoDetails.email,
                phone_number: result.response.customerInfoDetails.phone_number,
                organization_name: result.response.customerInfoDetails.organization_name,
                organization_PAN: result.response.customerInfoDetails.organization_PAN,
                organization_GSTN: result.response.customerInfoDetails.organization_GSTN,
                organization_address_registered: result.response.customerInfoDetails.organization_address_registered,
                address: result.response.customerInfoDetails.address,
                city: result.response.customerInfoDetails.city,
                state: result.response.customerInfoDetails.state,
                pin_code: result.response.customerInfoDetails.pin_code,
                zone: result.response.customerInfoDetails.zone,
                customer_type: result.response.customerInfoDetails.customer_type,
                business_nature: result.response.customerInfoDetails.business_nature,
                organization_address_plant: result.response.customerInfoDetails.business_nature,
                profile_image: result.response.customerInfoDetails.profile_image,
                status: result.response.customerInfoDetails.status
            };

            setCustomers(itemElements);
        }
    }
    useEffect(() => {
        getCustomer();
        setState(
            {
                id: customers.id,
                user_code: customers.user_code,
                name: customers.name,
                email: customers.email,
                phone_number: customers.phone_number,
                organization_name: customers.organization_name,
                organization_PAN: customers.organization_PAN,
                organization_GSTN: customers.organization_GSTN,
                organization_address_registered: customers.organization_address_registered,
                address: customers.address,
                city: customers.city,
                state: customers.state,
                pin_code: customers.pin_code,
                zone: customers.zone,
                customer_type: customers.customer_type,
                business_nature: customers.business_nature,
                organization_address_plant: customers.business_nature,
                profile_image: customers.profile_image,
                status: customers.status ? "Active" : "Inactive"
            }
        );
    }, [customers.id])
    const handleNavigate = () => {
        navigate('/get-all-customer')
    }
    return (
        <AdminLayout>
            <Container fluid="true" style={{ padding: '25px 20px 25px 25px' }}>
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View Customer</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Customer List</span> / View Customer</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2">
                            <Col md>
                                <Form.Label>User Code</Form.Label>
                                <Form.Control value={state.user_code} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={state.name} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={state.email} type="email" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Phone No.</Form.Label>
                                <Form.Control value={state.phone_number} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Organization Name</Form.Label>
                                <Form.Control value={state.organization_name} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Organization PAN</Form.Label>
                                <Form.Control value={state.organization_PAN} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Organization GSTN</Form.Label>
                                <Form.Control value={state.organization_GSTN} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Organization Registered Address</Form.Label>
                                <Form.Control value={state.organization_address_registered} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Organization Plant Address</Form.Label>
                                <Form.Control value={state.organization_address_plant} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Address</Form.Label>
                                <Form.Control value={state.address} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>State</Form.Label>
                                <Form.Control value={state.state} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>City</Form.Label>
                                <Form.Control value={state.city} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control value={state.pin_code} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Zone</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={state.zone} disabled>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Customer Type</Form.Label>
                                <Form.Select aria-label="Floating label select example" value={state.customer_type} disabled>
                                </Form.Select>
                            </Col>
                            <Col md>
                                <Form.Label>Business Nature</Form.Label>
                                <Form.Control value={state.business_nature} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Upload Customer Profile Image</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" disabled />
                                    <Form.Control value={state.profile_image} disabled />
                                    <InputGroup.Text style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col md>
                                <Form.Label>Status</Form.Label>
                                <Form.Control defaultValue={state.status} type="text" disabled />
                            </Col>
                        </Row>
                        {state.profile_image && typeof state.profile_image === 'string' &&
                            <Row className="g-2" style={row_style}>
                                <Col lg="6" style={{ textAlign: 'left' }}>
                                    <Image style={{ width: '80px', height: '80px' }} src={ADMIN_BACKEND_BASE_URL + state.profile_image} />
                                </Col>
                                <Col md></Col>
                            </Row>
                        }
                    </Form>
                </Row>
            </Container>
        </AdminLayout>
    )
}

const row_style = {
    marginTop: "20px"
}