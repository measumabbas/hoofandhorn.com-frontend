import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import "./style.css";
import { useLocation } from "react-router-dom";
import { getActiveTab } from "../../../utills/activeTabs";
import Navbar from "./Navbar/Navbar";
import SideBar from "../../../components/dashboard/Sidebar/SideBar";
import SideBarSingleMenu from "../../../components/dashboard/Sidebar/SideBarSingleMenu/SideBarSingleMenu";
import SideBarDropdownMenu from "../../../components/dashboard/Sidebar/SideBarDropdownMenu/SideBarDropdownMenu";
import { useSelector } from "react-redux";
const SuperAdminLayout = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.user?.role === "farmer") {
      navigate("/seller/dashboard");
    }
    if (user?.user?.role === "user") {
      navigate("/");
    }
  }, [navigate, user]);
  const [sideBarActive, setSideBarActive] = useState(false);
  return (
    <div>
      <Navbar setSideBarActive={setSideBarActive} />
      <SideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      >
        <SideBarSingleMenu
          label="Dashboard"
          link="/super-admin/dashboard"
          isActive={getActiveTab(location.pathname, ["/super-admin/dashboard"])}
          setSideBarActive={setSideBarActive}
        />
        <SideBarSingleMenu
          label="Users"
          link="/super-admin/users"
          isActive={getActiveTab(location.pathname, ["/super-admin/users"])}
          setSideBarActive={setSideBarActive}
        />
        <SideBarSingleMenu
          label="Products"
          link="/super-admin/products"
          isActive={getActiveTab(location.pathname, ["/super-admin/products"])}
          setSideBarActive={setSideBarActive}
        />
        {/* <SideBarSingleMenu
          label="Orders"
          link="/super-admin/orders"
          isActive={getActiveTab(location.pathname, ["/super-admin/orders"])}
          setSideBarActive={setSideBarActive}
        /> */}
        <SideBarSingleMenu
          label="Doctors"
          link="/super-admin/doctors"
          isActive={getActiveTab(location.pathname, ["/super-admin/doctors"])}
          setSideBarActive={setSideBarActive}
        />
        <SideBarSingleMenu
          label="Consultations"
          link="/super-admin/consultation"
          isActive={getActiveTab(location.pathname, [
            "/super-admin/consultation",
          ])}
          setSideBarActive={setSideBarActive}
        />
      </SideBar>
      <div
        className="portal-layout-right-side"
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "30px",
          background: "#fff",
        }}
      >
        <Outlet />
      </div>
      <div
        className={`portal-blackout-screen ${
          sideBarActive ? "portal-blackout-show" : "portal-blackout-hide"
        }`}
      ></div>
    </div>
  );
};

export default SuperAdminLayout;
