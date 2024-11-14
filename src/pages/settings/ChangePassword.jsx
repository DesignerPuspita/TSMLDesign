import AdminLayout from '../../layout/AdminLayout';
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const ChangePassword = () => {

    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            old_password: "",
            new_password: "",
        }
    );
    const changePassword = async () => {
        if (!state.old_password || !state.new_password || state.new_password.length < 6 || state.old_password.length < 6) {
            setError(true)
            return false;
        }

        const data = { old_password: state.old_password, new_password: state.new_password };
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}change-password`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            setSuccessAlert(true);
            formClear();
        } else {
            setWarningAlert(true);
            formClear();
        }
    }
    const formClear = async () => {
        setState({
            old_password: "",
            new_password: "",
        })
    }

    const [successAlert, setSuccessAlert] = useState(false);
    const [warningAlert, setWarningAlert] = useState(false);
    const successClose = () => {
        setSuccessAlert(false);
    };
    const warningClose = () => {
        setWarningAlert(false);
    };

    return (
        <>
            {successAlert && (
                <SweetAlert
                    success
                    title="Thank you"
                    onConfirm={successClose}
                    onCancel={successClose}
                    confirmBtnBsStyle="success"
                >
                    Password change successfully
                </SweetAlert>
            )}
            {warningAlert && (
                <SweetAlert
                    warning
                    title="Oops!"
                    onConfirm={warningClose}
                    onCancel={warningClose}
                    confirmBtnBsStyle="warning"
                >
                    Password not change
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col xs={12} md={6}><p className='page_left_panel'>Change Password</p></Col>
                        <Col xs={12} md={6}><p className='page_right_panel'><span>Dashboard</span> / Change password</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Old Password</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.old_password} onChange={(e) => { setState({ ...state, old_password: e.target.value }) }} type="text" />
                                    {error && !state.old_password && <span style={invalidInput}>Enter Old password</span>}
                                    {error && state.old_password.length > 0 && state.old_password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>New Password</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.new_password} onChange={(e) => { setState({ ...state, new_password: e.target.value }) }} type="text" />
                                    {error && !state.new_password && <span style={invalidInput}>Enter New Password</span>}
                                    {error && state.new_password.length > 0 && state.new_password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className='mt-2 mb-150'>
                        <Col xs={12}>
                            <div className='btn-wrap'>
                                <Button onClick={changePassword} style={submitbuttonStyle}>Submit</Button>
                            </div>
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