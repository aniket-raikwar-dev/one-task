import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Boards from "./pages/Boards";
import Timeline from "./pages/Timeline";
import Backlogs from "./pages/Backlogs";
import Teams from "./pages/Teams";
import Signup from "./pages/Signup";
import CalendarPage from "./pages/Calendar";
import CreateNewProject from "./pages/CreateNewProject";
import OnBoarding from "./pages/OnBoarding";
import TaskDetails from "./pages/TaskDetails";
import Project from "./pages/Project";
import SuccessPage from "./pages/SuccessPage";
import ProjectDetails from "./pages/ProjectDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "projects",
        element: <Project />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "boards",
        element: <Boards />,
      },
      {
        path: "timeline",
        element: <Timeline />,
      },
      {
        path: "backlogs",
        element: <Backlogs />,
      },
      {
        path: "teams",
        element: <Teams />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "create-new-project",
        element: <CreateNewProject />,
      },
      {
        path: "edit-project/:id",
        element: <CreateNewProject />,
      },
      {
        path: "task-details/:id",
        element: <TaskDetails />,
      },
      {
        path: "success",
        element: <SuccessPage />,
      },
      {
        path: "project-details/:id",
        element: <ProjectDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/onboarding",
    element: <OnBoarding />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
