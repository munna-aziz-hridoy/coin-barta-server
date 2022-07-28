const express = require("express");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.get("/get-all-comments", commentController.getAllComments);
router.post("/post-comment", commentController.postComments);
router.patch("/update-comment", commentController.editComment);
router.delete("/delete-comment", commentController.deleteComment);

module.exports = router;
