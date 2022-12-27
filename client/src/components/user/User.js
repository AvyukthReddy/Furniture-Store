import React, { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";

function User() {
  const [signIn, setSignIn] = useState(true);

  const onChangeView = (e, isLogin) => {
    e.preventDefault();
    setSignIn(isLogin);
  }

  const onSignupHandler = () => {
    setSignIn(true);
  }

  return (
    <div className="User">
      <div className="user-header">
        <a href="#" onClick={(e) => onChangeView(e, true)} className={signIn ? 'selected light-bold' : 'light-bold'}>Sign In</a>
        <a href="#" onClick={(e) => onChangeView(e, false)} className={!signIn ? 'selected light-bold' : 'light-bold'}>Sign Up</a>
      </div>
      {
        signIn ?
        <Signin /> :
        <Signup onSignupHandler={onSignupHandler}/>
      }
    </div>
  );
}

export default User;