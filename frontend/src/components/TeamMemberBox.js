import React from 'react'

const TeamMemberBox = ({ projectData }) => {
  return (
    <div
      style={{ width: "100%", marginTop: "0px" }}
      className="project-member-box"
    >
      <div className="head">
        Team Members
        <div className="ovr-title-right">
          {projectData?.teamMembers?.length}
        </div>
      </div>
      <div className="team-project-box">
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
                  <p className="text-xs text-[#3030fb]">{member?.techRole}</p>
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
      </div>
    </div>
  );
}

export default TeamMemberBox