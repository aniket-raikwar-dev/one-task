import React, { useEffect, useState } from "react";
import { DatePicker, Drawer, Select, Space } from "antd";
import { Link } from "react-router-dom";
import Loader from "../images/loader.gif";
import dayjs from "dayjs";
import {
  statusOptions,
  priorityOptions,
  estimationOptions,
  guildOptions,
  progressOptions,
} from "../utils/taskOptionsData";
import moment from "moment";
import CustomPrioritySelect from "./CustomPrioritySelect";
import CustomTeamSelect from "./CustomTeamSelect";
import { Field, Formik, Form } from "formik";
import api from "../services/api";
import taskStore from "../stores/taskStore";
import CustomAssigneeSelect from "./CustomAssigneeSelect";

const NewTaskDrawer = ({
  open,
  isNewTask,
  onClose,
  teamOptions,
  projectId,
  managerId,
  dependenciesOptions,
  onTaskUpdate,
}) => {
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const { taskDetails } = taskStore();

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

  // console.log("task detail: ", taskDetails);

  const deleteTask = async () => {
    setDeleteLoader(true);
    try {
      const resp = await api.delete(`/task/delete/${taskDetails?._id}`);
      console.log("delete resp: ", resp);
      onTaskUpdate();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoader(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoader(true);
    const body = {
      ...values,
      startDate: moment(values.startDate["$d"]).format("YYYY-MM-DD"),
      dueDate: moment(values.dueDate["$d"]).format("YYYY-MM-DD"),
      managerId,
      projectId,
    };
    try {
      console.log("bodies: ", body);
      if (isNewTask) {
        const resp = await api.post("/task/create", body);
      } else {
        const resp = await api.put(`/task/update/${taskDetails?._id}`, body);
      }
      onTaskUpdate();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const drawerTitle = (
    <div className="flex justify-between items-center w-full">
      {isNewTask ? (
        <div></div>
      ) : (
        <Link to={`/task-details/${taskDetails?._id}`}>
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
          <div className="btn-create delete ml-3" onClick={deleteTask}>
            {deleteLoader ? (
              <img className="w-10" src={Loader} alt="" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
                </svg>
                Delete
              </>
            )}
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
          title: isNewTask ? "" : taskDetails?.title || "",
          assignee: isNewTask ? undefined : taskDetails?.assignee?._id || "",
          status: isNewTask ? undefined : taskDetails?.status || "",
          estimation: isNewTask ? undefined : taskDetails?.estimation || "",
          startDate: isNewTask ? null : dayjs(taskDetails?.startDate),
          dueDate: isNewTask ? null : dayjs(taskDetails?.dueDate),
          priority: isNewTask ? undefined : taskDetails?.priority || "",
          progress: isNewTask ? 0 : taskDetails?.progress || 0,
          dependencies: isNewTask ? [] : taskDetails?.dependencies || [],
          guild: isNewTask ? undefined : taskDetails?.guild || "",
          description: isNewTask ? undefined : taskDetails?.description || "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="flex flex-col justify-between h-full">
            <div className="drawer-input-box">
              <Field
                as="textarea"
                name="title"
                className="task-title-input autosize w-full"
                placeholder="Task title here..."
                autoComplete="off"
                rows={1}
                autoFocus
              />
              <div className="task-row mt-1">
                <p>Assignee :</p>
                <CustomAssigneeSelect
                  name="assignee"
                  mode="single"
                  placeholder="-"
                  className="task-input"
                  options={teamOptions}
                  onChange={(value) => {
                    setFieldValue("assignee", value);
                  }}
                  value={values.assignee}
                />
              </div>
              <div className="task-row mt-1">
                <p>Status :</p>
                <Select
                  mode="single"
                  name="status"
                  className="task-input"
                  placeholder="-"
                  options={statusOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("status", value);
                  }}
                  value={values.status}
                />
              </div>

              <div className="task-row">
                <p>Estimated (SP) :</p>
                <Select
                  mode="single"
                  name="estimation"
                  className="task-input"
                  placeholder="-"
                  options={estimationOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("estimation", value);
                  }}
                  value={values.estimation}
                />
              </div>

              <div className="task-row">
                <p>Start Date :</p>
                <DatePicker
                  name="startDate"
                  className="task-input"
                  placeholder="-"
                  value={values.startDate}
                  onChange={(date) => setFieldValue("startDate", date)}
                />
              </div>
              <div className="task-row">
                <p>Due Date :</p>
                <DatePicker
                  name="dueDate"
                  className="task-input"
                  placeholder="-"
                  value={values.dueDate}
                  onChange={(date) => setFieldValue("dueDate", date)}
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
                  value={values.priority}
                />
              </div>

              <div className="task-row">
                <p>Progress :</p>
                <Select
                  mode="single"
                  name="progress"
                  className="task-input"
                  placeholder="-"
                  options={progressOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("progress", value);
                  }}
                  value={values.progress}
                />
              </div>

              <div className="task-row">
                <p>Dependencies :</p>
                <Select
                  mode="multiple"
                  name="dependencies"
                  className="task-input"
                  placeholder="-"
                  options={dependenciesOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("dependencies", value);
                  }}
                  value={values.dependencies}
                />
              </div>

              <div className="task-row">
                <p>Guild :</p>
                <Select
                  name="guild"
                  mode="single"
                  className="task-input"
                  placeholder="-"
                  options={guildOptions}
                  optionRender={(option) => <Space>{option.data.label}</Space>}
                  onChange={(value) => {
                    setFieldValue("guild", value);
                  }}
                  value={values.guild}
                />
              </div>
              <div className="">
                <p>Description :</p>
                <Field
                  as="textarea"
                  name="description"
                  rows={2}
                  className="task-desc-input w-full"
                  placeholder="Add a description here..."
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn-create save w-full"
                disabled={isSubmitting}
              >
                {loader ? (
                  <img className="w-10" src={Loader} alt="" />
                ) : isNewTask ? (
                  "Save Task"
                ) : (
                  "Update Task"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default NewTaskDrawer;
