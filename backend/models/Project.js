const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "project name is required"],
    },

    description: {
      type: String,
      required: [true, "project description is required"],
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "project manager is required"],
    },

    owner: {
      type: String,
      required: [true, "project owner is required"],
    },

    projectType: {
      type: String,
      required: [true, "project type is required"],
    },

    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    budget: {
      type: String,
      required: [true, "project estimated budget is required"],
    },

    startDate: {
      type: Date,
      required: [true, "project start date is required"],
    },

    status: {
      type: String,
      required: [true, "project status zone is required"],
    },

    deadline: {
      type: Date,
      required: [true, "project deadline is required"],
    },

    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
