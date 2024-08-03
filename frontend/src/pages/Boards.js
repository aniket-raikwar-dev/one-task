import React, { useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import BoardCard from "../components/BoardCard";
import SearchBar from "../components/SearchBar";
import NewTaskDrawer from "../components/NewTaskDrawer";
import api from "../api";
import projectStore from "../stores/projectStore";

const Boards = () => {
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState([]);
  const [isNewTask, setIsNewTask] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [managerId, setManagerId] = useState("");
  const { selectedProjectId } = projectStore();

  const showDrawer = (boolean) => {
    setOpen(true);
    setIsNewTask(boolean);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getTasksDataByProject = async () => {
    try {
      const resp = await api.get(`/task/${selectedProjectId}`);
      const { data } = resp?.data;
      console.log("task data: ", data);
      setTaskData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedProjectTeamsData = async () => {
    try {
      const resp = await api.get(`/project/details/${selectedProjectId}`);
      const { data } = resp?.data;
      console.log("data: ", data);
      setManagerId(data?.manager?.id);
      const teamsData = formattedTeamMemberData(data?.teamMembers);
      setTeamOptions(teamsData);
      console.log("teamsData: ", teamsData);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTeamMemberData = (data) => {
    const formattedTeam = data?.map((user) => ({
      value: user._id,
      label: user.fullName,
      profile: user.profilePhoto,
    }));

    return formattedTeam;
  };

  useEffect(() => {
    getTasksDataByProject();
    getSelectedProjectTeamsData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Boards</h2>
        <div className="flex">
          <SearchBar />
          <div className="btn-create ml-3" onClick={() => showDrawer(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
            New Task
          </div>
        </div>
      </div>
      <div className="board-container">
        <div className="board-box">
          <div className="flex items-center border-b pb-2">
            <div className="board-circle to-do"></div>
            <h2 className="font-medium">
              To Do <span className="board-num">(4)</span>
            </h2>
          </div>
          <div className="draggable-area">
            {taskData
              ?.filter((task) => task.status === "To Do")
              .map((task) => (
                <BoardCard task={task} showDrawer={showDrawer} />
              ))}
          </div>
        </div>
        <div className="board-box">
          <div className="flex items-center border-b pb-2">
            <div className="board-circle in-prog"></div>
            <h2 className="font-medium">
              In Progress <span className="board-num">(5)</span>
            </h2>
          </div>
          <div className="draggable-area">
            {taskData
              ?.filter((task) => task.status === "In Progress")
              .map((task) => (
                <BoardCard task={task} showDrawer={showDrawer} />
              ))}
          </div>
        </div>
        <div className="board-box">
          <div className="flex items-center border-b pb-2">
            <div className="board-circle testing"></div>
            <h2 className="font-medium">
              In Review <span className="board-num">(2)</span>
            </h2>
          </div>
          <div className="draggable-area">
            {taskData
              ?.filter((task) => task.status === "In Review")
              .map((task) => (
                <BoardCard task={task} showDrawer={showDrawer} />
              ))}
          </div>
        </div>

        <div className="board-box">
          <div className="flex items-center border-b pb-2">
            <div className="board-circle done"></div>
            <h2 className="font-medium">
              Done <span className="board-num">(1)</span>
            </h2>
          </div>
          <div className="draggable-area">
            {taskData
              ?.filter((task) => task.status === "Done")
              .map((task) => (
                <BoardCard task={task} showDrawer={showDrawer} />
              ))}
          </div>
        </div>
      </div>
      <NewTaskDrawer
        open={open}
        isNewTask={isNewTask}
        onClose={onClose}
        teamOptions={teamOptions}
        projectId={selectedProjectId}
        managerId={managerId}
      />
    </div>
  );
};

export default Boards;
