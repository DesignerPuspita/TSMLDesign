import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddUser } from '../pages/user/AddUser'
import Dashboard from '../pages/Dashboard'
import { Login } from '../pages/Login'
import { AddUserType } from '../pages/user-type/AddUserType'
import { AddCvrMode } from '../pages/cvr-mode/AddCvrMode'
import { ViewCvrMode } from '../pages/cvr-mode/ViewCvrMode'
import { ListUser } from '../pages/user/ListUser'
import { ListUserType } from '../pages/user-type/ListUserType'
import { ListCvrMode } from '../pages/cvr-mode/ListCvrMode'
import PrivateComponent from './PrivateComponent'
import { EditUser } from '../pages/user/EditUser'
import { ViewUser } from '../pages/user/ViewUser'
import { EditUserType } from '../pages/user-type/EditUserType'
import { ViewUserType } from '../pages/user-type/ViewUserType'
import { EditCvrMode } from '../pages/cvr-mode/EditCvrMode'
import { ListCategory } from '../pages/category/ListCategory'
import { AddCategory } from '../pages/category/AddCategory'
import { EditCategory } from '../pages/category/EditCategory'
import { ViewCategory } from '../pages/category/ViewCategory'
import { ListMaterial } from '../pages/material/ListMaterial'
import { AddMaterial } from '../pages/material/AddMaterial'
import { EditMaterial } from '../pages/material/EditMaterial'
import { ViewMaterial } from '../pages/material/ViewMaterial'
import { ListProduct } from '../pages/product/ListProduct'
import { AddProduct } from '../pages/product/AddProduct'
import { EditProduct } from '../pages/product/EditProduct'
import { ViewProduct } from '../pages/product/ViewProduct'
import { ListReason } from '../pages/reason/ListReason'
import { AddReason } from '../pages/reason/AddReason'
import { EditReason } from '../pages/reason/EditReason'
import { ViewReason } from '../pages/reason/ViewReason'
import { EditStandard } from '../pages/standard/EditStandard'
import { AddStandard } from '../pages/standard/AddStandard'
import { ListStandard } from '../pages/standard/ListStandard'
import { ViewStandard } from '../pages/standard/ViewStandard'
import { ListCustomerType } from '../pages/customr-type/ListCustomerType'
import { AddCustomerType } from '../pages/customr-type/AddCustomerType'
import { EditCustomerType } from '../pages/customr-type/EditCustomerType'
import { ViewCustomerType } from '../pages/customr-type/ViewCustomerType'
import { RolePermission } from '../pages/role-permission/RolePermission'
import { ChangePassword } from '../pages/settings/ChangePassword'
import { Profile } from '../pages/settings/Profile'
import { ForgotPassword } from '../pages/settings/ForgotPassword'
import { ResetPassword } from '../pages/settings/ResetPassword'
import { PageNotFound } from '../pages/PageNotFound'
import { CvrTimeSchedule } from '../pages/settings/CvrTimeSchedule'
import { AddCompany } from '../pages/company/AddCompany'
import { ListCompany } from '../pages/company/ListCompany'
import { EditCompany } from '../pages/company/EditCompany'
import { ViewCompany } from '../pages/company/ViewCompany'
// import { AddUserStatus } from '../pages/user-status/AddUserStatus'
// import { ListUserStatus } from '../pages/user-status/ListUserStatus'
// import { EditUserStatus } from '../pages/user-status/EditUserStatus'
// import { ViewUserStatus } from '../pages/user-status/ViewUserStatus'
import ProtectedRoute from './ProtectedRoute';
import { AddTheme } from '../pages/themes/AddTheme';
import { EditTheme } from '../pages/themes/EditTheme';
import { ListThemes } from '../pages/themes/ListThemes';
import { ViewTheme } from '../pages/themes/ViewTheme';
import { Comments } from '../pages/comments/Comments';
import { AddCustomer } from '../pages/customers/AddCustomer';
import { EditCustomer } from '../pages/customers/EditCustomer';
import { ListCustomer } from '../pages/customers/ListCustomer';
import { ViewCustomer } from '../pages/customers/ViewCustomer';
import { AddNotice } from '../pages/notices/AddNotice';
import { EditNotice } from '../pages/notices/EditNotice';
import { ListNotice } from '../pages/notices/ListNotice';
import { ViewNotice } from '../pages/notices/ViewNotice';

