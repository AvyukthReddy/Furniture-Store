import React from "react";
import {useNavigate} from 'react-router-dom';
import "./Card.css";

function Card(props) {
    const product = props.product;
    const navigate = useNavigate();

    const goToProductHandler = () => {
        navigate(`/product/${product.product_id}`);
    }

    return (
        <div className="Card">
            <div className="card-img">
                <img src={`/assets/${product.product_id}.jpg`} alt={product.product_name} width="250" height="250" />
            </div>
            <div className="card-title">{product.product_name}</div>
            <div className="card-price"><span>Price:</span> ${product.product_price}</div>
            <button className="card-view-btn" onClick={goToProductHandler}>View</button>
        </div>
    );
}

export default Card;