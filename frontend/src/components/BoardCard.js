import React from "react";
import Male1 from "../images/male1.png";
import { formatDate } from "../utils/formatDate";

const BoardCard = ({ task, showDrawer }) => {
  return (
    <div className="board-card" onClick={() => showDrawer(false)}>
      <div className="board-card-top">
        <div className="flex justify-between">
          <div className="date">{formatDate(task?.createdAt)}</div>
          <div className={`priority ${task?.priority}`}>{task?.priority}</div>
        </div>

        {task?.title ? (
          <h3 className="task-text">
            {task?.title.length > 80
              ? `${task?.title.slice(0, 80)}...`
              : task?.title}
          </h3>
        ) : (
          <h3 className="task-text">No Title</h3>
        )}

        <div className="project-owner mar-t-6 mb-1">
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
            Estimation:{" "}
            <span>{task?.estimation ? task?.estimation : "Not Assigned"}</span>
          </p>
        </div>

        <div className="guild-box mt-3">
          {task?.guild ? (
            <>
              <div className="circle"></div>
              {task?.guild}
            </>
          ) : (
            "-"
          )}
        </div>
      </div>

      <div className="board-card-bottom">
        {task?.assignee ? (
          <div className="table-assigned">
            <div className="profile">
              <img src={task?.assignee?.profilePhoto} alt="" />
            </div>
            <div className="fz-12">{task?.assignee?.fullName}</div>
          </div>
        ) : (
          <div className="table-assigned">
            <div className="fz-12">No Assignee</div>
          </div>
        )}

        <div className="flex">
          <div className="short-cut">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#5a5a5a"
            >
              <path d="M14 13.5V8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8V13.5C6 17.0899 8.91015 20 12.5 20C16.0899 20 19 17.0899 19 13.5V4H21V13.5C21 18.1944 17.1944 22 12.5 22C7.80558 22 4 18.1944 4 13.5V8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8V13.5C16 15.433 14.433 17 12.5 17C10.567 17 9 15.433 9 13.5V8H11V13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5Z"></path>
            </svg>
            <p>1</p>
          </div>
          <div className="short-cut ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#5a5a5a"
            >
              <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
            </svg>
            <p>{task?.comments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
