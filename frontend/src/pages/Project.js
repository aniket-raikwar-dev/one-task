import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import userStore from "../stores/userStore";
import projectStore from "../stores/projectStore";
import api from "../services/api";
import ProjectNotCreated from "../components/ProjectNotCreated";
import Loader from "../components/Loader";

const Project = () => {
  const [projectList, setProjectList] = useState([]);
  const [loader, setLoader] = useState(false);

  const { userDetails, setUserDetails } = userStore();
  const {
    setProjectSelected,
    setProjectStoreList,
    selectedProjectId,
    setSelectedProjectId,
  } = projectStore();

  const getUserDetail = async () => {
    try {
      const resp = await api.get("/users/profile");
      const id = resp?.data?.data?.selectedProject;
      if (id) {
        setProjectSelected(true);
      } else setProjectSelected(false);
      setSelectedProjectId(id);
      setUserDetails(resp?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user details: ", userDetails);

  const getProjectsListData = async () => {
    setLoader(true);
    try {
      const resp = await api.get("/project/list");
      const { data } = resp?.data;
      console.log("project list: ", data);
      setProjectList(data);
      setProjectStoreList(data);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getProjectsListData();
    getUserDetail();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Projects</h2>
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

      {loader ? (
        <Loader title="Projects" />
      ) : projectList.length > 0 ? (
        <div className="project-grid-box scrollable-container">
          {projectList.map((project) => (
            <ProjectCard
              project={project}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
            />
          ))}
        </div>
      ) : (
        <ProjectNotCreated />
      )}
    </div>
  );
};

export default Project;
