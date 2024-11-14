import React, { useState, useEffect } from "react";
import AdminLayout from '../../layout/AdminLayout';
import { Container, Row, Col, Form, Button, InputGroup, Image, Table } from "react-bootstrap";
import { Link, useParams,useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ViewUserType = () => {
    const navigate=useNavigate();
    const { id } = useParams();
    const [state, setState] = useState(
        {
            id: "", role_name: "", status: ""
        }
    );
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => {
            if (result.response.status === true && result.response.data) {
                let itemElements = {};
                itemElements = {
                    dataid: result.response.data.id,
                    role_name: result.response.data.role_name,
                    status: result.response.data.status
                }
                setState(
                    {
                        ...state,
                        id: itemElements.dataid,
                        role_name: itemElements.role_name,
                        status: itemElements.status == 1 ? "Active" : "Inactive"
                    }
                );
                fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-permission/${result.response.data.id}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => {
                    setUsers(res.response.permissionDetails);
                }).catch(err => {

                })
            }
        }).catch(error => {

        });
    }, [state.id])

    useEffect(() => {
        console.log(12121212, users)
    }, [users])
    const handleNavigate = () => {
        navigate('/list-user-type')
    }
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>View Reason</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>User Type List</span> / View Reason</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2" style={row_style}>
                            <Col md>
                                <Form.Label>User Type</Form.Label>
                                <Form.Control defaultValue={state.role_name} type="text" disabled />
                            </Col>
                            <Col md>
                                <Form.Label>Status</Form.Label>
                                <Form.Control defaultValue={state.status} type="text" disabled />
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>Add</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{state.role_name}</td>
                                            <td>
                                                <input name="can_add" type="checkbox"
                                                    checked={users?.can_add} disabled
                                                />
                                            </td>
                                            <td>
                                                <input name="can_edit" type="checkbox"
                                                    checked={users?.can_edit} disabled
                                                />
                                            </td>
                                            <td>
                                                <input name="can_delete" type="checkbox"
                                                    checked={users?.can_delete} disabled
                                                />
                                            </td>
                                            <td>
                                                <input name="can_view" type="checkbox"
                                                    checked={users?.can_view} disabled
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>

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