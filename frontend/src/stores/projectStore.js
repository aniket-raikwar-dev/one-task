import create from "zustand";
import { persist } from "zustand/middleware";

const projectStore = create(
  persist(
    (set) => ({
      projectDetails: null,
      isProjectSelected: false,
      projectStoreList: [],
      selectedProjectId: "",
      setProjectDetails: (payload) => set({ projectDetails: payload }),
      clearProjectDetails: () => set({ projectDetails: null }),
      setProjectSelected: (payload) => set({ isProjectSelected: payload }),
      setProjectStoreList: (payload) => set({ projectStoreList: payload }),
      setSelectedProjectId: (payload) => set({ selectedProjectId: payload }),
    }),
    {
      name: "project-storage",
      getStorage: () => localStorage,
    }
  )
);

export default projectStore;
