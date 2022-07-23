const express = require("express");
const categoryController = require("../controllers/category.controller");
const { verifyToken } = require("../utilities/verifyToken");

const router = express.Router();

router.post("/add-category", categoryController.addCategory);
router.get("/get-categories", categoryController.getCategory);
router.patch("/delete-category", categoryController.deleteCategory);
router.patch("/update-category", categoryController.updateCategory);
router.patch("/pulish-category", categoryController.publishCategory);

module.exports = router;
