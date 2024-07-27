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
import OnBoarding from "./OnBoarding";
import TaskDetails from "./TaskDetails";
import SuccessPage from "./SuccessPage";


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
            <Route path="/calendar" element={<CalendarPage collapsed={collapsed} />} />
            <Route path="/create-new-project" element={<CreateNewProject />} />
            <Route path="/onboarding" element={<OnBoarding />} />
            <Route path="/task-details/:id" element={<TaskDetails />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
