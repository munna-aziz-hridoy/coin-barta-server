const mongoose = require("mongoose");

module.exports = mongoose.connect(
  "mongodb://localhost:27017/coin-barta",
  () => console.log("db connected"),
  (e) => console.log(e)
);
