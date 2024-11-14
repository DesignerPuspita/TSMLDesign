import AdminLayout from '../../layout/AdminLayout';
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';

export const AddCategory = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [company, setCompany] = useState([]);
    const [showExistMessage, setShowExistMessage] = useState('');
    const handleClose2 = () => setShow2(false);
    const [show2, setShow2] = useState(false);
    const [state, setState] = useState(
        {
            category: "",
            status: "",
        }
    );
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const addCategory = async () => {
        if (!state.category || !state.status) {
            setError(true)
            return false;
        }
        let category = { category_name: state.category };
        let categories = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}get-category-by-name`, {
            method: 'post',
            body: JSON.stringify(category),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (categories.response.status == false) {
            const companies_id = JSON.parse(localStorage.getItem('user')).user_companies_id;
            const data = { category_name: state.category, company_id: companies_id, status: state.status };
            let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add-category`, {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (result.response.status === true) {
                setShowAlert(true);
                setTimeout(() => {
                    navigate('/list-category');
                }, 2000);
            } else {
                setShowAlert(true);
            }
        } else {
            setShow2(true)
            setShowExistMessage(categories.response.message)
        }
    }
    const formClear = async (e) => {
        e.preventDefault();
        setState({
            category: "",
            status: ""
        })
    }
    const handleNavigate = () => {
        navigate('/list-category')
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
                    Category not created
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Category Added!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Category created successfully
                </SweetAlert>
            )}
            {
                show2 && showExistMessage && (
                    <SweetAlert
                        warning
                        title="Oops!"
                        onConfirm={handleClose2}
                        onCancel={handleClose2}
                        confirmBtnBsStyle="success"
                    >
                        Category already exists
                    </SweetAlert>
                )
            }
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Add Category</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Category List</span> / Add Category</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Label>Category</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Control value={state.category} onChange={(e) => { setState({ ...state, category: e.target.value }) }} type="text" />
                                    {error && !state.category && <span style={invalidInput}>Enter Category</span>}
                                </Col>
                                <Col md>
                                    <Form.Label>Status</Form.Label><span style={asteriskStyle}> *</span>
                                    <Form.Select aria-label="Floating label select example" value={state.status} onChange={(e) => { setState({ ...state, status: e.target.value }) }}>
                                        <option value="2">Select Status</option>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </Form.Select>
                                    {error && !state.status && <span style={invalidInput}>Select Status</span>}
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
                            <Button onClick={addCategory} style={submitbuttonStyle}>Add</Button>
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