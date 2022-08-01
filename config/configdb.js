const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
