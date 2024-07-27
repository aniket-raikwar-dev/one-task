import create from "zustand";
import { persist } from "zustand/middleware";

const projectStore = create(
  persist(
    (set) => ({
      projectDetails: null,
      setProjectDetails: (data) => set({ projectDetails: data }),
      clearProjectDetails: () => set({ projectDetails: null }),
    }),
    {
      name: "project-storage",
      getStorage: () => localStorage,
    }
  )
);

export default projectStore;
