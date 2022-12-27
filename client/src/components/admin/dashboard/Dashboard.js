import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AverageSellingProduct from "./AverageSellingProduct";
import "./Dashboard.css";
import FiveBestZipCodes from "./FiveBestZipCodes";
import MostFrequentlySoldProducts from "./MostFrequentlySoldProducts";
import ProductsWithHighestNoOfDistinctCustomers from "./ProductsWithHighestNoOfCustomers";
import TenBestCustomers from "./TenBestCustomers";

function Dashboard() {
    const inputStartDate = useRef(null);
    const inputEndDate = useRef(null);
    const customer_id = useSelector(state => state.customerDetails?.customer_id);
    const [mostFrequentlySoldProducts, setMostFrequentlySoldProducts] = useState([]);
    const [productsHighestNoDistinctCustomers, setProductsHighestNoDistinctCustomers] = useState([]);
    const [tenBestCustomers, setTenBestCustomers] = useState([]);
    const [fiveBestZipCodes, setFiveBestZipCodes] = useState([]);
    const [averageSellingProduct, setAverageSellingProduct] = useState([]);

    const getStatsByAPI = async (endPoint, startDate, endDate) => {
        const data = await fetch(`http://localhost:3001/api/admin/${endPoint}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'customer_id' : customer_id
            },
            body: JSON.stringify({
                startDate,
                endDate
            })
        });
        const response = await data.json();
        return response;
    }

    const getMostFrequentlySoldProducts = async (startDate, endDate) => {
        const response = await getStatsByAPI('getMostFrequentlySoldProducts', startDate, endDate);
        setMostFrequentlySoldProducts(response.data);
    }

    const getProductsHighestNoDistinctCustomerss = async (startDate, endDate) => {
        const response = await getStatsByAPI('getProductsWithHighestNoOfDistinctCustomers', startDate, endDate);
        setProductsHighestNoDistinctCustomers(response.data);
    }

    const getTenBestCustomers = async (startDate, endDate) => {
        const response = await getStatsByAPI('getTenBestCustomers', startDate, endDate);
        setTenBestCustomers(response.data);
    }

    const getFiveBestZipCodes = async (startDate, endDate) => {
        const response = await getStatsByAPI('getFiveBestZipCodes', startDate, endDate);
        setFiveBestZipCodes(response.data);
    }

    const getAverageSellingProduct = async (startDate, endDate) => {
        const response = await getStatsByAPI('getAverageSellingProducts', startDate, endDate);
        setAverageSellingProduct(response.data);
    }

    useEffect(() => {
        const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().substring(0,16);
        const defaultEndDate = new Date(new Date().setHours(new Date().getHours() - 5)).toISOString().substring(0,16);
    
        getMostFrequentlySoldProducts(defaultStartDate, defaultEndDate)
        .catch(console.error);

        getProductsHighestNoDistinctCustomerss(defaultStartDate, defaultEndDate)
        .catch(console.error);

        getTenBestCustomers(defaultStartDate, defaultEndDate)
        .catch(console.error);

        getFiveBestZipCodes(defaultStartDate, defaultEndDate)
        .catch(console.error);

        getAverageSellingProduct(defaultStartDate, defaultEndDate)
        .catch(console.error);
    },[]);

    const searchHandler = () => {
        const startDate = inputStartDate?.current.value;
        const endDate = inputEndDate?.current.value;

        getMostFrequentlySoldProducts(startDate, endDate)
        .catch(console.error);

        getProductsHighestNoDistinctCustomerss(startDate, endDate)
        .catch(console.error);

        getTenBestCustomers(startDate, endDate)
        .catch(console.error);

        getFiveBestZipCodes(startDate, endDate)
        .catch(console.error);

        getAverageSellingProduct(startDate, endDate)
        .catch(console.error);
    }

    return (
        <div className="Dashboard">
            <div className="dashboard-filter">
                <div>
                    <label className="label padding-right-5">Start Date</label>
                    <input type="datetime-local" className="input" ref={inputStartDate} defaultValue={new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().substring(0,16)}></input>
                </div>
                <div>
                    <label className="label padding-right-5">End Date</label>
                    <input type="datetime-local" className="input" ref={inputEndDate} defaultValue={new Date(new Date().setHours(new Date().getHours() - 5)).toISOString().substring(0,16)}></input>
                </div>
                <div className="dashboard-filter-btn">
                    <button className="card-view-btn" onClick={searchHandler}>Search</button>
                </div>
            </div>
            <div className="dashboard-stats-tables">
                <MostFrequentlySoldProducts data={mostFrequentlySoldProducts}/>
                <TenBestCustomers data={tenBestCustomers}/>
                <ProductsWithHighestNoOfDistinctCustomers data={productsHighestNoDistinctCustomers}/>
                <AverageSellingProduct data={averageSellingProduct}/>
                <FiveBestZipCodes data={fiveBestZipCodes}/>
            </div>
        </div>
    );
}

export default Dashboard;