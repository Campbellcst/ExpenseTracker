/* -- How to Connect to DB -- 
psql -U postgres (password: Campbell1!)
\c expenses_db
*/ 

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
