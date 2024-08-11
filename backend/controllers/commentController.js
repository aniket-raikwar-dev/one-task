const Comment = require("../models/Comment.js");
const User = require("../models/User.js");
const Task = require("../models/Task.js");

// GET => GET ALL COMMENTS
const getAllCommentsCtrl = async (req, res, next) => {
  try {
    const comments = await Comment.find({ task: req.params.id })
      .populate("user")
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      status: "200",
      message: "Comments found.",
      data: comments,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// POST => CREATE NEW COMMENT
const createCommentCtrl = async (req, res, next) => {
  const taskId = req.params.taskId;
  const { commentText } = req.body;
  try {
    const task = await Task.findById(taskId);
    const user = await User.findById(req.userAuthID);
    const comment = await Comment.create({
      task: task._id,
      user: req.userAuthID,
      text: commentText,
    });
    task.comments.push(comment._id);
    user.comments.push(comment._id);

    task.save({ validateBeforeSave: false });
    user.save({ validateBeforeSave: false });

    res.json({
      status: 200,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// DELETE => DELETE COMMENT
const deleteCommentCtrl = async (req, res, next) => {
  const { commentId, taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    const user = await User.findById(req.userAuthID);

    task.comments = task.comments.filter(
      (comment) => comment.toString() !== commentId
    );

    user.comments = user.comments.filter(
      (comment) => comment.toString() !== commentId
    );

    await task.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    await Comment.findByIdAndDelete(commentId);

    res.json({
      status: "200",
      message: "Comment deleted successfully",
      data: "comment deleted",
    });
  } catch (error) {
    next(new Error(error));
  }
};

// PUT -> Update the comment
const updateCommentCrtl = async (req, res, next) => {
  const { commentId } = req.params;
  const { updatedText } = req.body;
  try {
    const comment = await Comment.findById(commentId);
    comment.text = updatedText;

    await comment.save({ validateBeforeSave: false });

    res.json({
      status: "200",
      message: "Comment updated successfully",
      data: "comment updated",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  createCommentCtrl,
  deleteCommentCtrl,
  updateCommentCrtl,
};
