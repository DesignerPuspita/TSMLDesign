import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import { getStatusUsers, addUsers } from '../../apis/users';
import SweetAlert from 'react-bootstrap-sweetalert';

export const AddTheme = () => {
    const navigate = useNavigate();
    const inputFile1 = useRef(null);
    const inputFile2 = useRef(null);
    const inputFile3 = useRef(null);
    const [file1, setFile1] = useState(null);
    const [fileName1, setFileName1] = useState('');
    const [file2, setFile2] = useState(null);
    const [fileName2, setFileName2] = useState('');
    const [file3, setFile3] = useState(null);
    const [fileName3, setFileName3] = useState('');
    const [userRole, setUserRole] = useState([]);
    const [company, setCompany] = useState([]);
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showMessage, setShowMessage] = useState('');
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);
    const [state, setState] = useState(
        {
            screen_color: "",
            button_color: "",
            os_type: "",
            company_id: "",
            background_color: "",
            page_name: ""
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
    const [errorfile1, setErrorfile1] = useState(false);
    const [errorfilemsg1, setErrorfileMsg1] = useState('');
    const [errorfile2, setErrorfile2] = useState(false);
    const [errorfilemsg2, setErrorfileMsg2] = useState('');
    const [errorfile3, setErrorfile3] = useState(false);
    const [errorfilemsg3, setErrorfileMsg3] = useState('');

    const getCompanyId = (company_name) => {
        let companyDetails = company.filter(obj => obj['company_name'] == company_name);
        return companyDetails[0].id;
    }

    const addTheme = async () => {
        if (!state.os_type || !state.company_id || !state.page_name) {
            setError(true)
            return false;
        }
        if (file1) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5KB
            if (!allowedTypes.includes(file1.type)) {
                setErrorfile1(true);
                setErrorfileMsg1('Only JPEG, JPG, and PNG files are allowed!');
                return false;
            }
            if (file1.size > maxSize) {
                setErrorfile1(true);
                setErrorfileMsg1('File size must be less than 5MB!');
                return false;
            }
        }
        if (file2) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5KB
            if (!allowedTypes.includes(file2.type)) {
                setErrorfile2(true);
                setErrorfileMsg2('Only JPEG, JPG, and PNG files are allowed!');
                return false;
            }
            if (file2.size > maxSize) {
                setErrorfile2(true);
                setErrorfileMsg2('File size must be less than 5MB!');
                return false;
            }
        }
        if (file3) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5KB
            if (!allowedTypes.includes(file3.type)) {
                setErrorfile3(true);
                setErrorfileMsg3('Only JPEG, JPG, and PNG files are allowed!');
                return false;
            }
            if (file3.size > maxSize) {
                setErrorfile3(true);
                setErrorfileMsg3('File size must be less than 5MB!');
                return false;
            }
        }
        const formData = new FormData();
        if (file1) {
            formData.append('image_1', file1);
        }
        if (file2) {
            formData.append('image_2', file2);
        }
        if (file3) {
            formData.append('image_3', file3);
        }
        formData.append('screen_color', state.screen_color);
        formData.append('button_color', state.button_color);
        formData.append('os_type', state.os_type);
        formData.append('company_id', state.company_id);
        formData.append('background_color', state.background_color);
        formData.append('page_name', state.page_name);
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}create-themes`, {
            method: 'post',
            body: formData,
            headers: {}
        });

        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-themes');
            }, 2000);
        } else {
            // setShowAlert(true);
            setShow2(true)
            setShowMessage(result.response.message)
        }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            screen_color: "",
            button_color: "",
            os_type: "",
            company_id: "",
            background_color: "",
            page_name: ""
        })
        setFile1(null);
        setFileName1('')
        setFile2(null);
        setFileName2('')
        setFile3(null);
        setFileName3('')
    }
    const browserBtn1 = () => {
        inputFile1.current.click();
    }
    const browserBtn2 = () => {
        inputFile2.current.click();
    }
    const browserBtn3 = () => {
        inputFile3.current.click();
    }

    useEffect(() => {
        setFileName1(file1?.name);
        setFileName2(file2?.name);
        setFileName3(file3?.name);
    }, [file1, file2, file3])

    useEffect(() => {
        async function fetchData() {
            let resultCompany = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/companies?status=1`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setCompany(resultCompany.response.companyDetails);
        }
        fetchData();
    }, [])
    const handleNavigate = () => {
        navigate('/list-themes')
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
                    Theme not created
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Theme Added!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Theme created successfully
                </SweetAlert>
            )}
            {show2 && showMessage && (
                <SweetAlert
                    warning
                    title="Oops!"
                    onConfirm={handleClose2}
                    onCancel={handleClose2}
                    confirmBtnBsStyle="success"
                >
                    {showMessage}
                </SweetAlert>
            )}
            <AdminLayout>

                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Add Theme</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Theme List</span> / Add Theme</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>OS Type</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.os_type} onChange={(e) => { setState({ ...state, os_type: e.target.value }) }}>
                                        <option value="0">Select OS Type</option>
                                        <option value="Android">Android</option>
                                        <option value="IOS">IOS</option>
                                    </Form.Select>
                                    {error && !state.os_type && <span style={invalidInput}>Select OS Type</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Company Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.companies_name} onChange={(e) => { setState({ ...state, company_id: getCompanyId(e.target.value) }) }}>
                                        <option>Select Company Name</option>
                                        {
                                            company.map((item, index) =>
                                                <option key={item.id} value={item.company_name}>{item.company_name}</option>
                                            )
                                        }
                                    </Form.Select>
                                    {error && !state.company_id && <span style={invalidInput}>Select Company Name</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Page Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.page_name} onChange={(e) => { setState({ ...state, page_name: e.target.value }) }}>
                                        <option value="0">Select OS Type</option>
                                        <option value="Generalbuttoncolor">General Button Color</option>
                                        <option value="Splashscreen">Splash Screen</option>
                                        <option value="Login">Login</option>
                                        <option value="ForgotPassword">Forgot Password</option>
                                        <option value="Sidebar">Sidebar</option>
                                        <option value="Dashboard">Dashboard</option>
                                        <option value="Footer">Footer</option>
                                        <option value="StatusbarHeader">Statusbar Header</option>
                                    </Form.Select>
                                    {error && !state.page_name && <span style={invalidInput}>Enter Page Name</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Screen Color</Form.Label>
                                    <Form.Control value={state.screen_color} onChange={(e) => { setState({ ...state, screen_color: e.target.value }) }} type="text" />
                                    {error && !state.screen_color && <span style={invalidInput}>Enter Screen Color</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Button Color</Form.Label>
                                    <Form.Control value={state.button_color} onChange={(e) => { setState({ ...state, button_color: e.target.value }) }} type="email" />
                                    {error && !state.button_color && <span style={invalidInput}>Enter Button Color</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Background Color</Form.Label>
                                    <Form.Control value={state.background_color} onChange={(e) => { setState({ ...state, background_color: e.target.value }) }} type="text" />{error && !state.background_color && <span style={invalidInput}>Enter Background Color</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Upload Image 1</Form.Label>
                                    <InputGroup>
                                        <Form.Control style={{ display: "none" }} type="file" ref={inputFile1} onChange={(e) => { setFile1(e.target.files[0]) }} />
                                        <Form.Control value={fileName1 ? fileName1 : ''} disabled />
                                        <InputGroup.Text onClick={browserBtn1} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                    </InputGroup>
                                    {errorfile1 && <span style={invalidInput}>{errorfilemsg1}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Upload Image 2</Form.Label>
                                    <InputGroup>
                                        <Form.Control style={{ display: "none" }} type="file" ref={inputFile2} onChange={(e) => { setFile2(e.target.files[0]) }} />
                                        <Form.Control value={fileName2 ? fileName2 : ''} disabled />
                                        <InputGroup.Text onClick={browserBtn2} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                    </InputGroup>
                                    {errorfile2 && <span style={invalidInput}>{errorfilemsg2}</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Upload Image 3</Form.Label>
                                    <InputGroup>
                                        <Form.Control style={{ display: "none" }} type="file" ref={inputFile3} onChange={(e) => { setFile3(e.target.files[0]) }} />
                                        <Form.Control value={fileName3 ? fileName3 : ''} disabled />
                                        <InputGroup.Text onClick={browserBtn3} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                    </InputGroup>
                                    {errorfile3 && <span style={invalidInput}>{errorfilemsg1}</span>}
                                </Col>
                                <Col md></Col>
                            </Row>
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            <Button onClick={addTheme} style={submitbuttonStyle}>Add</Button>
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