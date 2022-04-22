const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

// Route Definitions
const register = require("./authentication/register");
const login = require("./authentication/login");
const rentals = require("./api/rentals/rentals");
const inventory = require("./api/inventory/inventory");
const customers = require("./api/customers/customers");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// Path Definitions
app.post("/register", register);
app.post("/login", login);

app.get("/rentals", rentals);
app.post("/rentals", rentals);

app.get("/inventory", inventory);
app.post("/inventory", inventory);
app.put("/inventory", inventory);
app.delete("/inventory", inventory);

app.get("/customers", customers);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});