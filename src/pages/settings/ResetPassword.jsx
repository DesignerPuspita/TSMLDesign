import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LoginImg from '../../assets/Login.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_AUTH_API_URL } from '../../constant';
import SweetAlert from 'react-bootstrap-sweetalert';

export const ResetPassword = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(false);
    const [state, setState] = useState(
        {
            password: "",
            confirm_password: "",
        }
    );
    const [tokenAlert, setTokenAlert] = useState(false);
    const tokenClose = () => {
        setTokenAlert(false);
    };
    useEffect(() => {
        if (token) {
            const parts = token.split('.');
            if( parts.length === 3 ){

                const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
                const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                if (payload.exp < currentTime) {
                    setTokenAlert(true);
                    setTimeout(() => {
                        navigate('/'); // Redirect after alert is shown
                    }, 1000);
                }
            }else{
                navigate('/');
            }
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.password || !state.confirm_password || state.password.length < 6 || state.confirm_password.length < 6) {
            setError(true)
            console.log("llll");
            return false;
        }
        if (state.password === state.confirm_password) {
            const data = { newPassword: state.password };
            let result = await fetch(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_AUTH_API_URL}reset-password/${token}`, {
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
        } else {
            setWarningAlert(true);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };
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
            {tokenAlert && (
                <SweetAlert
                    warning
                    title="Oops!"
                    onConfirm={tokenClose}
                    onCancel={tokenClose}
                    confirmBtnBsStyle="warning"
                >
                    Token Expire!
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
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={state.password}
                                                onChange={(e) => { setState({ ...state, password: e.target.value }) }}
                                                style={formStyle} required="required" />
                                            <span onClick={togglePasswordVisibility} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', right: '30px' }}>
                                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                            </span>
                                        </div>
                                        {error && !state.password && <span style={invalidInput}>Enter Old password</span>}
                                        {error && state.password.length > 0 && state.password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Confirm Password</Form.Label><span style={asteriskStyle}> *</span>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Control
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirm_password"
                                                value={state.confirm_password}
                                                onChange={(e) => { setState({ ...state, confirm_password: e.target.value }) }}
                                                style={formStyle} required="required" />
                                            <span onClick={toggleConfirmPasswordVisibility} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', right: '30px' }}>
                                                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                            </span>
                                        </div>
                                        {error && !state.confirm_password && <span style={invalidInput}>Enter New Password</span>}
                                        {error && state.confirm_password.length > 0 && state.confirm_password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                    </Form.Group>

                                    <Button type='submit' style={buttonStyle}>Submit</Button>
                                </Form>
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