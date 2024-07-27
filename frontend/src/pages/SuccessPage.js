import React from "react";
import SuccessImg from "../images/success.svg";
import { Link } from "react-router-dom";
import projectStore from "../stores/projectStore";

const SuccessPage = () => {
  const { projectDetails } = projectStore();

  return (
    <div className="flex w-full flex-col items-center mt-24">
      <img className="w-52" src={SuccessImg} alt="no-data" />
      <p className="text-[22px] mt-6 mb-6">
        Your Project{" "}
        <span className="text-[#3030fb] font-bold">
          "{projectDetails?.name}"
        </span>{" "}
        is Successfully Created.
      </p>
      <Link to="/projects">
        <div className="btn-create">View Projects</div>
      </Link>
    </div>
  );
};

export default SuccessPage;
