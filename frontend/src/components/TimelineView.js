import React, { useEffect, useState } from "react";
import Gantt from "frappe-gantt";
import projectStore from "../stores/projectStore";
import api from "../api";

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
    start: "2024-4-5",
    end: "2024-4-14",
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
    start: "2024-4-10",
    end: "2024-4-24",
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
    start: "2024-4-18",
    end: "2024-4-27",
    progress: 20,
    dependencies: "Design Home Rnd2",
    custom_class: "green",
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
];

const customClasses = ["blue", "orange", "purple", "green"];

const TimelineView = ({ timelineView, isSmallView }) => {
  const [taskData, setTaskData] = useState([]);
  console.log("timeline: ", isSmallView);

  const { selectedProjectId } = projectStore();
  console.log("selectedProjectId: ", selectedProjectId);

  const getTasksBySelectedProject = async () => {
    try {
      const resp = await api.get(`/task/${selectedProjectId}`);
      const { data } = resp?.data;
      const tasks = formatTimelineData(data);
      setTaskData(tasks);
      console.log("task data: ", data);
      console.log("timeline: ", tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTimelineData = (data = []) => {
    const formatData = data.map((item, index) => ({
      id: item?._id,
      name: item?.title,
      start: item?.createdAt,
      end: item?.dueDate ? item?.dueDate : item?.updatedAt,
      progress: item?.progress,
      dependencies: item?.dependencies,
      custom_class: customClasses[index % customClasses.length],
    }));

    return formatData;
  };

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

    getTasksBySelectedProject();
  }, [timelineView]);

  return (
    <div id="app-gantt">
      <svg id="gantt"></svg>
    </div>
  );
};

export default TimelineView;
