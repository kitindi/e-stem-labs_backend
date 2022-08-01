const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    uniques: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static method to signup a user
userSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  password
) {
  if (!firstname || !lastname || !email || !password) {
    throw Error("All field Fields must be field");
  }

  //validate email

  if (!validator.isEmail(email)) {
    throw Error("Provide valid email");
  }

  //hash password

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //check if user exists

  const userExists = await this.findOne({ email });
  if (userExists) {
    throw Error("User Already exists!");
  }

  // create new user

  const user = await this.create({
    firstname,
    lastname,
    email,
    password: hash,
  });

  return user;
};

// static method to loginuser

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field Fields must be field");
  }

  //check if user already exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);
