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
import TaskDetails from "./pages/TaskDetails";
import Project from "./pages/Project";
import SuccessPage from "./pages/SuccessPage";
import ProjectDetails from "./pages/ProjectDetails";
import TeamMemberDetails from "./pages/TeamMemberDetails";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutOneTask from "./pages/AboutOneTask";
import EditUserDetails from "./pages/EditUserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
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
          {
            path: "team-member/:id",
            element: <TeamMemberDetails />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/about-onetask",
            element: <AboutOneTask />,
          },
        ],
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
    path: "/edit-user-details",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <EditUserDetails />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

reportWebVitals();
