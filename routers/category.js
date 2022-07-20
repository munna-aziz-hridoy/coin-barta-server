const express = require("express");
const categoryController = require("../controllers/category.controller");
const { verifyToken } = require("../utilities/verifyToken");

const router = express.Router();

router.post("/add-category", categoryController.addCategory);
router.get("/get-categories", categoryController.getCategory);
router.delete("/delete-category", categoryController.deleteCategory);
router.patch("/update-category", categoryController.updateCategory);

module.exports = router;
