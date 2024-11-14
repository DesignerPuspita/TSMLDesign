import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const EditCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const inputFile1 = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState(false);
    const [apiData, setApiData] = useState({});
    const [browsClick, setbrowsClick] = useState(false);
    const [errorfile, setErrorfile] = useState(false);
    const [errorfilemsg, setErrorfileMsg] = useState('');
    const [errorfile1, setErrorfile1] = useState(false);
    const [errorfilemsg1, setErrorfileMsg1] = useState('');
    const [erroremail, setErroremail] = useState('');
    const [erroremailmsg, setErroremailMsg] = useState('');
    const [errorcontactemail, setErrorContactemail] = useState('');
    const [errorcontactemailmsg, setErrorContactemailMsg] = useState('');
    const [errorcontactphone, setErrorContactphone] = useState('');
    const [errorcontactphonemsg, setErrorContactphoneMsg] = useState('');
    const [errorpan, setErrorPAN] = useState('');
    const [errorpanmsg, setErrorpanMsg] = useState('');
    const [errorgstn, setErrorGSTN] = useState('');
    const [errorgstnmsg, setErrorgstnMsg] = useState('');
    const [state, setState] = useState(
        {
            company_name: "", address: "", company_logo: "", email: "", pan_number: "", GSTN: "", business_nature: "", city: "", state: "", pin_code: "", contact_person_name: "", contact_person_email: "", contact_person_phone: "", contact_person_address: "", status: ""
        }
    );
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [fileName1, setFileName1] = useState('');
    const [file1, setFile1] = useState(null);
    useEffect(() => {
        setFileName(file?.name);
        setFileName1(file1?.name);
    }, [file, file1])
    const editCompany = async () => {
        if (!state.company_name || !state.address || !state.email || !state.contact_person_name || !state.contact_person_email || state.status == 2) {
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
        if (browsClick && typeof file1 === 'object') {
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

            } else {
                setError(true)
                return false;
            }
        }

        const formData = new FormData();
        formData.append('company_name', state.company_name);
        formData.append('address', state.address);

        if (typeof file == 'object') {
            formData.append('company_large_logo', file);
        }
        if (typeof file1 == 'object') {
            formData.append('company_small_logo', file1);
        }
        formData.append('email', state.email);
        formData.append('pan_number', state.pan_number);
        formData.append('GSTN', state.GSTN);
        formData.append('business_nature', state.business_nature);
        formData.append('pin_code', state.pin_code);
        formData.append('city', state.city);
        formData.append('state', state.state);
        formData.append('contact_person_name', state.contact_person_name);
        formData.append('contact_person_email', state.contact_person_email);
        formData.append('contact_person_phone', state.contact_person_phone);
        formData.append('contact_person_address', state.contact_person_address);
        formData.append('status', state.status);

        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit/company/${id}`, {
            method: 'put',
            body: formData,
            headers: {
            }
        });
        if (result.response.status === false && result.response.code === 5) {
            setErroremail(true);
            setErrorContactemail(false);
            setErrorContactphone(false);
            setErrorPAN(false);
            setErrorGSTN(false);
            setErroremailMsg("Email Id is of invalid format");
            return false;
        }
        if (result.response.status === false && result.response.code === 6) {
            setErroremail(false);
            setErrorContactemail(true);
            setErrorContactphone(false);
            setErrorPAN(false);
            setErrorGSTN(false);
            setErrorContactemailMsg("Email Id is of invalid format");
            return false;
        }
        if (state.contact_person_phone && result.response.status === false && result.response.code === 7) {
            setErroremail(false);
            setErrorContactemail(false);
            setErrorContactphone(true);
            setErrorPAN(false);
            setErrorGSTN(false);
            setErrorContactphoneMsg("Phone Number is of invalid format");
            return false;
        }
        if (state.pan_number && result.response.status === false && result.response.code === 8) {
            setErroremail(false);
            setErrorContactemail(false);
            setErrorContactphone(false);
            setErrorPAN(true);
            setErrorGSTN(false);
            setErrorpanMsg("PAN number is of invalid format");
            return false;
        }
        if (result.response.status === false && result.response.code === 9) {
            setErroremail(false);
            setErrorContactemail(false);
            setErrorContactphone(false);
            setErrorPAN(false);
            setErrorGSTN(true);
            setErrorgstnMsg("GSTN is of invalid format");
            return false;
        }
        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-company');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }
    const browserBtn = () => {
        inputFile.current.click();
        setbrowsClick(true);
    }
    const browserBtn1 = () => {
        inputFile1.current.click();
        setbrowsClick(true);
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            company_name: "", address: "", company_logo: "", email: "", pan_number: "", GSTN: "", business_nature: "", city: "", state: "", pin_code: "", contact_person_name: "", contact_person_email: "", contact_person_phone: "", contact_person_address: ""
        })
        setFile(null);
        setFile1(null);
    }

    // const getApiDatas = async () => {
    //     let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/company/${id}`, {
    //         method: 'get',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });
    //     if (result.success === true && result.response.companyDetails) {
    //         let itemElements = {};
    //         itemElements = {
    //             id: result.response.companyDetails.id,
    //             company_name: result.response.companyDetails.company_name,
    //             address: result.response.companyDetails.address,
    //             company_logo: result.response.companyDetails.logo,
    //             email: result.response.companyDetails.email,
    //             pan_number: result.response.companyDetails.pan_number,
    //             GSTN: result.response.companyDetails.GSTN,
    //             business_nature: result.response.companyDetails.business_nature,
    //             city: result.response.companyDetails.city,
    //             state: result.response.companyDetails.state,
    //             contact_person_name: result.response.companyDetails.contact_person_name,
    //             contact_person_email: result.response.companyDetails.contact_person_email,
    //             contact_person_phone: result.response.companyDetails.contact_person_phone,
    //             contact_person_address: result.response.companyDetails.contact_person_address,
    //             status: result.response.companyDetails.is_active
    //         };

    //         setApiData(itemElements);
    //     }
    // }

    useEffect(() => {
        // getApiDatas();
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/company/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => {
            setState({
                id: result.response.companyDetails.id,
                company_name: result.response.companyDetails.company_name,
                address: result.response.companyDetails.address,
                large_logo: result.response.companyDetails.large_logo,
                small_logo: result.response.companyDetails.small_logo,
                email: result.response.companyDetails.email,
                pan_number: result.response.companyDetails.pan_number,
                GSTN: result.response.companyDetails.GSTN,
                pin_code: result.response.companyDetails.pin_code,
                business_nature: result.response.companyDetails.business_nature,
                city: result.response.companyDetails.city,
                state: result.response.companyDetails.state,
                contact_person_name: result.response.companyDetails.contact_person_name,
                contact_person_email: result.response.companyDetails.contact_person_email,
                contact_person_phone: result.response.companyDetails.contact_person_phone,
                contact_person_address: result.response.companyDetails.contact_person_address,
                status: result.response.companyDetails.is_active
            })
            setFile(result.response.companyDetails.large_logo)
            setFile1(result.response.companyDetails.small_logo)
        }).catch(err => {

        })
        // if (apiData.company_name && apiData.address && apiData.email && apiData.contact_person_name && apiData.contact_person_email) {
        //     setState(
        //         {
        //             id: apiData.id,
        //             company_name: apiData.company_name,
        //             address: apiData.address,
        //             company_logo: apiData.company_logo,
        //             email: apiData.email,
        //             pan_number: apiData.pan_number,
        //             GSTN: apiData.GSTN,
        //             business_nature: apiData.business_nature,
        //             city: apiData.city,
        //             state: apiData.state,
        //             contact_person_name: apiData.contact_person_name,
        //             contact_person_email: apiData.contact_person_email,
        //             contact_person_phone: apiData.contact_person_phone,
        //             contact_person_address: apiData.contact_person_address,
        //             status: apiData.status ? "Active" : "Inactive"
        //         }
        //     );

        // }
    }, [state.id])

    const handleNavigate = () => {
        navigate('/list-company')
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
                    Company details not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Company Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Company details updated successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Edit Company</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Company List</span> / Edit Company</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.company_name} onChange={(e) => { setState({ ...state, company_name: e.target.value }) }} type="text" />
                                    {error && !state.company_name && <span style={invalidInput}>Enter Company Name</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Address</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.address} onChange={(e) => { setState({ ...state, address: e.target.value }) }} type="text" />
                                    {error && !state.address && <span style={invalidInput}>Enter Company Address</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Email</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.email} onChange={(e) => { setState({ ...state, email: e.target.value }) }} type="text" />
                                    {error && !state.email && <span style={invalidInput}>Enter Company Email</span>}
                                    {erroremail && <span style={invalidInput}>{erroremailmsg}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>PAN Number</Form.Label>
                                    <Form.Control value={state.pan_number} onChange={(e) => { setState({ ...state, pan_number: e.target.value }) }} type="text" />
                                    {/* {error && !state.pan_number && <span style={invalidInput}>Enter company PAN Number</span>} */}
                                    {state.pan_number && errorpan && <span style={invalidInput}>{errorpanmsg}</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>GSTN</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.GSTN} onChange={(e) => { setState({ ...state, GSTN: e.target.value }) }} type="text" />
                                    {error && !state.GSTN && <span style={invalidInput}>Enter Company GSTN</span>}
                                    {errorgstn && <span style={invalidInput}>{errorgstnmsg}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Business Nature</Form.Label>
                                    <Form.Control value={state.business_nature} onChange={(e) => { setState({ ...state, business_nature: e.target.value }) }} type="text" />
                                    {/* {error && !state.business_nature && <span style={invalidInput}>Enter Company Business Nature</span>} */}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control value={state.city} onChange={(e) => { setState({ ...state, city: e.target.value }) }} type="text" />
                                    {/* {error && !state.city && <span style={invalidInput}>Enter company city</span>} */}
                                </Col>
                                <Col md>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control value={state.state} onChange={(e) => { setState({ ...state, state: e.target.value }) }} type="text" />
                                    {/* {error && !state.state && <span style={invalidInput}>Enter Company State</span>} */}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control value={state.pin_code} onChange={(e) => { setState({ ...state, pin_code: e.target.value }) }} type="text" />
                                    {/* {error && !state.pin_code && <span style={invalidInput}>Enter Company Pin Code</span>} */}
                                </Col>
                                <Col md>
                                    <Form.Label>Contact Person Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.contact_person_name} onChange={(e) => { setState({ ...state, contact_person_name: e.target.value }) }} type="text" />
                                    {error && !state.contact_person_name && <span style={invalidInput}>Enter company contact person name</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Contact Person Email</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.contact_person_email} onChange={(e) => { setState({ ...state, contact_person_email: e.target.value }) }} type="text" />
                                    {error && !state.contact_person_email && <span style={invalidInput}>Enter Company Contact Person Email</span>}
                                    {errorcontactemail && <span style={invalidInput}>{errorcontactemailmsg}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Contact Person Address</Form.Label>
                                    <Form.Control value={state.contact_person_address} onChange={(e) => { setState({ ...state, contact_person_address: e.target.value }) }} type="text" />
                                    {/* {error && !state.contact_person_address && <span style={invalidInput}>Enter Company Contact Person Address</span>} */}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Contact Person Phone</Form.Label>
                                    <Form.Control value={state.contact_person_phone} onChange={(e) => { setState({ ...state, contact_person_phone: e.target.value }) }} type="text" />
                                    {/* {error && !state.contact_person_phone && <span style={invalidInput}>Enter company contact person phome</span>} */}
                                    {state.contact_person_phone && errorcontactphone && <span style={invalidInput}>{errorcontactphonemsg}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Upload Company Large Logo</Form.Label><span style={asteriskStyle}> *</span>
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
                                        <Image style={{ width: '80px', height: '80px' }} src={file} />
                                    </Col>
                                </Row>
                            }
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Upload Company Small Logo</Form.Label><span style={asteriskStyle}> *</span>
                                    <InputGroup>
                                        <Form.Control style={{ display: "none" }} type="file" ref={inputFile1} onChange={(e) => { setFile1(e.target.files[0]) }} />
                                        <Form.Control value={fileName1 ? fileName1 : file1} disabled />
                                        <InputGroup.Text onClick={browserBtn1} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                    </InputGroup>
                                    {error && !file1 && <span style={invalidInput}>Choose File</span>}
                                    {errorfile1 && <span style={invalidInput}>{errorfilemsg1}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                        <option value="2">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                    {error && state.status == 2 && <span style={invalidInput}>Select Status</span>}
                                </Col>
                            </Row>
                            {file1 && typeof file1 === 'string' &&
                                <Row className="g-2" style={row_style}>
                                    <Col lg="6" style={{ textAlign: 'left' }}>
                                        <Image style={{ width: '80px', height: '80px' }} src={file1} />
                                    </Col>
                                    <Col md></Col>
                                </Row>
                            }
                        </Form>
                    </Row>
                    <Row className="g-2" style={{ marginLeft: "629px" }}>
                        <Col md style={{ textAlign: "right" }}>
                            <Button onClick={formClear} style={clearbuttonStyle}>Clear</Button>
                        </Col>
                        <Col md>
                            <Button onClick={editCompany} style={submitbuttonStyle}>Update</Button>
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

const row_style = {
    marginTop: "20px"
}