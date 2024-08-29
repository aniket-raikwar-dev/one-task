const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
  updateSelectedProjectCtrl,
  getUserMemberDataCtrl,
} = require("../controllers/userController");
const isUserLogin = require("../middlewares/isUserLogin");
const userRouter = express.Router();
const storage = require("../config/cloudinaryConnection");
const multer = require("multer");

// instance of multer
const upload = multer({ storage });

// POST: user register
userRouter.post("/register", userRegisterCtrl);

// POST: user login
userRouter.post("/login", userLoginCtrl);

// GET: get all user
userRouter.get("/all", getAllUsersCtrl);

// GET: fetch user profile
userRouter.get("/profile", isUserLogin, getUserProfileCtrl);

// GET: fetch user member data
userRouter.get("/member/:userId", isUserLogin, getUserMemberDataCtrl);

// PUT: update user profile data
userRouter.put(
  "/update",
  isUserLogin,
  upload.single("profilePhoto"),
  updateUserProfileCtrl
);

// PUT: update selected project
userRouter.put("/selected-project", isUserLogin, updateSelectedProjectCtrl);

module.exports = userRouter;
