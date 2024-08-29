const Task = require("../models/Task");
const Project = require("../models/Project");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");

// POST => CREATE TASK
const createTaskCtrl = async (req, res, next) => {
  const {
    title,
    status,
    description,
    assignee,
    priority,
    estimation,
    startDate,
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
    if (startDate) taskData.startDate = startDate;
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

// GET => get task details
const getTaskDetailsDataCtrl = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId)
      .populate("assignee")
      .populate("reportee")
      .populate("manager")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      });
    res.status(200).json({
      message: "task data found.",
      status: "success",
      data: task,
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

// UPDATE => update the task
const updateTaskCtrl = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// PUT => upload the link
const uploadLinkCtrl = async (req, res, next) => {
  const taskId = req.params.id;
  const { link } = req.body;
  try {
    if (!link) {
      return res.status(400).json({ message: "Link is required" });
    }

    const linkWithId = {
      id: uuidv4(),
      link: link,
    };
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { links: linkWithId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Link added successfully",
      task: updatedTask,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// DELETE => delete the link
const deleteLinkCtrl = async (req, res, next) => {
  const taskId = req.params.taskId;
  const linkId = req.params.linkId;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $pull: { links: { id: linkId } },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Link removed successfully",
      task: updatedTask,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// PUT -> Attached / Uplaod a images to task
const attachTaskImageCtrl = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const shortId = uuidv4().split("-")[0];
    const fileExtension = req.file.originalname.split(".").pop();

    const name = `img_${shortId}.${fileExtension}`;

    const newAttachment = {
      id: shortId,
      name: name,
      imageUrl: req.file.path,
    };

    task.attachments.push(newAttachment);
    await task.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      attachment: newAttachment,
      task: task,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// DELETE -> Delete the attachments
const deleteTaskImageCtrl = async (req, res, next) => {
  const { taskId, attachmentId } = req.params;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $pull: { attachments: { id: attachmentId } } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (updatedTask.attachments.length === updatedTask.attachments.length + 1) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    res.status(200).json({
      message: "Attachment deleted successfully",
      task: updatedTask,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// PUT -> Change the task status
const updateTaskStatusCtrl = async (req, res, next) => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        status: status,
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "status updated successfully",
      data: task,
    });
  } catch (error) {
    next(new Error(error));
  }
};

const dragAndDropCtrl = async (req, res, next) => {
  const { columns } = req.body;
  const { projectId } = req.params;
  try {
    const CHUNK_SIZE = 30;
    const bulkOperations = [];

    for (const [status, tasks] of Object.entries(columns)) {
      tasks.forEach((task) => {
        if (!mongoose.Types.ObjectId.isValid(task._id)) {
          throw new Error(`Invalid ObjectId: ${task._id}`);
        }

        bulkOperations.push({
          updateOne: {
            filter: {
              _id: new mongoose.Types.ObjectId(task._id),
              project: projectId,
            },
            update: { $set: { status: status } },
            upsert: false,
          },
        });
      });
    }

    // modified the bulk operation in chunks
    for (let i = 0; i < bulkOperations.length; i = i + CHUNK_SIZE) {
      const chunk = bulkOperations.slice(i, i + CHUNK_SIZE);
      await Task.bulkWrite(chunk, { ordered: false });
    }

    res.status(200).json({
      success: true,
      message: "tasks status updated successfully",
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  createTaskCtrl,
  getAllTaskByProjectCtrl,
  getTaskDetailsDataCtrl,
  deleteTaskCtrl,
  updateTaskCtrl,
  uploadLinkCtrl,
  deleteLinkCtrl,
  attachTaskImageCtrl,
  deleteTaskImageCtrl,
  updateTaskStatusCtrl,
  dragAndDropCtrl,
};
