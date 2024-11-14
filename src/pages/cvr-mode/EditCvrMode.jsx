import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const EditCvrMode = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [modes, setModes] = useState({});
    const [company, setCompany] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [state, setState] = useState(
        {
            mode: "",
            status: "",
        }
    );

    const editCvrMode = async () => {
        if (!state.mode || state.status == 2) {
            setError(true)
            return false;
        }
        const data = { 'mode_name': state.mode, 'status': state.status };
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}edit-cvr-mode/${id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-cvr-mode');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }

    const formClear = async (e) => {
        e.preventDefault();
        setState({
            mode: "",
            status: ""
        })
    }
    useEffect(() => {
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/companies`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setCompany(res.response.companyDetails);
        }).catch(err => {

        })
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-mode-by-id/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            let itemElements = {
                id: res.response.data.id,
                userMode: res.response.data.mode_name,
                userStatus: res.response.data.status
            };
            setState(
                {
                    mode: itemElements.userMode,
                    status: itemElements.userStatus
                }
            )
        }).catch(err => {

        })
    }, []);
    const handleNavigate = () => {
        navigate('/list-cvr-mode')
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
                    CVR Mode not updated
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="CVR Mode Updated!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    CVR Mode updated successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Edit Cvr Mode</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Cvr Mode List</span> / Edit Cvr Mode</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Cvr Mode</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.mode} onChange={(e) => { setState({ ...state, mode: e.target.value }) }} type="text" />
                                    {error && !state.mode && <span style={invalidInput}>Enter Cvr Mode</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                        <option value="2">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                    {error && state.status == 2 && <span style={invalidInput}>Select Status</span>}
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
                            <Button onClick={editCvrMode} style={submitbuttonStyle}>Update</Button>
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