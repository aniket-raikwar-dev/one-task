import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, Space, Image, Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import api from "../api";
import Loader from "../images/loader.gif";
import RightArrow from "../images/rightArrow.png";
import userStore from "../stores/userStore";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

const roleOptions = [
  { label: "Frontend Developer", value: "Frontend Developer" },
  {
    label: "Backend Developer (Node Js)",
    value: "Backend Developer (Node Js)",
  },
  { label: "Backend Developer (Java)", value: "Backend Developer (Java)" },
  { label: "Full Stack Developer", value: "Full Stack Developer" },
  { label: "DevOps Engineer", value: "DevOps Engineer" },
  { label: "Cloud Engineer", value: "Cloud Engineer" },
  { label: "Software Tester", value: "Software Tester" },
];

const OnBoarding = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const { userDetails, setUserDetails } = userStore();
  const navigate = useNavigate();

  const handleTechRoleChange = (value, setFieldValue) => {
    setFieldValue("techRole", value);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.techRole) {
      errors.techRole = "Tech Role is required";
    }
    if (!values.location) {
      errors.location = "Location is required";
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
    }

    return errors;
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLargerThan5Mb = file.size / 1024 / 1024 < 5;
    if (!isLargerThan5Mb) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLargerThan5Mb;
  };

  const handlePhotoUpload = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    const file = info.file.originFileObj;
    setFileList(file);
    setIsImageUploaded(true);
    setLoading(false);
  };

  const updateUserDetail = async (values) => {
    setBtnLoader(true);
    try {
      const token = getToken();
      const formData = new FormData();
      formData.set("firstName", values.firstName);
      formData.set("lastName", values.lastName);
      formData.set("techRole", values.techRole);
      formData.set("location", values.location);
      formData.set("phone", values.phone);
      formData.set("profilePhoto", fileList);

      const resp = await api.put("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = resp?.data;
      setUserDetails(data);
      setBtnLoader(false);
      navigate("/projects");
    } catch (error) {
      setBtnLoader(false);
      console.log("error: ", error);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload Photo</div>
    </button>
  );

  return (
    <div className="py-10 px-36">
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Add Your Personal Details</h2>
      </div>

      <div className="basic-container">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            emailID: userDetails?.email,
            techRole: userDetails?.isManager ? "Product Manager" : "",
            location: "",
            phone: "",
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            updateUserDetail(values);
          }}
        >
          {({ isSubmitting, setFieldValue, setFieldTouched }) => (
            <Form>
              <div className="flex justify-center">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  beforeUpload={beforeUpload}
                  onChange={handlePhotoUpload}
                >
                  {isImageUploaded ? (
                    <div className="pic-uploaded">
                      <CheckOutlined className="check-icon" />
                    </div>
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>

              <div className="outer-row">
                <div className="field">
                  <p className="text-sm">First Name</p>
                  <Field
                    className="project-input text-sm"
                    placeholder="Ex. James"
                    type="text"
                    name="first-name"
                    id="first-name"
                    onChange={(e) => {
                      setFieldValue("firstName", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p className="text-sm">Last Name</p>
                  <Field
                    className="project-input text-sm"
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
              <div className="outer-row">
                <div className="field">
                  <p className="text-sm" htmlFor="email-id">
                    Email ID
                  </p>
                  <Field
                    className="project-input text-sm"
                    placeholder="Ex. Jeff Bezos"
                    type="text"
                    name="email-id"
                    id="email-id"
                    value={userDetails?.email}
                    disabled={true}
                  />
                  <ErrorMessage
                    name="emailID"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p className="text-sm" htmlFor="tech-role">
                    Tech Role
                  </p>
                  <Select
                    mode="single"
                    id="tech-role"
                    className="project-input text-sm"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Tech Role"
                    onChange={(value) =>
                      handleTechRoleChange(value, setFieldValue)
                    }
                    disabled={userDetails.isManager}
                    value={
                      userDetails.isManager ? "Product Manager" : undefined
                    }
                    options={roleOptions}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
                  />
                  <ErrorMessage
                    name="techRole"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
              </div>
              <div className="outer-row">
                <div className="field">
                  <p className="text-sm" htmlFor="location">
                    Location
                  </p>
                  <Field
                    className="project-input text-sm"
                    placeholder="Ex. Los Angeles, NY, USA"
                    type="text"
                    name="location"
                    id="location"
                    onChange={(e) => {
                      setFieldValue("location", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="form-err-msg"
                  />
                </div>

                <div className="field">
                  <p className="text-sm" htmlFor="phone">
                    Phone No.
                  </p>
                  <Field
                    className="project-input text-sm"
                    placeholder="Ex. +91 9827927273"
                    type="text"
                    name="phone"
                    id="phone"
                    onChange={(e) => {
                      setFieldValue("phone", e.target.value);
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
                  className="btn flex justify-center items-center"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {btnLoader ? (
                    <img className="w-[30px]" src={Loader} alt="" />
                  ) : (
                    <>
                      <p>Next</p>
                      <img className="w-[18px] ml-3" src={RightArrow} alt="" />
                    </>
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

export default OnBoarding;