const AppRoutes = () => {
  const roleIdAdmin = 2;
  const roleIdSuperAdmin = 1;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/not-found' exact element={<PageNotFound />} />
          <Route path='/' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />

          <Route element={<PrivateComponent />}>
            <Route path='/dashboard' element={<Dashboard />} />

            <Route path='/list-user' element={<ListUser />} />
            <Route path='/add-user' element={<AddUser />} />
            <Route path='/edit-user/:id' element={<EditUser />} />
            <Route path='/view-user/:id' element={<ViewUser />} />
            <Route element={<ProtectedRoute role_id={roleIdAdmin} redirectPath="/not-found" />}>
              <Route path='/list-user-type' element={<ListUserType />} />
              <Route path='/add-user-type' element={<AddUserType />} />
              <Route path='/edit-user-type/:id' element={<EditUserType />} />
              <Route path='/view-user-type/:id' element={<ViewUserType />} />

              {/* <Route path='/role-permission' element={<RolePermission />} /> */}

              <Route path='/list-cvr-mode' element={<ListCvrMode />} />
              <Route path='/add-cvr-mode' element={<AddCvrMode />} />
              <Route path='/edit-cvr-mode/:id' element={<EditCvrMode />} />
              <Route path='/view-cvr-mode/:id' element={<ViewCvrMode />} />

              <Route path='/list-category' element={<ListCategory />} />
              <Route path='/add-category' element={<AddCategory />} />
              <Route path='/edit-category/:id' element={<EditCategory />} />
              <Route path='/view-category/:id' element={<ViewCategory />} />

              <Route path='/list-material' element={<ListMaterial />} />
              <Route path='/add-material' element={<AddMaterial />} />
              <Route path='/edit-material/:id' element={<EditMaterial />} />
              <Route path='/view-material/:id' element={<ViewMaterial />} />

              <Route path='/list-product' element={<ListProduct />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/edit-product/:id' element={<EditProduct />} />
              <Route path='/view-product/:id' element={<ViewProduct />} />

              <Route path='/list-reason' element={<ListReason />} />
              <Route path='/add-reason' element={<AddReason />} />
              <Route path='/edit-reason/:id' element={<EditReason />} />
              <Route path='/view-reason/:id' element={<ViewReason />} />

              <Route path='/list-standard' element={<ListStandard />} />
              <Route path='/add-standard' element={<AddStandard />} />
              <Route path='/edit-standard/:id' element={<EditStandard />} />
              <Route path='/view-standard/:id' element={<ViewStandard />} />

              <Route path='/list-customer-type' element={<ListCustomerType />} />
              <Route path='/add-customer-type' element={<AddCustomerType />} />
              <Route path='/edit-customer-type/:id' element={<EditCustomerType />} />
              <Route path='/view-customer-type/:id' element={<ViewCustomerType />} />

              <Route path='/create-customer' element={<AddCustomer />} />
              <Route path='/edit-customer/:id' element={<EditCustomer />} />
              <Route path='/get-all-customer' element={<ListCustomer />} />
              <Route path='/view-customer/:id' element={<ViewCustomer />} />

              <Route path='/add-notice' element={<AddNotice />} />
              <Route path='/edit-notice/:id' element={<EditNotice />} />
              <Route path='/list-notice' element={<ListNotice />} />
              <Route path='/view-notice/:id' element={<ViewNotice />} />

              {/* <Route path='/list-user-status' element={<ListUserStatus />} />
              <Route path='/add-user-status' element={<AddUserStatus />} />
              <Route path='/edit-user-status/:id' element={<EditUserStatus />} />
              <Route path='/view-user-status/:id' element={<ViewUserStatus />} /> */}

              <Route path='/cvr-time-schedule' element={<CvrTimeSchedule />} />
              <Route path='/comments/:id' element={<Comments />} />
            </Route>
            <Route element={<ProtectedRoute role_id={roleIdSuperAdmin} redirectPath="/not-found" />}>
              <Route path='/add-company' element={<AddCompany />} />
              <Route path='/list-company' element={<ListCompany />} />
              <Route path='/edit-company/:id' element={<EditCompany />} />
              <Route path='/view-company/:id' element={<ViewCompany />} />
              <Route path='/add-theme' element={<AddTheme />} />
              <Route path='/edit-theme/:id' element={<EditTheme />} />
              <Route path='/list-themes' element={<ListThemes />} />
              <Route path='/view-theme/:id' element={<ViewTheme />} />
            </Route>
            <Route path='/change-password' element={<ChangePassword />} />
            <Route path='/profile' element={<Profile />} />

          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default AppRoutes