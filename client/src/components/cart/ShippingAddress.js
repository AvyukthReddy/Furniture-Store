import React, { useRef } from "react";
import "./Cart.css";

function ShippingAddress() {

    const inputRecepienttName = useRef(null);
    const inputStreetNumber = useRef(null);
    const inputStreetName = useRef(null);
    const inputCity = useRef(null);
    const inputState = useRef(null);
    const inputCountry = useRef(null);
    const inputZip = useRef(null);

    return (
        <div className="cart-shipping">
            <div className="shipping-header light-bold">Shipping Details</div>
            <div className="shipping-form">
                <div>
                <label className="label padding-right-5">Recepient Name</label>
                <input type="text" className="input" ref={inputRecepienttName}></input>
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
    );
}

export default ShippingAddress;