import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, Space, DatePicker } from "antd";

const projectOptions = [
  { label: "Online Stores", value: "Online Stores" },
  {
    label: "Subscription-based Services",
    value: "Subscription-based Services",
  },
  { label: "Blogging Platforms", value: "Blogging Platforms" },
  { label: "Project Management Tools", value: "4" },
  { label: "Social Media Platforms", value: "5" },
  { label: "SaaS Platforms", value: "6" },
  { label: "Job Portals", value: "7" },
  { label: "Travel Booking Sites", value: "8" },
  { label: "Payment Gateways", value: "9" },
  { label: "Streaming Services", value: "10" },
  { label: "Real Estate Portal", value: "11" },
  { label: "Learning Management Systems (LMS)", value: "12" },
];

const budgetOptions = [
  { label: "$1,000 - $5,000 ", value: "1" },
  { label: "$5,000  -  $10,000", value: "2" },
  { label: "$10,000  -  $30,000", value: "3" },
  { label: "$30,000  -  $50,000", value: "4" },
  { label: "$50,000  -  $100,000", value: "5" },
  { label: "$100,000  -  $250,000", value: "6" },
  { label: "$250,000  -  $300,000", value: "7" },
  { label: "Above $300,000", value: "8" },
];

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

const CreateNewProject = () => {
  
  const handleTeamChange = (value, setFieldValue) => {
    console.log(`selected ${value}`);
    setFieldValue("teamMembers", value);
  };

  const handleProjectTypeChange = (value, setFieldValue) => {
    console.log(`selected ${value}`);
    setFieldValue("projectType", value);
  };

  const handleBudgetChange = (value, setFieldValue) => {
    console.log(`selected ${value}`);
    setFieldValue("budget", value);
  };

  const handleStartDateChange = (date, dateString, setFieldValue) => {
    console.log(date, dateString);
    setFieldValue("startDate", date);
  };

  const handleDeadlineChange = (date, dateString, setFieldValue) => {
    console.log(date, dateString);
    setFieldValue("deadline", date);
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

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">New Project</h2>
      </div>

      <div className="basic-container scrollable-container">
        <Formik
          initialValues={{
            projectName: "",
            teamMembers: [],
            projectOwner: "",
            projectType: "",
            budget: "",
            startDate: null,
            deadline: null,
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, setFieldValue, setFieldTouched }) => (
            <Form>
              <div className="project-row mt-5">
                <div className="field">
                  <p htmlFor="project-name">Project Name</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Amazon E-Commerce Site"
                    type="text"
                    name="project-name"
                    id="project-name"
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
                  className="btn save"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save
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
