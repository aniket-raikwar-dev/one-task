import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, Space, Image, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const roleOptions = [
  {label: "Frontend Developer", value: "Frontend Developer"},
  {label: "Backend Developer (Node Js)", value: "Backend Developer (Node Js)"},
  {label: "Backend Developer (Java)", value: "Backend Developer (Java)"},
  {label: "DevOps Engineer", value: "DevOps Engineer"},
  {label: "Cloud Engineer", value: "Cloud Engineer"},
  {label: "Software Tester", value: "Software Tester"},

]

const OnBoarding = () => {

  const handleTechRoleChange = () => {}
  return (
    <div className="main-container">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Add Your Personal Details</h2>
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
          validate={() => {}}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting, setFieldValue, setFieldTouched }) => (
            <Form>
              <div className="project-row mt-5"></div>
              <div className="project-row">
                <div className="field">
                  <p htmlFor="first-name">First Name</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. James"
                    type="text"
                    name="first-name"
                    id="first-name"
                    onChange={(e) => {
                      setFieldValue("firstName", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="projectName"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p htmlFor="last-name">Last Name</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Smith"
                    type="text"
                    name="last-name"
                    id="last-name"
                    onChange={(e) => {
                      setFieldValue("lastName", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>
              <div className="project-row">
                <div className="field">
                  <p htmlFor="tech-role">Tech Role</p>
                  <Select
                    mode="single"
                    id="project-type"
                    className="project-input"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Project Type"
                    onChange={(value) =>
                      handleTechRoleChange(value, setFieldValue)
                    }
                    options={roleOptions}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
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
                  <p htmlFor="location">Location</p>
                  <Select
                    mode="single"
                    id="project-type"
                    className="project-input"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Project Type"
                    onChange={(value) =>
                      handleTechRoleChange(value, setFieldValue)
                    }
                    options={roleOptions}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
                  />
                </div>

                <div className="field">
                  <p htmlFor="phone">Phone No.</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Jeff Bezos"
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={(e) => {
                      setFieldValue("projectOwner", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>

              <div className="project-btn-box">
                <button
                  className="btn save"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OnBoarding