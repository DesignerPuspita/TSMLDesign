import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const RolePermission = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    const handleChange = async (roleIndex, permission, userId) => {
        const updatedRoles = [...users];
        updatedRoles[roleIndex].user_permission[permission] = !updatedRoles[roleIndex].user_permission[permission];
        setUsers(updatedRoles);

        const data = {
            user_id: userId,
            can_add: (users[roleIndex].user_permission.can_add === true || users[roleIndex].user_permission.can_add === 1) ? 1 : 0,
            can_edit: (users[roleIndex].user_permission.can_edit === true || users[roleIndex].user_permission.can_edit === 1) ? 1 : 0,
            can_delete: (users[roleIndex].user_permission.can_delete === true || users[roleIndex].user_permission.can_delete === 1) ? 1 : 0,
            can_view: (users[roleIndex].user_permission.can_view === true || users[roleIndex].user_permission.can_view === 1) ? 1 : 0,
        };

        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}update-user-role-permission`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            navigate('/role-permission');
        }
    };

    async function fetchData() {
        let resultRole = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}all-user-role-permission`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (resultRole.response.data) {
            resultRole.response.data.map((item, index) => {
                const element = {
                    can_add: 0,
                    can_edit: 0,
                    can_delete: 0,
                    can_view: 0,
                };
                if (item.user_permission === null) {
                    resultRole.response.data[index]['user_permission'] = element;
                }
                setUsers([...users, item]);
            })
        }
    }

    useEffect(() => {
        fetchData();
        console.log(users)
    }, [users])

    //console.log('users',users);
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p className='page_left_panel'>Role Permission</p></Col>
                    <Col sm={5}></Col>
                    <Col sm={4}><p className='page_right_panel'>Dashboard / Role Permission</p></Col>
                </Row>
                <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                    <Form style={{ padding: '25px 20px 25px 25px' }}>
                        <Row className="g-2">
                            <Col md>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Role</th>
                                            <th>User Name</th>
                                            <th>Add</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {users.map((user, index) => (
                                            <tr key={index}>
                                                <td>{user.role.role_name}</td>
                                                <td>{user.username}</td>
                                                <td>
                                                    <input name="can_add" type="checkbox"
                                                        checked={user.user_permission?.can_add}
                                                        onChange={() => handleChange(index, 'can_add', user.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_edit" type="checkbox"
                                                        checked={user.user_permission?.can_edit}
                                                        onChange={() => handleChange(index, 'can_edit', user.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_delete" type="checkbox"
                                                        checked={user.user_permission?.can_delete}
                                                        onChange={() => handleChange(index, 'can_delete', user.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input name="can_view" type="checkbox"
                                                        checked={user.user_permission?.can_view}
                                                        onChange={() => handleChange(index, 'can_view', user.id)}
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

            </Container>
        </AdminLayout>
    );
}
