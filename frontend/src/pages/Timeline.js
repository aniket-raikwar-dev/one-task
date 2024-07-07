import React, { useState } from "react";
import TimelineView from "../components/TimelineView";

const Timeline = () => {
  const [timelineView, setTimelineView] = useState("Day");
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Timeline</h2>
      </div>
      <TimelineView timelineView={timelineView} isSmallView={false} />
    </div>
  );
};

export default Timeline;
