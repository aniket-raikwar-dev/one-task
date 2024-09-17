import React from "react";

const AboutOneTask = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">About OneTask</h2>
      </div>
      <div className="flex w-full flex-col items-center mt-24">
        <div className="about-onetask">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(64,64,255,1)"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path>
          </svg>
          <p>neTask</p>
        </div>
        <div className="text-center text-[15px] w-4/5 mt-5">
          <span className="text-[#3030fb] font-semibold">OneTask</span> is a
          powerful, all-in-one project management system that combines the best
          features of <span className="text-[#3030fb] font-semibold">Jira</span>
          , <span className="text-[#3030fb] font-semibold">Notion</span>, and{" "}
          <span className="text-[#3030fb] font-semibold">Asana</span>. Designed
          to streamline workflows, enhance collaboration, and boost
          productivity,{" "}
          <span className="text-[#3030fb] font-semibold">OneTask</span> is the
          go-to solution for teams of all sizes and industries.
        </div>
      </div>
    </div>
  );
};

export default AboutOneTask;
