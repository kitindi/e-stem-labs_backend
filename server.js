const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

//Server listening to requests

app.listen(4000, () => {
  console.log(`Server running on port 4000`);
});
