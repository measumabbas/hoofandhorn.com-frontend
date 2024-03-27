import React, { useEffect, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import "./Signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinners/Spinner";
import { useForm } from "react-hook-form";
import { signup } from "../../features/auth/signupSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.signUp);

  const handleSignup = (values) => {
    dispatch(signup(values));
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-right",
      });
    }
    if (success) {
      navigate("/login");
    }
  }, [error, success, navigate]);

  const { register, handleSubmit } = useForm({
    mode: "onBlur",
  });

  return (
    <div className="signup" style={{minHeight:'100vh'}}>
      <div className="signup-main">
        <form className="login-form" onSubmit={handleSubmit(handleSignup)}>
          {error && <div className="error-message">{error}</div>}
          <div className="sign-up-title">
            <h2>HoofAndHorn</h2>
          </div>
          <h1 className="community">Lets Join Our Community</h1>
          <div className="input-box">
            <div className="icon">
              <CiUser />
            </div>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                {...register("name", { required: true })}
              />
            </div>
          </div>
          <div className="input-box">
            <div className="icon">
              <CiUser />
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                {...register("address", { required: true })}
              />
            </div>
          </div>
          <div className="input-box">
            <div className="icon">
              <FiPhone />
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                required
                {...register("email", { required: true })}
              />
            </div>
          </div>
          <div className="input-box">
            <div className="icon">
              <FiPhone />
            </div>
            <div>
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                required
                {...register("phone")}
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
                placeholder="Password"
                required
                {...register("password")}
              />
            </div>
          </div>
          <div className="join-as-container">
            <h3>Join As</h3>
            <div className="join-as-container-inner">
              <div>
                <input
                  type="radio"
                  value="user"
                  name="role"
                  {...register("role")}
                />
                <span>Buyer</span>
              </div>
              <div>
                <input
                  type="radio"
                  value="farmer"
                  name="role"
                  {...register("role")}
                />
                <span>Seller</span>
              </div>
            </div>
          </div>
          <div className="signup-btn">
            <button>{loading ? <Spinner /> : "Continue"}</button>
          </div>
          <div className="text">
            <p>Already have an account?</p>
            <a href="/login">Login Now</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
