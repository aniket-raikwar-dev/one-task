import React from "react";
import Male1 from "../images/male1.png";

const OverviewCard = () => {
  return (
    <div className="board-card ovr-card">
      <div className="ovr-card-top">
        <div className="flex justify-between">
          <div className="date">12.01.2024</div>
          <div className="tech">High</div>
        </div>

        <h3 className="task-text">
          FE: Replacement of Node JS with Java and Go Language
        </h3>

        <div className="flex justify-between items-center mt-2">
          <div className="tech-box">
            <div className="circle"></div>
            Frontend Stack
          </div>
          <div className="project-owner mar-t-6 mb-1">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path>
              </svg>
            </div>

            <p>
              Estimation: <span>3 SP</span>
            </p>
          </div>
        </div>
      </div>

      <div className="ovr-card-bottom">
        <div className="table-assigned">
          <div>
            <img src={Male1} alt="" />
          </div>
          <div className="fz-12">Brad Johnson</div>
        </div>
        <div className="flex">
          <div className="short-cut">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#5a5a5a"
            >
              <path d="M14 13.5V8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8V13.5C6 17.0899 8.91015 20 12.5 20C16.0899 20 19 17.0899 19 13.5V4H21V13.5C21 18.1944 17.1944 22 12.5 22C7.80558 22 4 18.1944 4 13.5V8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8V13.5C16 15.433 14.433 17 12.5 17C10.567 17 9 15.433 9 13.5V8H11V13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5Z"></path>
            </svg>
            <p>1</p>
          </div>
          <div className="short-cut ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#5a5a5a"
            >
              <path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242ZM7.58075 18.711L8.23428 19.0605C9.38248 19.6745 10.6655 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 13.3345 4.32549 14.6175 4.93949 15.7657L5.28896 16.4192L4.63416 19.3658L7.58075 18.711Z"></path>
            </svg>
            <p>4</p>
          </div>
        </div>
      </div>
    </div>
    // <div className="ovr-card">
    //   <div className="ovr-top">
    //     <div className="ovr-top-1">13.01.2022</div>
    //     <div className="ovr-top-2"></div>
    //   </div>
    //   <div className="ovr-card-content">
    //     <p className="heading">
    //       Fixed: UI issue of the dashboard scrolling on effect cause an error.
    //     </p>
    //     <div className="flex justify-between">
    //       <div className="ovr-sprint">
    //         <div className="circle"></div>
    //         Sprint: MXY-245
    //       </div>
    //       <div className="ovr-sprint est">
    //         <div className="circle"></div>
    //         Esitimation: 3 SP
    //       </div>
    //     </div>

    //     <div className="ovr-assigned">
    //       Assigned: <span>John Brown</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default OverviewCard;
