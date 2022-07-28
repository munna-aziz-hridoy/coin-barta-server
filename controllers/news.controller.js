const { StatusCodes } = require("http-status-codes");
const newsModel = require("../model/news.model");

exports.getAllNews = async (req, res) => {
  const result = await newsModel.find({});
  const sortedData = result.reverse();
  res.status(StatusCodes.OK).send({ success: true, result: sortedData });
};

// exports.getCategoryNews = async (req, res) => {
//   const { category } = req.query;
//   // console.log(category);
//   // const result = await newsModel.find({ category });
//   const result = await newsModel.where({ category });

//   console.log(result);
//   const sortedData = result.reverse();
//   res.status(StatusCodes.OK).send({ success: true, result: sortedData });
// };

exports.getSignleNews = async (req, res) => {
  const id = req.query.id;
  const selectedNews = await newsModel.findById(id);
  res.status(StatusCodes.OK).send({ success: true, result: selectedNews });
};

exports.postNews = async (req, res) => {
  const { title, image, content, category } = req.body;
  const postedNews = new newsModel({
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
  const selectedNews = await newsModel.findById(id);

  const result = await newsModel.findByIdAndUpdate(id, {
    publish: !selectedNews.publish,
  });
  res.status(StatusCodes.OK).send({ success: true, result });
};

exports.editNews = async (req, res) => {
  const id = req.query.id;
  const editedItem = await newsModel.findById(id);

  const { title, image, content, category } = req.body;
  const updatedDoc = {
    title: title || editedItem.title,
    content: content || editedItem.content,
    category: category || editedItem.category,
    image: image || editedItem.image,
  };
  const result = await newsModel.findByIdAndUpdate(id, updatedDoc);
  res.status(StatusCodes.OK).send({ success: true, result });
};
