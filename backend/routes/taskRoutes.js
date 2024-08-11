const express = require("express");
const isUserLogin = require("../middlewares/isUserLogin");
const {
  createTaskCtrl,
  getAllTaskByProjectCtrl,
  deleteTaskCtrl,
  updateTaskCtrl,
  uploadLinkCtrl,
  deleteLinkCtrl,
  getTaskDetailsDataCtrl,
  attachTaskImageCtrl,
  deleteTaskImageCtrl,
  updateTaskStatusCtrl,
  dragAndDropCtrl,
} = require("../controllers/taskController");
const storage = require("../config/cloudinaryConnection");
const multer = require("multer");

const upload = multer({ storage });

const taskRouter = express.Router();

taskRouter.get("/:id", isUserLogin, getAllTaskByProjectCtrl);

taskRouter.get("/details/:id", isUserLogin, getTaskDetailsDataCtrl);

taskRouter.post("/create", isUserLogin, createTaskCtrl);

taskRouter.delete("/delete/:id", isUserLogin, deleteTaskCtrl);

taskRouter.put("/update/:id", isUserLogin, updateTaskCtrl);

taskRouter.put("/upload/link/:id", isUserLogin, uploadLinkCtrl);

taskRouter.delete("/:taskId/delete/link/:linkId", isUserLogin, deleteLinkCtrl);

taskRouter.put(
  "/attach/image/:taskId",
  isUserLogin,
  upload.single("image"),
  attachTaskImageCtrl
);

taskRouter.delete(
  "/delete/attach/:taskId/:attachmentId",
  isUserLogin,
  deleteTaskImageCtrl
);

taskRouter.put("/update/status/:taskId", isUserLogin, updateTaskStatusCtrl);

taskRouter.put("/update/bulk/status/:projectId", isUserLogin, dragAndDropCtrl);

module.exports = taskRouter;
