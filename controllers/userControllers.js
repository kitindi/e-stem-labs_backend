const mongoose = require("mongoose");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

//create new user

const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.signup(firstname, lastname, email, password);
    res
      .status(200)
      .json({ firstname: user.firstname, token: generateToken(user._id) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user

const logingUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res
      .status(200)
      .json({ firstname: user.firstname, token: generateToken(user._id) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};
module.exports = { createUser, logingUser };
