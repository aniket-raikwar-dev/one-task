import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, Space, DatePicker } from "antd";
import api from "../services/api";
import userStore from "../stores/userStore";
import projectStore from "../stores/projectStore";
import moment from "moment";
import {
  budgetOptions,
  projectOptions,
  statusOptions,
} from "../utils/projectOptionsData";
import Loader from "../images/loader.gif";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const CreateNewProject = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [projectData, setProjectData] = useState([]);

  const { userDetails } = userStore();
  const { setProjectDetails } = projectStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditMode = location.pathname.split("/")[1] === "edit-project";

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true);
      await getTeamsMembersData();
      if (isEditMode) {
        await getProjectDetailsData();
      }
      // setIsLoading(false);
    };
    fetchData();
  }, [isEditMode, id]);

  const getProjectDetailsData = async () => {
    try {
      const resp = await api.get(`/project/details/${id}`);
      console.log("project detail : ", resp);
      const { data } = resp?.data;
      setProjectData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamsMembersData = async () => {
    try {
      const resp = await api.get("/users/all");
      const { data } = resp?.data;

      const filterData = data.filter(
        (item) => item._id !== userDetails._id && !item.isManager
      );

      const formattedData = formattedTeamMemberData(filterData);
      setTeamMembers(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTeamMemberData = (data) => {
    if (isEditMode) {
      data = data?.filter((member) => member._id !== projectData?.manager?._id);
    }
    const formattedTeam = data?.map((user) => ({
      value: user._id,
      label: user.fullName,
      profile: user.profilePhoto,
    }));

    return formattedTeam;
  };

  console.log("projectData: ", projectData);

  const handleTeamChange = (value, setFieldValue) => {
    setFieldValue("teamMembers", value);
  };

  const handleProjectTypeChange = (value, setFieldValue) => {
    setFieldValue("projectType", value);
  };
  const handleProjectStatusChange = (value, setFieldValue) => {
    setFieldValue("status", value);
  };

  const handleBudgetChange = (value, setFieldValue) => {
    setFieldValue("budget", value);
  };

  const handleStartDateChange = (value, setFieldValue) => {
    setFieldValue("startDate", moment(new Date(value)).format("YYYY-MM-DD"));
  };

  const handleDeadlineChange = (value, setFieldValue) => {
    setFieldValue("deadline", moment(new Date(value)).format("YYYY-MM-DD"));
  };

  const handleSubmit = async (values) => {
    setLoader(true);
    try {
      const body = {
        name: values.projectName,
        teamMembers: [...values.teamMembers, userDetails?._id],
        manager: values.projectManager,
        owner: values.projectOwner,
        description: values.description,
        status: values.status,
        projectType: values.projectType,
        budget: values.budget,
        startDate: values.startDate,
        deadline: values.deadline,
      };
      console.log("bodies: ", body);
      if (isEditMode) {
        const resp = await api.put(`/project/update/${id}`, body);
      } else {
        const resp = await api.post("/project/create", body);
      }
      // const resp = await api.post("/project/create", body);
      // const { data } = resp?.data;
      // setProjectDetails(data);
      setTimeout(() => {
        setLoader(false);
        navigate("/success");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.projectName) {
      errors.projectName = "Project Name is required";
    }

    if (!values.teamMembers || values.teamMembers.length === 0) {
      errors.teamMembers = "At least one Team Member is required";
    }

    if (!values.projectOwner) {
      errors.projectOwner = "Project Owner is required";
    }

    if (!values.description) {
      errors.description = "Description is required";
    }

    if (!values.status) {
      errors.status = "Project Status is required";
    }
    if (!values.projectType) {
      errors.projectType = "Project Type is required";
    }
    if (!values.budget) {
      errors.budget = "Estimated Budget is required";
    }
    if (!values.startDate) {
      errors.startDate = "Start Date is required";
    }
    if (!values.deadline) {
      errors.deadline = "Deadline is required";
    }
    return errors;
  };

  

  const safeMoment = (dateString) => {
    if (!dateString) return null;
    const date = moment(dateString);
    return date.isValid() ? date : null;
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">
          {isEditMode ? "Edit Project" : "New Project"}
        </h2>
      </div>

      <div className="basic-container scrollable-container">
        <Formik
          enableReinitialize
          initialValues={{
            projectName: projectData?.name || "",
            teamMembers:
              formattedTeamMemberData(projectData?.teamMembers) || [],
            projectManager: userDetails?._id,
            projectOwner: projectData?.owner || "",
            description: projectData?.description || "",
            status: projectData?.status || undefined,
            projectType: projectData?.projectType || undefined,
            budget: projectData?.budget || undefined,
            startDate: projectData?.startDate
              ? safeMoment(projectData?.startDate)
              : null,
            deadline: projectData?.deadline
              ? moment(projectData.deadline)
              : null,
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div className="project-row mt-1">
                <div className="field">
                  <p htmlFor="project-name">Project Name</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Amazon E-Commerce Site"
                    type="text"
                    name="project-name"
                    id="project-name"
                    value={values.projectName}
                    onChange={(e) => {
                      setFieldValue("projectName", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="projectName"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p htmlFor="team-member">Team Members</p>
                  <Select
                    mode="multiple"
                    className="project-input"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Team Member's"
                    onChange={(value) => handleTeamChange(value, setFieldValue)}
                    options={teamMembers}
                    value={values.teamMembers}
                    optionRender={(option) => (
                      <div className="flex py-1">
                        <img
                          className="w-6 h-6 rounded-full mr-3"
                          src={option.data.profile}
                          alt=""
                        />
                        {option.data.label}
                      </div>
                    )}
                  />
                  <ErrorMessage
                    name="teamMembers"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>

              <div className="project-row">
                <div className="field">
                  <p htmlFor="project-manager">Project Manager</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Aniket Raikwar"
                    type="text"
                    name="project-manager"
                    id="project-manager"
                    disabled={true}
                    value={userDetails?.fullName}
                  />
                </div>

                <div className="field">
                  <p htmlFor="project-owner">Project Owner</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Jeff Bezos"
                    type="text"
                    name="project-owner"
                    id="project-owner"
                    value={values.projectOwner}
                    onChange={(e) => {
                      setFieldValue("projectOwner", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="projectOwner"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>

              <div className="project-row">
                <div className="field">
                  <p htmlFor="description">Description</p>
                  <Field
                    className="project-input"
                    placeholder="Write a Description"
                    type="text"
                    name="description"
                    id="description"
                    value={values.description}
                    onChange={(e) => {
                      setFieldValue("description", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p>Status Zone</p>
                  <Select
                    mode="single"
                    id="status"
                    className="project-input"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Project Status"
                    onChange={(value) =>
                      handleProjectStatusChange(value, setFieldValue)
                    }
                    value={values.status}
                    options={statusOptions}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
                  />
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>

              <div className="project-row">
                <div className="field">
                  <p htmlFor="project-type">Project Type</p>
                  <Select
                    mode="single"
                    id="project-type"
                    className="project-input"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Project Type"
                    onChange={(value) =>
                      handleProjectTypeChange(value, setFieldValue)
                    }
                    value={values.projectType}
                    options={projectOptions}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
                  />
                  <ErrorMessage
                    name="projectType"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p htmlFor="budget">Esitmated Budget</p>
                  <Select
                    mode="single"
                    id="budget"
                    className="project-input"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Estimated Budget (in USD dollars)"
                    onChange={(value) =>
                      handleBudgetChange(value, setFieldValue)
                    }
                    value={values.budget}
                    options={budgetOptions}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
                  />
                  <ErrorMessage
                    name="budget"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>
              <div className="project-row">
                <div className="field">
                  <p htmlFor="start-date">Start Date</p>
                  <DatePicker
                    id="start-date"
                    className="project-input"
                    placeholder="Select Project Start Date"
                    onChange={(value) =>
                      handleStartDateChange(value, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p htmlFor="deadline">Deadline</p>
                  <DatePicker
                    id="deadline"
                    className="project-input"
                    placeholder="Select Project Deadline Date"
                    onChange={(value) =>
                      handleDeadlineChange(value, setFieldValue)
                    }
                  />
                  <ErrorMessage
                    name="deadline"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>

              <div className="project-btn-box">
                <button className="btn cancle">Cancle</button>
                <button
                  className="btn flex justify-center items-center"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {loader ? (
                    <img className="w-[30px]" src={Loader} alt="" />
                  ) : (
                    <p>Save</p>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateNewProject;
