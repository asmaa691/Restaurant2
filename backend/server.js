const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flames_resto"
});

db.connect(err => {
  if (err) console.log("Database error:", err);
  else console.log("Database connected");
});

// DISHES
app.get("/dishes", (req, res) => {
  db.query("SELECT * FROM dishes", (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

app.get("/dishes/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM dishes WHERE id = ?", [id], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result[0] || {});
  });
});

app.post("/dishes", (req, res) => {
  const { name, price, description, image } = req.body;
  db.query(
    "INSERT INTO dishes (name, price, description, image) VALUES (?, ?, ?, ?)",
    [name, price, description, image],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: "Dish added", id: result.insertId });
    }
  );
});

app.put("/dishes/:id", (req, res) => {
  const id = req.params.id;
  const { name, price, description, image } = req.body;
  db.query(
    "UPDATE dishes SET name=?, price=?, description=?, image=? WHERE id=?",
    [name, price, description, image, id],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: "Dish updated" });
    }
  );
});

app.delete("/dishes/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM dishes WHERE id = ?", [id], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Dish deleted" });
  });
});

// ORDERS
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(result);
  });
});

app.post("/orders", (req, res) => {
  const { customer_name, total, phone, address } = req.body;
  db.query(
    "INSERT INTO orders (customer_name, total, phone, address) VALUES (?, ?, ?, ?)",
    [customer_name, total, phone, address],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: "Order added", id: result.insertId });
    }
  );
});

app.delete("/orders/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM orders WHERE id = ?", [id], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Order deleted" });
  });
});

// AUTH
app.post("/api/register", (req, res) => {
  const { username, password, email } = req.body;
  db.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (err, result) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ message: "User registered", id: result.insertId });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (err) res.status(500).json({ error: err.message });
    else if (result.length === 0) res.status(401).json({ error: "User not found" });
    else if (result[0].password !== password) res.status(401).json({ error: "Wrong password" });
    else {
      const user = result[0];
      delete user.password;
      res.json({ message: "Login ok", user });
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});