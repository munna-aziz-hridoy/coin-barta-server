const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  userName: String,
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: { type: String, default: "admin", require: true },
  createdDate: {
    type: String,
    immutable: true,
    default: () => new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("adminCollection", adminSchema);
