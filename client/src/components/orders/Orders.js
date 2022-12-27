import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Order from "./Order";
import "./Orders.css";
import OrdersFilter from "./OrdersFilter";

function Orders() {
  const customer_id = useSelector(state => state.customerDetails?.customer_id);
  const [orders, setOrders] = useState([]);

  useEffect(() => {const fetchData = async () => {
      const data = await fetch('http://localhost:3001/api/orders/getOrders', {
        headers: {
          customer_id: customer_id
        }
      });
      const response = await data.json();
      setOrders(response.data);
      return response;
    }

    fetchData()
    .catch(console.error);
  }, []);

  const onFilterHandler = async (reqObj) => {
    const response = await fetch("http://localhost:3001/api/orders/filterOrders", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'customer_id': customer_id
      },
      body: JSON.stringify(reqObj)
    });
    const res = await response.json();
    if(res.status === 200) {
      setOrders(res.data);
    }
  }

  return (
    <div className="Orders">
      {
        orders?.length ?
        <React.Fragment>
          <div className="orders-heading">Order History</div>
          <OrdersFilter onFilterHandler={(reqObj) => onFilterHandler(reqObj)}/>
          <div className="orders-header label">
            <div>Order ID</div>
            <div className="order-date">Ordered On</div>
            <div className="order-status">Status</div>
            <div className="order-name">Shipping Name</div>
            <div className="text-right">Card</div>
            <div></div>
          </div>
          {
            orders.map(order => <Order order={order} key={order.cart_id}/>)
          }
        </React.Fragment> :
        <div>No orders history!</div>
      }
    </div>
  );
}

export default Orders;