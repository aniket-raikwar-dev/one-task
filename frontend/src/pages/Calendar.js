import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Calendar Page</h2>
      </div>
      <div className="scrollable-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: "Event 1", date: "2024-06-23" },
            { title: "Event 2", date: "2024-06-25" },
          ]}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
