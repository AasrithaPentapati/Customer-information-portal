import React from "react";
import Customer from "./Customer";

function Customers({ customers }) {
  return (
    <div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Sno</th>
            <th>CustomerName</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <Customer key={customer.sno} customer={customer} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
