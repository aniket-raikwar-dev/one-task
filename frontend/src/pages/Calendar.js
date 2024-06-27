import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarPage = ({ collapsed }) => {
  const calendarRef = useRef(null);
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [calendarDate, setCalendarDate] = useState("");

  console.log("date: ", calendarDate);

  const changeCalendarView = (view) => {
    setCalendarView(view);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };

  useEffect(() => {
    const { current: calendarDom } = calendarRef;
    const API = calendarDom ? calendarDom.getApi() : null;

    setCalendarDate(API.view.title);

    const handlePrev = () => {
      API.prev();
      setCalendarDate(API.view.title);
    };
    const handleNext = () => {
      API.next();
      setCalendarDate(API.view.title);
    };

    const prevButton = document.getElementById("calendar-prev-btn");
    const nextButton = document.getElementById("calendar-next-btn");

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", handlePrev);
      nextButton.addEventListener("click", handleNext);

      return () => {
        prevButton.removeEventListener("click", handlePrev);
        nextButton.removeEventListener("click", handleNext);
      };
    }
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().handleRenderRequest();
    }
  }, [collapsed]);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Calendar Page</h2>
        <div className="flex">
          <div className="date-box">
            <div className="btn" id="calendar-prev-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgba(255,255,255,1)"
              >
                <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
              </svg>
            </div>
            <p className="text-[13px]">{calendarDate}</p>
            <div className="btn" id="calendar-next-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="rgba(255,255,255,1)"
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </div>
          </div>

          <div className="toggle-timeline cal-view-btn">
            <div
              onClick={() => changeCalendarView("timeGridWeek")}
              className={calendarView === "timeGridWeek" ? "selected" : ""}
            >
              Week
            </div>
            <div
              onClick={() => changeCalendarView("dayGridMonth")}
              className={calendarView === "dayGridMonth" ? "selected" : ""}
            >
              Month
            </div>
          </div>
        </div>
      </div>
      <div className="calendar-box scrollable-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView={calendarView}
          // events={[
          //   { title: "Event 1", date: "2024-06-23" },
          //   { title: "Event 2", date: "2024-06-25" },
          // ]}
          headerToolbar={false}
          views={{
            timeGridWeek: {
              type: "timeGrid",
              duration: { weeks: 1 },
              buttonText: "week",
              slotLabelFormat: {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              },
            },
            dayGridMonth: {
              type: "dayGrid",
              duration: { months: 1 },
              buttonText: "month",
              displayEventTime: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
