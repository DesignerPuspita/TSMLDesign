import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Container, Col, Row, Table, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link, useNavigate, useParams } from "react-router-dom";
import './comments.css';
import { CvrTimeSchedule } from '../settings/CvrTimeSchedule';

export const Comments = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const handleNavigate = () => {
        navigate('/dashboard')
    }
    const handleNavigateCVR = () => {
        navigate('/cvr-time-schedule')
    }
    const [messages, setMessages] = useState([
    ]);
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    async function getApiData() {
        await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}/list/comments/${id}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            setMessages(res.response.commentDetails);
            setInput("");
        }).catch(err => {

        })
    }
    useEffect(() => {
        getApiData()
    }, [messages.id])
    const postComment = async () => {
        const adminId = JSON.parse(localStorage.getItem('user')).id;
        const data = {
            user_id: adminId,
            cvr_id: id,
            comment: input,
        }
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}add/comment`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            getApiData()
        } else {

        }
    }
    return (
        <>
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                        <Col xs={12} md={6}><p className='page_left_panel'>CVR Schedule Chat</p></Col>
                        <Col xs={12} md={6}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Dashboard</span> / <span style={{ cursor: 'pointer' }} onClick={handleNavigateCVR}>CVR Schedule</span></p></Col>
                    </Row>
                    <div className="mainWrap">
                        <div className='topShadow'>
                            <Row>
                                <Col style={{ textAlign: 'right' }} sm={3}>
                                    <div>
                                    </div>
                                </Col>
                                {/* <Col sm={6}></Col>
                            <Col sm={3}> */}
                                <div>
                                    <p className='cvrStyle'>CVR ID - {id}</p>
                                </div>
                                {/* </Col> */}
                            </Row>
                            </div>
                            <Row className='p-3'>
                                <Col>
                                    {messages.map((msg, index) => (
                                        <div key={index} className={`message ${msg.user_id === JSON.parse(localStorage.getItem('user')).id ? "text-end" : "text-start"}`}>
                                            <p>
                                                <span className={`p-2 rounded ${msg.user_id === JSON.parse(localStorage.getItem('user')).id ? "bg-primary text-white" : "bg-light text-dark"}`}>
                                                    {msg.comment}
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                                </Col>
                            </Row>
                            <Row className="p-3">
                                <Col xs={12} lg={10}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Type a message"
                                        value={input}
                                        onChange={handleInputChange}
                                    // onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                </Col>
                                <Col xs={12} lg={2} className='mt-3 mt-md-0'>
                                    <Button variant="primary" onClick={postComment} className="w-100">Send</Button>
                                </Col>
                            </Row>
                        
                    </div>

                </Container>
            </AdminLayout>
        </>
    )
}

const tableHeaderStyle = {
    height: '70px',
    boxShadow: '0px 7px 10px -12px'
}
const fontFamilyStyle = {
    fontFamily: 'math'
}
