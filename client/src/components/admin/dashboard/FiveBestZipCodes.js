import React from "react";
import "./Dashboard.css";

function FiveBestZipCodes({data}) {

    return (
        <div className="dashboard-stat">
            <div className="light-bold">5 Best ZipCodes</div>
            {
                data?.length ?
                <table className="dashboard-stat-tbl">
                    <thead>
                        <tr>
                            <th>Zip Code</th>
                            <th>City</th>
                            <th>State</th>
                            <th className="text-right">Total Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((dataRow, idx) => {
                                return <tr key={idx}>
                                    <td>{dataRow.zip}</td>
                                        <td>{dataRow.city}</td>
                                        <td>{dataRow.state}</td>
                                        <td className="text-right">{dataRow.count}</td>
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

export default FiveBestZipCodes;