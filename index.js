import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();

// Set up CORS headers
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Create the JSON Server router
const router = jsonServer.router("./data/db.json");
server.use("/api", router);

// Attach the database to the server object
server.db = router.db;

// Use JSON Server's default middlewares (e.g., logger, static files)
const middlewares = jsonServer.defaults();

// Set up authentication rules
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600,
});

// Use the correct .use() method for middleware
server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

// Start the server
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
