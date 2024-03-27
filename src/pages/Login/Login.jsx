import React, { useState, useEffect } from "react";
import "./Login.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, login } from "../../features/auth/loginSlice";
import Spinner from "../../components/spinners/Spinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Login = () => {
  console.log("in login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, user, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user?.user?.role === "farmer") {
        navigate("/seller/dashboard");
      }
      if (user?.user?.role === "admin") {
        navigate("/super-admin/dashboard");
      }
      if (user?.user?.role === "user") {
        navigate("/");
      }
    }
    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error,
        showConfirmButton: true,
      });
      dispatch(clearState());
    }
  }, [user, error, navigate, dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="main" style={{minHeight:'100vh'}}>
      <div className="sub-main">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="Login-form-title">
            <h2>HoofAndHorn</h2>
          </div>
          <div className="input-box">
            <div className="icon">
              <FiPhone />
            </div>
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="input-box">
            <div className="icon">
              <RiLockPasswordLine />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="forget">
            <a href="/forget">Forget Password?</a>
          </div>
          <div className="buttons">
            <button>{loading ? <Spinner /> : "Log In"}</button>
          </div>
          <div className="text">
            <p>Don't have an account?</p>
            <a href="/Signup">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
