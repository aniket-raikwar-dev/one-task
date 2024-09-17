import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import SearchBar from "../components/SearchBar";
import api from "../services/api";
import projectStore from "../stores/projectStore";
import taskStore from "../stores/taskStore";
import { useNavigate } from "react-router-dom";

const customClasses = [
  "event-darkblue",
  "event-blue",
  "event-purple",
  "event-orange",
  "event-green",
];

const CalendarPage = ({ collapsed }) => {
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [displayEvents, setDisplayEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [calendarDate, setCalendarDate] = useState("");

  const calendarRef = useRef(null);

  const { selectedProjectId } = projectStore();
  const { setTaskDetails } = taskStore();

  const navigate = useNavigate();

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
      setDisplayEvents(eventData);
      setEvents(eventData);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = (e) => {
    let input = e.target.value;
    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(input.toLowerCase())
    );
    setSearchInput(input);
    setDisplayEvents(filteredEvents);
  };

  const formatCalendarEvent = (events) => {
    const formattedEvent = events.map((event, index) => ({
      id: `w-${event?._id}`,
      title: event?.title,
      start: event?.startDate,
      end: event?.dueDate ? event?.dueDate : event?.updatedAt,
      allDay: true,
      className: customClasses[index % customClasses.length],
    }));

    return formattedEvent;
  };

  const handleEventClick = (e) => {
    const eventId = e.event._def.publicId.split("-")[1];
    const task = tasks.find((task) => task?._id === eventId);
    setTaskDetails(task);
    navigate(`/task-details/${eventId}`);
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
          <SearchBar
            searchInput={searchInput}
            handleSearchInputChange={handleSearchInputChange}
          />
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
              onClick={() => changeCalendarView("dayGridWeek")}
              className={calendarView === "dayGridWeek" ? "selected" : ""}
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
          events={displayEvents}
          eventClick={handleEventClick}
          views={{
            dayGridWeek: {
              type: "dayGridWeek",
              duration: { weeks: 1 },
              buttonText: "week",
              allDaySlot: true,
              allDayContent: "All-day",
              dayMaxEvents: true,
              dayMaxEventRows: true,
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
