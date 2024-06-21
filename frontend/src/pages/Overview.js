import React, { useState } from "react";
import OverviewCard from "../components/OverviewCard";
import TableView from "../components/TableView";
import TimelineView from "../components/TimelineView";

const Overview = () => {
  const [timelineView, setTimelineView] = useState("Day");

  const toggleTimelineView = (viewType = "Day") => {
    setTimelineView(viewType);
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Overview</h2>
        <div className="toggle-timeline">
          <div
            onClick={() => toggleTimelineView("Half Day")}
            className={timelineView === "Half Day" ? "selected" : ""}
          >
            Half Day
          </div>
          <div
            onClick={() => toggleTimelineView("Day")}
            className={timelineView === "Day" ? "selected" : ""}
          >
            Day
          </div>
          <div
            onClick={() => toggleTimelineView("Week")}
            className={timelineView === "Week" ? "selected" : ""}
          >
            Week
          </div>
        </div>
      </div>

      <TimelineView timelineView={timelineView} smallView={true} />
      <div className="flex justify-between mt-4">
        <div className="card-container">
          <div className="flex justify-between">
            <h2 className="ovr-title">To Start</h2>
            <div className="ovr-title-right">3</div>
          </div>
          <div className="ovr-card-container">
            <OverviewCard />
            <OverviewCard />
            <OverviewCard />
          </div>
        </div>
        <div className="ovr-table-container">
          <h2 className="ovr-title">In Progress</h2>
          <TableView />
        </div>
      </div>
    </div>
  );
};

export default Overview;
