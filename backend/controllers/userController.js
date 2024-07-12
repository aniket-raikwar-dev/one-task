const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// POST -> USER REGISTER
const userRegisterCtrl = async (req, res, next) => {
  const { email, password, role } = req.body;

  try {
    // check email is exist
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return next(new Error("Email already has been registered."));
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user account
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      status: 200,
      message: "User is Successfully Registered.",
      data: user,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(new Error(error));
  }
};

// POST -> USER LOGIN
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return next(new Error("Invalid Login Credentials"));
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return next(new Error("Invalid Login Credentials"));
    }

    res.json({
      status: 200,
      message: "User is Successfully Login.",
      data: isUserExist,
      token: generateToken(isUserExist._id),
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> GET ALL USERS LIST
const getAllUsersCtrl = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).exec();
    res.json({
      status: 200,
      message: "Get all users success",
      data: users,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// GET -> GET USER PROFILE DATA
const getUserProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.userAuthID);
    res.json({
      status: 200,
      message: "User profile data retrieved",
      data: user,
    });
  } catch (error) {
    next(new Error(error));
  }
};

// PUT -> UPDATE USER PROFILE DATA
const updateUserProfileCtrl = async (req, res, next) => {
  const { firstName, lastName, location } = req.body;
  try {
    const updateFields = {
      firstName,
      lastName,
      location,
    };
    if (req.file) {
      updateFields.profilePhoto = req.file.path;
    }
    const user = await User.findByIdAndUpdate(req.userAuthID, updateFields, {
      new: true,
      runValidators: false,
    });

    res.json({
      status: 200,
      message: "User profile data updated",
      data: user,
    });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  getAllUsersCtrl,
  getUserProfileCtrl,
  updateUserProfileCtrl,
};
