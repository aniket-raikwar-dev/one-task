import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Select, Space, Image, Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import api from "../services/api";
import Loader from "../images/loader.gif";
import RightArrow from "../images/rightArrow.png";
import userStore from "../stores/userStore";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";
import { roleOptions } from "../utils/taskOptionsData";

const EditUserDetails = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const { userDetails, setUserDetails } = userStore();
  const navigate = useNavigate();

  console.log("data: ", userDetails);

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
    } else if (!/^\d{10}$/.test(values.phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
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
    setTimeout(() => {
      setIsImageUploaded(true);
      setLoading(false);
    }, 1000);
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

      console.log("formData updated: ", formData);

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
          enableReinitialize
          initialValues={{
            firstName: userDetails?.firstName || "",
            lastName: userDetails?.lastName || "",
            emailId: userDetails?.email,
            techRole: userDetails?.isManager
              ? "Product Manager"
              : userDetails?.techRole || "",
            location: userDetails?.location || "",
            phone: userDetails?.phone || "",
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            updateUserDetail(values);
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="flex justify-center">
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
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
                    name="firstName"
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
                    name="lastName"
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
                  <p className="text-sm">Email ID</p>
                  <Field
                    className="project-input text-sm"
                    placeholder="Ex. Jeff Bezos"
                    type="text"
                    name="emailId"
                    value={userDetails?.email}
                    disabled={true}
                  />
                  <ErrorMessage
                    name="emailId"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="field">
                  <p className="text-sm">Tech Role</p>
                  <Select
                    mode="single"
                    id="tech-role"
                    name="techRole"
                    className="project-input text-sm"
                    style={{ paddingLeft: "0px" }}
                    placeholder="Select Tech Role"
                    onChange={(value) =>
                      handleTechRoleChange(value, setFieldValue)
                    }
                    disabled={userDetails.isManager}
                    value={
                      userDetails.isManager
                        ? "Product Manager"
                        : values.techRole || undefined
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
                  <p className="text-sm">Location</p>
                  <Field
                    className="project-input text-sm"
                    placeholder="Ex. Los Angeles, NY, USA"
                    type="text"
                    name="location"
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
                  <p className="text-sm">Phone No.</p>
                  <Field
                    className="project-input text-sm"
                    placeholder="Ex. +91 9827927273"
                    type="text"
                    name="phone"
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
                      <p>Update</p>
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

export default EditUserDetails;
