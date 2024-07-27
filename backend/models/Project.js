const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "project name is required"],
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    owner: {
      type: String,
      required: [true, "project owner is required"],
    },

    projectType: {
      type: String,
      required: [true, "project type is required"],
    },

    isSelected: {
      type: Boolean,
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
