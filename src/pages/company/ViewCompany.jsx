import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ViewCompany = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [file, setFile] = useState('');
    const [file1, setFile1] = useState('');
    const [apiData, setApiData] = useState({});
    const [state, setState] = useState(
        {
            company_name: "", address: "", large_logo: "", small_logo: "", email: "", pan_number: "", GSTN: "", business_nature: "", city: "", state: "", pin_code: "", contact_person_name: "", contact_person_email: "", contact_person_phone: "", contact_person_address: ""
        }
    );
    const getApiDatas = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/company/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.companyDetails) {
            let itemElements = {};
            itemElements = {
                id: result.response.companyDetails.id,
                company_name: result.response.companyDetails.company_name,
                address: result.response.companyDetails.address,
                large_logo: result.response.companyDetails.large_logo,
                small_logo: result.response.companyDetails.small_logo,
                email: result.response.companyDetails.email,
                pan_number: result.response.companyDetails.pan_number,
                GSTN: result.response.companyDetails.GSTN,
                pin_code: result.response.companyDetails.pin_code,
                business_nature: result.response.companyDetails.business_nature,
                city: result.response.companyDetails.city,
                state: result.response.companyDetails.state,
                contact_person_name: result.response.companyDetails.contact_person_name,
                contact_person_email: result.response.companyDetails.contact_person_email,
                contact_person_phone: result.response.companyDetails.contact_person_phone,
                contact_person_address: result.response.companyDetails.contact_person_address
            };

            setApiData(itemElements);
        }
    }
    const handleNavigate = () => {
        navigate('/list-company')
    }
    useEffect(() => {
        getApiDatas();
        if (apiData.company_name && apiData.address && apiData.email && apiData.contact_person_name && apiData.contact_person_email) {
            setState(
                {
                    ...state,
                    id: apiData.id,
                    company_name: apiData.company_name,
                    address: apiData.address,
                    large_logo: apiData.large_logo,
                    small_logo: apiData.small_logo,
                    email: apiData.email,
                    pan_number: apiData.pan_number,
                    pin_code: apiData.pin_code,
                    GSTN: apiData.GSTN,
                    business_nature: apiData.business_nature,
                    city: apiData.city,
                    state: apiData.state,
                    contact_person_name: apiData.contact_person_name,
                    contact_person_email: apiData.contact_person_email,
                    contact_person_phone: apiData.contact_person_phone,
                    contact_person_address: apiData.contact_person_address
                }
            );
            setFile(apiData.large_logo)
            setFile1(apiData.small_logo)
        }
    }, [apiData.id])
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View Company</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Company List</span> / View Company</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={state.company_name} type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>Address</Form.Label>
                                <Form.Control value={state.address} type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={state.email} type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>PAN Number</Form.Label>
                                <Form.Control value={state.pan_number} type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>GSTN</Form.Label>
                                <Form.Control value={state.GSTN} type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>Business Nature</Form.Label>
                                <Form.Control value={state.business_nature} type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>City</Form.Label>
                                <Form.Control value={state.city} type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>State</Form.Label>
                                <Form.Control value={state.state} type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Pin Code</Form.Label>
                                <Form.Control value={state.pin_code} type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>Contact Person Name</Form.Label>
                                <Form.Control value={state.contact_person_name} type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Contact Person Address</Form.Label>
                                <Form.Control value={state.contact_person_address} type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>Contact Person Email</Form.Label>
                                <Form.Control value={state.contact_person_email} type="text" />
                            </Col>
                        </Row>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Contact Person Phone</Form.Label>
                                <Form.Control value={state.contact_person_phone} type="text" />
                            </Col>
                            <Col md>
                                <Form.Label>Upload Company Large Logo</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" />
                                    <Form.Control value={state.large_logo} disabled />
                                </InputGroup>
                            </Col>
                        </Row>
                        {file && typeof file === 'string' &&
                            <Row className="g-2" style={row_style}>
                                <Col md></Col>
                                <Col lg="6" style={{ textAlign: 'left' }}>
                                    <Image style={{ width: '80px', height: '80px' }} src={file} />
                                </Col>
                            </Row>
                        }
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Upload Company Small Logo</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" />
                                    <Form.Control value={state.small_logo} disabled />
                                </InputGroup>
                            </Col>
                            <Col md></Col>
                        </Row>
                        {file1 && typeof file1 === 'string' &&
                            <Row className="g-2" style={row_style}>
                                <Col lg="6" style={{ textAlign: 'left' }}>
                                    <Image style={{ width: '80px', height: '80px' }} src={file1} />
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