import create from "zustand";
import { persist } from "zustand/middleware";

// const userStore = create((set) => ({
//   userDetails: {},
//   setUserDetails: (data) => set({ userDetails: data }),
//   clearUserDetails: () => set({ userDetails: null }),
// }));

const userStore = create(
  persist(
    (set) => ({
      userDetails: null,
      setUserDetails: (user) => set({ userDetails: user }),
      clearUserDetails: () => set({ userDetails: null }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export default userStore;
