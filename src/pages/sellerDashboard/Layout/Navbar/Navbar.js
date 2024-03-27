import React, { useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Search, LogOut, Settings, AlignRight, User } from "react-feather";
import Flex from "../../../../components/styled/Flex/Flex";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../../../features/auth/loginSlice";
const Navbar = ({ setSideBarActive }) => {
  const { token, userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  return (
    <nav className="portal-navbar">
      <Flex className="portal-nav-inner" align="center" justify="flex-end">
        <Flex className="portal-nav-right">
          {/* <div className="portal-nav-search">
            <input type="text" placeholder="Search..." />
            <div className="search-icon">
              <Search color="#3E0FFE" />
            </div>
          </div> */}
          {/* <img src="/icons/bell.png" alt="notifications" /> */}
          <div className="nav-user-icon">
            <div
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                background: "#121E31",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:'pointer'
              }}
            >
              <User color="#fff" fill="#fff"/>
            </div>
          </div>
          <div className="logout-popup-drop">
            
            <div
              className="popup-drop-logout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <LogOut size={16} />
              <span className="popup-drop-span">Logout</span>
            </div>
          </div>
        </Flex>
        {/* <LogoutPopup /> */}
      </Flex>
      <div className="portal-nav-responsive">
        <Flex align="center" justify="space-between">
          <img src="/logo.png" alt="logo" className="res-logo" />
          <Flex align="center" gap={20}>
            <img src="/icons/bell.png" alt="notifications" />
            <img
              src={`${
                userData?.image_url ? userData?.image_url : "/portal/user.png"
              }`}
              alt="user"
              className="res-user nav-user-icon"
            />
            <div className="logout-popup-drop">
              <div className="popup-drop-settings">
                <Link to={"/portal/profile-settings"}>
                  {/* <img src="/icons/settings.png" alt="" /> */}
                  <Settings size={16} />
                  <span className="popup-drop-span">Profile Settings</span>
                </Link>
              </div>
              <div
                className="popup-drop-logout"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                {/* <img src="/icons/logout.png" alt="" /> */}
                <LogOut size={16} />
                <span className="popup-drop-span">Logout</span>
              </div>
            </div>
            <AlignRight
              color="#3E0FFE"
              size={35}
              cursor="pointer"
              onClick={() => setSideBarActive(true)}
            />
          </Flex>
        </Flex>
      </div>
    </nav>
  );
};

export default Navbar;
