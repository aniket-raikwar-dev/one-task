import React, { useState } from "react";
import Loader from "../images/loader.gif";
import api from "../services/api";
import { Link } from "react-router-dom";
import { formatProfileName } from "../utils/formatProfileName";

const ProjectCard = ({ project, selectedProjectId, setSelectedProjectId }) => {
  const [loader, setLoader] = useState(false);

  const handleSelectProject = async (projectId) => {
    setLoader(true);
    try {
      const resp = await api.put("/users/selected-project", { projectId });
      console.log(" handleSelectProject resp: ", resp?.data);
      setLoader(false);
      setSelectedProjectId(projectId);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date?.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="project-box">
      <div>
        <div className="flex justify-between">
          <div>
            <p className="card-top-text">Teams:</p>
            <div className="flex mt-1">
              {project?.teamMembers?.map((member, index) => (
                <div
                  className={index === 0 ? "user-circle" : "user-circle-rest"}
                >
                  {member?.profilePhoto ? (
                    <img src={member?.profilePhoto} alt="" />
                  ) : (
                    <p>{`${member?.firstName[0]}${member?.lastName[0]}`}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="card-top-text">Deadline:</p>
            <div className="deadline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 8H4V19H20V8ZM15.0355 10.136L16.4497 11.5503L11.5 16.5L7.96447 12.9645L9.37868 11.5503L11.5 13.6716L15.0355 10.136Z"></path>
              </svg>
              <p>{formatDateToDDMMYYYY(project?.deadline)}</p>
            </div>
          </div>
        </div>
        <div className="project-content">
          <h2>
            {project?.name.length >= 60
              ? `${project?.name.slice(0, 60)}...`
              : project?.name}
          </h2>
          <div>
            <div className="project-owner">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
                </svg>
              </div>

              <p>
                Project Manager: <span>{project?.manager?.fullName}</span>
              </p>
            </div>
            <div className="project-owner">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path>
                </svg>
              </div>

              <p>
                Project Start:{" "}
                <span>{formatDateToDDMMYYYY(project?.startDate)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between border-top">
        {project?._id === selectedProjectId ? (
          <div className="project-selected flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"></path>
            </svg>

            <p className="ml-1">Project Selected</p>
          </div>
        ) : (
          <div
            className={`${
              loader ? "project-selected" : "project-unselected"
            } flex items-center`}
            onClick={() => handleSelectProject(project?._id)}
          >
            {loader ? (
              <img className="w-12" src={Loader} alt="" />
            ) : (
              <p className="view-detail ml-1">Select the Project</p>
            )}
          </div>
        )}

        <Link to={`/project-details/${project?._id}`}>
          <div className="flex items-center view-detail">
            <p>View Details</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
