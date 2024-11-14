import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const EditUserType = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [role, setRole] = useState({});
    const [users, setUsers] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const [checked, setChecked] = useState({})
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [state, setState] = useState(
        {
            id: "",
            type: "",
            status: "",
        }
    );
    const handleChange = async (permission) => {
        const updatedRoles = users;
        updatedRoles[permission] = !updatedRoles[permission];
        setUsers(updatedRoles);
        setChecked({ can_add: users.can_add, can_edit: users.can_edit, can_delete: users.can_delete, can_view: users.can_view })
    };
    const editUserType = async () => {
        if (!state.type || state.status == 2) {
            setError(true)
            return false;
        }

        const data = { 'role_name': state.type, 'status': state.status };
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit-role/${id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            if (users) {
                const role_id = users['role_id'] ? users['role_id'] : state.id;
                const data = {
                    role_id: role_id,
                    can_read: (users.can_add === true || users.can_add === 1) ? 1 : 0,
                    can_edit: (users.can_edit === true || users.can_edit === 1) ? 1 : 0,
                    can_delete: (users.can_delete === true || users.can_delete === 1) ? 1 : 0,
                    can_view: (users.can_view === true || users.can_view === 1) ? 1 : 0,
                    status: state.status
                };
                let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}permissions`, {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-user-type');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            id: "",
            type: "",
            status: "",
        })
    }

    useEffect(() => {
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => {
            if (result.success === true && result.response.data) {
                let itemElements = {
                    id: result.response.data.id,
                    userType: result.response.data.role_name,
                    userStatus: result.response.data.status,
                };
                setState(
                    {
                        ...state,
                        id: itemElements.id,
                        type: itemElements.userType,
                        status: itemElements.userStatus,
                    }
                );
            }
            fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-permission/${result.response.data.id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setUsers(res.response.permissionDetails);
            }).catch(err => {

            })
        })
    }, [id])
    useEffect(() => {
        setChecked({ can_add: users.can_add, can_edit: users.can_edit, can_delete: users.can_delete, can_view: users.can_view })
    }, [users])
    const handleNavigate = () => {
        navigate('/list-user-type')
    }
    return (
        <>
            {show1 && (
                <SweetAlert
                    warning
                    title="Oops!"
                    onConfirm={handleClose1}
                    onCancel={handleClose1}
                    confirmBtnBsStyle="success"
                >
                    User Type not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="User Type Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    User Type updated successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Edit User Type</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>User Type List</span> / Edit User Type</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>User Type</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.type} onChange={(e) => { setState({ ...state, type: e.target.value }) }} type="text" />
                                    {error && !state.type && <span style={invalidInput}>Enter Type</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                        <option value="2">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                    {error && state.status == 2 && <span style={invalidInput}>Select Status</span>}
                                    {/* {error && !state.status && <span style={invalidInput}>Select Status</span>} */}
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
                                            {/* {users.length > 0 && users.map((user, index) => ( */}
                                            <tr>
                                                <td>{state.type}</td>
                                                <td>
                                                    <input name="can_add" type="checkbox"
                                                        checked={checked?.can_add}
                                                        onChange={() => handleChange('can_add')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_edit" type="checkbox"
                                                        checked={checked?.can_edit}
                                                        onChange={() => handleChange('can_edit')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_delete" type="checkbox"
                                                        checked={checked?.can_delete}
                                                        onChange={() => handleChange('can_delete')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_view" type="checkbox"
                                                        checked={checked?.can_view}
                                                        onChange={() => handleChange('can_view')}
                                                    />
                                                </td>
                                            </tr>
                                            {/* ))} */}
                                        </tbody>
                                    </Table>

                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            <Button onClick={editUserType} style={submitbuttonStyle}>Update</Button>
                        </Col>
                    </Row>
                </Container>
            </AdminLayout>
        </>
    );
}
const clearbuttonStyle = {
    width: "180px",
    height: "39px",
    backgroundColor: "#FFF",
    color: "#3A85E5",
    border: "1px solid #3A85E5",
    marginTop: "15px",
}
const submitbuttonStyle = {
    width: "180px",
    height: "39px",
    radius: "5px",
    backgroundColor: "#3A85E5",
    marginTop: "15px",
}
const asteriskStyle = {
    color: "red"
}
const invalidInput = {
    color: "red"
}