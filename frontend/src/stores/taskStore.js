import create from "zustand";
import { persist } from "zustand/middleware";

const taskStore = create(
  persist(
    (set) => ({
      taskDetails: {},
      teamOptionsStore: [],
      dependenciesOptionsStore: [],
      setTaskDetails: (payload) => set({ taskDetails: payload }),
      setTeamOptionsStore: (payload) => set({ teamOptionsStore: payload }),
      setDependenciesOptionsStore: (payload) =>
        set({ dependenciesOptionsStore: payload }),
    }),
    {
      name: "task-storage",
      getStorage: () => localStorage,
    }
  )
);

export default taskStore;
