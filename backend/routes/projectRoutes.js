const express = require("express");
const isUserLogin = require("../middlewares/isUserLogin");
const {
  createProjectCtrl,
  getProjectsListCtrl,
} = require("../controllers/projectController");
const projectRouter = express.Router();

// POST => create project
projectRouter.post("/create", isUserLogin, createProjectCtrl);

// GET => get project
projectRouter.get("/list", isUserLogin, getProjectsListCtrl);

module.exports = projectRouter;
