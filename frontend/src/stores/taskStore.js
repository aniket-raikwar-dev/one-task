import create from "zustand";
import { persist } from "zustand/middleware";

const taskStore = create(
  persist(
    (set) => ({
      taskDetails: {},
      setTaskDetails: (payload) => set({ taskDetails: payload }),
    }),
    {
      name: "task-storage",
      getStorage: () => localStorage,
    }
  )
);

export default taskStore;
