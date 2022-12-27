import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { customerDetails } from "../../store";

function Nav() {
    const cartOrders = useSelector(state => state.cart);
    const customer_id = useSelector(state => state.customerDetails?.customer_id);
    const isAdmin = useSelector(state => state.customerDetails?.isAdmin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(customerDetails.clearUserDetails());
    }

    useEffect(() => {
        if(isAdmin) navigate(`/dashboard`);
    },[isAdmin]);

  return (
    <div className="Nav">
        <ul>
            <li className="app-title">
                <Link to="/">Desks-R-Us</Link>
            </li>
            {
                customer_id != null 
                ?
                    isAdmin ? 
                        <Fragment>
                            <li>
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/adminOrders">Orders</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={logoutHandler}>Logout</Link>
                            </li>
                        </Fragment> 
                    :
                        <Fragment>
                            <li>
                                <Link to="/">Products</Link>
                            </li>
                            <li>
                                <Link to="/orders">Orders</Link>
                            </li>
                            <li>
                                <Link to="/cart">Cart{cartOrders.length ? `(${cartOrders.length})` : null}</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/login" onClick={logoutHandler}>Logout</Link>
                            </li>
                        </Fragment> 
                :
                    <li>
                        
                        <Link to="/login">Login</Link>
                    </li>
            }
        </ul>
    </div>
  );
}

export default Nav;