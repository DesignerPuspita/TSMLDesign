import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Logo from '../assets/mj-logo.png';
import LogoSmall from '../assets/mj-small-logo.png';
import { Home, Power, Users, Settings, Sliders, User, UserCheck, Archive } from 'react-feather';
import { useNavigate } from 'react-router';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isToggled = useSelector((state) => state.toggle.isToggled);
  const [userDropdown, setUserDropdown] = useState(false);
  const [masterDropdown, setMasterDropdown] = useState(false);
  const [customerDropdown, setCustomerDropdown] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [cvrDropdown, setCvrDropdown] = useState(false);
  const [noticeDropdown, setNoticeDropdown] = useState(false);

  // Function to log out
  const logout = useCallback(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);

  // Toggle the user dropdown state
  const handleuserdropDown = () => {
    setUserDropdown((prev) => !prev);
  };
  const handlemasterdropDown = useCallback(() => {
    setMasterDropdown((prev) => !prev);
  }, []);
  const handlecustomerdropDown = useCallback(() => {
    setCustomerDropdown((prev) => !prev);
  }, []);
  const handlesettingsdropDown = useCallback(() => {
    setSettingsDropdown((prev) => !prev);
  }, []);
  const handlecvrdropDown = useCallback(() => {
    setCvrDropdown((prev) => !prev);
  }, []);
  const handlenoticedropDown = () => {
    setNoticeDropdown((prev) => !prev);
  };

  useEffect(() => {
    const roleId = JSON.parse(localStorage.getItem('user')).user_role_id;
    let userManagementRoutes = [];
    let masterManagementRoutes = [];
    let customerManagementRoutes = [];
    let settingsManagementRoutes = [];
    let noticeRoutes = [];
    let cvrRoutes = [];
    if (roleId != 1) {
      noticeRoutes = ['notices']
      cvrRoutes = [
        'cvr-time-schedule'
      ]
      userManagementRoutes = [
        'list-user',
        'add-user',
        'edit-user',
        'view-user',
        'list-user-type',
        'add-user-type',
        'edit-user-type',
        'role-permission'
      ];
      masterManagementRoutes = [
        'add-cvr-mode',
        'edit-cvr-mode',
        'list-cvr-mode',
        'view-cvr-mode',
        'add-category',
        'edit-category',
        'list-category',
        'view-category',
        'add-material',
        'edit-material',
        'list-material',
        'view-material',
        'add-product',
        'edit-product',
        'list-product',
        'view-product',
        'add-reason',
        'edit-reason',
        'list-reason',
        'view-reason',
        'add-standard',
        'edit-standard',
        'list-standard',
        'view-standard',
        // 'add-user-status',
        // 'edit-user-status',
        // 'list-user-status',
        // 'view-user-status'
      ];
      customerManagementRoutes = ['list-customer-type'];
      settingsManagementRoutes = ['profile', 'change-password'];
    } else {
      userManagementRoutes = [
        'list-user',
        'add-user',
        'edit-user',
        'view-user'
      ];
      masterManagementRoutes = [
        'add-company',
        'list-company',
        'edit-company',
        'view-company'
      ];
      settingsManagementRoutes = ['profile', 'change-password'];
    }
    if (userManagementRoutes.includes(location.pathname.split('/')[1])) {
      setUserDropdown(true);
      setMasterDropdown(false);
      setCustomerDropdown(false);
      setSettingsDropdown(false);
      setCvrDropdown(false);
      setNoticeDropdown(false);
    }
    if (masterManagementRoutes.includes(location.pathname.split('/')[1])) {
      setUserDropdown(false);
      setMasterDropdown(true);
      setCustomerDropdown(false);
      setSettingsDropdown(false);
      setCvrDropdown(false);
      setNoticeDropdown(false);
    }
    if (customerManagementRoutes.includes(location.pathname.split('/')[1])) {
      setUserDropdown(false);
      setMasterDropdown(false);
      setCustomerDropdown(true);
      setSettingsDropdown(false);
      setCvrDropdown(false);
      setNoticeDropdown(false);
    }
    if (settingsManagementRoutes.includes(location.pathname.split('/')[1])) {
      setUserDropdown(false);
      setMasterDropdown(false);
      setCustomerDropdown(false);
      setSettingsDropdown(true);
      setCvrDropdown(false);
      setNoticeDropdown(false);
    }
    if (cvrRoutes.includes(location.pathname.split('/')[1])) {
      setUserDropdown(false);
      setMasterDropdown(false);
      setCustomerDropdown(false);
      setSettingsDropdown(false);
      setCvrDropdown(true);
      setNoticeDropdown(false);
    }
    if (noticeRoutes.includes(location.pathname.split('/')[1])) {
      setUserDropdown(false);
      setMasterDropdown(false);
      setCustomerDropdown(false);
      setSettingsDropdown(false);
      setCvrDropdown(false);
      setNoticeDropdown(true);
    }
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isToggled ? 'collapsedBlock' : 'expandBlock'}`}
      style={{
        height: '100vh',
        overflowY: 'auto',
      }}>
      {isToggled ? (
        <div className="text-center logo-block"><Image src={LogoSmall} /></div>
      ) : (
        <div className="text-center logo-block"><Image src={Logo} /></div>
      )}
      {JSON.parse(localStorage.getItem('user')).user_role_id != 1 ? <ul className="left-sidebar-menu">
        <li>
          {isToggled ? (
            <Home />
          ) : (
            <Link to="/dashboard">Dashboard</Link>
          )}
        </li>
        <li>
          {isToggled ? (
            <Users />
          ) : (
            <Link to="#" onClick={handleuserdropDown}>User Management</Link>
          )}
        </li>
        {!isToggled && userDropdown && (
          <ul>
            <li><Link to="/list-user">User List</Link></li>
            <li><Link to="/list-user-type">User Type</Link></li>
            {/* <li><Link to="/role-permission">Role Permission</Link></li> */}
          </ul>
        )}
        <li>
          {isToggled ?
            <Sliders />
            :
            <Link to="#" onClick={handlemasterdropDown}>Master Management</Link>
          }
        </li>
        {!isToggled && masterDropdown && (
          <ul>
            <li><Link to="/list-cvr-mode">CVR Mode</Link></li>
            <li><Link to="/list-category">Category</Link></li>
            <li><Link to="/list-material">Material</Link></li>
            <li><Link to="/list-product">Product</Link></li>
            <li><Link to="/list-reason">Reason</Link></li>
            <li><Link to="/list-standard">Standard</Link></li>
            {/* <li><Link to="/list-user-status">User Status</Link></li> */}
          </ul>
        )}
        <li>
          {isToggled ?
            <User />
            :
            <Link to="#" onClick={handlecustomerdropDown}>Customer Management</Link>
          }
        </li>
        {!isToggled && customerDropdown && (
          <ul>
            <li><Link to="/get-all-customer">Customer List</Link></li>
            <li><Link to="/list-customer-type">Type List</Link></li>
          </ul>
        )}
        <li>
          {isToggled ?
            <UserCheck />
            :
            <Link to="/cvr-time-schedule">CVR Schedule</Link>
          }
        </li>
        {/* <li>
          {isToggled ?
            <UserCheck />
            :
            <Link to="#" onClick={handlecvrdropDown}>CVR</Link>
          }
        </li>
        {!isToggled && cvrDropdown && (
          <ul>
            <li><Link to="/cvr-time-schedule">CVR Schedule</Link></li>
          </ul>
        )} */}
        <li>
          {isToggled ?
            <Archive />
            :
            <Link to="/list-notice">Notice List</Link>
          }
        </li>
        {/* <li>
          {isToggled ?
            <Archive />
            :
            <Link to="#" onClick={handlenoticedropDown}>Notices</Link>
          }
        </li>
        {!isToggled && noticeDropdown && (
          <ul>
            <li><Link to="/list-notice">Notice List</Link></li>
          </ul>
        )} */}
        <li>
          {isToggled ?
            <Settings />
            :
            <Link to="#" onClick={handlesettingsdropDown}>Settings</Link>
          }
        </li>
        {!isToggled && settingsDropdown && (
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/change-password">Change Password</Link></li>
            {/* <li><Link to="/cvr-time-schedule">CVR Schedule</Link></li> */}
          </ul>
        )}
        <li>
          {isToggled ? (
            <Power />
          ) : (
            <Link onClick={logout} to={'/'}>Logout</Link>
          )}
        </li>
      </ul> :
        <ul className="left-sidebar-menu">
          <li>
            {isToggled ? (
              <Home />
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
          </li>
          <li>
            {isToggled ? (
              <Users />
            ) : (
              <Link to="/list-user">User List</Link>
            )}
          </li>
          {/* <li>
            {isToggled ? (
              <Users />
            ) : (
              <Link to="#" onClick={handleuserdropDown}>User Management</Link>
            )}
          </li>
          {!isToggled && userDropdown && (
            <ul>
              <li><Link to="/list-user">User List</Link></li>
            </ul>
          )} */}
          <li>
            {isToggled ?
              <Sliders />
              :
              <Link to="/list-company">Company List</Link>
            }
          </li>
          {/* <li>
            {isToggled ?
              <Sliders />
              :
              <Link to="#" onClick={handlemasterdropDown}>Master Management</Link>
            }
          </li>
          {!isToggled && masterDropdown &&
            <ul>
              <li><Link to="/list-company">Company</Link></li>

            </ul>
          } */}
          <li>
            {isToggled ?
              <Settings />
              :
              <Link to="#" onClick={handlesettingsdropDown}>Settings</Link>
            }
          </li>
          {!isToggled && settingsDropdown && (
            <ul>
              <li><Link to="/list-themes">Themes</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/change-password">Change Password</Link></li>
            </ul>
          )}
          <li>
            {isToggled ? (
              <Power />
            ) : (
              <Link onClick={logout} to={'/'}>Logout</Link>
            )}
          </li>
        </ul>}
    </div>
  );
};

export default SideBar;
