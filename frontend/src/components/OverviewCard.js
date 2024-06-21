import React from "react";

const OverviewCard = () => {
  return (
    <div className="ovr-card">
      <div className="ovr-top">
        <div className="ovr-top-1">13.01.2022</div>
        <div className="ovr-top-2"></div>
      </div>
      <div className="ovr-card-content">
        <p className="heading">
          Fixed: UI issue of the dashboard scrolling on effect cause an error.
        </p>
        <div className="flex justify-between">
          <div className="ovr-sprint">
            <div className="circle"></div>
            Sprint: MXY-245
          </div>
          <div className="ovr-sprint est">
            <div className="circle"></div>
            Esitimation: 3 SP
          </div>
        </div>

        <div className="ovr-assigned">
          Assigned: <span>John Brown</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
