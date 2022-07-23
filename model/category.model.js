const mongoose = require("mongoose");

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
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("category-collection", categorySchema);
