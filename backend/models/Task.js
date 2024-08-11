const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
    },

    progress: {
      type: Number,
    },

    dependencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    priority: {
      type: String,
      enum: ["low", "normal p1", "normal p2", "high p1", "high p2"],
    },

    reportee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    estimation: {
      type: String,
    },

    dueDate: {
      type: Date,
    },

    guild: {
      type: String,
    },

    description: {
      type: String,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    labels: [
      {
        type: String,
        enum: ["frontend", "new", "testing", "bug", "feat", "backend", "fixed"],
      },
    ],

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    links: [
      {
        id: String,
        link: String,
      },
    ],

    attachments: [
      {
        id: { type: String },
        name: { type: String },
        imageUrl: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
