import React from "react";

import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";

const Project = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Project Boards</h2>
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
      </div>

      <div className="project-grid-box scrollable-container">
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default Project;
