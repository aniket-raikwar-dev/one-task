import React, { useEffect, useState } from "react";
import Gantt from "frappe-gantt";
import projectStore from "../stores/projectStore";
import api from "../services/api";

const tasks = [
  {
    id: "Copy Full Site",
    name: "[Copy] Full site treatments",
    start: "2024-4-01",
    end: "2024-4-08",
    progress: 70,
    dependencies: "",
    custom_class: "blue",
  },
  {
    id: "Delivery Copy Site",
    name: "[Delivery] Copy - Full Site",
    start: "2024-4-03",
    end: "2024-4-10",
    progress: 30,
    dependencies: ["Copy Full Site", "Delivery Copy Site v2"],
    custom_class: "orange",
  },
  {
    id: "Delivery Copy Site v2",
    name: "[Delivery] Copy - Full Site",
    start: "2024-4-8",
    end: "2024-4-17",
    progress: 80,
    dependencies: "Copy Rnd2",
    custom_class: "purple",
  },
  {
    id: "Copy Revision",
    name: "[Copy] Miscellaneous Revisions",
    start: "2024-4-5T00:00:00.000Z",
    end: "2024-4-14T00:00:00.000Z",
    progress: 60,
    dependencies: "",
    custom_class: "green",
  },
  {
    id: "Delivery Misc Copy",
    name: "[Delivery] Copy - Final Revisions",
    start: "2024-4-6",
    end: "2024-4-17",
    progress: 70,
    dependencies: "Copy Revision",
    custom_class: "orange",
  },
  {
    id: "Design Home Rnd2",
    name: "[Design] Home v2",
    start: "2024-4-10T00:00:00.000Z",
    end: "2024-4-24T00:00:00.000Z",
    progress: 40,
    dependencies: "",
    custom_class: "blue",
  },
  {
    id: "Delivery Home v2",
    name: "[Delivery] Home Design v2",
    start: "2024-4-16",
    end: "2024-4-19",
    progress: 67,
    dependencies: "Design Home Rnd2",
    custom_class: "purple",
  },
  {
    id: "Delivery Home v3",
    name: "[Delivery] Home Design v2",
    start: "2024-4-18T00:00:00.000Z",
    end: "2024-4-27T00:00:00.000Z",
    progress: 20,
    dependencies: "Design Home Rnd2",
    custom_class: "green",
  },

  {
    id: "Delivery Home v2",
    name: "[Delivery] Home Design v2",
    start: "2024-4-16T00:00:00.000Z",
    end: "2024-4-19T00:00:00.000Z",
    progress: 67,
    dependencies: "Design Home Rnd2",
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
