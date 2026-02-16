const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
 
const pool = require("../database/pool.js"); 
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);
const express = require("express");
const app = express();

const router = require("./routes/router.js");

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/expenses", router);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
