import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Image } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL, ADMIN_BACKEND_CUSTOMER_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const EditCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [customerTypes, setCustomerTypes] = useState([]);
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
            id: "",
            user_code: "",
            name: "",
            email: "",
            phone_number: "",
            organization_name: "",
            organization_PAN: "",
            organization_GSTN: "",
            organization_address_registered: "",
            address: "",
            city: "",
            state: "",
            pin_code: "",
            zone: "",
            customer_type: "",
            business_nature: "",
            organization_address_plant: "",
            profile_image: "",
            status: ""
        }
    );
    const [erroremail, setErroremail] = useState(false);
    const [erroremailmsg, setErroremailMsg] = useState('');
    const [errorphone, setErrorphone] = useState(false);
    const [errorphonemsg, setErrorphoneMsg] = useState('');
    const [errorPAN, setErrorPAN] = useState(false);
    const [errorPANmsg, setErrorPANMsg] = useState('');
    const [errorGSTN, setErrorGSTN] = useState(false);
    const [errorGSTNmsg, setErrorGSTNMsg] = useState('');
    const [errorname, setErrorname] = useState(false);
    const [errornamemsg, setErrornameMsg] = useState('');
    const [errorcode, setErrorcode] = useState(false);
    const [errorcodemsg, setErrorcodeMsg] = useState('');
    const [errorfile, setErrorfile] = useState(false);
    const [errorfilemsg, setErrorfileMsg] = useState('');

    const [browsClick, setbrowsClick] = useState(false);
    const editUser = async () => {
        if (!state.user_code || !state.name || !state.email || !state.phone_number || !state.organization_name || !state.organization_GSTN || !state.organization_address_registered || !state.organization_address_plant || !state.business_nature || state.status == 2) {
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
        const customerTypeDetails = customerTypes.filter(obj => obj['customer_type'] = state.customer_type);
        const customerTypeId = state.customer_type ? customerTypeDetails[0].id : 0;
        const formData = new FormData();
        formData.append('profile_image', file);
        formData.append('user_code', state.user_code);
        formData.append('name', state.name);
        formData.append('email', state.email);
        formData.append('phone_number', state.phone_number);
        formData.append('organization_name', state.organization_name);
        formData.append('organization_PAN', state.organization_PAN);
        formData.append('organization_GSTN', state.organization_GSTN);
        formData.append('organization_address_registered', state.organization_address_registered);
        formData.append('address', state.address);
        formData.append('city', state.city);
        formData.append('state', state.state);
        formData.append('pin_code', state.pin_code);
        formData.append('zone', state.zone);
        formData.append('customer_type_id', customerTypeId);
        formData.append('business_nature', state.business_nature);
        formData.append('organization_address_plant', state.organization_address_plant);
        formData.append('status', state.status);

        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}edit-customer-info/${id}`, {
            method: 'put',
            body: formData,
            headers: {}
        });
        if (result.response.status === false && result.response.code === 5) {
            setErroremail(true);
            setErrorphone(false);
            setErrorPAN(false);
            setErrorGSTN(false);
            setErroremailMsg('Please enter email of correct format');
            return false;
        }
        if (result.response.status === false && result.response.code === 6) {
            setErrorphone(true);
            setErroremail(false);
            setErrorPAN(false);
            setErrorGSTN(false);
            setErrorphoneMsg('Please enter phone number of correct format');
            return false;
        }
        if (result.response.status === false && result.response.code === 8) {
            setErrorPAN(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorGSTN(false);
            setErrorPANMsg('Please enter PAN of correct format');
            return false;
        }
        if (result.response.status === false && result.response.code === 9) {
            setErrorGSTN(true);
            setErroremail(false);
            setErrorphone(false);
            setErrorPAN(false);
            setErrorGSTNMsg('Please enter GSTN of correct format');
            return false;
        }
        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/get-all-customer');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            id: "",
            user_code: "",
            name: "",
            email: "",
            phone_number: "",
            organization_name: "",
            organization_PAN: "",
            organization_GSTN: "",
            organization_address_registered: "",
            address: "",
            city: "",
            state: "",
            pin_code: "",
            zone: "",
            customer_type: "",
            business_nature: "",
            organization_address_plant: "",
            profile_image: "",
            status: ""
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
        async function fetchData() {
            let resultCompany = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-customer-type?status=1`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setCustomerTypes(resultCompany.response.data);
            fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-customer-by-id/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(result => {
                setState({
                    id: result.response.customerInfoDetails.id,
                    user_code: result.response.customerInfoDetails.user_code,
                    name: result.response.customerInfoDetails.name,
                    email: result.response.customerInfoDetails.email,
                    phone_number: result.response.customerInfoDetails.phone_number,
                    organization_name: result.response.customerInfoDetails.organization_name,
                    organization_PAN: result.response.customerInfoDetails.organization_PAN,
                    organization_GSTN: result.response.customerInfoDetails.organization_GSTN,
                    organization_address_registered: result.response.customerInfoDetails.organization_address_registered,
                    address: result.response.customerInfoDetails.address,
                    city: result.response.customerInfoDetails.city,
                    state: result.response.customerInfoDetails.state,
                    pin_code: result.response.customerInfoDetails.pin_code,
                    zone: result.response.customerInfoDetails.zone,
                    customer_type: result.response.customerInfoDetails.customer_type,
                    business_nature: result.response.customerInfoDetails.business_nature,
                    organization_address_plant: result.response.customerInfoDetails.business_nature,
                    profile_image: result.response.customerInfoDetails.profile_image,
                    status: result.response.customerInfoDetails.status
                })
                setFile(result.response.customerInfoDetails.profile_image)
            }).catch(err => {

            })
        }
        fetchData();
    }, [state.id])

    const handleNavigate = () => {
        navigate('/get-all-customer')
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
                    Customer details not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Customer Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Customer details updated successfully
                </SweetAlert>
            )}
            <AdminLayout>

                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Edit Customer</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Customer List</span> / Edit Customer</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>User Code</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.user_code} onChange={(e) => { setState({ ...state, user_code: e.target.value }) }} type="text" />
                                    {error && !state.user_code && <span style={invalidInput}>Enter User Code</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} type="text" />
                                    {error && !state.name && <span style={invalidInput}>Enter Name</span>}
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
                                    <Form.Label>Phone No.</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.phone_number} onChange={(e) => { setState({ ...state, phone_number: e.target.value }) }} type="text" />
                                    {error && !state.phone_number && <span style={invalidInput}>Enter Phone</span>}
                                    {errorphone && <span style={invalidInput}>{errorphonemsg}</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Organization Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.organization_name} onChange={(e) => { setState({ ...state, organization_name: e.target.value }) }} type="text" />
                                    {error && !state.organization_name && <span style={invalidInput}>Enter Organization Name</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Organization PAN</Form.Label>
                                    <Form.Control value={state.organization_PAN} onChange={(e) => { setState({ ...state, organization_PAN: e.target.value }) }} type="text" />
                                    {/* {error && !state.organization_PAN && <span style={invalidInput}>Enter organization PAN</span>} */}
                                    {errorPAN && <span style={invalidInput}>{errorPANmsg}</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Organization GSTN</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.organization_GSTN} onChange={(e) => { setState({ ...state, organization_GSTN: e.target.value }) }} type="text" />
                                    {error && !state.organization_GSTN && <span style={invalidInput}>Enter Organization GSTN</span>}
                                    {errorGSTN && <span style={invalidInput}>{errorGSTNmsg}</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Organization Registered Address</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.organization_address_registered} onChange={(e) => { setState({ ...state, organization_address_registered: e.target.value }) }} type="text" />
                                    {error && !state.organization_address_registered && <span style={invalidInput}>Enter Organization Registered Address</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Organization Plant Address</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.organization_address_plant} onChange={(e) => { setState({ ...state, organization_address_plant: e.target.value }) }} type="text" />
                                    {error && !state.organization_address_plant && <span style={invalidInput}>Enter Organization Plant Address</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control value={state.address} onChange={(e) => { setState({ ...state, address: e.target.value }) }} type="text" />
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control value={state.state} onChange={(e) => { setState({ ...state, state: e.target.value }) }} type="text" />
                                </Col>
                                <Col md>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control value={state.city} onChange={(e) => { setState({ ...state, city: e.target.value }) }} type="text" />
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Pin Code</Form.Label>
                                    <Form.Control value={state.pin_code} onChange={(e) => { setState({ ...state, pin_code: e.target.value }) }} type="text" />
                                </Col>
                                <Col md>
                                    <Form.Label>Zone</Form.Label>
                                    <Form.Select aria-label="Floating label select example" value={state.zone} onChange={(e) => { setState({ ...state, zone: e.target.value }) }}>
                                        <option value="5">Select Zone</option>
                                        <option value="1">East</option>
                                        <option value="2">West</option>
                                        <option value="3">North</option>
                                        <option value="4">South</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Customer Type</Form.Label>
                                    <Form.Select aria-label="Floating label select example" value={state.customer_type} onChange={(e) => { setState({ ...state, customer_type: e.target.value }) }}>
                                        <option>Select Customer Type</option>
                                        {
                                            customerTypes.length > 0 && customerTypes.map((item, index) =>
                                                <option key={item.id} value={item.customer_type}>{item.customer_type}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col md>
                                    <Form.Label>Business Nature</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.business_nature} onChange={(e) => { setState({ ...state, business_nature: e.target.value }) }} type="text" />{error && !state.business_nature && <span style={invalidInput}>Enter Location</span>}
                                </Col>
                            </Row>
                            <Row className="g-2" style={row_style}>
                                <Col md>
                                    <Form.Label>Upload Customer Profile Image</Form.Label>
                                    <InputGroup>
                                        <Form.Control style={{ display: "none" }} type="file" ref={inputFile} onChange={(e) => { setFile(e.target.files[0]) }} />
                                        <Form.Control value={fileName ? fileName : file} disabled />
                                        <InputGroup.Text onClick={browserBtn} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                    </InputGroup>
                                    {/* {error && !file && <span style={invalidInput}>Choose File</span>} */}
                                    {/* {/* {errorfile && <span style={invalidInput}>{errorfilemsg}</span>} */}
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
                            {typeof file === 'string' &&
                                <Row className="g-2" style={row_style}>
                                    <Col lg="6" style={{ textAlign: 'left' }}>
                                        <Image style={{ width: '80px', height: '80px' }} src={ADMIN_BACKEND_BASE_URL + file} />
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
                            <Button onClick={editUser} style={submitbuttonStyle}>Update</Button>
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