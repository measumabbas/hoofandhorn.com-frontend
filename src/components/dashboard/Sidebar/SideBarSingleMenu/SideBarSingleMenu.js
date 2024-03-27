import React from "react";
import { Link } from "react-router-dom";
const SideBarSingleMenu = ({ link, label, isActive ,setSideBarActive}) => {
  return (
    <Link
      className={`sidebar-single-link ${isActive ? "sidebar-link-active" : ""}`}
      to={link}
      onClick={()=> setSideBarActive(false)}
    >
      {label}
    </Link>
  );
};

export default SideBarSingleMenu;
