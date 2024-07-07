import React, { useEffect, useState } from "react";
import {  Drawer, Select, Space } from "antd";
import { Link } from "react-router-dom";

const teamOptions = [
  {
    label: "China",
    value: "china",
    emoji: "🇨🇳",
    desc: "China (中国)",
  },
  {
    label: "USA",
    value: "usa",
    emoji: "🇺🇸",
    desc: "USA (美国)",
  },
  {
    label: "Japan",
    value: "japan",
    emoji: "🇯🇵",
    desc: "Japan (日本)",
  },
  {
    label: "Korea",
    value: "korea",
    emoji: "🇰🇷",
    desc: "Korea (韩国)",
  },
];

const NewTaskDrawer = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    autosize();
    function autosize() {
      const textareas = document.querySelectorAll(".autosize");

      textareas.forEach((textarea) => {
        textarea.setAttribute("rows", 1);
        resize(textarea);
      });

      textareas.forEach((textarea) => {
        textarea.addEventListener("input", () => resize(textarea));
      });

      function resize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }
  }, []);

  const drawerTitle = (
    <div className="flex justify-between items-center w-full">
      <Link to="/task-details/12">
        <div className="btn-icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.41421 5H10V3H3V10H5V6.41421L9.29289 10.7071L10.7071 9.29289L6.41421 5ZM21 14H19V17.5858L14.7071 13.2929L13.2929 14.7071L17.5858 19H14V21H21V14Z"></path>
          </svg>
        </div>
      </Link>
      <div className="flex">
        <div className="btn-create ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
          </svg>
          New Task
        </div>
        <div className="btn-icons ml-3" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
  return (
    <Drawer title={drawerTitle} open={open}>
      <div className="">
        <textarea
          className="task-title-input autosize"
          placeholder="Task title here..."
          autoComplete="off"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <div className="task-row">
          <p>Assignee :</p>
          <Select
            mode="single"
            id="budget"
            className="task-input"
            placeholder="-"
            options={teamOptions}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </div>
        <div className="task-row">
          <p>Priority :</p>
          <Select
            mode="single"
            id="budget"
            className="task-input"
            placeholder="-"
            options={teamOptions}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </div>
        <div className="task-row">
          <p>Estimated SP :</p>
          <Select
            mode="single"
            id="budget"
            className="task-input"
            placeholder="-"
            options={teamOptions}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </div>
        <div className="task-row">
          <p>Due Date :</p>
          <Select
            mode="single"
            id="budget"
            className="task-input"
            placeholder="-"
            options={teamOptions}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </div>
        <div className="task-row">
          <p>Project :</p>
          <Select
            mode="single"
            id="budget"
            className="task-input"
            placeholder="-"
            options={teamOptions}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </div>
        <div className="task-row">
          <p>Guild :</p>
          <Select
            mode="single"
            id="budget"
            className="task-input"
            placeholder="-"
            options={teamOptions}
            optionRender={(option) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </div>
        <div className="">
          <p>Description :</p>
          <textarea
            rows={5}
            className="task-desc-input"
            placeholder="Add a description here..."
            autoComplete="off"
            autoFocus
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="">
        <div className="btn-create save">Save Task</div>
      </div>
    </Drawer>
  );
};

export default NewTaskDrawer;
