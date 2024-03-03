const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 3001;

// Database configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "CustomerDetails",
  password: "admin",
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/api/customers", async (req, res) => {
  try {
    let { search, sortBy, page } = req.query;
    sortBy = sortBy === "date" ? "created_at::date" : "created_at::time";
    const offset = (page - 1) * 20 || 0;
    const query = `
      SELECT sno, customer_name, age, phone, location, 
             created_at::date AS date, created_at::time AS time 
      FROM customers
      WHERE customer_name ILIKE $1 OR location ILIKE $1
      ORDER BY ${sortBy}
      LIMIT 20 OFFSET $2`;
    const result = await pool.query(query, [`%${search}%`, offset]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
