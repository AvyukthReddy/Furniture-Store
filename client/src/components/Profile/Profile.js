import React, {useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { customerDetails } from "../../store";
import "./Profile.css";

function Profile({}) {
  const profileDetails = useSelector(state => state.customerDetails);
  const inputFirstName = useRef(null);
  const inputLastName = useRef(null);
  const inputAddress = useRef(null);
  const inputPhone = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();

  const saveHandler = async () => {
    const reqObj = {
      customer_id: profileDetails.customer_id,
      first_name: inputFirstName?.current.value,
      last_name: inputLastName?.current.value,
      address: inputAddress?.current.value,
      phone: inputPhone?.current.value,
    }
    const response = await fetch("http://localhost:3001/api/profile/save", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    });
    const res = await response.json();
    if(res.status === 200) {
      dispatch(customerDetails.updateProfileDetails(reqObj));
      setEditMode(false);
      setStatus(1);
      setTimeout(() => setStatus(0), 2000);
    } else {
      setStatus(2);
      setTimeout(() => setStatus(0), 2000);
    }
  }

  return (
    <div className="Profile">
      <div className="light-bold">Profile Details</div>
      {
        status === 0 ?
        null :
        status == 1 ?
            <span className="success-message">Profile updated successfully!</span> :
            <span className="failed-message">Order updation failed. Try again!</span>
      }
      <div className="profile-form">
        <div>
          <label className="label padding-right-5">First Name</label>
          <input type="text" className="input" ref={inputFirstName} defaultValue={profileDetails.first_name} disabled={!editMode}></input>
        </div>
        <div>
          <label className="label padding-right-5">Last Name</label>
          <input type="text" className="input" ref={inputLastName} defaultValue={profileDetails.last_name} disabled={!editMode}></input>
        </div>
        <div>
          <label className="label padding-right-5">Email</label>
          <div>{profileDetails.email}</div>
        </div>
        <div>
          <label className="label padding-right-5">Address</label>
          <input type="text" className="input" ref={inputAddress} defaultValue={profileDetails.address} disabled={!editMode}></input>
        </div>
        <div>
          <label className="label padding-right-5">Phone</label>
          <input type="text" className="input" ref={inputPhone} defaultValue={profileDetails.phone} disabled={!editMode}></input>
        </div>
      </div>
      <div className="profile-footer">
        {
          !editMode ? 
          <button className="place-order-btn" onClick={() => setEditMode(true)}>Edit</button> :
          <React.Fragment>
            <button className="place-order-btn background-white" onClick={() => setEditMode(false)}>Cancel</button>
            <button className="place-order-btn" onClick={saveHandler}>Save</button>
          </React.Fragment>
        }
      </div>
    </div>
  );
}

export default Profile;