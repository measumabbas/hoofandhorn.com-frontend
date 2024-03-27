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
const PortalLayout = () => {
  const location = useLocation();
  const [sideBarActive, setSideBarActive] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.user?.role === "admin") {
      navigate("/super-admin/dashboard");
    }
    if (user?.user?.role === "user") {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <div>
      <Navbar setSideBarActive={setSideBarActive} />
      <SideBar
        sideBarActive={sideBarActive}
        setSideBarActive={setSideBarActive}
      >
        <SideBarSingleMenu
          label="Dashboard"
          link="/seller/dashboard"
          isActive={getActiveTab(location.pathname, ["/seller/dashboard"])}
          setSideBarActive={setSideBarActive}
        />
        <SideBarSingleMenu
          label="Products"
          link="/seller/products"
          isActive={getActiveTab(location.pathname, ["/seller/products"])}
          setSideBarActive={setSideBarActive}
        />
        <SideBarSingleMenu
          label="Orders"
          link="/seller/orders"
          isActive={getActiveTab(location.pathname, ["/seller/orders"])}
          setSideBarActive={setSideBarActive}
        />
        <SideBarSingleMenu
          label="Request consultation"
          link="/seller/consultation"
          isActive={getActiveTab(location.pathname, ["/seller/consultation"])}
          setSideBarActive={setSideBarActive}
        />
      </SideBar>
      <div
        className="portal-layout-right-side"
        style={{
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "30px",
          background:'#fff'
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

export default PortalLayout;
