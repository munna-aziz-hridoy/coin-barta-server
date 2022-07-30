const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  publish: {
    type: Boolean,
    default: false,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  createDate: {
    type: Date,
    require: true,
    immutable: true,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("newsCollection", newsSchema);
