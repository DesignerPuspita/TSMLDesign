import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import { getStatusUsers, addUsers } from '../../apis/users';
import SweetAlert from 'react-bootstrap-sweetalert';

export const AddUser = () => {
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    // const [userStatus, setUserStatus] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [company, setCompany] = useState([]);
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [state, setState] = useState(
        {
            name: "",
            userId: "",
            userType: "",
            phone: "",
            email: "",
            location: "",
            companies_name: "",
            password: "",
        }
    );
    const [erroremail, setErroremail] = useState(false);
    const [erroremailmsg, setErroremailMsg] = useState('');
    const [errorphone, setErrorphone] = useState(false);
    const [errorphonemsg, setErrorphoneMsg] = useState('');
    const [errorname, setErrorname] = useState(false);
    const [errornamemsg, setErrornameMsg] = useState('');
    const [errorcode, setErrorcode] = useState(false);
    const [errorcodemsg, setErrorcodeMsg] = useState('');
    const [errorfile, setErrorfile] = useState(false);
    const [errorfilemsg, setErrorfileMsg] = useState('');
    const addUser = async () => {
        const role_id = JSON.parse(localStorage.getItem('user')).user_role_id;
        if (role_id == 1) {
            if (!state.name || !state.phone || !state.email || !state.location || !state.userId || !state.userType || !state.password || !state.companies_name || state.password.length < 6) {
                setError(true)
                return false;
            }
        } else {
            if (!state.name || !state.phone || !state.email || !state.location || !state.userId || !state.userType || !state.password || state.password.length < 6) {
                setError(true)
                return false;
            }
        }
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5KB
            if (!allowedTypes.includes(file.type)) {
                setErrorfile(true);
                setErrorfileMsg('Only JPEG, JPG, and PNG files are allowed!');
                return false;
            }
            if (file.size > maxSize) {
                setErrorfile(true);
                setErrorfileMsg('File size must be less than 5MB!');
                return false;
            }
        }
        // else {
        //     setError(true)
        //     return false;
        // }
        const formData = new FormData();
        formData.append('profile_image', file);
        formData.append('username', state.name);
        formData.append('user_code', state.userId);
        formData.append('phone', state.phone);
        formData.append('email', state.email);
        formData.append('location', state.location);
        formData.append('companies_name', state.companies_name);
        // formData.append('user_status_name', state.user_status);
        formData.append('user_role_name', state.userType);
        formData.append('password', state.password);

        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}add-user`, {
            method: 'post',
            body: formData,
            headers: {}
        });

        //result = await result.json();
        console.log('resulthhh', result);
        if (result.response.status === false && result.response.code === 5) {
            setErroremail(true);
            setErrorphone(false);
            setErrorname(false);
            setErrorcode(false);
            setErrorfile(false);
            setErroremailMsg(result.response.message);
            console.log('email', result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 6) {
            setErrorphone(true);
            setErroremail(false);
            setErrorname(false);
            setErrorcode(false);
            setErrorfile(false);
            setErrorphoneMsg(result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 7) {
            setErrorname(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorcode(false);
            setErrorfile(false);
            setErrornameMsg(result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 8) {
            setErrorcode(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorname(false);
            setErrorfile(false);
            setErrorcodeMsg(result.response.message);
            return false;
        }
        if (result.response.status === false && result.response.code === 9) {
            setErrorfile(true);
            setErrorcode(false);
            setErroremail(false);
            setErrorphone(false);
            setErrorname(false);
            setErrorfileMsg(result.response.message);
            return false;
        }
        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-user');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            name: "",
            userId: "",
            userType: "",
            phone: "",
            email: "",
            location: "",
            companies_name: "",
            password: "",
        })
        setFile(null);
        setFileName('')
    }
    const browserBtn = () => {
        inputFile.current.click();
    }
    const handleNavigate = () => {
        navigate('/list-user')
    }
    useEffect(() => {
        setFileName(file?.name);
    }, [file])

    useEffect(() => {
        async function fetchData() {
            let resultRole = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list-role?status=1`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setUserRole(resultRole.response.data);
            let resultCompany = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/companies?status=1`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setCompany(resultCompany.response.companyDetails);
        }
        fetchData();
    }, [setUserRole])
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
                    User not created
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="User Added!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    User created successfully
                </SweetAlert>
            )}
            <AdminLayout>

                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Add User</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>User List</span> / Add User</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} type="text" />
                                    {error && !state.name && <span style={invalidInput}>Enter Name</span>}
                                    {errorname && <span style={invalidInput}>{errornamemsg}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>User Id</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.userId} onChange={(e) => { setState({ ...state, userId: e.target.value }) }} type="text" />
                                    {error && !state.userId && <span style={invalidInput}>Enter UserId</span>}
                                    {errorcode && <span style={invalidInput}>{errorcodemsg}</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>User Type</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.userType} onChange={(e) => { setState({ ...state, userType: e.target.value }) }}>
                                        <option>Select Type</option>
                                        {userRole.length > 0 &&
                                            userRole.map((item, index) => {
                                                if (item.created_by === JSON.parse(localStorage.getItem('user')).id) {
                                                    return <option key={item.id} value={item.role_name}>{item.role_name}</option>
                                                }
                                                return true;
                                            })
                                        }
                                    </Form.Select>
                                    {error && !state.userType && <span style={invalidInput}>Select Type</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Phone No.</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.phone} onChange={(e) => { setState({ ...state, phone: e.target.value }) }} type="text" />
                                    {error && !state.phone && <span style={invalidInput}>Enter Phne</span>}
                                    {errorphone && <span style={invalidInput}>{errorphonemsg}</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Email</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.email} onChange={(e) => { setState({ ...state, email: e.target.value }) }} type="email" />
                                    {error && !state.email && <span style={invalidInput}>Enter Email</span>}
                                    {erroremail && <span style={invalidInput}>{erroremailmsg}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Location</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.location} onChange={(e) => { setState({ ...state, location: e.target.value }) }} type="text" />{error && !state.location && <span style={invalidInput}>Enter Location</span>}
                                </Col>
                            </Row>
                            {JSON.parse(localStorage.getItem('user')).user_role_id == 1 ?
                                <>
                                    <Row className="g-2" style={row_style}>
                                        <Col md>
                                            <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                            <Form.Control value={state.password} onChange={(e) => { setState({ ...state, password: e.target.value }) }} type="text" />
                                            {error && !state.password && <span style={invalidInput}>Enter password</span>}
                                            {error && state.password.length > 0 && state.password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                        </Col>
                                        <Col md>
                                            <Form.Label>Company Name</Form.Label><span style={asteriskStyle}> *</span>
                                            <Form.Select aria-label="Floating label select example" value={state.companies_name} onChange={(e) => { setState({ ...state, companies_name: e.target.value }) }}>
                                                <option>Select Company Name</option>
                                                {
                                                    company.map((item, index) =>
                                                        <option key={item.id} value={item.company_name}>{item.company_name}</option>
                                                    )
                                                }
                                            </Form.Select>
                                            {error && !state.companies_name && <span style={invalidInput}>Enter Company Name</span>}
                                        </Col>
                                    </Row>
                                    <Row className="g-2" style={row_style}>
                                        <Col md>
                                            <Form.Label>Upload User Image</Form.Label>
                                            <InputGroup>
                                                <Form.Control style={{ display: "none" }} type="file" ref={inputFile} onChange={(e) => { setFile(e.target.files[0]) }} />
                                                <Form.Control value={fileName ? fileName : ''} disabled />
                                                <InputGroup.Text onClick={browserBtn} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                            </InputGroup>
                                            {/* {error && !file && <span style={invalidInput}>Choose File</span>} */}
                                            {/* {/* {errorfile && <span style={invalidInput}>{errorfilemsg}</span>} */}
                                        </Col>
                                        <Col md></Col>
                                    </Row>
                                </>
                                :
                                <Row className="g-2" style={row_style}>
                                    <Col md>
                                        <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                        <Form.Control value={state.password} onChange={(e) => { setState({ ...state, password: e.target.value }) }} type="text" />
                                        {error && !state.password && <span style={invalidInput}>Enter password</span>}
                                        {error && state.password.length > 0 && state.password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                    </Col>
                                    <Col md>
                                        <Form.Label>Upload User Image</Form.Label>
                                        <InputGroup>
                                            <Form.Control style={{ display: "none" }} type="file" ref={inputFile} onChange={(e) => { setFile(e.target.files[0]) }} />
                                            <Form.Control value={fileName ? fileName : ''} disabled />
                                            <InputGroup.Text onClick={browserBtn} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                        </InputGroup>
                                        {error && !file && <span style={invalidInput}>Choose File</span>}
                                        {errorfile && <span style={invalidInput}>{errorfilemsg}</span>}
                                    </Col>
                                </Row>
                            }
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            <Button onClick={addUser} style={submitbuttonStyle}>Add</Button>
                        </Col>
                    </Row>
                </Container>

            </AdminLayout>
        </>
    )
}
const invalidInput = {
    color: "red"
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

const row_style = {
    marginTop: "20px"
}
const asteriskStyle = {
    color: "red"
}