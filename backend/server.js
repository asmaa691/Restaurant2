const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// FIXED CORS CONFIGURATION
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests


app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "flames_resto"
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// ==================== DISHES ENDPOINTS ====================

// Get all dishes
app.get("/dishes", (req, res) => {
  console.log("GET /dishes");
  db.query("SELECT * FROM dishes ORDER BY name", (err, result) => {
    if (err) {
      console.error("GET dishes error:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
});

// Get single dish by ID
app.get("/dishes/:id", (req, res) => {
  console.log("GET /dishes/" + req.params.id);
  const { id } = req.params;
  db.query("SELECT * FROM dishes WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("GET dish error:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result[0] || {});
  });
});

// Add new dish
app.post("/dishes", (req, res) => {
  console.log("POST /dishes", req.body);
  const { name, price, description, image } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  
  db.query(
    "INSERT INTO dishes (name, price, description, image) VALUES (?, ?, ?, ?)", 
    [name, price, description || '', image || ''], 
    (err, result) => {
      if (err) {
        console.error("POST dish error:", err);
        return res.status(500).json({ error: err.message });
      }
      return res.json({ 
        message: "Dish added successfully",
        id: result.insertId 
      });
    }
  );
});

// Update dish (EDIT) - FIXED VERSION
app.put("/dishes/:id", (req, res) => {
  console.log("PUT /dishes/" + req.params.id);
  console.log("Request body:", req.body);
  
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }
  
  const query = "UPDATE dishes SET name = ?, price = ?, description = ?, image = ? WHERE id = ?";
  const values = [name, price, description || '', image || '', id];
  
  console.log("Executing query:", query);
  console.log("With values:", values);
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    
    console.log("Update result:", result);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dish not found" });
    }
    
    res.json({ 
      success: true,
      message: "Dish updated successfully",
      affectedRows: result.affectedRows 
    });
  });
});

// Delete dish
app.delete("/dishes/:id", (req, res) => {
  console.log("DELETE /dishes/" + req.params.id);
  const { id } = req.params;
  db.query("DELETE FROM dishes WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("DELETE dish error:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json({ 
      message: "Dish deleted successfully",
      affectedRows: result.affectedRows 
    });
  });
});

// ==================== ORDERS ENDPOINTS ====================

// Get all orders
app.get("/orders", (req, res) => {
  console.log("GET /orders");
  db.query("SELECT * FROM orders ORDER BY created_at DESC", (err, result) => {
    if (err) {
      console.error("GET orders error:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(result);
  });
});

// Create order
app.post("/orders", (req, res) => {
  console.log("POST /orders", req.body);
  const { customer_name, total, phone, address } = req.body;
  
  db.query(
    "INSERT INTO orders (customer_name, total, phone, address) VALUES (?, ?, ?, ?)", 
    [customer_name, total, phone || '', address || ''], 
    (err, result) => {
      if (err) {
        console.error("POST order error:", err);
        return res.status(500).json({ error: err.message });
      }
      return res.json({ 
        message: "Order created successfully",
        orderId: result.insertId 
      });
    }
  );
});

// Delete order
app.delete("/orders/:id", (req, res) => {
  console.log("DELETE /orders/" + req.params.id);
  const { id } = req.params;
  db.query("DELETE FROM orders WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("DELETE order error:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.json({ 
      message: "Order deleted successfully",
      affectedRows: result.affectedRows 
    });
  });
});

// ==================== AUTH ENDPOINTS ====================

// Register new user
app.post("/api/register", async (req, res) => {
  console.log("POST /api/register", req.body);
  const { username, password, email, role = "customer" } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], 
    async (err, result) => {
      if (err) {
        console.error("Register error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      
      if (result.length > 0) {
        return res.status(400).json({ error: "Username or email already exists" });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.query(
          "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
          [username, hashedPassword, email, role],
          (err, result) => {
            if (err) {
              console.error("Insert user error:", err);
              return res.status(500).json({ error: "Failed to create user" });
            }
            
            res.json({ 
              success: true,
              message: "Registration successful! Please login.",
              userId: result.insertId
            });
          }
        );
      } catch (error) {
        console.error("Password hash error:", error);
        res.status(500).json({ error: "Server error" });
      }
  });
});

// Login user
app.post("/api/login", (req, res) => {
  console.log("POST /api/login", req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, result) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = result[0];
    
    // For testing with plain passwords
    if (user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      return res.json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword
      });
    }
    
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Password compare error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
});

// Logout
app.post("/api/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Flames Resto server running on port ${PORT}`);
  console.log(`CORS enabled for: http://localhost:3000`);
  console.log(`Test endpoint: http://localhost:5000/api/test`);
  console.log(`Available endpoints:`);
  console.log(`  GET  /dishes, /dishes/:id`);
  console.log(`  POST /dishes`);
  console.log(`  PUT  /dishes/:id`);
  console.log(`  DELETE /dishes/:id`);
});