const express = require("express");
const newsController = require("../controllers/news.controller");

const router = express.Router();

router.get("/get-all-news", newsController.getAllNews);
// router.get("/category-news", newsController.getCategoryNews);
router.get("/get-single-news", newsController.getSignleNews);
router.post("/post-news", newsController.postNews);
router.patch("/update-news", newsController.editNews);
router.patch("/publish-news", newsController.publishNews);

module.exports = router;
