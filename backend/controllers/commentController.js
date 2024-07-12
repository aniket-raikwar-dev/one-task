const Comment = requir("../models/Comment.js");
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
  const { userId, description } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    const user = await User.findById(userId);
    const comment = await Comment.create({
      task: task._id,
      user: userId,
      description: description,
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
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuthID.toString()) {
      return next(new Error("You are not allowed to delete this comment"));
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({
      status: "200",
      message: "Comment deleted successfully",
      data: "comment deleted",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  getAllComments,
  createCommentCtrl,
  deleteCommentCtrl
};
