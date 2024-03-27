import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/loginSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="container Animal-Navbar">
      <div className="animal-logo">
        <h2>HoofAndHorn</h2>
      </div>
      <div className="animal-centerlinks">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/service">Services</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </div>
      <div className="animal-login">
        <ul>
          {user ? (
            <>
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
              <li
                onClick={() => {
                  dispatch(logout());
                }}
                style={{cursor:'pointer'}}
              >
                <Link to="/">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/signup">Create Account</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
