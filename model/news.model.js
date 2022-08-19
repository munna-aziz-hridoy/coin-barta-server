const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  // image: [{ data: Buffer, contentType: String }],
  images: [{ type: String, require: true }],
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
    type: String,
    require: true,
    immutable: true,
    default: () => new Date().toLocaleString(),
  },
});

module.exports = mongoose.model("newsCollection", newsSchema);
