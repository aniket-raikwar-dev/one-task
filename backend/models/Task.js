const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    status: {
      type: String,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    description: {
      type: String,
    },

    estimation: {
      type: Number,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    reportee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    startDate: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },

    labels: [
      {
        type: String,
        enum: ["frontend", "new", "test", "bug", "feat", "backend"],
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

    guild: {
      type: String,
      enum: ["frontend", "backend", "devops", "tester"],
    },
  },
  { timestamps: true }
);


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
