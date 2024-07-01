import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";


const OnBoarding = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">New Project</h2>
      </div>

      <div className="basic-container scrollable-container">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="project-row mt-5">
                <div>
                  <p htmlFor="project-name">First Name</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Amazon E-Commerce Site"
                    type="text"
                    name="project-name"
                    id="project-name"
                  />
                </div>
                <div>
                  <p htmlFor="project-owner">Last Name</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Jeff Bezos"
                    type="text"
                    name="project-owner"
                    id="project-owner"
                  />
                </div>
              </div>
              <div className="project-row">
                <div>
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
                <div>
                  <p htmlFor="project-type">Project Type</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Web Payment"
                    type="text"
                    name="project-name"
                    id="project-name"
                  />
                </div>
              </div>
              <div className="project-row">
                <div>
                  <p htmlFor="project-name">Esitmated Budget</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. $125k - $234k"
                    type="project-name"
                    name="project-name"
                    id="project-name"
                  />
                </div>
                <div>
                  <p htmlFor="project-name">Team Members</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Amazon E-Commerce Site"
                    type="project-name"
                    name="project-name"
                    id="project-name"
                  />
                </div>
              </div>
              <div className="project-row">
                <div>
                  <p htmlFor="project-name">Start Date</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Amazon E-Commerce Site"
                    type="project-name"
                    name="project-name"
                    id="project-name"
                  />
                </div>
                <div>
                  <p htmlFor="project-name">Deadline</p>
                  <Field
                    className="project-input"
                    placeholder="Ex. Amazon E-Commerce Site"
                    type="project-name"
                    name="project-name"
                    id="project-name"
                  />
                </div>
              </div>
              <div className="project-btn-box">
                
                <button className="btn save">Next</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OnBoarding