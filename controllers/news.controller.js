const { StatusCodes } = require("http-status-codes");
const newsCollection = require("../model/news.model");

exports.getAllNews = async (req, res) => {
  const result = await newsCollection.find({});
  res.status(StatusCodes.OK).send({ success: true, result });
};

exports.getSignleNews = async (req, res) => {
  const id = req.query.id;
  const selectedNews = await newsCollection.findById(id);
  res.status(StatusCodes.OK).send({ success: true, result: selectedNews });
};

exports.postNews = async (req, res) => {
  const { title, image, content, category } = req.body;
  const postedNews = new newsCollection({
    title,
    image,
    content,
    category,
  });
  await postedNews.save();
  res.status(StatusCodes.OK).send({ success: true, news: postedNews });
};

exports.publishNews = async (req, res) => {
  const id = req.query.id;
  const selectedNews = await newsCollection.findById(id);

  const result = await newsCollection.findByIdAndUpdate(id, {
    publish: !selectedNews.publish,
  });
  res.status(StatusCodes.OK).send({ success: true, result });
};

exports.editNews = async (req, res) => {
  const id = req.query.id;
  const updatedDoc = {
    title,
    content,
  };
  const result = await newsCollection.findByIdAndUpdate(id, updatedDoc);
  res.status(StatusCodes.OK).send({ success: true, result });
};
