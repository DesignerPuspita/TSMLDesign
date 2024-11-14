import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const AddUserType = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [users, setUsers] = useState([]);
    const [roleId, setRoleId] = useState(0);
    const [showExistMessage, setShowExistMessage] = useState('');
    const handleClose2 = () => setShow2(false);
    const [show2, setShow2] = useState(false);
    const [state, setState] = useState(
        {
            type: "",
            status: "",
        }
    );
    const [checked, setChecked] = useState({ can_add: true, can_edit: true, can_delete: true, can_view: true })
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const handleChange = async (check, permission) => {
        if (permission == 'can_add') {
            setChecked({ 'can_add': !check, 'can_edit': checked.can_edit, 'can_delete': checked.can_delete, 'can_view': checked.can_view });
        } else if (permission == 'can_edit') {
            setChecked({ 'can_add': checked.can_add, 'can_edit': !check, 'can_delete': checked.can_delete, 'can_view': checked.can_view });
        } else if (permission == 'can_delete') {
            setChecked({ 'can_add': checked.can_add, 'can_edit': checked.can_edit, 'can_delete': !check, 'can_view': checked.can_view });
        } else if (permission == 'can_view') {
            setChecked({ 'can_add': checked.can_add, 'can_edit': checked.can_edit, 'can_delete': checked.can_delete, 'can_view': !check });
        }
        // const updatedRoles = [...users];
        // console.log(1111, updatedRoles)
        // updatedRoles[roleIndex][permission] = !updatedRoles[roleIndex][permission];
        // const role_id = updatedRoles[roleIndex]['role_id'];
        // setUsers(updatedRoles);
        // const data = {
        //     role_id: role_id,
        //     can_add: (users[roleIndex].can_add === true || users[roleIndex].can_add === 1) ? 1 : 0,
        //     can_edit: (users[roleIndex].can_edit === true || users[roleIndex].can_edit === 1) ? 1 : 0,
        //     can_delete: (users[roleIndex].can_delete === true || users[roleIndex].can_delete === 1) ? 1 : 0,
        //     can_view: (users[roleIndex].can_view === true || users[roleIndex].can_view === 1) ? 1 : 0,
        // };
        // let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}permissions`, {
        //     method: 'post',
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
    };
    const addUserType = async () => {
        if (!state.type || !state.status) {
            setError(true)
            return false;
        }
        let user_type = { role_name: state.type };
        let user_types = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-role-by-name`, {
            method: 'post',
            body: JSON.stringify(user_type),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (user_types.response.status == false) {
            const companies_id = JSON.parse(localStorage.getItem('user')).user_companies_id;
            const data = { role_name: state.type, company_id: companies_id, status: state.status };
            let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}create-role`, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (result.response.status === true) {
                const data = {
                    role_id: result.response.data.id,
                    can_read: (checked.can_add === true) ? 1 : 0,
                    can_edit: (checked.can_edit === true) ? 1 : 0,
                    can_delete: (checked.can_delete === true) ? 1 : 0,
                    can_view: (checked.can_view === true) ? 1 : 0,
                };
                await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}permissions`, {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/list-user-type');
                }, 2000);
            } else {
                setShowAlert(true);
            }
        } else {
            setShow2(true)
            setShowExistMessage(user_types.response.message)
        }
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            type: "",
            status: "",
        })
    }
    const handleNavigate = () => {
        navigate('/list-user-type')
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         let resultRole = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}all-user-role-permission`, {
    //             method: 'get',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         });
    //         if (resultRole.response.data > 0) {
    //             setUsers(resultRole.response.data);
    //         }

    //     };

    //     fetchData();
    // }, []);
    // useEffect(() => {
    // }, [users])
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
                    User Type not created
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="User Type Added!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    User Type created successfully
                </SweetAlert>
            )}
            {
                show2 && showExistMessage && (
                    <SweetAlert
                        warning
                        title="Oops!"
                        onConfirm={handleClose2}
                        onCancel={handleClose2}
                        confirmBtnBsStyle="success"
                    >
                        User Type already exists
                    </SweetAlert>
                )
            }
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Add User Type</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>User Type List</span> / Add User Type</p></Col>
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
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Table>
                                        <thead>
                                            <tr>
                                                {/* <th>Role</th> */}
                                                <th>Add</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td>{user.role_name}</td> */}
                                                <td>
                                                    <input name="can_add" type="checkbox"
                                                        checked={checked?.can_add}
                                                        onChange={() => handleChange(checked?.can_add, 'can_add')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_edit" type="checkbox"
                                                        checked={checked?.can_edit}
                                                        onChange={() => handleChange(checked?.can_edit, 'can_edit')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_delete" type="checkbox"
                                                        checked={checked?.can_delete}
                                                        onChange={() => handleChange(checked?.can_delete, 'can_delete')}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_view" type="checkbox"
                                                        checked={checked?.can_view}
                                                        onChange={() => handleChange(checked?.can_view, 'can_view')}
                                                    />
                                                </td>
                                            </tr>
                                            {/* {users.length > 0 && users.map((user, index) => (
                                                <tr key={index}>
                                                    <td>{user.role_name}</td>
                                                    <td>
                                                        <input name="can_add" type="checkbox"
                                                            checked={user?.can_add}
                                                            onChange={() => handleChange(index, 'can_add')}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input name="can_edit" type="checkbox"
                                                            checked={user?.can_edit}
                                                            onChange={() => handleChange(index, 'can_edit')}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input name="can_delete" type="checkbox"
                                                            checked={user?.can_delete}
                                                            onChange={() => handleChange(index, 'can_delete')}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input name="can_view" type="checkbox"
                                                            checked={user?.can_view}
                                                            onChange={() => handleChange(index, 'can_view')}
                                                        />
                                                    </td>
                                                </tr>
                                            ))} */}
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
                            <Button onClick={addUserType} style={submitbuttonStyle}>Add</Button>
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