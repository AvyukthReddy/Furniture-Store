import React, { useRef } from "react";
import "./Signup.css";

function Signup({onSignupHandler}) {
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputAddress = useRef(null);
  const inputPhone = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const signupReq = {
      firstName: inputFirstName?.current.value, 
      lastName: inputLastName?.current.value,
      email: inputEmail?.current.value,
      address: inputAddress?.current.value,
      phone: inputPhone?.current.value,
      password: inputPassword?.current.value
    }
    const response = await fetch("http://localhost:3001/api/user/signup", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupReq)
    });
    const res = await response.json();
    if(res.status === 200) onSignupHandler();
  }

  return (
    <div className="signup">
        <h3>Sign up</h3>
        <input type="text" id="fname" name="fname" placeholder="First Name" ref={inputFirstName}></input>
        <input type="text" id="lname" name="lname" placeholder="Last Name" ref={inputLastName}></input>
        <input type="text" id="email" name="email" placeholder="Email" ref={inputEmail}></input>
        <input type="password" id="pswd" name="pswd" placeholder="Password" ref={inputPassword}></input>
        <input type="text" id="address" name="address" placeholder="Address" ref={inputAddress}></input>
        <input type="text" id="phone" name="phone" placeholder="Phone Number" ref={inputPhone}></input>
        <input type="button" className="signup-btn" value="Sign Up" onClick={onSubmitHandler}></input>
    </div>
  );
}

export default Signup;