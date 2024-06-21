import React from "react";

import ProjectCard from "../components/ProjectCard";

const Project = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Project Boards</h2>
        <div className="btn-create-project">Create New Project</div>
      </div>

      <div className="project-grid-box">
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default Project;
