import React from "react";
import "./Cart.css";

function CartProduct(props) {
  const product = props.product;

  return (
    <div className="CartProduct">
        <span>{props.idx}</span>
        <div className="cart-img">
            <img src={`/assets/${product.product_id}.jpg`} alt={product.product_name} width="100" height="120" />
        </div>
        <span>{product.product_name}</span>
        <span className="cart-desc">{product.product_description}</span>
        <span className="text-right">{product.selectedQty}</span>
        <span className="text-right">${product.product_price}</span>
        <span className="text-right">${Math.round(product.product_price * product.selectedQty * 100) / 100}</span>
    </div>
  );
}

export default CartProduct;