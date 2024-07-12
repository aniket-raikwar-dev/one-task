const Project = require("../models/Project");

// POST => CREATE PROJECT
const createProjectCtrl = async (req, res, next) => {
  const {
    name,
    manager,
    owner,
    projectType,
    budget,
    startDate,
    deadline,
    teamMembers,
  } = req.body;

  try {
    const project = await Project.create({
      name,
      manager,
      owner,
      projectType,
      budget,
      startDate: new Date(startDate),
      deadline: new Date(deadline),
      teamMembers,
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


// PUT => UPDATE PROJECT
const updateProjectCtrl = async (req, res, next) => {};


// DELETE => DELETE PROJECT
const deleteProjectCtrl = async (req, res, next) => {

}

module.exports = {
  createProjectCtrl,
};



