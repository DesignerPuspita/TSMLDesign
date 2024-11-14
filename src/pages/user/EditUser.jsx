import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_IMAGE_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState(false);
    const [user, setUsers] = useState({});
    const [userStatus, setUserStatus] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [userRole, setUserRole] = useState([]);
    const [company, setCompany] = useState([]);
    const [state, setState] = useState(
        {
            name: "",
            userId: "",
            userType: "",
            phone: "",
            email: "",
            location: "",
            status: "",
            password: "",
            companyName: "",
            status: ""
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

    const [browsClick, setbrowsClick] = useState(false);
    const editUser = async () => {
        if (!state.name || !state.phone || !state.email || !state.location || !state.userId || !state.userType || !state.companyName || state.status == 2) {
            setError(true)
            return false;
        }

        if (browsClick && typeof file === 'object') {
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

            } else {
                setError(true)
                return false;
            }
        }
        const formData = new FormData();
        formData.append('profile_image', file);
        formData.append('username', state.name);
        formData.append('user_code', state.userId);
        formData.append('phone', state.phone);
        formData.append('email', state.email);
        formData.append('location', state.location);
        // formData.append('user_status_name', state.status);
        formData.append('user_role_name', state.userType);
        formData.append('password', state.password);
        formData.append('companies_name', state.companyName);
        formData.append('status', state.status);

        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit-user/${id}`, {
            method: 'put',
            body: formData,
            headers: {}
        });
        if (result.response.code === 5) {
            setErroremail(true);
            setErrorphone(false);
            setErrorname(false);
            setErrorcode(false);
            setErrorfile(false);
            setErroremailMsg(result.response.message);
            return false;
        }
        if (result.response.code === 6) {
            setErrorphone(true);
            setErroremail(false);
            setErrorname(false);
            setErrorcode(false);
            setErrorfile(false);
            setErrorphoneMsg(result.response.message);
            return false;
        }
        if (result.response.code === 7) {
            setErrorname(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorcode(false);
            setErrorfile(false);
            setErrornameMsg(result.response.message);
            return false;
        }
        if (result.response.code === 8) {
            setErrorcode(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorname(false);
            setErrorfile(false);
            setErrorcodeMsg(result.response.message);
            return false;
        }
        if (result.response.code === 9) {
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
            status: "",
            password: "",
            companyName: ""
        })
        setFile(null);
        setFileName('')
    }
    const browserBtn = () => {
        inputFile.current.click();
        setbrowsClick(true);
    }

    useEffect(() => {
        setFileName(file?.name);
    }, [file])

    useEffect(() => {
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            let user = res.response.data;
            if (user) {
                setState(
                    {
                        name: user.username,
                        userId: user.user_code,
                        userType: user.role.role_name,
                        phone: user.phone,
                        email: user.email,
                        password: "",
                        location: user.location,
                        status: user.status,
                        companyName: user.company.company_name
                    }
                );
                setFile(user.profile_pic);
                setFileName(user.profile_pic);
            }
        }).catch(err => {

        })
    }, [])

    useEffect(() => {
        async function fetchData() {
            // let resultStatus = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-status`, {
            //     method: 'get',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // });
            // setUserStatus(resultStatus.response.statusDetails);
            let resultCompany = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/companies?status=1`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setCompany(resultCompany.response.companyDetails);
            let resultRole = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list-role?status=1`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setUserRole(resultRole.response.data);
        }
        fetchData();

    }, [setUserStatus])
    const handleNavigate = () => {
        navigate('/list-user')
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
                    User not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="User Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    User updated successfully
                </SweetAlert>
            )}
            <AdminLayout>

                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Edit User</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>User List</span> / Edit User</p></Col>
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
                                        {
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
                                <><Row className="g-2" style={row_style}>
                                    <Col md>
                                        <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                        <Form.Control value={state.password} onChange={(e) => { setState({ ...state, password: e.target.value }) }} type="text" />
                                        {error && state.password.length > 0 && state.password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                    </Col>
                                    <Col md>
                                        <Form.Label>Company Name</Form.Label><span style={asteriskStyle}> *</span>
                                        <Form.Select aria-label="Floating label select example" value={state.companyName} onChange={(e) => { setState({ ...state, companyName: e.target.value }) }}>
                                            <option>Select Company Name</option>
                                            {
                                                company.length > 0 && company.map((item, index) =>
                                                    <option key={item.id} value={item.company_name}>{item.company_name}</option>
                                                )
                                            }
                                        </Form.Select>
                                        {error && !state.companyName && <span style={invalidInput}>Enter Company Name</span>}
                                    </Col>
                                </Row>
                                    <Row className="g-2" style={row_style}>
                                        <Col md>
                                            <Form.Label>Upload User Image</Form.Label>\\
                                            <InputGroup>
                                                <Form.Control style={{ display: "none" }} type="file" ref={inputFile} onChange={(e) => { setFile(e.target.files[0]) }} />
                                                <Form.Control value={fileName ? fileName : file} disabled />
                                                <InputGroup.Text onClick={browserBtn} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                            </InputGroup>
                                            {error && !file && <span style={invalidInput}>Choose File</span>}
                                            {errorfile && <span style={invalidInput}>{errorfilemsg}</span>}

                                        </Col>
                                        <Col md>
                                            <Form.Label>Status</Form.Label>
                                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                                <option value="2">Select Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </Form.Select>
                                            {error && state.status == 2 && <span style={invalidInput}>Select Status</span>}
                                            {error && !state.status && <span style={invalidInput}>Select Status</span>}
                                        </Col>
                                    </Row>
                                    {file && typeof file === 'string' &&
                                        <Col lg="6" style={{ textAlign: 'left' }}>
                                            <Image style={{ width: '80px' }} src={ADMIN_BACKEND_BASE_URL + file} />
                                        </Col>
                                    }
                                </>
                                :
                                <>
                                    <Row className="g-2" style={row_style}>
                                        <Col md>
                                            <Form.Label>Password</Form.Label><span style={asteriskStyle}> *</span>
                                            <Form.Control value={state.password} onChange={(e) => { setState({ ...state, password: e.target.value }) }} type="text" />
                                            {/* {error && !state.password && <span style={invalidInput}>Enter password</span>} */}
                                            {error && state.password.length > 0 && state.password.length < 6 && <span style={invalidInput}> Password must be at least 6 characters</span>}
                                        </Col>
                                        <Col md>
                                            <Form.Label>Upload User Image</Form.Label>
                                            <InputGroup>
                                                <Form.Control style={{ display: "none" }} type="file" ref={inputFile} onChange={(e) => { setFile(e.target.files[0]) }} />
                                                <Form.Control value={fileName ? fileName : file} disabled />
                                                <InputGroup.Text onClick={browserBtn} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                            </InputGroup>
                                            {error && !file && <span style={invalidInput}>Choose File</span>}
                                            {errorfile && <span style={invalidInput}>{errorfilemsg}</span>}

                                        </Col>
                                    </Row>
                                    {file && typeof file === 'string' &&
                                        <Row className="g-2" style={row_style}>
                                            <Col md></Col>
                                            <Col lg="6" style={{ textAlign: 'left' }}>
                                                <Image style={{ width: '80px', height: '80px' }} src={ADMIN_BACKEND_BASE_URL + file} />
                                            </Col>
                                        </Row>
                                    }
                                    <Row className="g-2" style={row_style}>
                                        <Col md>
                                            <Form.Label>Status</Form.Label>
                                            <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                                <option value="2">Select Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </Form.Select>
                                            {error && state.status == 2 && <span style={invalidInput}>Select Status</span>}
                                        </Col>
                                        <Col md></Col>
                                    </Row>
                                </>
                            }
                        </Form>
                    </Row>
                    <Row className='mt-2 mb-150'>
                        <Col xs={12}>
                            <div className='btn-wrap'>
                               <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                               <Button onClick={editUser} style={submitbuttonStyle} className='mx-2'>Update</Button>
                            </div>
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