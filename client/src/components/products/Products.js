import React, { useState, useEffect  } from "react";
import { useDispatch } from "react-redux";
import "./Products.css";
import Card from "./Card";
import { productsActions } from "../../store";

function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchData = async () => {
      const data = await fetch('http://localhost:3001/api/product/getProducts');
      const response = await data.json();
      setProducts(response.products);
      dispatch(productsActions.updateProducts({products: response.products }));
      return response;
    }

    fetchData()
    .catch(console.error);
  }, []);

  return (
    <div className="Products">
        {products.length ? products.map(product => {
          return <Card product={product} key={product.product_id}/>
        }) : null}
    </div>
  );
}

export default Products;