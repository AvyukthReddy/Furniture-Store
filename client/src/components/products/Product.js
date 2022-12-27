import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { cartActions } from "../../store";
import "./Product.css";

function Product() {
    const params = useParams();
    const products = useSelector(state => state.products);
    const customer_id = useSelector(state => state.customerDetails?.customer_id);
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const [productId, setProductId] = useState(params.id);
    const [selectedQty, setSelectedQty] = useState(1);
    const [status, setStatus] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const newProduct = products.length ? products.find(product => product.product_id.toString() === productId) : {};
        setProduct(newProduct);
    }, [productId]);

    useEffect(() => {
        const newSimilarProducts = products.length ? products.filter(p => p.product_type === product.product_type) : [];
        setSimilarProducts(newSimilarProducts);
    }, [product]);

    const onProductChangeHandler = (event) => {
        const prodId = similarProducts[event.target.selectedIndex].product_id.toString();
        setProductId(prodId);
        navigate(`/product/${prodId}`);
    }

    const addToCartHandler = () => {
        if(customer_id == null) {
            navigate(`/login`);
        } else {
            const updatedProduct = {...product};
            updatedProduct["selectedQty"] = selectedQty;
            dispatch(cartActions.addToCart({product: updatedProduct}));
            setStatus(1);
            setTimeout(() => setStatus(0), 2000);
        }
    }

    return (
        <div className="Product">
            <div className="product-img">
                <img src={`/assets/${product.product_id}.jpg`} alt={product.product_name} width="300" height="350" />
            </div>
            <div className="product-content">
                <h3>{product.product_name}</h3>
                <div>
                    <span className="label light-bold padding-right-5">Price : </span>
                    <h3 className="no-margin">${product.product_price}</h3>
                </div>
                <div>
                    <span className="label light-bold padding-right-5">Models : </span>
                    <select className="product-select width-250" onChange={(event) => onProductChangeHandler(event)}>
                        {similarProducts.map(p => {
                            if(p.product_type === "1") return <option id={p.product_id} selected={p.product_id === product.product_id}>{p.chair_type} chair with {p.fabric_type} material</option>
                            if(p.product_type === "2") return <option id={p.product_id} selected={p.product_id === product.product_id}>{p.drawers_qty} drawer/s with {p.drawers_material} material</option>
                            if(p.product_type === "3") return <option id={p.product_id} selected={p.product_id === product.product_id}>{p.shelves_qty} shelve/s with {p.bookcase_material} material</option>
                        })}
                    </select>
                </div>
                <div>
                    <span className="label light-bold padding-right-5">Description: </span>
                    <span>{product.product_description}</span>
                </div>
                {
                    product.product_type === "1" ? 
                    <Fragment>
                        <div>
                            <span className="label light-bold padding-right-5">Chair Type : </span>
                            <span>{product.chair_type}</span>
                        </div>
                        <div>
                            <span className="label light-bold padding-right-5">Fabric Type : </span>
                            <span>{product.fabric_type}</span>
                        </div>
                    </Fragment> :
                    product.product_type === "2" ?
                    <Fragment>
                        <div>
                            <span className="label light-bold padding-right-5">No. of Drawers : </span>
                            <span>{product.drawers_qty}</span>
                        </div>
                        <div>
                            <span className="label light-bold padding-right-5">Material : </span>
                            <span>{product.drawers_material}</span>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <div>
                            <span className="label light-bold padding-right-5">No. of Shelves : </span>
                            <span>{product.shelves_qty}</span>
                        </div>
                        <div>
                            <span className="label light-bold padding-right-5">Material : </span>
                            <span>{product.bookcase_material}</span>
                        </div>
                    </Fragment>
                }
                <div>
                    <span className="label light-bold padding-right-5">Quantity : </span>
                    <select className="product-select" onChange={(event) => setSelectedQty(parseInt(event.target.value))}>
                        {product.product_quantity >= 10 ? Array(10).fill(1).map((p, i) => {
                            return <option id={i+1} >{i+1}</option>
                        }) : Array(product.product_quantity).fill(1).map((p, i) => {
                            return <option id={i+1} >{i+1}</option>
                        })}
                    </select>
                </div>
                <div>
                    <button className="card-view-btn" onClick={addToCartHandler}>Add to Cart</button>
                    {
                        status === 0 ?
                        null :
                        status == 1 ?
                            <span className="success-message">Added to Cart!</span> :
                            null
                    }
                </div>
            </div>
        </div>
    );
}

export default Product;