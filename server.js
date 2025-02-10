const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Default MySQL username
    password: "", // Default password (leave empty if not set)
    database: "mydatabase"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// API to get users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
