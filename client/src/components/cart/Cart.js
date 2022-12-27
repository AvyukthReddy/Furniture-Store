import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "./CartProduct";
import "./Cart.css";
import { cartActions } from "../../store";

function Cart() {
  const products = useSelector(state => state.cart);
  const customer_id = useSelector(state => state.customerDetails?.customer_id);
  const dispatch = useDispatch();
  const inputShippingName = useRef(null);
  const inputRecepientName = useRef(null);
  const inputStreetNumber = useRef(null);
  const inputStreetName = useRef(null);
  const inputCity = useRef(null);
  const inputState = useRef(null);
  const inputCountry = useRef(null);
  const inputZip = useRef(null);
  const inputCardNumber = useRef(null);
  const inputCardName = useRef(null);
  const inputCardType = useRef(null);
  const inputSecCode = useRef(null);
  const inputExpiryDate = useRef(null);
  const inputBillingAddress = useRef(null);
  const [status, setStatus] = useState(0);

  const placeOrderHandler = async () => {
    const reqObj = {
      customer_id,
      products,
      shippingAddress: {
        shippingName: inputShippingName?.current.value,
        recepientName : inputRecepientName?.current.value,
        streetNumber : inputStreetNumber?.current.value,
        streetName : inputStreetName?.current.value,
        city : inputCity?.current.value,
        state : inputState?.current.value,
        country : inputCountry?.current.value,
        zip : inputZip?.current.value,
      },
      paymentDetails: {
        cardNumber : parseInt(inputCardNumber?.current.value),
        cardName : inputCardName?.current.value,
        cardType : inputCardType?.current.value,
        secCode : inputSecCode?.current.value,
        expiryDate : inputExpiryDate?.current.value,
        billingAddress : inputBillingAddress?.current.value,
      }
    };

    const response = await fetch("http://localhost:3001/api/orders/placeOrder", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    });
    const res = await response.json();
    if(res.status === 200) {
      setStatus(1);
      setTimeout(() => {
        setStatus(0);
        dispatch(cartActions.clearCart());
      }, 2000);
    } else {
      setStatus(2);
      setTimeout(() => setStatus(0), 2000);
    }
    
  }

  return (
    <div className="Cart">
      {
        products?.length ?
        <React.Fragment>
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
            products.map((product, idx) => {
              return <CartProduct product={product} idx={idx+1} key={idx+1} />
            })
          }
          <div className="text-right">
            <span className="padding-right-5">Total : </span>
            <span className="light-bold">
              ${Math.round(
                products.reduce((prev, cur) => {
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
                  <input type="text" className="input" ref={inputShippingName}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Recepient Name</label>
                  <input type="text" className="input" ref={inputRecepientName}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Street Number</label>
                  <input type="text" className="input" ref={inputStreetNumber}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Street Name</label>
                  <input type="text" className="input" ref={inputStreetName}></input>
                </div>
                <div>
                  <label className="label padding-right-5">City</label>
                  <input type="text" className="input" ref={inputCity}></input>
                </div>
                <div>
                  <label className="label padding-right-5">State</label>
                  <input type="text" className="input" ref={inputState}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Country</label>
                  <input type="text" className="input" ref={inputCountry}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Zip</label>
                  <input type="text" className="input" ref={inputZip}></input>
                </div>
              </div>
          </div>

          <div className="cart-shipping">
              <div className="shipping-header light-bold">Payment Details</div>
              <div className="shipping-form">
                <div>
                  <label className="label padding-right-5">Card Number</label>
                  <input type="text" maxLength={16} className="input" ref={inputCardNumber}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Card Name</label>
                  <input type="text" className="input" ref={inputCardName}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Card Type</label>
                  <select className="input" ref={inputCardType}>
                    <option value="Master">Master</option>
                    <option value="Visa">Visa</option>
                    <option value="Amex">Amex</option>
                    <option value="Discover">Discover</option>
                  </select>
                </div>
                <div>
                  <label className="label padding-right-5">Security Code</label>
                  <input type="number" maxLength={inputCardType?.current?.value === "Amex" ? 4 : 3} className="input" ref={inputSecCode}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Expiry Date</label>
                  <input type="month" className="input" ref={inputExpiryDate}></input>
                </div>
                <div>
                  <label className="label padding-right-5">Billing Address</label>
                  <input type="text" className="input" ref={inputBillingAddress}></input>
                </div>
              </div>
          </div>
          {
            status === 0 ?
            null :
            status == 1 ?
                <span className="success-message">Order placed updated successfully!</span> :
                <span className="failed-message">Order failed. Try again!</span>
          }
          <div className="place-order">
            <button className="place-order-btn" onClick={placeOrderHandler}>Place Order</button>
          </div>
        </React.Fragment> :
        <div>Cart is empty!</div>
      }
    </div>
  );
}

export default Cart;