const express = require("express");
const router = express.Router();
const { createUser, logingUser } = require("../controllers/userControllers");

//user signup route
router.post("/", createUser);

//User login route
router.post("/login", logingUser);

module.exports = router;
