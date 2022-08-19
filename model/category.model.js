const mongoose = require("mongoose");

var date = new Date();
var offset = date.getTimezoneOffset();

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publish: {
    type: Boolean,
    require: true,
    default: false,
  },
  description: String,
  createdDate: {
    type: String,
    require: true,
    immutable: true,
    default: () => new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("categoryCollections", categorySchema);
