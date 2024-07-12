const express = require('express');
const isUserLogin = require('../middlewares/isUserLogin');
const { createProjectCtrl } = require('../controllers/projectController');
const projectRouter = express.Router();

// POST => create project
projectRouter.post('/create', isUserLogin, createProjectCtrl);



module.exports = projectRouter;