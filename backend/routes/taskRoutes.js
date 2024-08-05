const express = require("express");
const isUserLogin = require("../middlewares/isUserLogin");
const {
  createTaskCtrl,
  getAllTaskByProjectCtrl,
  deleteTaskCtrl,
} = require("../controllers/taskController");
const taskRouter = express.Router();

taskRouter.get("/:id", isUserLogin, getAllTaskByProjectCtrl);

taskRouter.post("/create", isUserLogin, createTaskCtrl);

taskRouter.delete("/delete/:id", isUserLogin, deleteTaskCtrl);

module.exports = taskRouter;
