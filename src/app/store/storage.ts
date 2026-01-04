import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem(_key: string) { return Promise.resolve(null); },
  setItem(_key: string, value: string) { return Promise.resolve(value); },
  removeItem(_key: string) { return Promise.resolve(); },
});

export const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")   // or "session"
    : createNoopStorage();