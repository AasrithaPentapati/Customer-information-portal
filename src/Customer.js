import React from "react";

function Customer({ customer }) {
  return (
    <tr>
      <td>{customer.sno}</td>
      <td>{customer.customer_name}</td>
      <td>{customer.age}</td>
      <td>{customer.phone}</td>
      <td>{customer.location}</td>
      <td>{customer.date}</td>
      <td>{customer.time}</td>
    </tr>
  );
}

export default Customer;
