const { StatusCodes } = require("http-status-codes");
const categoryModel = require("../model/category.model");

exports.addCategory = async (req, res) => {
  const { name, description } = req.body;
  const newCategory = new categoryModel({
    name,
    description,
  });
  await newCategory.save();
  res.status(StatusCodes.OK).send({ success: true, category: newCategory });
};

exports.getCategory = async (req, res) => {
  const result = await categoryModel.find();
  const sortedData = result.reverse();
  res.status(StatusCodes.OK).send({ success: true, categories: sortedData });
};

exports.deleteCategory = async (req, res) => {
  const id = req.query.id;
  const selectedCategory = await categoryModel.findById(id);

  const result = await categoryModel.findByIdAndUpdate(id, {
    publish: !selectedCategory.publish,
  });
  res.status(StatusCodes.OK).send({ success: true, result });
};

exports.updateCategory = async (req, res) => {
  const id = req.query.id;
  const { name, description } = req.body;
  const result = await categoryModel.findByIdAndUpdate(id, {
    name,
    description,
  });

  res.status(StatusCodes.OK).send({ success: true, result });
};

exports.publishCategory = async (req, res) => {
  const id = req.query.id;
  const selectedCategory = await categoryModel.findById(id);
  const result = await categoryModel.findByIdAndUpdate(id, {
    publish: !selectedCategory.publish,
  });
  res.status(StatusCodes.OK).send({ success: true, result });
};
