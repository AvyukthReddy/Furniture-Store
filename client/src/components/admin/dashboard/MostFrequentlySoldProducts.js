import React from "react";
import "./Dashboard.css";

function MostFrequentlySoldProducts({data}) {

    return (
        <div className="dashboard-stat">
            <div className="light-bold">Most Frequently Sold Products</div>
            {
                data?.length ?
                <table className="dashboard-stat-tbl">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((dataRow, idx) => {
                                return <tr key={idx}>
                                        <td>{dataRow.product_id}</td>
                                        <td>{dataRow.product_name}</td>
                                        <td>{dataRow.product_description}</td>
                                        <td className="text-right">{dataRow.total_products}</td>
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

export default MostFrequentlySoldProducts;