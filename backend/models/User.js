const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: [true, "email address is required"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    location: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
    },

    isManager: {
      type: Boolean,
      default: false,
    },

    selectedProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    manager: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isAlreadyInProject: {
      type: Boolean,
    },

    role: {
      type: String,
      enum: ["manager", "developer"],
    },

    techRole: {
      type: String,
    },

    phone: {
      type: String,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Adding the virtual property 'fullName'
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
