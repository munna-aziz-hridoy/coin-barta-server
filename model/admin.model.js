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
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("admin-collection", adminSchema);
