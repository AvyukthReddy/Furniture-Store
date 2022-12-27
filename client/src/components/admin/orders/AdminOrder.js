import React, { useRef } from "react";
import { OrderStatus } from "../../../constants/orders";
import { useSelector } from "react-redux";
import "../../orders/Orders.css";

function AdminOrder({order, onOrderUpdatedHandler}) {
    const customer_id = useSelector(state => state.customerDetails?.customer_id);
    const selectTransactionStatusRef = useRef(null);
    const orderStatuses = [1,2,3,4];

    const updateOrderStatusHandler = async () => {
        const response = await fetch("http://localhost:3001/api/admin/updateOrderStatus", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'customer_id': customer_id
            },
            body: JSON.stringify({
                "transaction_status": parseInt(selectTransactionStatusRef?.current.value),
                "cart_id": order.cart_id
            })
        });
        const res = await response.json();
        if(res.status === 200) {
            onOrderUpdatedHandler(1);
        } else {
            onOrderUpdatedHandler(2);
        }
    }

    return (
        <div className="Order-row">
            <div>{order.cart_id}</div>
            <div className="order-date">{new Date(Date.parse(order.transaction_date)).toLocaleString()}</div>
            <div className="order-status">
                <select className="product-select width-150" ref={selectTransactionStatusRef}>
                    {
                        orderStatuses.map(status => <option key={status} id={status} value={status} selected={status === order.transaction_status}>{OrderStatus[status]}</option>)
                    }
                </select>
            </div>
            {/* <div className="order-name">{order.shipping_name}</div>
            <div className="text-right">****{props.order.card_number.toString().substring(props.order.card_number.toString().length - 4)}</div> */}
            <div className="order-update">
            <button className="order-update-btn" onClick={updateOrderStatusHandler}>Update Status</button>
            </div>
        </div>
    );
}

export default AdminOrder;