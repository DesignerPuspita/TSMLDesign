import AdminLayout from '../../layout/AdminLayout';
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import MultiSelectDropdown from '../../layout/MultiSelectDropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const AddNotice = () => {
    const navigate = useNavigate();
    const [selectedStartDateTime, setSelectedStartDateTime] = useState(null);
    const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);

    const handleStartDateTimeChange = (date) => {
        setSelectedStartDateTime(date);
    };
    const handleEndDateTimeChange = (date) => {
        setSelectedEndDateTime(date);
    };
    const [error, setError] = useState(false);
    const [showExistMessage, setShowExistMessage] = useState('');
    const [company, setCompany] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [state, setState] = useState({
        name: '',
        title: '',
        description: '',
        user_id: [],
        start_date: '',
        end_date: ''
    });
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const [res, setRes] = useState([]);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const addNoticeForm = async () => {
        if (!state.title || !state.description || selectedItems.length == 0 || !selectedStartDateTime || !selectedEndDateTime) {
            setError(true)
            return false;
        }
        let user_ids = res.filter(obj => {
            let index_user_id = selectedItems.findIndex(obj1 => obj['username'] == obj1);
            return res[index_user_id]
        })
        user_ids = user_ids.map(obj => obj['id'])
        const data = { title: state.title, description: state.description, user_id: user_ids, start_date: selectedStartDateTime, end_date: selectedEndDateTime }
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add/notice`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            setShowAlert(true);
            setTimeout(() => {
                navigate('/list-notice');
            }, 2000);
        } else {
            setShowAlert(true);
        }
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            name: '',
            title: '',
            description: '',
            user_id: [],
            start_date: '',
            end_date: ''
        })
    }
    const handleNavigate = () => {
        navigate('/list-cvr-mode')
    }

    const handleSelect = (selected) => {
        setSelectedItems(selected);
        console.log('Selected options:', selected);
    };

    const options = res.map(obj => obj['username']);
    useEffect(() => {
        fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}get-user-by-admin`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(result => {
            if (result.response.status === true) {
                setRes(result.response.data)
            }
        })
    }, [])
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
                    Notice not created
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Notice Added!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Notice created successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Add Notice</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Notice List</span> / Add Notice</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                {/* <Col md>
                                    <Form.Label>Name</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} type="text" />
                                    {error && !state.name && <span style={invalidInput}>Enter Name</span>}
                                </Col> */}
                                <Col md>
                                    <Form.Label>Title</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.title} onChange={(e) => { setState({ ...state, title: e.target.value }) }} type="text" />
                                    {error && !state.title && <span style={invalidInput}>Enter Title</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Description</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.description} onChange={(e) => { setState({ ...state, description: e.target.value }) }} type="text" />
                                    {error && !state.description && <span style={invalidInput}>Enter Description</span>}
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Start Date</Form.Label><span style={asteriskStyle}> *</span>
                                    <br />
                                    <DatePicker
                                        selected={selectedStartDateTime}
                                        onChange={handleStartDateTimeChange}
                                        showTimeSelect
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        placeholderText="Select date and time"
                                        className="form-control wide-datepicker"
                                    />
                                </Col>
                                <Col md>
                                    <Form.Label>End Date</Form.Label><span style={asteriskStyle}> *</span>
                                    <br />
                                    <DatePicker
                                        selected={selectedEndDateTime}
                                        onChange={handleEndDateTimeChange}
                                        showTimeSelect
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        placeholderText="Select date and time"
                                        className="form-control wide-datepicker"
                                    />
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Select Users</Form.Label><span style={asteriskStyle}> *</span>
                                    <MultiSelectDropdown options={options} onSelect={handleSelect} fetchedOptions={[]} />
                                    {error && selectedItems.length == 0 && <span style={invalidInput}>Please select users</span>}
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
                            <Button onClick={addNoticeForm} style={submitbuttonStyle}>Add</Button>
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