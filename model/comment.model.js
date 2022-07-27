const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    require: true,
  },
  refNewsId: {
    type: String,
    require: true,
  },
  createDate: {
    type: Date,
    default: () => Date.now(),
    require: true,
  },
});

module.exports = mongoose.model("commentCollection", commentSchema);
