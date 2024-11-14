import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ViewUserStatus = () => {

    const { id } = useParams();
    const [state, setState] = useState(
        {
            id: "", user_status: "", status: ""
        }
    );

    useEffect(() => {
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-status-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => {
            if (result.response.status === true && result.response.statusDetails) {
                let itemElements = {};
                itemElements = {
                    id: result.response.statusDetails.id,
                    user_status: result.response.statusDetails.user_status,
                    status: result.response.statusDetails.status
                }
                setState(
                    {
                        ...state,
                        id: itemElements.id,
                        user_status: itemElements.user_status,
                        status: itemElements.status
                    }
                );
            }
        }).catch(error => {

        });
    }, [])

    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View User Status</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'>Dashboard / View User Status</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>Customer Type</Form.Label>
                                <Form.Control defaultValue={state.user_status} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Status</Form.Label>
                                <Form.Control defaultValue={state.status == 0 ? "Inactive" : "Active"} type="text" disabled />
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </AdminLayout>
    )
}

const row_style = {
    marginTop: "20px"
}