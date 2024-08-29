import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import TaskCounterBox from "../components/TaskCounterBox";
import ProjectOrTeamMemberBox from "../components/ProjectOrTeamMemberBox";

const TeamMemberDetails = () => {
  const [memberData, setMemberData] = useState(null);
  const { id } = useParams();

  const getUserMemberData = async () => {
    try {
      const resp = await api.get(`/users/member/${id}`);
      const { data } = resp?.data;
      setMemberData(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("memberData: ", memberData);

  useEffect(() => {
    getUserMemberData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Team Member</h2>
      </div>
      <div className="scrollable-container flex justify-between mt-4">
        <div className="w-[60%] border px-12 py-8 mt-2">
          <div className="flex items-center mb-10">
            <div className="w-36 h-36 rounded-full border">
              <img
                className="w-full h-full rounded-full object-cover"
                src={memberData?.profilePhoto}
                alt=""
              />
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
          <TaskCounterBox />
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetails;
