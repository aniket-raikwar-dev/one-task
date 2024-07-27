import React from "react";
import NoDataImg from "../images/noDataAvailable.svg";
import { Link } from "react-router-dom";
import userStore from "../stores/userStore";

const ProjectNotCreated = () => {
  const { userDetails } = userStore();
  console.log("userDateola: ", userDetails);
  return (
    <div className="flex w-full flex-col items-center mt-24">
      <img className="w-52" src={NoDataImg} alt="no-data" />
      {userDetails.isManager ? (
        <>
          <p className="text-[16px] my-5">
            You haven't create any project yet, please create a new project to
            continue.
          </p>
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
        </>
      ) : (
        <>
          <p className="text-[16px] mt-5 mb-2 text-[#3030fb] font-bold">
            You can't create project.
          </p>
          <p className="text-[16px]">
            Please contact your product manager to give access of atleast one
            project to continue.
          </p>
        </>
      )}
    </div>
  );
};

export default ProjectNotCreated;
