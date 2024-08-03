import React, { useEffect, useState } from "react";
import { DatePicker, Drawer, Select, Space } from "antd";
import { Link } from "react-router-dom";
import {
  statusOptions,
  priorityOptions,
  estimationOptions,
  guildOptions,
} from "../utils/taskOptionsData";
import moment from "moment";
import CustomPrioritySelect from "./CustomPrioritySelect";
import CustomTeamSelect from "./CustomTeamSelect";
import { Field, Formik, Form } from "formik";
import api from "../api";

const NewTaskDrawer = ({
  open,
  isNewTask,
  onClose,
  teamOptions,
  projectId,
  managerId,
}) => {
  useEffect(() => {
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

    autosize();
  }, []);

  const handleDueDate = (value, setFieldValue) => {
    setFieldValue("dueDate", moment(new Date(value)).format("YYYY-MM-DD"));
  };

  const handleSubmit = async (values) => {
    try {
      const resp = await api.post("/task/create", {
        ...values,
        managerId,
        projectId,
      });
      console.log("task create: ", resp);
    } catch (error) {
      console.log(error);
    }
    console.log("task values: ", values);
  };
  const drawerTitle = (
    <div className="flex justify-between items-center w-full">
      {isNewTask ? (
        <div></div>
      ) : (
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
      )}

      <div className="flex">
        {!isNewTask && (
          <div className="btn-create ml-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
            </svg>
            Delete
          </div>
        )}

        <div className="btn-create ml-3" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          Back
        </div>
      </div>
    </div>
  );

  return (
    <Drawer title={drawerTitle} open={open}>
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
          assignee: "",
          status: "",
          estimation: "",
          dueDate: null,
          priority: "",
          guild: "",
          description: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="">
              <Field
                as="textarea"
                name="title"
                className="task-title-input autosize w-full"
                placeholder="Task title here..."
                autoComplete="off"
                autoFocus
              />
              <div className="task-row mt-1">
                <p>Assignee :</p>
                <CustomTeamSelect
                  id="assignee"
                  name="assignee"
                  mode="single"
                  placeholder="-"
                  className="task-input"
                  options={teamOptions}
                  onChange={(value) => {
                    setFieldValue("assignee", value);
                  }}
                />
              </div>
              <div className="task-row mt-1">
                <p>Status :</p>
                <Select
                  mode="single"
                  id="status"
                  name="status"
                  className="task-input"
                  placeholder="-"
                  options={statusOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("status", value);
                  }}
                />
              </div>

              <div className="task-row">
                <p>Estimated (SP) :</p>
                <Select
                  mode="single"
                  name="estimation"
                  id="estimation"
                  className="task-input"
                  placeholder="-"
                  options={estimationOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("estimation", value);
                  }}
                />
              </div>
              <div className="task-row">
                <p>Due Date :</p>
                <DatePicker
                  name="dueDate"
                  id="dueDate"
                  className="task-input"
                  placeholder="-"
                  onChange={(value) => handleDueDate(value, setFieldValue)}
                />
              </div>

              <div className="task-row">
                <p>Priority :</p>
                <CustomPrioritySelect
                  name="priority"
                  placeholder="-"
                  className="task-input"
                  options={priorityOptions}
                  onChange={(value) => {
                    setFieldValue("priority", value);
                  }}
                />
              </div>

              <div className="task-row">
                <p>Guild :</p>
                <Select
                  name="guild"
                  mode="single"
                  id="guild"
                  className="task-input"
                  placeholder="-"
                  options={guildOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("guild", value);
                  }}
                />
              </div>
              <div className="">
                <p>Description :</p>
                <Field
                  as="textarea"
                  name="description"
                  rows={5}
                  className="task-desc-input w-full"
                  placeholder="Add a description here..."
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="btn-create save w-full"
                disabled={isSubmitting}
              >
                Save Task
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default NewTaskDrawer;
