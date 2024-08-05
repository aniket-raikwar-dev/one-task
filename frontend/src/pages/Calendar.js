import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import SearchBar from "../components/SearchBar";
import api from "../services/api";
import projectStore from "../stores/projectStore";

const dummyEvents = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    start: "2024-08-10T10:00:00",
    end: "2024-08-10T11:30:00",
  },
  {
    id: "2",
    title: "Client Presentation",
    start: "2024-08-15T14:00:00",
    end: "2024-08-15T16:00:00",
  },
  {
    id: "3",
    title: "Team Building Event",
    start: "2024-08-20",
    end: "2024-08-21",
    allDay: true,
  },
  {
    id: "4",
    title: "Product Launch",
    start: "2024-08-25T09:00:00",
    end: "2024-08-25T18:00:00",
  },
  {
    id: "5",
    title: "Sprint Planning",
    start: "2024-08-05T13:00:00",
    end: "2024-08-05T15:00:00",
    recurring: true,
    daysOfWeek: [1],
  },
];

const customClasses = [
  "event-purple",
  "event-green",
  "event-blue",
  "event-orange",
];

const CalendarPage = ({ collapsed }) => {
  const calendarRef = useRef(null);
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [calendarDate, setCalendarDate] = useState("");

  const { selectedProjectId } = projectStore();

  console.log("date: ", calendarDate);

  const changeCalendarView = (view) => {
    setCalendarView(view);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
      setCalendarDate(calendarRef.current.getApi().view.title);
    }
  };

  const getTasksDataBySelectedProject = async () => {
    try {
      const resp = await api.get(`/task/${selectedProjectId}`);
      const { data } = resp?.data;
      const eventData = formatCalendarEvent(data);
      setEvents(eventData);
      console.log("data: ", eventData);
    } catch (error) {
      console.log(error);
    }
  };

  const formatCalendarEvent = (events) => {
    const formattedEvent = events.map((event, index) => ({
      id: `w-${event?._id}`,
      title: event?.title,
      start: event?.createdAt,
      end: event?.dueDate ? event?.dueDate : event?.updatedAt,
      allDay: true,
      className: customClasses[index % customClasses.length],
    }));

    return formattedEvent;
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

    getTasksDataBySelectedProject();
  }, [collapsed]);

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Calendar</h2>
        <div className="flex">
          <SearchBar />
          <div className="date-box ml-3">
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
          headerToolbar={false}
          events={events}
          // eventContent={(eventInfo) => (
          //   <>
          //     <b>{eventInfo.timeText}</b>
          //     <i>{eventInfo.event.title}</i>
          //   </>
          // )}
          // eventClick={(info) => {
          //   alert(
          //     `Event: ${info.event.title}\nStart: ${info.event.start}\nEnd: ${
          //       info.event.end || "N/A"
          //     }`
          //   );
          // }}
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
