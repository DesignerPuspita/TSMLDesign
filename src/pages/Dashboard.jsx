import React from "react";
import AdminLayout from '../layout/AdminLayout'
//import * as dayjs from "dayjs";
//import * as moment from 'moment';
import { PieChart } from '../component/Chartjs/PieChart';
import { BarChart } from "../component/Chartjs/BarChart";
import { Container, Row, Col, Form, InputGroup, Card, Dropdown } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AreaChart } from '../component/Chartjs/AreaChart';

const Dashboard = () => {

    return (
        <AdminLayout>
            <Container fluid="true">
                <Row style={rowStyle}>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/hourglass-end.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>200</p>
                                <span style={openPoint}>Customers</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>50</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/assept-document.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>320</p>
                                <span style={openPoint}>CVRs</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>20</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/file.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>122</p>
                                <span style={openPoint}>Users</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>22</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} lg={3} className='mb-4 mb-lg-0'>
                        <Card style={cardStyle}>
                            <div style={shape}>
                                <Card.Img style={images} src="/images/meeting.png" />
                            </div>
                            <div style={shapeSide}>
                                <p className='mb-0' style={opNumber}>250</p>
                                <span style={openPoint}>CVRs WIP</span><br />
                                {/* <span style={lastMonth}><span style={lmNumber}>80</span> Last Month</span> */}
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col xs={12} lg={5}>
                        <Card style={{ height: '100%' }}>
                            <Row style={{ margin: '10px' }}>
                                <Col sm={6}><span style={textStyle}>CAM Wise CVR</span></Col>
                                <Col sm={6} style={{ textAlign: "right" }}>
                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year">Year</Dropdown.Item>
                                            <Dropdown.Item href="#/month">Month</Dropdown.Item>
                                            <Dropdown.Item href="#/week">Week</Dropdown.Item>
                                            <Dropdown.Item href="#/day">Day</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row style={{ margin: '10px' }}>
                                <PieChart />
                            </Row>
                        </Card>
                    </Col>
                    <Col xs={12} lg={7} style={{ height: '100%' }}>
                        <Card>
                            <Row style={{ margin: '10px' }}>
                                <Col sm={6}><span style={textStyle}>CVR</span></Col>
                                <Col sm={6} style={{ textAlign: "right" }}>
                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year">Year</Dropdown.Item>
                                            <Dropdown.Item href="#/month">Month</Dropdown.Item>
                                            <Dropdown.Item href="#/week">Week</Dropdown.Item>
                                            <Dropdown.Item href="#/day">Day</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <AreaChart />
                                </Col>

                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row style={rowStyle}>
                    <Col xs={12} >
                        <Card>
                            <Row className='p-3'>
                                <Col xs={12} lg={3}>
                                    <span style={textStyle}>Customer Wise CVR</span>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <InputGroup className="mb-3">
                                        <Form.Control placeholder="Search Here" />
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col xs={12} lg={3}>
                                    <Dropdown data-bs-theme="dark">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary"
                                            className='w-100'>
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/year">Year</Dropdown.Item>
                                            <Dropdown.Item href="#/month">Month</Dropdown.Item>
                                            <Dropdown.Item href="#/week">Week</Dropdown.Item>
                                            <Dropdown.Item href="#/day">Day</Dropdown.Item>
                                        </Dropdown.Menu>

                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <BarChart />
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AdminLayout>
    )
}

export default Dashboard

const opNumber = {
    fontWeight: '700',
    fontSize: '20px'
}
const openPoint = {
    color: '#C5C4C4'
}
const lastMonth = {

}
const lmNumber = {
    color: '#45B369'
}
const textStyle = {
    fontWeight: 'bold',
    fontSize: '21px'
}
const rowStyle = {
    marginTop: '40px'
}
const cardStyle = {
    flexDirection: 'row'
}
const shapeSide = {
    width: '85%',
    marginTop: '15px'
}
const images = {
    display: 'block',
    height: '35px',
    width: '60%',
    margin: '13px auto'
}
const shape = {
    width: '102px',
    height: '64px',
    margin: '19px',
    borderRadius: '46%',
    backgroundColor: '#E5EBFF'
}