const express = require("express");
const isUserLogin = require("../middlewares/isUserLogin");
const {
  createCommentCtrl,
  deleteCommentCtrl,
  updateCommentCrtl,
} = require("../controllers/commentController");
const commentRouter = express.Router();

commentRouter.post("/:taskId", isUserLogin, createCommentCtrl);

commentRouter.delete(
  "/delete/:taskId/:commentId",
  isUserLogin,
  deleteCommentCtrl
);

commentRouter.put("/update/:commentId", isUserLogin, updateCommentCrtl);

module.exports = commentRouter;
