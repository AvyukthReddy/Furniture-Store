import React from "react";
import "./Dashboard.css";

function ProductsWithHighestNoOfDistinctCustomers({data}) {

    return (
        <div className="dashboard-stat">
            <div className="light-bold">Products With Highest No. of Distinct Customers</div>
            {
                data?.length ?
                <table className="dashboard-stat-tbl">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Total Distinct Customers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((dataRow, idx) => {
                                return <tr key={idx}>
                                        <td>{dataRow.product_id}</td>
                                        <td>{dataRow.product_name}</td>
                                        <td>{dataRow.product_description}</td>
                                        <td className="text-right">{dataRow.distinct_customers}</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table> :
                <div className="no-data-available">No data available!</div>
            }
        </div>
    );
}

export default ProductsWithHighestNoOfDistinctCustomers;