import React, {useState, useEffect} from "react";
import "./Orders.css";
import "../cart/Cart.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CartProduct from "../cart/CartProduct";

function OrderDetails(props) {
    const customer_id = useSelector(state => state.customerDetails?.customer_id);
    const params = useParams();
    const [orderDetails, setOrderDetails] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:3001/api/orders/getOrder/${params.orderId}`, {
            headers: {
                customer_id: customer_id
            }
            });
            const response = await data.json();
            setOrderDetails(response.data);
            return response;
        }

        fetchData()
        .catch(console.error);
    }, []);

  return (
    <div className="Cart">
        <div className="cart-header">
          <span>Sno</span>
          <span></span>
          <span>Product</span>
          <span className="cart-desc">Description</span>
          <span className="text-right">Quantity</span>
          <span className="text-right">Price</span>
          <span className="text-right">Sub Total</span>
        </div>
        {
          orderDetails?.products?.map((product, idx) => {
            product["selectedQty"] = product?.quantity;
            product["product_price"] = product?.price_sold;
            return <CartProduct product={product} idx={idx+1} key={idx+1} />
          })
        }
        <div className="text-right">
          <span className="padding-right-5">Total : </span>
          <span className="light-bold">
            ${Math.round(
              orderDetails?.products?.reduce((prev, cur) => {
                return prev + (cur.product_price * cur.selectedQty)
              }, 0)
              * 100) / 100
            }
          </span>
        </div>

        <div className="cart-shipping">
            <div className="shipping-header light-bold">Shipping Details</div>
            <div className="shipping-form">
              <div>
                <label className="label padding-right-5">Shipping Name</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.shipping_name}></input>
              </div>
              <div>
                <label className="label padding-right-5">Recepient Name</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.recepient_name}></input>
              </div>
              <div>
                <label className="label padding-right-5">Street Number</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.street_num}></input>
              </div>
              <div>
                <label className="label padding-right-5">Street Name</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.street}></input>
              </div>
              <div>
                <label className="label padding-right-5">City</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.city}></input>
              </div>
              <div>
                <label className="label padding-right-5">State</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.state}></input>
              </div>
              <div>
                <label className="label padding-right-5">Country</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.country}></input>
              </div>
              <div>
                <label className="label padding-right-5">Zip</label>
                <input type="text" className="input" disabled value={orderDetails?.shippingDetails?.zip}></input>
              </div>
            </div>
        </div>
    </div>
  );
}

export default OrderDetails;