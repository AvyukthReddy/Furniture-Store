import React from "react";
import {useNavigate} from 'react-router-dom';
import { OrderStatus } from "../../constants/orders";
import "./Orders.css";

function Order(props) {
  const navigate = useNavigate();

  const orderDetailsHandler = () => {
    navigate(`/order/${props.order.cart_id}`);
  }

  return (
    <div className="Order-row">
        <div>{props.order.cart_id}</div>
        <div className="order-date">{new Date(Date.parse(props.order.transaction_date)).toLocaleString()}</div>
        <div className="order-status">{OrderStatus[props.order.transaction_status]}</div>
        <div className="order-name">{props.order.shipping_name}</div>
        <div className="text-right">****{props.order.card_number.toString().substring(props.order.card_number.toString().length - 4)}</div>
        <div>
          <button className="order-details-btn" onClick={orderDetailsHandler}>Order Details</button>
        </div>
    </div>
  );
}

export default Order;