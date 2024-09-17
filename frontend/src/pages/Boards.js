import React, { useCallback, useEffect, useState } from "react";
import BoardCard from "../components/BoardCard";
import SearchBar from "../components/SearchBar";
import NewTaskDrawer from "../components/NewTaskDrawer";
import api from "../services/api";
import projectStore from "../stores/projectStore";
import taskStore from "../stores/taskStore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { debounce } from "lodash";
import TaskSorter from "../components/TaskSorter";

const Boards = () => {
  const [open, setOpen] = useState(false);
  const [dependenciesOptions, setDependenciesOptions] = useState([]);
  const [isNewTask, setIsNewTask] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [columns, setColumns] = useState({
    "To Do": [],
    "In Progress": [],
    "In Review": [],
    Done: [],
  });
  const [managerId, setManagerId] = useState("");
  const { selectedProjectId } = projectStore();
  const { setTeamOptionsStore, setDependenciesOptionsStore } = taskStore();

  const showDrawer = (boolean) => {
    setOpen(true);
    setIsNewTask(boolean);
  };

  const onClose = () => {
    setOpen(false);
  };

  const getTasksBySelectedProject = async () => {
    try {
      const resp = await api.get(`/task/${selectedProjectId}`);
      const { data } = resp?.data;
      const newColumns = {
        "To Do": data.filter((task) => task.status === "To Do"),
        "In Progress": data.filter((task) => task.status === "In Progress"),
        "In Review": data.filter((task) => task.status === "In Review"),
        Done: data.filter((task) => task.status === "Done"),
      };
      setColumns(newColumns);
      const formatOptions = formatDependenciesOptions(data);
      setDependenciesOptions(formatOptions);
      setDependenciesOptionsStore(formatOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDependenciesOptions = (tasks = []) => {
    return tasks.map((task) => ({
      label: task?.title,
      value: task?._id,
    }));
  };

  const getSelectedProjectTeamsData = async () => {
    try {
      const resp = await api.get(`/project/details/${selectedProjectId}`);
      const { data } = resp?.data;
      setManagerId(data?.manager?.id);
      const teamsData = formattedTeamMemberData(data?.teamMembers);
      setTeamOptions(teamsData);
      setTeamOptionsStore(teamsData);
    } catch (error) {
      console.log(error);
    }
  };

  const formattedTeamMemberData = (data) => {
    const formattedTeam = data?.map((user) => ({
      value: user._id,
      label: user.fullName,
      profile: user.profilePhoto,
    }));

    return formattedTeam;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If the user drops outside a droppable area
    if (!destination) return;

    // If the user drops in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const [reorderedItem] = columns[source.droppableId].splice(source.index, 1);

    // Update task status
    reorderedItem.status = destination.droppableId;

    // Adding the item to the destination
    columns[destination.droppableId].splice(
      destination.index,
      0,
      reorderedItem
    );

    setColumns({ ...columns });
    debouncedUpdate();
  };

  const debouncedUpdate = debounce(async () => {
    try {
      await api.put(`/task/update/bulk/status/${selectedProjectId}`, {
        columns,
      });
    } catch (error) {
      console.log(error);
    }
  }, 2000);

  useEffect(() => {
    getTasksBySelectedProject();
    getSelectedProjectTeamsData();
  }, []);

  const handleTaskUpdate = () => {
    getTasksBySelectedProject();
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filterAndSortTasks = (tasks) => {
    let filteredTasks = tasks;

    if (selectedMembers.length > 0) {
      filteredTasks = filteredTasks.filter((task) =>
        selectedMembers.includes(task?.assignee?._id)
      );
    }

    if (searchInput) {
      filteredTasks = filteredTasks.filter((task) =>
        task?.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    return filteredTasks;
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="page-title">Boards</h2>
        <div className="flex">
          <TaskSorter
            teamMembers={teamOptions}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
          <SearchBar
            searchInput={searchInput}
            handleSearchInputChange={handleSearchInputChange}
          />
          <div className="btn-create ml-3" onClick={() => showDrawer(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
            </svg>
            New Task
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <div key={columnId} className="board-box">
              <div className="flex items-center border-b pb-2">
                <div
                  className={`board-circle ${columnId
                    .toLowerCase()
                    .replace(" ", "-")}`}
                ></div>
                <h2 className="font-medium">
                  {columnId} <span className="board-num">({tasks.length})</span>
                </h2>
              </div>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="draggable-area"
                  >
                    {filterAndSortTasks(tasks).map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <BoardCard task={task} showDrawer={showDrawer} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
      <NewTaskDrawer
        open={open}
        isNewTask={isNewTask}
        onClose={onClose}
        teamOptions={teamOptions}
        projectId={selectedProjectId}
        managerId={managerId}
        dependenciesOptions={dependenciesOptions}
        onTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default Boards;
