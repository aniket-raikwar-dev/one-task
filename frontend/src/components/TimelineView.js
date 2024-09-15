import React, { useEffect, useState } from "react";
import Gantt from "frappe-gantt";
import projectStore from "../stores/projectStore";
import api from "../services/api";

const tasks = [
  {
    id: "Implement User Authentication API",
    name: "Implement User Authentication API",
    start: "2024-4-01",
    end: "2024-4-08",
    progress: 70,
    dependencies: "",
    custom_class: "blue",
  },
  {
    id: "Rework: Domain System Architecture",
    name: "Rework: Domain System Architecture",
    start: "2024-4-03",
    end: "2024-4-10",
    progress: 30,
    dependencies: [
      "Implement User Authentication API",
      "TODO: Report Analysis",
    ],
    custom_class: "orange",
  },
  {
    id: "TODO: Report Analysis",
    name: "TODO: Report Analysis",
    start: "2024-4-8",
    end: "2024-4-17",
    progress: 80,
    dependencies: "Copy Rnd2",
    custom_class: "purple",
  },
  {
    id: "Optimize Database Queries for Product Search",
    name: "Optimize Database Queries for Product Search",
    start: "2024-4-5T00:00:00.000Z",
    end: "2024-4-14T00:00:00.000Z",
    progress: 60,
    dependencies: "",
    custom_class: "green",
  },
  {
    id: "Build Search Bar with Autocomplete in Dashboard",
    name: "Build Search Bar with Autocomplete in Dashboard",
    start: "2024-4-6",
    end: "2024-4-17",
    progress: 70,
    dependencies: "Feat: Nothing OS Updates 2.6",
    custom_class: "orange",
  },
  {
    id: "Feat: Nothing OS Updates 2.6",
    name: "Feat: Nothing OS Updates 2.6",
    start: "2024-4-10T00:00:00.000Z",
    end: "2024-4-24T00:00:00.000Z",
    progress: 40,
    dependencies: "",
    custom_class: "blue",
  },
  {
    id: "Security Testing for Authentication Mechanism",
    name: "Security Testing for Authentication Mechanism",
    start: "2024-4-16",
    end: "2024-4-19",
    progress: 67,
    dependencies: "Cross-browser Testing for Frontend Application",
    custom_class: "purple",
  },
  {
    id: "Cross-browser Testing for Frontend Application",
    name: "Cross-browser Testing for Frontend Application",
    start: "2024-4-18T00:00:00.000Z",
    end: "2024-4-27T00:00:00.000Z",
    progress: 20,
    dependencies: "Add client-side validation for email and password fields.",
    custom_class: "green",
  },

  {
    id: "Add client-side validation for email and password fields.",
    name: "Add client-side validation for email and password fields.",
    start: "2024-4-16T00:00:00.000Z",
    end: "2024-4-19T00:00:00.000Z",
    progress: 67,
    dependencies: "Feat: Nothing OS Updates 2.6",
    custom_class: "purple",
  },
];

const customClasses = ["blue", "orange", "purple", "green"];

const TimelineView = ({ timelineView, isSmallView }) => {
  const [taskData, setTaskData] = useState([]);
  console.log("timeline: ", timelineView);

  const { selectedProjectId } = projectStore();
  console.log("selectedProjectId: ", selectedProjectId);

  const getTasksData = async () => {
    try {
      const resp = await api.get(`/task/${selectedProjectId}`);
      const { data } = resp?.data;
      const tasks = formatTimelineData(data);
      setTaskData(tasks);
      console.log("resp: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTimelineData = (data = []) => {
    const formatData = data.map((item, index) => {
      const startDate = item?.startDate
        ? item.startDate
        : item?.createdAt || Date.now();
      const endDate = item?.dueDate
        ? item.dueDate
        : item?.updatedAt || Date.now();

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("Invalid date detected:", item);
        throw new Error("Invalid date format");
      }
      return {
        id: item?._id,
        name: item?.title,
        start: startDate,
        end: endDate,
        progress: item?.progress,
        dependencies: item?.dependencies,
        custom_class: customClasses[index % customClasses.length],
      };
    });
    console.log("formatData data: ", formatData);
    return formatData;
  };

  useEffect(() => {
    getTasksData();
  }, []);

  useEffect(() => {
    const gantt = new Gantt("#gantt", tasks, {
      step: 14,
      view_mode: timelineView,
      view_modes: ["Half Day", "Day", "Week"],
      bar_height: isSmallView ? 25 : 35,
      bar_corner_radius: 3,
      arrow_curve: isSmallView ? 5 : 8,
      padding: isSmallView ? 22 : 28,
    });

    const ganttContainer = document.querySelector(".gantt-container");
    if (!isSmallView) {
      ganttContainer.classList.add("big-gantt");
    } else {
      ganttContainer.classList.remove("big-gantt");
    }
  }, [timelineView, taskData]);

  return (
    <div className="border" id="app-gantt">
      <svg id="gantt"></svg>
    </div>
  );
};

export default TimelineView;
