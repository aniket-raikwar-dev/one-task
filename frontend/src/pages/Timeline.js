import React from "react";
import TimelineView from "../components/TimelineView";

const Timeline = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Timeline</h2>
      </div>
      <TimelineView smallView={false} />
    </div>
  );
};

export default Timeline;
