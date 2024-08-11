import React, { useState } from "react";
import { Modal } from "antd";
import { ErrorMessage, Form, Field, Formik } from "formik";

const AddLinkModal = ({ isOpen, closeModal, handleSubmitLink }) => {
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <div>
      <Modal
        title={`Add Link`}
        open={isOpen}
        footer={null}
        onCancel={closeModal}
      >
        <div className="flex">
          <Formik
            initialValues={{
              link: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.link) {
                errors.link = "Link is Required";
              } else if (!isValidUrl(values.link)) {
                errors.link = "Invalid URL";
              }
              return errors;
            }}
            // onSubmit={(values) => handleSubmitLink(values)}
            onSubmit={(values, { resetForm }) => {
              handleSubmitLink(values);
              resetForm();
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="field mt-4">
                  <p>Link :</p>
                  <Field
                    className="project-link-input"
                    placeholder="Add Your Link Here ..."
                    type="text"
                    name="link"
                    value={values.link}
                    onChange={(e) => {
                      setFieldValue("link", e.target.value);
                    }}
                  />
                  <ErrorMessage
                    name="link"
                    component="div"
                    className="form-err-msg"
                  />
                </div>
                <div className="w-[470px] flex justify-end mt-4">
                  <button
                    style={{ width: "100px" }}
                    className="btn-create"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add Link
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default AddLinkModal;
