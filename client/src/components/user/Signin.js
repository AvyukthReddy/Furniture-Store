import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { customerDetails } from "../../store";
import {useNavigate} from 'react-router-dom';
import "./Signup.css";

function Signin() {
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const signinReq = {
      email: inputEmail?.current.value,
      password: inputPassword?.current.value
    }
    const response = await fetch("http://localhost:3001/api/user/signin", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signinReq)
    });
    const res = await response.json();
    dispatch(customerDetails.updateCustomerDetails(res.data));
    navigate(`/`);
  }

  return (
    <div className="signup">
        <h3>Sign in</h3>
        <input type="text" id="email" name="email" placeholder="Email" ref={inputEmail}></input>
        <input type="password" id="pswd" name="pswd" placeholder="Password" ref={inputPassword}></input>
        <input type="button" className="signup-btn" value="Sign In" onClick={onSubmitHandler}></input>
    </div>
  );
}

export default Signin;