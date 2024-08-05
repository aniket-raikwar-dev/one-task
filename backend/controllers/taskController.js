const Task = require("../models/Task");
const Project = require("../models/Project");

// POST => CREATE TASK
const createTaskCtrl = async (req, res, next) => {
  const {
    title,
    status,
    description,
    assignee,
    priority,
    estimation,
    dueDate,
    progress,
    dependencies,
    guild,
    managerId,
    projectId,
  } = req.body;
  try {
    const taskData = {
      reportee: req.userAuthID,
      project: projectId,
      manager: managerId,
    };

    // optional fields only if they are provided
    if (title) taskData.title = title;
    if (status) {
      taskData.status = status;
    } else taskData.status = "To Do";
    if (description) taskData.description = description;
    if (assignee) taskData.assignee = assignee;
    if (priority) taskData.priority = priority;
    if (estimation) taskData.estimation = estimation;
    if (progress) {
      taskData.progress = progress;
    } else taskData.progress = 0;
    if (dependencies) taskData.dependencies = dependencies;
    if (dueDate) taskData.dueDate = dueDate;
    if (guild) taskData.guild = guild;

    const task = await Task.create(taskData);

    await Project.findByIdAndUpdate(
      projectId,
      { $push: { tasks: task._id } },
      { new: true }
    );

    res.status(200).json({
      message: "task created.",
      status: "success",
      data: task,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET => get all task by project
const getAllTaskByProjectCtrl = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const tasks = await Task.find({ project: projectId })
      .populate("assignee")
      .populate("reportee")
      .populate("manager");
    res.status(200).json({
      message: "tasks found.",
      status: "success",
      data: tasks,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// DELETE => delete the task
const deleteTaskCtrl = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    const projectId = task.project;

    await Task.findByIdAndDelete(taskId);

    if (projectId) {
      await Project.findByIdAndUpdate(
        projectId,
        { $pull: { tasks: taskId } },
        { new: true }
      );
    }

    res.status(200).json({
      message: "tasks deleted.",
      status: "success",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  createTaskCtrl,
  getAllTaskByProjectCtrl,
  deleteTaskCtrl,
};
