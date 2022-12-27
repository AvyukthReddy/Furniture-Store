import React, {useRef} from "react";
import "./Orders.css";
import { OrderStatus } from "../../constants/orders";

function OrdersFilter(props) {
  const inputOrderStatus = useRef(null);
  const inputProductDescription = useRef(null);
  const inputShippingName = useRef(null);
  const orderStatuses = [1,2,3,4];

  const onFilterHandler = () => {
    const reqObj = {
        product_description: inputProductDescription?.current.value || '',
        shipping_name: inputShippingName?.current.value || '',
        status: inputOrderStatus?.current.value.toString() === "0" ? "" : inputOrderStatus?.current.value.toString()
    }
    props.onFilterHandler(reqObj);
  }

  return (
    <div className="OrdersFilter">
        <div className="element">
            <label className="label padding-right-5">Order Status</label>
            <select className="product-select width-150" ref={inputOrderStatus}>
                <option key="0"type id="0" value="0" selected>All</option>
                {
                    orderStatuses.map(status => <option key={status} id={status} value={status}>{OrderStatus[status]}</option>)
                }
            </select>
        </div>
        <div className="element">
            <label className="label padding-right-5">Product</label>
            <input type="text" maxLength={16} className="input" ref={inputProductDescription}></input>
        </div>
        <div className="element">
            <label className="label padding-right-5">Shipping Name</label>
            <input type="text" maxLength={16} className="input" ref={inputShippingName}></input>
        </div>
        <div className="OrdersFilter-btn">
            <button className="place-order-btn" onClick={onFilterHandler}>Filter</button>
        </div>
    </div>
  );
}

export default OrdersFilter;