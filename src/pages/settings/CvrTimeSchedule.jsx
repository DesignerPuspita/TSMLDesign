import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Container, Col, Row, Table, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link, useNavigate } from "react-router-dom";

export const CvrTimeSchedule = () => {
    const navigate = useNavigate();
    const [filterInput, setFilterInput] = useState('');
    const [apiData, setApiData] = useState([]);
    const getApiDatas = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list/users/cvrs`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.response.status === true && result.response.data) {
            const itemElements = [];
            result.response.data.map((item, index) => {
                itemElements.push({
                    dataid: item.id,
                    userid: item.user_id,
                    cvrcode: item.cvr_code,
                    cvrmode: item.cvr_mode,
                    cvrstatus: item.cvr_status,
                    cvrstartdate: item.visit_plan_start_date,
                    cvrenddate: item.visit_plan_end_date,
                    usercode: item.user.user_code,
                    username: item.user.username,
                });
                return itemElements;
            })
            setApiData(itemElements);
        }
    }
    // useEffect(() => {

    //     getApiDatas();
    // }, [])

    const data = React.useMemo(
        () => apiData,
        [apiData]
    );

    const modifyTime = (time) => {
        const microIndex = time.indexOf('.');
        const timeStr = (time.split('T')[0] + " " + time.split('T')[1]).substring(0, microIndex);
        return timeStr;
    }

    const columns = React.useMemo(
        () => [
            { Header: 'User Code', accessor: 'usercode' },
            { Header: 'User Name', accessor: 'username' },
            { Header: 'CVR Code', accessor: 'cvrcode' },
            // { Header: 'CVR Status', accessor: 'cvrstatus' },
            { Header: 'Start Date', accessor: 'cvrstartdate' },
            { Header: 'End Date', accessor: 'cvrenddate' },
            // { Header: 'CVR Mode', accessor: 'cvrmode' },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5 }, // Set initial page size
        },
        useGlobalFilter,
        usePagination
    );

    // Update the state when input changes
    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilterInput(value);
        setGlobalFilter(value);
    };

    const [values, setValues] = useState([]);
    useEffect(() => {
        getApiDatas();
        for (let i = 0; i < apiData.length; i++) {
            setValues(prevItems => [...prevItems, 0]);
        }

    }, [apiData])

    const cvrShedule = async (cvrid, time) => {

        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}update/notifications/time/${cvrid}`, {
            method: 'post',
            body: JSON.stringify({ time: time }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (result.response.status === true) {
            setSuccessAlert(true);
            setAlertMessage(result.response.message);
        } else {
            setWarningAlert(true);
            setAlertMessage(result.response.message);
        }

    }
    const [alertMessage, setAlertMessage] = useState('Something went wrong');
    const [successAlert, setSuccessAlert] = useState(false);
    const [warningAlert, setWarningAlert] = useState(false);
    const successClose = () => {
        setSuccessAlert(false);
    };
    const warningClose = () => {
        setWarningAlert(false);
    };
    const handleNavigate = () => {
        navigate('/dashboard')
    }
    const [isOpen, setIsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = (item) => {
        navigate('/comments/' + item);
    }
    return (
        <>
            {successAlert && (
                <SweetAlert
                    success
                    title="Thank you"
                    onConfirm={successClose}
                    onCancel={successClose}
                    confirmBtnBsStyle="success"
                >
                    {alertMessage}
                </SweetAlert>
            )}
            {warningAlert && (
                <SweetAlert
                    warning
                    title="Oops!"
                    onConfirm={warningClose}
                    onCancel={warningClose}
                    confirmBtnBsStyle="warning"
                >
                    {alertMessage}
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                    <Row>
                    <Col xs ={12} md={6}><p className='page_left_panel'>CVR Schedule</p></Col>
                    <Col xs ={12} md={6}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Dashboard</span> / CVR Schedule</p></Col>
                    </Row>
                    <div style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px', padding: '25px 20px 25px 25px' }}>
                        <Row style={tableHeaderStyle}>
                            <Col style={{ textAlign: 'left' }} sm={3}>
                                <div style={fontFamilyStyle}>
                                    <select
                                        value={state.pageSize}
                                        onChange={e => {
                                            setPageSize(Number(e.target.value));
                                        }}
                                    >
                                        {[5, 10, 20].map(pageSize => (
                                            <option key={pageSize} value={pageSize}>
                                                {pageSize}
                                            </option>
                                        ))}
                                    </select>
                                    <span>     entries per page</span>
                                </div>
                            </Col>
                            <Col sm={6}></Col>
                            <Col sm={3}>
                                <div style={fontFamilyStyle}>
                                    <InputGroup className="mb-3">
                                        <Form.Control onChange={handleFilterChange} value={filterInput} placeholder="Search Here" />
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </InputGroup.Text>
                                    </InputGroup>
                                    {/* <input
                                value={filterInput}
                                onChange={handleFilterChange}
                                placeholder="Search User "
                            /> */}

                                </div>
                            </Col>
                        </Row>
                        <Table {...getTableProps()} style={{ width: '100%', marginTop: '20px' }} striped bordered hover >
                            <thead>
                                {headerGroups.map((headerGroup, keyHead) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} key={keyHead}>
                                        {headerGroup.headers.map((column, key) => (
                                            <th {...column.getHeaderProps()} key={key}>{column.render('Header')}</th>
                                        ))}
                                        <th>Time</th>
                                        <th>Action</th>
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, index) => {
                                    const increment = (index) => {
                                        setValues((prevCounts) => {
                                            const newCounts = [...prevCounts];
                                            newCounts[index] += 12;
                                            return newCounts;
                                        });
                                    };

                                    const decrement = (index) => {
                                        setValues((prevCounts) => {
                                            const newCounts = [...prevCounts];
                                            newCounts[index] = Math.max(newCounts[index] - 12, 0);
                                            return newCounts;
                                        });
                                    };

                                    const handleChange = (index, e) => {
                                        const value = Number(e.target.value);
                                        if (!isNaN(value)) {
                                            setValues((prevCounts) => {
                                                const newCounts = [...prevCounts];
                                                newCounts[index] = value;
                                                return newCounts;
                                            });
                                        }
                                    };
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} key={index}>

                                            <td>{row.original.usercode}</td>
                                            <td>{row.original.username}</td>
                                            <td>{row.original.cvrcode}</td>
                                            {/* <td>{row.original.cvrstatus}</td> */}
                                            <td>{modifyTime(row.original.cvrstartdate)}</td>
                                            <td>{modifyTime(row.original.cvrenddate)}</td>
                                            {/* <td>{row.original.cvrmode}</td> */}
                                            <td>
                                                <div>
                                                    <div key={index} style={{ marginBottom: '10px' }}>
                                                        <button onClick={() => decrement(index)}>-</button>
                                                        <input
                                                            type="text"
                                                            value={values[index]}
                                                            onChange={(e) => handleChange(index, e)}
                                                            style={{ width: '30px', textAlign: 'center' }}
                                                        />
                                                        <button onClick={() => increment(index)}>+</button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <Button className="me-2" onClick={() => cvrShedule(row.original.dataid, values[index])}>Update</Button>
                                                    <Button onClick={() => handleShow(row.original.cvrcode)}>Comment</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <Row style={tableFooterStyle}>
                            <Col style={{ textAlign: 'left' }} sm={3}>
                                <span style={fontFamilyStyle}>
                                    Showing{' '}
                                    <strong>
                                        {state.pageIndex + 1} out of {pageOptions.length}
                                    </strong>{' '}Results
                                </span>
                            </Col>
                            <Col sm={7}></Col>
                            <Col sm={2}>
                                <div style={fontFamilyStyle}>
                                    {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button> */}

                                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                        {'<'}
                                    </button>

                                    <button onClick={() => gotoPage(state.pageIndex + 1)} disabled={!canNextPage}>
                                        {state.pageIndex + 2}
                                    </button>

                                    <button onClick={() => gotoPage(state.pageIndex + 2)} disabled={!canNextPage}>
                                        {state.pageIndex + 3}
                                    </button>
                                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                                        {'>'}
                                    </button>

                                    {/* <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button> */}

                                </div>
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
    boxShadow: '0px 7px 17px -12px black'
}
const tableFooterStyle = {
    paddingTop: '10px',
}
const fontFamilyStyle = {
    fontFamily: 'math'
}