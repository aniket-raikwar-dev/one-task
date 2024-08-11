const mongoose = require("mongoose");

// function to connect the database
const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Database is Connected!");
  } catch (error) {
    console.log("DB Error: -> ", error.message);
    process.exit(1);
  }
};

module.exports = { mongoDBConnect };
