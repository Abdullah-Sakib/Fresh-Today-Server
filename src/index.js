const express = require("express");
const cors = require("cors");
const { connect } = require("./db");
const port = process.env.PORT || 5000;
const productsHandler = require("./routeHandler/productsHandler");
const categoriesHandler = require("./routeHandler/categoriesHandler");
const paymentsHandler = require("./routeHandler/paymentsHandler");
const usersHandler = require("./routeHandler/usersHandler");
const chatsHandler = require("./routeHandler/chatHandler");
const conversationsHandler =  require("./routeHandler/conversationHandler");

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Database connection
connect();

// API routes
app.use("/products", productsHandler);
app.use("/categories", categoriesHandler);
app.use("/payment", paymentsHandler);
app.use("/user", usersHandler);
app.use("/chats", chatsHandler);
app.use("/conversation",conversationsHandler);


app.get("/", async (req, res) => {
  res.send("the fresh today server is running");
});

app.listen(port, () => {
  console.log(`the fresh today server is running on ${port}`);
});
