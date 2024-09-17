import React from "react";

const UserProfilePicCircle = ({ project }) => {
  const maxVisibleMembers = 4; // Show up to 3 members and 1 circle for the rest

  return (
    <div>
      <p className="card-top-text">Teams:</p>
      <div className="flex mt-1">
        {/* Check if the team has more than maxVisibleMembers */}
        {project?.teamMembers?.length > maxVisibleMembers ? (
          <>
            {project?.teamMembers
              ?.slice(0, maxVisibleMembers)
              .map((member, index) => (
                <div
                  key={index}
                  className={index === 0 ? "user-circle" : "user-circle-rest"}
                >
                  {member?.profilePhoto ? (
                    <img src={member?.profilePhoto} alt="profile" />
                  ) : (
                    <p>{`${member?.firstName[0]}${member?.lastName[0]}`}</p>
                  )}
                </div>
              ))}
            {/* Circle for remaining team members */}
            <div className="user-circle-rest">
              <p>+{project?.teamMembers.length - maxVisibleMembers}</p>
            </div>
          </>
        ) : (
          // Display all members if there are 4 or fewer
          project?.teamMembers?.map((member, index) => (
            <div
              key={index}
              className={index === 0 ? "user-circle" : "user-circle-rest"}
            >
              {member?.profilePhoto ? (
                <img src={member?.profilePhoto} alt="profile" />
              ) : (
                <p>{`${member?.firstName[0]}${member?.lastName[0]}`}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfilePicCircle;
