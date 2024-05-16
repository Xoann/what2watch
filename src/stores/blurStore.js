import { writable } from "svelte/store";

const initialBlur = localStorage.getItem("blur") || "on";
console.log("initial blur", initialBlur);
export const blurStore = writable(initialBlur);

export const toggleBlur = () => {
  blurStore.update((blur) => {
    const newBlur = blur === "on" ? "off" : "on";
    localStorage.setItem("blur", newBlur);
    return newBlur;
  });
};
