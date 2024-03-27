import React from 'react'
import { FiPhone } from "react-icons/fi";
import "./Forget.css"

function ForgetPassword() {
  return (
    <div className="forget-page">
    <div className="forgetSub-main">
      <form className="login-form" >
      <div className="image">
        <img src="/images/login.svg" alt="login" />
      </div>
      <h1 className='send'>Fill your mobile number and we will send<br/>
you a 4 digit pin to change your<br/>
password</h1>
      <div className="input-box">
        <div className="icon">
          <FiPhone/>
        </div>
        <div>
        <input type="text" placeholder="Mobile Number" />
        </div>
      </div>   
      <div className="buttons">
        <button>Verify</button>
      </div>
      </form>
    </div>
  </div>
  )
}

export default ForgetPassword