import React from 'react'
import Container from 'react-bootstrap/Container';
import Header from '../component/Header';
import { useSelector } from 'react-redux';
import SideBar from '../component/SideBar';
const AdminLayout = ({ children }) => {
    const isToggled = useSelector((state) => state.toggle.isToggled); 
    return (
        <>
          <SideBar/>
            <div className={`content ${isToggled? 'collapsedBlock': 'expandBlock'}`}>
                <Container className='mb-50'>
                <Header/>     
                    <div className='main-content-block'>
                            { children }
                    </div>
                </Container>
                <div className='footer w-100'>© mJunction. All rights reserved 2024</div>
            </div>
        </>
    )

}
export default AdminLayout