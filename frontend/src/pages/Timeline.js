import React, { useState } from "react";
import TimelineView from "../components/TimelineView";
import projectStore from "../stores/projectStore";

const Timeline = () => {
  const [timelineView, setTimelineView] = useState("Day");
  const { isProjectSelected } = projectStore();

  const toggleTimelineView = (viewType = "Day") => {
    setTimelineView(viewType);
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Timeline</h2>
        {isProjectSelected && (
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
        )}
      </div>
      <TimelineView timelineView={timelineView} isSmallView={false} />
    </div>
  );
};

export default Timeline;
