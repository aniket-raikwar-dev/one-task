import React, { useEffect } from "react";
import projectStore from "../stores/projectStore";
import { useNavigate } from "react-router-dom";

const TaskCounterBox = ({ projectData }) => {
  const { setSelectedProjectId } = projectStore();
  const navigate = useNavigate();

  const countTaskByStatus = (statusType) => {
    return (
      projectData?.tasks?.filter((task) => task.status === statusType).length ||
      0
    );
  };

  const showSelectedProjectTasks = () => {
    // setSelectedProjectId(projectData?._id);
    // navigate("/boards");
  };
  useEffect(() => {
    console.log("projectData: ", projectData);
  }, [projectData]);

  return (
    <div
      style={{ width: "100%", marginTop: "30px" }}
      className="task-detail-box"
    >
      <div className="head">
        Tasks
        <div className="ovr-title-right">{projectData?.tasks?.length}</div>
      </div>

      <div className="project-detail-task">
        <div className="task-box">
          <div className="board-circle to-do"></div>
          <h2 className="font-medium">
            To Do{" "}
            <span className="board-num">({countTaskByStatus("To Do")})</span>
          </h2>
        </div>
        <div className="task-box">
          <div className="board-circle in-progress"></div>
          <h2 className="font-medium">
            In Progress{" "}
            <span className="board-num">
              ({countTaskByStatus("In Progress")})
            </span>
          </h2>
        </div>
        <div className="task-box">
          <div className="board-circle in-review"></div>
          <h2 className="font-medium">
            In Review{" "}
            <span className="board-num">
              ({countTaskByStatus("In Review")})
            </span>
          </h2>
        </div>
        <div className="task-box">
          <div className="board-circle done"></div>
          <h2 className="font-medium">
            Done{" "}
            <span className="board-num">({countTaskByStatus("Done")})</span>
          </h2>
        </div>
      </div>

      <div className="h-14 flex justify-center items-center">
        <div
          onClick={showSelectedProjectTasks}
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
        </div>
      </div>
    </div>
  );
};

export default TaskCounterBox;
