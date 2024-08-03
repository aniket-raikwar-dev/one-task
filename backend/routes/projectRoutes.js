const express = require("express");
const isUserLogin = require("../middlewares/isUserLogin");
const {
  createProjectCtrl,
  getProjectsListCtrl,
  getProjectDetailsCtrl,
  deleteProjectCtrl,
  updateProjectCtrl,
} = require("../controllers/projectController");
const projectRouter = express.Router();

// POST => create project
projectRouter.post("/create", isUserLogin, createProjectCtrl);

// GET => get project
projectRouter.get("/list", isUserLogin, getProjectsListCtrl);

// GET => get project detail
projectRouter.get("/details/:id", isUserLogin, getProjectDetailsCtrl);

// DELETE => delete the project
projectRouter.delete("/delete/:id", isUserLogin, deleteProjectCtrl);

// UPDATE => update the project
projectRouter.put("/update/:id", isUserLogin, updateProjectCtrl);

module.exports = projectRouter;
