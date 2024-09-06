import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import Project from "./Project";
import Overview from "./Overview";
import Boards from "./Boards";
import Timeline from "./Timeline";
import Backlogs from "./Backlogs";
import Teams from "./Teams";
import CalendarPage from "./Calendar";
import CreateNewProject from "./CreateNewProject";
import TaskDetails from "./TaskDetails";
import SuccessPage from "./SuccessPage";
import ProjectDetails from "./ProjectDetails";
import TeamMemberDetails from "./TeamMemberDetails";
import Settings from "./Settings";
import UserDetailsEdits from "./UserDetailsEdits";
import AboutOneTask from "./AboutOneTask";

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="main-container">
          <Routes>
            <Route exact path="/projects" element={<Project />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/backlogs" element={<Backlogs />} />
            <Route path="/teams" element={<Teams />} />
            <Route
              path="/calendar"
              element={<CalendarPage collapsed={collapsed} />}
            />
            <Route path="/create-new-project" element={<CreateNewProject />} />
            <Route path="/edit-project/:id" element={<CreateNewProject />} />
            <Route path="/edit-user-details" element={<UserDetailsEdits />} />
            <Route path="/task-details/:id" element={<TaskDetails />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/project-details/:id" element={<ProjectDetails />} />
            <Route path="/team-member/:id" element={<TeamMemberDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about-onetask" element={<AboutOneTask />} />
          </Routes>
        </div>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
