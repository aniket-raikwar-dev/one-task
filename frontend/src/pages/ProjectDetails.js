import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { formatDate } from "../utils/formatDate";
import ConfirmationModal from "../components/ConfirmationModal";

const ProjectDetails = () => {
  const [projectData, setProjectData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProjectDetailsData = async () => {
    try {
      const resp = await api.get(`/project/details/${id}`);
      // console.log("project detail : ", resp);
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
          <div
            style={{ width: "90px" }}
            className="btn-create ml-4"
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
          <div
            style={{ width: "100%", marginTop: "0px" }}
            className="task-detail-box"
          >
            <div className="head">
              Team Members
              <div className="ovr-title-right">3</div>
            </div>
            <div className="body">
              {projectData?.teamMembers?.map((member) => (
                <div className="py-2.5">
                  <div className="flex justify-between w-full">
                    <div className="flex">
                      <div className="w-10 h-10 bg-red-200 rounded-full mr-2">
                        <img
                          className="w-full h-full bg-red-200 rounded-full"
                          src={member?.profilePhoto}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[13px]">
                          {member?.fullName}
                        </p>
                        <p className="text-xs text-[#3030fb]">
                          {member?.techRole}
                        </p>
                      </div>
                    </div>
                    <div className="btn-create justify-between">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                      </svg>
                      <p>View</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="py-3">
                <div className="flex justify-between w-full">
                  <div className="flex">
                    <div className="w-10 h-10 bg-red-200 rounded-full mr-2">
                      <img
                        className="w-full h-full bg-red-200 rounded-full"
                        // src={member?.profilePhoto}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[13px]">
                        {/* {member?.fullName} */}
                      </p>
                      <p className="text-xs text-[#3030fb]">
                        {/* {member?.techRole} */}
                      </p>
                    </div>
                  </div>
                  <div className="btn-create justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                    </svg>
                    <p>View</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ width: "100%", marginTop: "15px" }}
            className="task-detail-box"
          >
            <div className="head">
              Tasks
              <div className="ovr-title-right">21</div>
            </div>

            <div className="project-detail-task">
              <div className="task-box">
                <div className="board-circle to-do"></div>
                <h2 className="font-medium">
                  To Do <span className="board-num">(4)</span>
                </h2>
              </div>
              <div className="task-box">
                <div className="board-circle in-prog"></div>
                <h2 className="font-medium">
                  In Progress <span className="board-num">(7)</span>
                </h2>
              </div>
              <div className="task-box">
                <div className="board-circle testing"></div>
                <h2 className="font-medium">
                  In Review <span className="board-num">(2)</span>
                </h2>
              </div>
              <div className="task-box">
                <div className="board-circle done"></div>
                <h2 className="font-medium">
                  Done <span className="board-num">(13)</span>
                </h2>
              </div>
            </div>
            <div className="h-14 flex justify-center items-center">
              <div className="btn-create justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                </svg>
                <p>View</p>
              </div>
            </div>
          </div>
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
