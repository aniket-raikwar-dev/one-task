import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { formatDate } from "../utils/formatDate";
import ConfirmationModal from "../components/ConfirmationModal";
import TaskCounterBox from "../components/TaskCounterBox";
import ProjectOrTeamMemberBox from "../components/ProjectOrTeamMemberBox";

const ProjectDetails = () => {
  const [projectData, setProjectData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProjectDetailsData = async () => {
    try {
      const resp = await api.get(`/project/details/${id}`);
      console.log("project detail : ", resp);
      const { data } = resp?.data;
      setProjectData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editProject = () => {
    navigate(`/edit-project/${id}`);
  };

  const deleteTheProject = async () => {
    try {
      const resp = await api.delete(`/project/delete/${id}`);
      console.log("resp: ", resp);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  const countNumberOfTask = (statusType) => {
    let count = 0;
    for (const task of projectData?.tasks) {
      if (task?.status === statusType) count++;
    }
    return count;
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getProjectDetailsData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Project Details</h2>
        <div className="flex">
          <div
            style={{ width: "90px" }}
            className="btn-create mr-4"
            onClick={editProject}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
            </svg>
            Edit
          </div>
          <div
            style={{ width: "90px" }}
            className="btn-create delete"
            onClick={showModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
            </svg>
            Delete
          </div>
        </div>
      </div>

      <div className="scrollable-container flex justify-between mt-4">
        <div className="w-[62%]">
          <p className="task-title-bg-input">{projectData?.name}</p>

          <div className="project-detail-box mt-5">
            <div className="square-box">
              <p>Project Manager:</p>
              <h3>{projectData?.manager?.fullName}</h3>
            </div>

            <div className="square-box">
              <p>Project Owner:</p>
              <h3>{projectData?.owner}</h3>
            </div>
            <div className="square-box">
              <p>Status:</p>
              <h3>{projectData?.status}</h3>
            </div>
            <div className="square-box">
              <p>Estimated Budget:</p>
              <h3>{projectData?.budget}</h3>
            </div>
            <div className="square-box">
              <p>Start Date:</p>
              <h3 className="tracking-widest">
                {formatDate(projectData?.startDate)}
              </h3>
            </div>
            <div className="square-box">
              <p>Deadline:</p>
              <h3 className="tracking-widest">
                {formatDate(projectData?.deadline)}
              </h3>
            </div>
          </div>
          <div className="square-box mt-6">
            <p>Project Type:</p>
            <h3>{projectData?.projectType}</h3>
          </div>

          <div className="square-box mt-6">
            <p>Description:</p>
            <p className="para">{projectData?.description}</p>
          </div>

          {/* <div className="project-btn-box btn-left">
            <button className="btn cancle">Delete</button>
            <button
              className="btn flex justify-center items-center"
              type="submit"
            >
              Edit
            </button>
          </div> */}
        </div>

        <div className="w-[30%]">
          <ProjectOrTeamMemberBox
            title={"Team Members"}
            isProjectBox={false}
            data={projectData}
          />
          <TaskCounterBox projectData={projectData} />
        </div>
      </div>

      <ConfirmationModal
        title={"Project"}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleDelete={deleteTheProject}
      />
    </div>
  );
};

export default ProjectDetails;
