import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LoginImg from '../../assets/Login.png';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_AUTH_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const ForgotPassword = () => {

    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            email: "",
        }
    );
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.email) {
            setError(true)
            return false;
        }
        const data = { email: state.email };
        let result = await fetch(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_AUTH_API_URL}forgot-password`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        if (result.response.status === true) {
            setSuccessAlert(true);
        } else {
            setWarningAlert(true);
        }  
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
                    Email send successfully
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
                    Email not found
                </SweetAlert>
            )}
            <Container fluid className="vh-100">
                <Row className="h-100">
                    <Col xs={12} lg={7} className="d-flex align-items-center px-0">
                        <div className='login-bg-wrap w-100' style={{ backgroundImage: `url(${LoginImg})` }}>
                        </div>
                    </Col>
                    <Col xs={12} lg={5} className="d-flex align-items-center justify-content-center px-0">
                        <div className='login-wrap'>
                            <div className='w-100'>
                                <p style={textStyle}>Forgot Password</p>
                                <Form>

                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Enter Email</Form.Label><span style={asteriskStyle}> *</span>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={state.email}
                                                onChange={(e) => { setState({ ...state, email: e.target.value }) }}
                                                style={formStyle} required="required" />
                                
                                        </div>
                                        {error && !state.email && <span style={invalidInput}>Enter Email</span>}
                                    </Form.Group>
                                       
                                </Form>
                                <Button onClick={handleSubmit} style={buttonStyle}>Submit</Button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const invalidInput = {
    color: "red"
}
const buttonStyle = {
    width: "100%",
    height: "50px",
    radius: "5px",
    backgroundColor: "#3A85E5",
    marginTop: "15px"
}
const textStyle = {
    fontSize: "30px",
    fontWeight: "700",
    textAlign: "left",
    lineHeight: '33px'

}
const formStyle = {
    width: "100%",
    height: "40px",
    radius: "5px"
}

const asteriskStyle = {
    color: "red"
}