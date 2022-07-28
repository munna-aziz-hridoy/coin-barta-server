const { StatusCodes } = require("http-status-codes");
const commentModel = require("../model/comment.model");

exports.getAllComments = async (req, res) => {
  const newsID = req.query.id;
  const filter = { refNewsId: newsID };
  const result = await commentModel.find(filter);
  const sortedData = result.reverse();
  res.status(StatusCodes.OK).send({ success: true, result: sortedData });
};

exports.postComments = async (req, res) => {
  const { newsId, content } = req.body;

  const postedComments = new commentModel({
    comment: content,
    refNewsId: newsId,
  });

  await postedComments.save();
  res.status(StatusCodes.OK).send({ success: true, result: postedComments });
};

exports.editComment = async (req, res) => {
  const id = req.query.id;
  const editedComment = req.body.comment;
  const result = await commentModel.findByIdAndUpdate(id, {
    comment: editedComment,
  });
  res.status(StatusCodes.OK).send({ success: true, result });
};

exports.deleteComment = async (req, res) => {
  const id = req.query.id;
  const result = await commentModel.findByIdAndDelete(id);
  res.status(StatusCodes.OK).send({ success: true, result });
};
