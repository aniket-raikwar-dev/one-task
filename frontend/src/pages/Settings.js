import React from "react";
import NoDataImg from "../images/noDataAvailable.svg";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Settings</h2>
      </div>
      <div className="flex w-full flex-col items-center mt-24">
        <img className="w-52" src={NoDataImg} alt="no-data" />
        <p className="text-[18px] font-semibold  text-[#3030fb] mt-7">
          Setting Page is Under Maintainance!
        </p>
        <p className="text-[16px] mt-1 mb-5">
          Stay tuned for more updates!
        </p>
        <Link to="/projects">
          <div className="btn-create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
            View Projects
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
