const Project = require("../models/Project");
const User = require("../models/User");

// POST => CREATE PROJECT
const createProjectCtrl = async (req, res, next) => {
  const {
    name,
    teamMembers,
    manager,
    owner,
    description,
    status,
    projectType,
    budget,
    startDate,
    deadline,
  } = req.body;

  try {
    const project = await Project.create({
      name,
      teamMembers,
      manager,
      owner,
      description,
      status,
      projectType,
      budget,
      startDate,
      deadline,
      createdBy: req.userAuthID,
    });

    await User.findByIdAndUpdate(req.userAuthID, {
      $push: { projects: project._id },
      $set: { selectedProject: project._id },
    });

    res.status(200).json({
      message: "Task created and added to the project.",
      status: "success",
      data: task,
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

// GET => PROJECT DETAILS
const getProjectDetailsCtrl = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId)
      .populate("teamMembers")
      .populate("manager");
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({
      message: "Project found.",
      data: project,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT => UPDATE PROJECT
const updateProjectCtrl = async (req, res, next) => {
  const projectId = req.params.id;
  const {
    name,
    teamMembers,
    manager,
    owner,
    description,
    status,
    projectType,
    budget,
    startDate,
    deadline,
  } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      {
        name,
        teamMembers,
        manager,
        owner,
        description,
        status,
        projectType,
        budget,
        startDate,
        deadline,
      },
      { new: true }
    );

    res.json({
      status: "200",
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE => DELETE PROJECT
const deleteProjectCtrl = async (req, res, next) => {
  const projectId = req.params.id;
  try {
    await Project.findByIdAndDelete(projectId);
    const user = await User.findById(req.userAuthID);
    if (user) {
      if (user.selectedProject == projectId) {
        user.selectedProject = null;
      }

      user.projects = user.projects.filter(
        (projId) => !projId.equals(projectId)
      );

      await user.save();
    }

    res.status(200).json({
      message: "Project deleted.",
      status: "success",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProjectCtrl,
  getProjectsListCtrl,
  selectTheProjectCtrl,
  getProjectDetailsCtrl,
  deleteProjectCtrl,
  updateProjectCtrl,
};
