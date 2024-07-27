const Project = require("../models/Project");
const User = require("../models/User");

// POST => CREATE PROJECT
const createProjectCtrl = async (req, res, next) => {
  const {
    name,
    teamMembers,
    manager,
    owner,
    projectType,
    budget,
    startDate,
    deadline,
  } = req.body;

  try {
    await Project.updateMany(
      { manager: req.userAuthID },
      { isSelected: false }
    );

    const project = await Project.create({
      name,
      teamMembers,
      manager,
      owner,
      projectType,
      budget,
      startDate,
      deadline,
      createdBy: req.userAuthID,
      isSelected: true,
    });

    await User.findByIdAndUpdate(req.userAuthID, {
      $push: { projects: project._id },
    });

    res.json({
      status: "200",
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET => GETS PROJECTS LIST
const getProjectsListCtrl = async (req, res, next) => {
  try {
    const projects = await Project.find({
      $or: [{ teamMembers: { $in: [req.userAuthID] } }],
    })
      .populate("manager")
      .populate("teamMembers")
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json({
      message: "projects found successfully",
      data: projects,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET => SELECT THE PROJECT
const selectTheProjectCtrl = async (req, res, next) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(projectId, {
      isSelected: true,
    });
    await Project.updateMany(
      {
        _id: { $ne: projectId },
        $or: [{ teamMembers: { $in: [req.userAuthID] } }],
      },
      { isSelected: false }
    );
    res.status(200).json({
      message: "project selected.",
      data: project,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT => UPDATE PROJECT
const updateProjectCtrl = async (req, res, next) => {};

// DELETE => DELETE PROJECT
const deleteProjectCtrl = async (req, res, next) => {};

module.exports = {
  createProjectCtrl,
  getProjectsListCtrl,
  selectTheProjectCtrl,
};
