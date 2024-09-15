import { DatePicker, Select, Space } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import taskStore from "../stores/taskStore";
import { Field, Formik, Form } from "formik";
import { Progress } from "antd";
import dayjs from "dayjs";
import {
  estimationOptions,
  guildOptions,
  priorityOptions,
  progressOptions,
  statusOptions,
} from "../utils/taskOptionsData";
import CustomPrioritySelect from "../components/CustomPrioritySelect";
import { useParams, useNavigate } from "react-router-dom";
import AddLinkModal from "../components/AddLinkModal";
import api from "../services/api";
import userStore from "../stores/userStore";
import AttachmentModal from "../components/AttachmentModal";
import { getToken } from "../utils/getToken";
import { debounce } from "lodash";
import TaskLinkPreview from "../components/TaskLinkPreview";
import TaskAttachmentPreview from "../components/TaskAttachmentPreview";
import Loader from "../components/Loader";
import TaskCommentPreview from "../components/TaskCommentPreview";
import moment from "moment";
import { ProgressBar } from "react-loader-spinner";
import CustomAssigneeSelect from "../components/CustomAssigneeSelect";

const TaskDetails = () => {
  const [taskData, setTaskData] = useState({});
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [attachLoader, setAttachLoader] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [selectedStatusColor, setSelectedStatusColor] = useState("#3030fb");
  const [progressBar, setProgressBar] = useState(0);
  const { teamOptionsStore, dependenciesOptionsStore, taskDetails } =
    taskStore();

  const { userDetails } = userStore();
  const { id } = useParams();
  const navigate = useNavigate();

  const openLinkModal = () => {
    setIsLinkModalOpen(true);
  };

  const openAttachModal = () => {
    setIsAttachModalOpen(true);
  };

  const closeLinkModal = () => {
    setIsLinkModalOpen(false);
  };

  const closeAttachModal = () => {
    setIsAttachModalOpen(false);
  };

  const debouncedUpdate = useCallback(
    debounce(async (newValues) => {
      console.log("Updating values:", newValues);
      const body = {
        ...newValues,
        startDate: moment(newValues.startDate["$d"]).format("YYYY-MM-DD"),
        dueDate: moment(newValues.dueDate["$d"]).format("YYYY-MM-DD"),
      };
      await api.put(`/task/update/${taskDetails?._id}`, body);
    }, 2000),
    []
  );

  const handleChangeTaskStatus = async (value) => {
    const selectedOption = statusOptions?.find(
      (option) => option?.value === value
    );
    setSelectedStatusColor(selectedOption?.color);
    setTaskData((prevState) => ({
      ...prevState,
      status: value,
    }));
    await api.put(`/task/update/status/${taskData?._id}`, {
      status: value,
    });
    setRefreshTrigger((prev) => prev + 1);
  };

  const getTaskDetailsData = async () => {
    setLoader(true);
    try {
      const resp = await api.get(`/task/details/${id}`);
      const { data } = resp?.data;
      setTaskData(data);
      setProgressBar(data?.progress);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getTaskDetailsData();
  }, [id, refreshTrigger]);

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

  useEffect(() => {
    const currentStatus = statusOptions.find(
      (status) => status.value === taskData.status
    );
    setSelectedStatusColor(currentStatus?.color);
  }, [taskData]);

  const addCommentOnTask = async () => {
    try {
      await api.post(`/comment/${taskData?._id}`, {
        commentText: commentText,
      });
      setRefreshTrigger((prev) => prev + 1);
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLink = async (linkId) => {
    try {
      await api.delete(`task/${taskData?._id}/delete/link/${linkId}`);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAttachment = async (attachmentId) => {
    try {
      await api.delete(`/task/delete/attach/${taskData?._id}/${attachmentId}`);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const resp = await api.delete(
        `/comment/delete/${taskData?._id}/${commentId}`
      );
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (updatedText, commentId) => {
    try {
      await api.put(`/comment/update/${commentId}`, {
        updatedText,
      });
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitLink = async (values) => {
    try {
      await api.put(`task/upload/link/${taskData?._id}`, {
        link: values.link,
      });
      setRefreshTrigger((prev) => prev + 1);
      closeLinkModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttachedImage = async () => {
    setAttachLoader(true);
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("image", imageFile);

      const resp = await api.put(
        `/task/attach/image/${taskData?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefreshTrigger((prev) => prev + 1);
      setImageFile([]);
      setAttachLoader(false);
      setIsImageUploaded(false);
      closeAttachModal();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    setDeleteLoader(true);
    try {
      const resp = await api.delete(`/task/delete/${taskData?._id}`);
      console.log("delete resp: ", resp);
      navigate("/boards");
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoader(false);
    }
  };

  if (loader) {
    <Loader title="Task Details" />;
  }

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Task Details</h2>
        <div className="flex">
          <Select
            mode="single"
            name="status"
            className="btn-status mr-4"
            options={statusOptions}
            style={{ backgroundColor: selectedStatusColor }}
            optionRender={(option) => <Space>{option.data.label}</Space>}
            onChange={handleChangeTaskStatus}
            value={taskData?.status}
          />

          <div
            style={{ width: "90px" }}
            className="btn-create delete"
            onClick={deleteTask}
          >
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
        </div>
      </div>

      <div className="">
        <Formik
          enableReinitialize
          initialValues={{
            title: taskData?.title || "",
            assignee: taskData?.assignee?._id || "",
            status: taskData?.status || "",
            estimation: taskData?.estimation || "",
            priority: taskData?.priority || "",
            startDate: dayjs(taskData?.startDate) || null,
            dueDate: dayjs(taskData?.dueDate) || null,
            reportee: taskDetails?.reportee?._id || "",
            progress: taskData?.progress || 0,
            dependencies: taskData?.dependencies || [],
            guild: taskData?.guild || "",
            description: taskData?.description || "",
          }}
        >
          {({ submitForm, setFieldValue, values }) => {
            return (
              <Form className="scrollable-container flex justify-between mt-4">
                <div className="w-[60%]">
                  <Field
                    as="textarea"
                    name="title"
                    rows={3}
                    className="task-title-bg-input autosize"
                    placeholder="Task title here..."
                    autoComplete="off"
                    autoFocus
                    onChange={(e) => {
                      setFieldValue("title", e.target.value);
                      debouncedUpdate(values);
                    }}
                  />

                  <Progress
                    percent={progressBar}
                    strokeColor="#4040ff"
                    strokeLinecap="square"
                  />

                  <div className="mt-5">
                    <p className="font-semibold text-[15px]">Description :</p>
                    <Field
                      as="textarea"
                      name="description"
                      rows={5}
                      className="task-desc-input bg-transparent border-none"
                      placeholder="Add a description here..."
                      autoComplete="off"
                      onChange={(e) => {
                        setFieldValue("description", e.target.value);
                        debouncedUpdate(values);
                      }}
                    />
                  </div>

                  <div className="border-div"></div>

                  <TaskAttachmentPreview
                    taskData={taskData}
                    openAttachModal={openAttachModal}
                    handleDeleteAttachment={handleDeleteAttachment}
                  />

                  <div className="border-div"></div>

                  <TaskLinkPreview
                    taskData={taskData}
                    openLinkModal={openLinkModal}
                    handleDeleteLink={handleDeleteLink}
                  />

                  <div className="border-div"></div>

                  <TaskCommentPreview
                    taskData={taskData}
                    userDetails={userDetails}
                    commentText={commentText}
                    addCommentOnTask={addCommentOnTask}
                    setCommentText={setCommentText}
                    handleDeleteComment={handleDeleteComment}
                    handleUpdateComment={handleUpdateComment}
                  />
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
                      <CustomAssigneeSelect
                        name="assignee"
                        mode="single"
                        placeholder="-"
                        className="task-input"
                        options={teamOptionsStore}
                        value={values.assignee}
                        onChange={(value) => {
                          setFieldValue("assignee", value);
                          debouncedUpdate({ ...values, assignee: value });
                        }}
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
                        value={values.estimation}
                        optionRender={(option) => (
                          <Space>{option.data.label}</Space>
                        )}
                        onChange={(value) => {
                          setFieldValue("estimation", value);
                          debouncedUpdate({ ...values, estimation: value });
                        }}
                      />
                    </div>

                    <div className="task-row">
                      <p>Priority :</p>
                      <CustomPrioritySelect
                        name="priority"
                        placeholder="-"
                        className="task-input"
                        options={priorityOptions}
                        value={values.priority}
                        onChange={(value) => {
                          setFieldValue("priority", value);
                          debouncedUpdate({ ...values, priority: value });
                        }}
                      />
                    </div>

                    <div className="task-row">
                      <p>Start Date :</p>
                      <DatePicker
                        name="startDate"
                        className="task-input"
                        placeholder="-"
                        value={values.startDate}
                        onChange={(date) => {
                          setFieldValue("startDate", date);
                          debouncedUpdate({ ...values, startDate: date });
                        }}
                      />
                    </div>

                    <div className="task-row">
                      <p>Due Date :</p>
                      <DatePicker
                        name="dueDate"
                        className="task-input"
                        placeholder="-"
                        value={values.dueDate}
                        onChange={(date) => {
                          setFieldValue("dueDate", date);
                          debouncedUpdate({ ...values, dueDate: date });
                        }}
                      />
                    </div>

                    <div className="task-row">
                      <p>Reportee :</p>
                      <CustomAssigneeSelect
                        name="reportee"
                        mode="single"
                        placeholder="-"
                        className="task-input"
                        options={teamOptionsStore}
                        value={values.reportee}
                        onChange={(value) => {
                          setFieldValue("reportee", value);
                          debouncedUpdate({ ...values, reportee: value });
                        }}
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
                        value={values.progress}
                        optionRender={(option) => (
                          <Space>{option.data.label}</Space>
                        )}
                        onChange={(value) => {
                          setFieldValue("progress", value);
                          setProgressBar(value);
                          debouncedUpdate({ ...values, progress: value });
                        }}
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
                        value={values.guild}
                        optionRender={(option) => (
                          <Space>{option.data.label}</Space>
                        )}
                        onChange={(value) => {
                          setFieldValue("guild", value);
                          debouncedUpdate({ ...values, guild: value });
                        }}
                      />
                    </div>

                    <div className="task-row">
                      <p>Dependencies :</p>
                      <Select
                        mode="multiple"
                        name="dependencies"
                        className="task-input"
                        placeholder="-"
                        options={dependenciesOptionsStore}
                        value={values.dependencies}
                        optionRender={(option) => (
                          <Space>{option.data.label}</Space>
                        )}
                        onChange={(value) => {
                          setFieldValue("dependencies", value);
                          debouncedUpdate({ ...values, dependencies: value });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <AddLinkModal
        isOpen={isLinkModalOpen}
        closeModal={closeLinkModal}
        handleSubmitLink={handleSubmitLink}
      />

      <AttachmentModal
        setImageFile={setImageFile}
        isOpen={isAttachModalOpen}
        closeModal={closeAttachModal}
        handleAttachedImage={handleAttachedImage}
        attachLoader={attachLoader}
        isImageUploaded={isImageUploaded}
        setIsImageUploaded={setIsImageUploaded}
      />
    </div>
  );
};

export default TaskDetails;
