const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors({
  origin: "https://asmaa691.github.io"
}));
app.use(express.json());

/* ===== DATABASE (Render / Cloud ready) ===== */
const db = mysql.createConnection({
 host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});
 
/* ===== DISHES ===== */
app.get("/dishes", (req, res) => {
  db.query("SELECT * FROM dishes", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.get("/dishes/:id", (req, res) => {
  db.query(
    "SELECT * FROM dishes WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result[0] || {});
    }
  );
});

app.post("/dishes", (req, res) => {
  const { name, price, description, image } = req.body;
  db.query(
    "INSERT INTO dishes (name, price, description, image) VALUES (?, ?, ?, ?)",
    [name, price, description, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Dish added", id: result.insertId });
    }
  );
});

app.put("/dishes/:id", (req, res) => {
  const { name, price, description, image } = req.body;
  db.query(
    "UPDATE dishes SET name=?, price=?, description=?, image=? WHERE id=?",
    [name, price, description, image, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Dish updated" });
    }
  );
});

app.delete("/dishes/:id", (req, res) => {
  db.query(
    "DELETE FROM dishes WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Dish deleted" });
    }
  );
});

/* ===== ORDERS ===== */
app.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.post("/orders", (req, res) => {
  const { customer_name, total, phone, address } = req.body;
  db.query(
    "INSERT INTO orders (customer_name, total, phone, address) VALUES (?, ?, ?, ?)",
    [customer_name, total, phone, address],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Order added", id: result.insertId });
    }
  );
});

app.delete("/orders/:id", (req, res) => {
  db.query(
    "DELETE FROM orders WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Order deleted" });
    }
  );
});

/* ===== AUTH ===== */
app.post("/api/register", (req, res) => {
  const { username, password, email } = req.body;
  db.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User registered", id: result.insertId });
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0)
        return res.status(401).json({ error: "User not found" });
      if (result[0].password !== password)
        return res.status(401).json({ error: "Wrong password" });

      const user = result[0];
      delete user.password;
      res.json({ message: "Login ok", user });
    }
  );
});

/* ===== START SERVER (Render compatible) ===== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
