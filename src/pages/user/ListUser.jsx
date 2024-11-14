import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Container, Col, Row, Table, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { faSearch, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDown } from 'react-feather';
import { Plus } from 'react-feather';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';


export const ListUser = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [filterInput, setFilterInput] = useState('');
    // Table columns
    const [showOptions, setShowOptions] = useState(null);
    const handleToggleOptions = (index) => {
        //setShowOptions(index);
        setShowOptions((prev) => (prev === index ? null : index));
    };
    const handleView = (item) => {
        navigate('/view-user/' + item);
    };
    const handleEdit = (item) => {
        navigate('/edit-user/' + item);
    };
    const handleDelete = async (item) => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}delete-user/${item}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(121221, result)
        if (result.response.status === true) {
            setShowAlert(true);
            getUsers();
        } else {
            setShow1(true);
        }
    };

    const handleNavigate = () => {
        navigate('/dashboard')
    }
    const [users, setUsers] = useState([]);
    useEffect(() => {

        getUsers();
    }, [])
    const getUsers = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_API_URL}list-user`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        //result = await result.json();
        if (result.response.status === true && result.response.data) {
            const itemElements = [];
            result.response.data.map((item, index) => {
                itemElements.push({
                    dataid: item.id,
                    usercode: item.user_code,
                    username: item.username,
                    usertype: item.role.role_name,
                    email: item.email,
                    phone: item.phone,
                    location: item.location,
                    status: item.status,
                });
                return itemElements;
            })
            setUsers(itemElements);
        } else {
            // setShow1(true)
        }
    }
    const data = React.useMemo(
        () => users,
        [users]
    );
    const columns = React.useMemo(
        () => [
            { Header: 'User ID', accessor: 'usercode' },
            { Header: 'User Name', accessor: 'username' },
            { Header: 'User Type', accessor: 'usertype' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Phone', accessor: 'phone' },
            { Header: 'Location', accessor: 'location' },
            { Header: 'Status', accessor: 'status' },
        ],
        [users]
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
        setPageSize,
        // state: { globalFilter },
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
    const addNewUser = () => {
        navigate('/add-user');
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
                    User not deleted
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="User Deleted!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    User deleted successfully
                </SweetAlert>
            )}
            <AdminLayout>
                <Container fluid="true">
                   {/* Design Change */}
                    <Row>
                        <Col xs ={12} md={6}><p className='page_left_panel'>List User</p></Col>
                        <Col xs ={12} md={6}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Dashboard</span> / List User</p></Col>
                    </Row>
                    {/* Design Change */}
                    {/* Design Change2 */}
                    <div className="mainWrap">
                        <div className='topShadow'>
                            <Row>
                                <Col style={{ textAlign: 'left' }} sm={3}>
                                    <div style={fontFamilyStyle}>
                                        <select
                                            className='form-control-sm border'
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
                                        <InputGroup className="srchBox">
                                            <Form.Control onChange={handleFilterChange} value={filterInput} placeholder="Search Here" />
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='p-3'>
                            <Table {...getTableProps()} style={{ width: '100%', marginTop: '20px' }} striped bordered hover responsive className='table-sm'>
                                <thead>
                                    {headerGroups.map((headerGroup, headKey) => (
                                        <tr {...headerGroup.getHeaderGroupProps()} key={headKey}>
                                            {headerGroup.headers.map((column, key) => (
                                                <th {...column.getHeaderProps()} key={key}>{column.render('Header')}</th>
                                            ))}
                                            <th>Action</th>
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                    {page.map((row, index) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()} key={index}>
                                                <td>{row.original.usercode}</td>
                                                <td>{row.original.username}</td>
                                                <td>{row.original.usertype}</td>
                                                <td>{row.original.email}</td>
                                                <td>{row.original.phone}</td>
                                                <td>{row.original.location}</td>
                                                <td>{row.original.status == 0 ? 'Inactive' : 'Active'}</td>
                                                <td style={{ position: 'relative' }}>
                                                    <p onClick={() => handleToggleOptions(index)} style={{ cursor: 'pointer' }}>...</p>
                                                    {showOptions === index &&
                                                        <ul className='dropdown-option'>
                                                            <li onClick={() => handleView(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faEye} className='mx-2' />View</li>
                                                            <li onClick={() => handleEdit(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faEdit} className='mx-2' />Edit</li>
                                                            <li onClick={() => handleDelete(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faTrash} className='mx-2' />Delete</li>
                                                        </ul>
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        <Row style={tableFooterStyle}>
                            <Col style={{ textAlign: 'left' }} sm={12} lg={6}>
                                <span style={fontFamilyStyle}>
                                    Showing{' '}
                                    <strong>
                                        {state.pageIndex + 1} out of {pageOptions.length}
                                    </strong>{' '}Results
                                </span>
                            </Col>

                            <Col sm={12} lg={6}>
                                <div style={fontFamilyStyle} className='tableTxtRight'>
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
                    {/* Design Change2 */}
                    {/* Design Change */}
                    <Row className='mt-2 mb-150'>
                        <Col xs={12}>
                            <div className='btn-wrap'>
                                <Button style={clearbuttonStyle}>Export <ArrowDown /></Button>
                                <Button onClick={addNewUser} style={submitbuttonStyle} className='mx-2'>Add New User <Plus /></Button>
                            </div>
                        </Col>
                    </Row>
                    {/* Design Change */}
                </Container>
            </AdminLayout>
        </>
    )
}

const clearbuttonStyle = {
    width: "180px",
    height: "39px",
    backgroundColor: "#FFF",
    color: "#3A85E5",
    border: "1px solid #3A85E5",
    marginTop: "10px",
}
const submitbuttonStyle = {
    width: "180px",
    height: "39px",
    radius: "5px",
    backgroundColor: "#3A85E5",
    marginTop: "10px",
}

const tableHeaderStyle = {
    // height: '70px',
    // boxShadow: '0px 7px 17px -12px black'
}
const tableFooterStyle = {
    paddingTop: '10px',
}
const fontFamilyStyle = {
    fontFamily: 'sans-serif',
}