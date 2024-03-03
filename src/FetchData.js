import React, { useState, useEffect } from "react";
import axios from "axios";
import Customers from "./Customers";

function FetchData() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [search, sortBy, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/customers", {
        params: { search, sortBy, page: currentPage },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="time">Sort by Time</option>
      </select>
      <Customers customers={customers} />
    </div>
  );
}

export default FetchData;
