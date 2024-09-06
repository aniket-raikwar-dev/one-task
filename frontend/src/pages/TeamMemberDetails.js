import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useParams, Link } from "react-router-dom";
import TaskCounterBox from "../components/TaskCounterBox";
import ProjectOrTeamMemberBox from "../components/ProjectOrTeamMemberBox";
import userStore from "../stores/userStore";
import { formatProfileName } from "../utils/formatProfileName";

const TeamMemberDetails = () => {
  const [memberData, setMemberData] = useState(null);
  const [userTaskData, setUserTaskData] = useState({});
  const { userDetails } = userStore();
  const { id } = useParams();

  const getUserMemberData = async () => {
    try {
      const resp = await api.get(`/users/member/${id}`);
      const { data } = resp?.data;
      setMemberData(data);
      countUserTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const countUserTask = (data) => {
    const tasks = data?.projects?.reduce((acc, project) => {
      const userTasks = project?.tasks?.filter(
        (task) => task?.assignee === data?._id
      );
      return acc.concat(userTasks);
    }, []);

    setUserTaskData({ tasks });
  };

  console.log("memberData: ", memberData);
  console.log("setUserTaskData: ", userTaskData);

  useEffect(() => {
    getUserMemberData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Team Member</h2>

        {userDetails?._id === memberData?._id && (
          <Link
            to="/edit-user-details"
            style={{ width: "90px" }}
            className="btn-create"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
            </svg>
            Edit
          </Link>
        )}
      </div>
      <div className="scrollable-container flex justify-between mt-4">
        <div className="w-[60%] border px-12 py-8 mt-2">
          <div className="flex items-center mb-10">
            <div className="flex items-center justify-center bg-[#3030fb] text-[48px] text-white w-36 h-36 rounded-full border">
              {memberData?.profilePhoto ? (
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={memberData?.profilePhoto}
                  alt=""
                />
              ) : (
                <p>{formatProfileName(userDetails)}</p>
              )}
            </div>
            <div className="ml-20">
              <h3 className="text-[42px] font-semibold">
                {memberData?.fullName}
              </h3>
              <h5 className="text-md font-semibold text-[#3030fb] tracking-widest uppercase">
                {memberData?.techRole}
              </h5>
            </div>
          </div>

          <div className="flex justify-between border-t py-10">
            <div className="w-2/3">
              <p>Email ID:</p>
              <h3 className="font-semibold">{memberData?.email}</h3>
            </div>
            <div className="w-2/4">
              <p>Phone No.:</p>
              <h3 className="font-semibold">{memberData?.phone}</h3>
            </div>
          </div>
          <div className="flex justify-between border-t py-10">
            <div className="w-2/3">
              <p>Joined In:</p>
              <h3 className="font-semibold">31, August 2018</h3>
            </div>
            <div className="w-2/4">
              <p>Location:</p>
              <h3 className="font-semibold">{memberData?.location}</h3>
            </div>
          </div>
          <div className="flex justify-between border-t py-10">
            <div className="w-2/3">
              <p>Task Assigned:</p>
              <h3 className="font-semibold">17</h3>
            </div>
            <div className="w-2/4">
              <p>Email ID:</p>
              <h3 className="font-semibold">richiso@onetask.com</h3>
            </div>
          </div>
        </div>
        <div className="w-[32%]">
          <ProjectOrTeamMemberBox
            title={"Projects Assigned"}
            isProjectBox={true}
            data={memberData}
          />
          <TaskCounterBox taskData={userTaskData} />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetails;
