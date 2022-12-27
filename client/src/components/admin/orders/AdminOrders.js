import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import AdminOrder from "./AdminOrder";
import "../../orders/Orders.css";

function AdminOrders() {
    const customer_id = useSelector(state => state.customerDetails?.customer_id);
    const [orders, setOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('http://localhost:3001/api/admin/getOrders', {
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

    const onOrderUpdatedHandler = (status) => {
        setOrderStatus(status);
        setTimeout(() => setOrderStatus(0), 2000);
    }

    return (
        <div className="Orders">
            <div className="orders-heading">Placed Orders</div>
            {
                orderStatus == 0 ?
                null :
                orderStatus == 1 ?
                    <span className="success-message">Order updated successfully!</span> :
                    <span className="failed-message">Order updation failed. Try again!</span>
            }
            <div className="orders-header label">
                <div>Order ID</div>
                <div className="order-date">Ordered On</div>
                <div className="order-status">Status</div>
                <div className="order-update">Update Order</div>
            </div>
            {
                orders?.map(order => <AdminOrder order={order} key={order.cart_id} onOrderUpdatedHandler={(status) => onOrderUpdatedHandler(status)}/>)
            }
        </div>
    );
}

export default AdminOrders;