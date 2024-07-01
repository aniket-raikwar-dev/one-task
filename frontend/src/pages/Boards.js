import React from "react";
import BoardCard from "../components/BoardCard";
import SearchBar from "../components/SearchBar";

const Boards = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Boards</h2>
        <div className="flex">
          <SearchBar />
          <div className="btn-create ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000"
            >
              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
            New Task
          </div>
        </div>
      </div>
      <div className="board-container scrollable-container">
        <div className="board-box">
          <div className="flex items-center border-b pb-2 mb-4">
            <div className="board-circle to-do"></div>
            <h2 className="font-medium">
              To Do <span className="board-num">(4)</span>
            </h2>
          </div>
          <div className="draggable-area">
            <BoardCard />
          </div>
        </div>
        <div className="board-box">
          <div className="flex items-center border-b pb-2">
            <div className="board-circle in-prog"></div>
            <h2 className="font-medium">
              In Progress <span className="board-num">(5)</span>
            </h2>
          </div>
        </div>
        <div className="board-box">
          <div className="flex items-center border-b pb-2">
            <div className="board-circle testing"></div>
            <h2 className="font-medium">
              In Review <span className="board-num">(2)</span>
            </h2>
          </div>
        </div>

        <div className="board-box">
          <div className="flex items-center border-b pb-2">
            <div className="board-circle done"></div>
            <h2 className="font-medium">
              Done <span className="board-num">(1)</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
