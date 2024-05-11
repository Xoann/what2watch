import { writable } from "svelte/store";

const initialTheme = localStorage.getItem("theme") || "dark";
export const themeStore = writable(initialTheme);

export const toggleTheme = () => {
  themeStore.update((theme) => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    return newTheme;
  });
};
