import React from "react";
import "./Dashboard.css";

function TenBestCustomers({data}) {

    return (
        <div className="dashboard-stat">
            <div className="light-bold">10 Best Customers</div>
            {
                data?.length ?
                <table className="dashboard-stat-tbl">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Total Products</th>
                            <th>Money Spent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((dataRow, idx) => {
                                return <tr key={idx}>
                                        <td>{dataRow.customer_id}</td>
                                        <td>{dataRow.first_name}</td>
                                        <td>{dataRow.last_name}</td>
                                        <td className="text-right">{dataRow.total_products}</td>
                                        <td className="text-right">${Math.round(dataRow.money_spent* 100) / 100}</td>
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

export default TenBestCustomers;