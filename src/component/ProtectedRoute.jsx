import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ role_id, redirectPath = "/" }) => {
    let user_role_id = JSON.parse(localStorage.getItem('user')).user_role_id;
    if (user_role_id != role_id) {
        return <Navigate to={redirectPath} />;
    }
    return <Outlet />;
};

export default ProtectedRoute;