const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const connectDatabase = require("./config/configdb");

const port = process.env.PORT || 4000;

//connect to database

connectDatabase();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/users", userRoutes);

//Server listening to requests

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
