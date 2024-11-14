import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import LoginImg from '../assets/Login.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather';
import { ADMIN_BACKEND_BASE_URL } from '../constant';
import SweetAlert from 'react-bootstrap-sweetalert';

export const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [captchacode, setCaptchacode] = useState('');
    const [errors, setErrors] = useState({});

    const [show1, setShow1] = useState(false);
    const handleShow1 = () => setShow1(true);
    const handleClose1 = () => setShow1(false);

    const [showAlert, setShowAlert] = useState(false);
    const handleLogin = () => {
        setShowAlert(true);
        setTimeout(() => {
            navigate('/dashboard'); // Redirect after alert is shown
        }, 2000);
    }
    const handleClose = () => {
        setShowAlert(false);
    };


    const validateForm = () => {
        const newErrors = {};
        // if (!email) newErrors.email = 'Email is required';
        // else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

        // if (!mobile) newErrors.mobile = 'Mobile number is required';
        // else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Mobile number must be 10 digits long';

        if (!username) newErrors.username = 'User Id / Mobile No is required';


        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';

        if (!captcha) newErrors.captcha = 'Captcha is required';
        else if (captcha.length < 6) newErrors.captcha = 'Captcha must be at least 6 characters long';
        else if (captcha.length > 6) newErrors.captcha = 'Captcha must be at least 6 characters long';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const newErrors = {};
            if (captcha === captchacode) {

                let result = await fetch(`${ADMIN_BACKEND_BASE_URL}api/v1/auth/login`, {
                    method: 'post',
                    body: JSON.stringify({ username, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                result = await result.json();

                if (result.response.admin_login) {

                    if (result.success === false && result.response.message.message === 'Username is wrong') {
                        newErrors.username = 'Invalid Username';
                        setErrors(newErrors);
                        return false;
                    }
                    if (result.success === false && result.response.message.message === 'Incorrect password') {
                        newErrors.password = 'Invalid Password';
                        setErrors(newErrors);
                        return false;
                    }
                    const userInfo = {
                        "id": result.response.userData.id,
                        "username": result.response.userData.username,
                        "phone": result.response.userData.phone,
                        "user_code": result.response.userData.user_code,
                        "user_companies_id": result.response.userData.user_companies_id,
                        "email": result.response.userData.email,
                        "profile_pic": result.response.userData.profile_pic,
                        "user_role_id": result.response.userData.user_role_id,
                        "user_status_id": result.response.userData.user_status_id,
                        "status": result.response.userData.status
                    };
                    localStorage.setItem('user', JSON.stringify(userInfo))
                    localStorage.setItem('token', result.response.access_token)
                    handleLogin();
                } else {
                    handleShow1();
                    console.log("else");
                }
            } else {
                newErrors.captcha = 'Invalid Captcha';
                setErrors(newErrors);
                return false;
            }
            // setUsername('');
            // setPassword('');
            // setCaptcha('');
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    //generate chapcha
    // const generateCaptcha = () => {
    //     // return Math.floor(100000 + Math.random() * 900000).toString();
    //     return Math.random().toString(6).slice(2)
    // };
    function generateCaptcha(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    useEffect(() => {
        setCaptchacode(generateCaptcha(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    }, [setCaptchacode]);

    const refreshCaptcha = () => {
        setCaptchacode(generateCaptcha(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const forgotPassword = () => {
        navigate('/forgot-password');
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
                    You are not authorized!
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Login Successful!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Welcome to your dashboard!
                </SweetAlert>
            )}
            <Container fluid className="vh-100">
                <Row className="h-100">
                    <Col xs={12} lg={7} className="d-flex align-items-center px-0 bbg-blue">
                        <div className='login-bg-wrap w-100' style={{ backgroundImage: `url(${LoginImg})` }}>
                        </div>
                    </Col>
                    <Col xs={12} lg={5} className="d-flex align-items-center justify-content-center px-0">
                        <div className='login-wrap'>
                            <div className='w-100'>
                                <p style={textStyle}>Please login to your account</p>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>User Id/Email Id</Form.Label><span style={asteriskStyle}> *</span>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            style={formStyle} required="required" />
                                        {errors.username && <span style={error}>{errors.username}</span>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                        <div style={{ position: 'relative' }}>
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={formStyle} required="required" />
                                            <span onClick={togglePasswordVisibility} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', right: '10px', top: '8px' }}>
                                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                            </span>
                                        </div>
                                        {errors.password && <span style={error}>{errors.password}</span>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupValidCaptcha" style={formStyle}>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                value={captchacode} style={captchaStyle} disabled />
                                            <InputGroup.Text>
                                                <FontAwesomeIcon onClick={refreshCaptcha} style={iconStyle} icon={faRefresh} />
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupCaptcha">
                                        <Form.Label>Captcha</Form.Label><span style={asteriskStyle}> *</span>
                                        <Form.Control
                                            type="captcha"
                                            value={captcha}
                                            onChange={(e) => setCaptcha(e.target.value)}
                                            style={formStyle} />
                                        {errors.captcha && <span style={error}>{errors.captcha}</span>}
                                    </Form.Group>
                                    <div className='mb-3'>
                                        <Form.Check
                                            label={`Remember Me`} style={remenberMeStyle}
                                        />
                                        <a style={forgotPasswordStyle} onClick={forgotPassword}>Forgot Password?</a>
                                    </div>


                                    <Button type='submit' style={buttonStyle}>Sign In</Button>
                                </Form>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

const error = {
    color: 'red',
    fontSize: '0.9em',
    marginTop: '5px',
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
const forgotPasswordStyle = {
    cursor: 'pointer',
    color: "#3A85E5",
    textAlign: 'right',
    width: '50%',
    display: 'inline-block'
}
const captchaStyle = {
    color: "#3A85E5",
    fontWeight: "bold",
    fontStyle: "italic"
}
const iconStyle = {
    color: "#3A85E5"
}
const remenberMeStyle = {
    color: "#3A85E5",
    display: "inline-block",
    width: '50%'
}
const asteriskStyle = {
    color: "red"
}