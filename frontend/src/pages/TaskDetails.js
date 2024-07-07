import { Select, Space } from "antd";
import React, { useEffect, useState } from "react";

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


const TaskDetails = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


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


  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Task Details</h2>
      </div>

      <div className="scrollable-container flex justify-between mt-4">
        <div className="w-[60%]">
          <textarea
            rows={3}
            className="task-title-bg-input autosize"
            placeholder="Task title here..."
            autoComplete="off"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>

          <div className="flex mt-2">
            <div className="btn-create back-trans">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
              </svg>
              Like
            </div>
            <div className="btn-create back-trans ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 13.5V8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8V13.5C6 17.0899 8.91015 20 12.5 20C16.0899 20 19 17.0899 19 13.5V4H21V13.5C21 18.1944 17.1944 22 12.5 22C7.80558 22 4 18.1944 4 13.5V8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8V13.5C16 15.433 14.433 17 12.5 17C10.567 17 9 15.433 9 13.5V8H11V13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5Z"></path>
              </svg>
              Attachment
            </div>
            <div className="btn-create back-trans ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path>
              </svg>
              Link
            </div>
            <div className="btn-create back-trans ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
              </svg>
              Comments
            </div>
            <div className="btn-create back-trans ml-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
              </svg>
              Delete
            </div>
          </div>

          <div className="mt-10">
            <p className="font-bold">Description :</p>
            <textarea
              rows={7}
              className="task-desc-input bg-transparent border-none"
              placeholder="Add a description here..."
              autoComplete="off"
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-2">
            <p className="font-bold">Comments :</p>
            <div className="flex items-center mt-5">
              <div className="comment-profile"></div>
              <input
                type="text"
                className="comment-input"
                placeholder="Add a comment here"
              />
              <div className="btn-create back-trans">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.5998 8.00033H21C22.1046 8.00033 23 8.89576 23 10.0003V12.1047C23 12.3659 22.9488 12.6246 22.8494 12.8662L19.755 20.3811C19.6007 20.7558 19.2355 21.0003 18.8303 21.0003H2C1.44772 21.0003 1 20.5526 1 20.0003V10.0003C1 9.44804 1.44772 9.00033 2 9.00033H5.48184C5.80677 9.00033 6.11143 8.84246 6.29881 8.57701L11.7522 0.851355C11.8947 0.649486 12.1633 0.581978 12.3843 0.692483L14.1984 1.59951C15.25 2.12534 15.7931 3.31292 15.5031 4.45235L14.5998 8.00033ZM7 10.5878V19.0003H18.1606L21 12.1047V10.0003H14.5998C13.2951 10.0003 12.3398 8.77128 12.6616 7.50691L13.5649 3.95894C13.6229 3.73105 13.5143 3.49353 13.3039 3.38837L12.6428 3.0578L7.93275 9.73038C7.68285 10.0844 7.36341 10.3746 7 10.5878ZM5 11.0003H3V19.0003H5V11.0003Z"></path>
                </svg>
                Send
              </div>
            </div>

            <div className="flex items-center mt-5">
              <div className="comment-profile"></div>
              <div className="ml-3">
                <p className="font-bold">Korey Anderson</p>
                <p>I have one doubt, can I ask you in meeting</p>
              </div>
            </div>
            <div className="flex items-center mt-5">
              <div className="comment-profile"></div>
              <div className="ml-3">
                <p className="font-bold">Mancey Loius</p>
                <p>I have one doubt, can I ask you in meeting</p>
              </div>
            </div>
            <div className="flex items-center mt-5">
              <div className="comment-profile"></div>
              <div className="ml-3">
                <p className="font-bold">Lawre Benson</p>
                <p>I have one doubt, can I ask you in meeting</p>
              </div>
            </div>
          </div>
        </div>

        <div className="task-detail-box">
          <div className="head">
            Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"></path>
            </svg>
          </div>
          <div className="body">
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
              <p>Reporter :</p>
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
              <p>Start Date :</p>
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
            <div className="task-row">
              <p>Labels :</p>
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
              <p>Product Manager :</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
