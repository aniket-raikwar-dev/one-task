import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import userStore from "../stores/userStore";

import api from "../api";
import ProjectNotCreated from "../components/ProjectNotCreated";

const Project = () => {
  const [projectList, setProjectList] = useState([]);
  const { userDetails } = userStore();

  const getProjectsListData = async () => {
    try {
      const resp = await api.get("/project/list");
      const { data } = resp?.data;
      console.log("project list: ", data)
      setProjectList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectsListData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Project Boards</h2>
        {userDetails?.isManager && (
          <Link to="/create-new-project">
            <div className="btn-create">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
              </svg>
              New Project
            </div>
          </Link>
        )}
      </div>

      {projectList.length > 0 ? (
        <div className="project-grid-box scrollable-container">
          {projectList.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      ) : (
        <ProjectNotCreated />
      )}
    </div>
  );
};

export default Project;
