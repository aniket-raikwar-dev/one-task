import React, { useEffect, useState } from "react";
import OverviewCard from "../components/OverviewCard";
import TimelineView from "../components/TimelineView";
import projectStore from "../stores/projectStore";
import ProjectNotCreated from "../components/ProjectNotCreated";
import ProjectNotSelected from "../components/ProjectNotSelected";
import api from "../services/api";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import taskStore from "../stores/taskStore";
import { formatProfileName } from "../utils/formatProfileName";

const Overview = () => {
  const [timelineView, setTimelineView] = useState("Day");
  const [allTasks, setAllTasks] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);


  const { isProjectSelected, projectStoreList, selectedProjectId } =
    projectStore();
  const { setTaskDetails } = taskStore();
  const navigate = useNavigate();

  const toggleTimelineView = (viewType = "Day") => {
    setTimelineView(viewType);
  };

  const getTasksBySelectedProject = async () => {
    try {
      const resp = await api.get(`/task/${selectedProjectId}`);
      const { data } = resp?.data;

      const todoTask = data?.filter((task) => task.status === "To Do");
      const inProgressTask = data?.filter(
        (task) => task.status === "In Progress"
      );

      const formattedInProgressData = inProgressTask.map((item, index) => ({
        id: item._id,
        key: index,
        title: item.title,
        priority: item.priority,
        estimation: item.estimation,
        profilePhoto: item.assignee.profilePhoto,
        name: item.assignee.fullName,
        firstName: item.assignee.firstName,
        lastName: item.assignee.lastName,
      }));

      setAllTasks(data);
      setToDoTasks(todoTask);
      setInProgressTasks(formattedInProgressData);
    } catch (error) {
      console.log(error);
    }
  };


  const redirectToTaskDetail = (id) => {
    const task = allTasks.find((task) => task?._id === id);
    setTaskDetails(task);
    navigate(`/task-details/${id}`);
  };

  useEffect(() => {
    getTasksBySelectedProject();
  }, []);

  const columns = [
    {
      title: "Task",
      dataIndex: "title",
      key: "task",
      render: (text, render) => (
        <div
          className="cursor-pointer hover:text-[#3030fb]"
          onClick={() => redirectToTaskDetail(render.id)}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Assigned",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="table-assigned">
          <div className="profile">
            {record?.profilePhoto ? (
              <img src={record.profilePhoto} alt="" />
            ) : (
              <p>{`${record.firstName[0]}${record.lastName[0]}`}</p>
            )}
          </div>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => <div className={`table-priority ${text}`}>{text}</div>,
    },
    {
      title: "Estimation",
      dataIndex: "estimation",
      key: "estimation",
    },
  ];

  return (
    <div>
      <div>
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="page-title">Overview</h2>
          {isProjectSelected && (
            <div className="toggle-timeline">
              <div
                onClick={() => toggleTimelineView("Half Day")}
                className={timelineView === "Half Day" ? "selected" : ""}
              >
                Half Day
              </div>
              <div
                onClick={() => toggleTimelineView("Day")}
                className={timelineView === "Day" ? "selected" : ""}
              >
                Day
              </div>
              <div
                onClick={() => toggleTimelineView("Week")}
                className={timelineView === "Week" ? "selected" : ""}
              >
                Week
              </div>
            </div>
          )}
        </div>

        {projectStoreList.length === 0 ? (
          <ProjectNotCreated />
        ) : !isProjectSelected ? (
          <ProjectNotSelected />
        ) : (
          <div className="scrollable-container">
            <TimelineView timelineView={timelineView} isSmallView={true} />
            <div className="flex justify-between mt-4">
              <div className="card-container border">
                <div className="flex justify-between p-3 border-b">
                  <h2 className="ovr-title">To Start</h2>
                  <div className="ovr-title-right">
                    {toDoTasks?.length || 0}
                  </div>
                </div>
                <div className="ovr-card-container px-3">
                  {toDoTasks?.map((task) => (
                    <OverviewCard
                      task={task}
                      redirectToTaskDetail={redirectToTaskDetail}
                    />
                  ))}
                </div>
              </div>
              <div className="ovr-table-container border">
                <div className="flex justify-between p-3 border-b">
                  <h2 className="ovr-title">In Progress</h2>
                  <div className="ovr-title-right">
                    {inProgressTasks?.length || 0}
                  </div>
                </div>
                <Table columns={columns} dataSource={inProgressTasks} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
