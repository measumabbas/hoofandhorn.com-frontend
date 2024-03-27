import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "react-feather";
import { Link } from "react-router-dom";
const SideBarDropdownMenu = ({ label, options, dropHeight, isActive,setSideBarActive }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="sidebar-drop-menu">
      <div
        className={`sidebar-drop-menu-head ${
          isActive ? "sidebar-link-active" : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <p className="drop-menu-label">{label}</p>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>
      <div
        className="side-bar-menu-options"
        style={{ maxHeight: `${open ? dropHeight : "0px"}` }}
      >
        {options.map((option, index) => {
          return (
            <Link
              className={`side-bar-menu-option ${
                option.isActive ? "side-bar-menu-option-active" : ""
              }`}
              key={index}
              to={option.link}
              onClick={()=> setSideBarActive(false)}
            >
              {option.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBarDropdownMenu;
