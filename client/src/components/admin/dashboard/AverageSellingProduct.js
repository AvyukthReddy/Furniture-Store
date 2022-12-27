import React from "react";
import "./Dashboard.css";

function AverageSellingProduct({data}) {

    return (
        <div className="dashboard-stat">
            <div className="light-bold">Average Selling Product</div>
            {
                data?.length ?
                <table className="dashboard-stat-tbl">
                    <thead>
                        <tr>
                            <th>Product Type</th>
                            <th>Product Name</th>
                            <th>Average Selling Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((dataRow, idx) => {
                                return <tr key={idx}>
                                        <td>{dataRow.product_type}</td>
                                        <td>{dataRow.product_name}</td>
                                        <td className="text-right">{Math.round(dataRow.avg_selling_price* 100) / 100}</td>
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

export default AverageSellingProduct;