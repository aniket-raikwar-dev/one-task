import React from "react";
import { Link } from "react-router-dom";

const ProjectOrTeamMemberBox = ({ isProjectBox, data, title }) => {



  return (
    <div
      style={{ width: "100%", marginTop: "0px" }}
      className="project-member-box"
    >
      <div className="head">
        {title}
        <div className="ovr-title-right">
          {isProjectBox ? data?.projects?.length : data?.teamMembers?.length}
        </div>
      </div>
      <div className="team-project-box">
        {isProjectBox
          ? data?.projects?.map((project) => (
              <div
                key={project?._id}
                className="py-2.5 flex justify-between w-full"
              >
                <div className="flex">
                  <div className="project-round-img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="rgba(64,64,255,1)"
                    >
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[13px]">{project?.name}</p>
                    <p className="text-xs  font-semibold mt-0.5">
                      PM:{" "}
                      <span className="text-[#3030fb]">
                        {project?.manager?.fullName}
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/project-details/${project?._id}`}
                  className="btn-create justify-between"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                  </svg>
                  <p>View</p>
                </Link>
              </div>
            ))
          : data?.teamMembers?.map((member) => (
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
                  <Link
                    to={`/team-member/${member?._id}`}
                    className="btn-create justify-between"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                    </svg>
                    <p>View</p>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProjectOrTeamMemberBox;
