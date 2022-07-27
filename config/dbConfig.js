const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect(
    "mongodb://localhost:27017/coin-barta",
    () => console.log("db connected"),
    (e) => console.log(e)
  );
};

module.exports = connectDb;
