const Task = require("../models/Task");

// POST => CREATE TASK 
const createTaskCtrl = async (req, res, next) => {
  const {
    title,
    status,
    description,
    assignee,
    priority,
    estimatation,
    startDate,
    dueDate,
    project,
    guild,
    labels,
    manager,
  } = req.body;
  try {
    const task = await Task.create(req.body);

  } catch (error) {
    next(new Error(error));
  }
};
