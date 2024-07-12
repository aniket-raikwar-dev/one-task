const express = require("express");
const cors = require("cors");
const { mongoDBConnect } = require("./config/databaseConnection");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const projectRouter = require("./routes/projectRoutes");
const commentRouter = require("./routes/commentRoutes");
const taskRouter = require("./routes/taskRoutes");

// intialize app
const app = express();

// enable CORS for all routes
app.use(cors());

// work like body-parser
app.use(express.json());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/comment", commentRouter);

// database connection
mongoDBConnect();

// listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("Server Listening on Port -> ", PORT);
});

app.get("/api", (req, res) => {
  return res.json("API VERSION 1");
});
