import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_IMAGE_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ViewUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUsers] = useState({});
    const [file, setFile] = useState('');
    const [state, setState] = useState(
        {
            name: "",
            userId: "",
            userType: "",
            phone: "",
            email: "",
            location: "",
            status: "",
        }
    );
    const getUser = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.success === true && result.response.data) {
            let itemElements = {};
            itemElements = {
                name: result.response.data.username,
                usercode: result.response.data.user_code,
                usertype: result.response.data.role.role_name,
                email: result.response.data.email,
                phone: result.response.data.phone,
                location: result.response.data.location,
                profile_pic: result.response.data.profile_pic,
                status: result.response.data.status,
            };

            setUsers(itemElements);
        }
    }
    useEffect(() => {
        getUser();
        setState(
            {
                name: user.name,
                userId: user.usercode,
                userType: user.usertype,
                phone: user.phone,
                email: user.email,
                location: user.location,
                status: user.status ? "Active" : "Inactive",
            }
        );
        setFile(user.profile_pic);
    }, [user.name])
    const handleNavigate = () => {
        navigate('/list-user')
    }
    return (
        <AdminLayout>
            <Container fluid="true" style={{ padding: '25px 20px 25px 25px' }}>
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View User</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>User List</span> / View User</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2" style={rowStyle}>
                            <Col md style={colStyle}>
                                <Form.Label>User Name</Form.Label>
                                <Form.Control defaultValue={state.name} type="text" disabled />
                            </Col>
                            <Col md style={colStyle}>
                                <Form.Label>User Code</Form.Label>
                                <Form.Control defaultValue={state.userId} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={rowStyle}>
                            <Col md style={colStyle}>
                                <Form.Label>User Type</Form.Label>
                                <Form.Control defaultValue={state.userType} type="text" disabled />
                            </Col>
                            <Col md style={colStyle}>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control defaultValue={state.phone} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={rowStyle}>
                            <Col md style={colStyle}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control defaultValue={state.email} type="text" disabled />
                            </Col>
                            <Col md style={colStyle}>
                                <Form.Label>Location</Form.Label>
                                <Form.Control defaultValue={state.location} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2" style={rowStyle}>
                            <Col md style={colStyle}>
                                <Form.Label>Status</Form.Label>
                                <Form.Control defaultValue={state.status} type="text" disabled />
                            </Col>
                            <Col md style={colStyle}>
                                <Form.Label>Upload User Image</Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ display: "none" }} type="file" />
                                    <Form.Control value={file ? file : ''} disabled />
                                </InputGroup>
                            </Col>
                        </Row>
                        {file && typeof file === 'string' &&
                            <Row className="g-2" style={rowStyle}>
                                <Col md></Col>
                                <Col lg="6" style={{ textAlign: 'left' }}>
                                    <Image style={{ width: '80px', height: '80px' }} src={ADMIN_BACKEND_BASE_URL + file} />
                                </Col>
                            </Row>
                        }
                    </Form>
                </Row>
            </Container>
        </AdminLayout>
    )
}

const rowStyle = {
    paddingTop: '10px',
    marginLeft: '20px'
}
const colStyle = {
    paddingTop: '10px',
    fontSize: '20px'
}