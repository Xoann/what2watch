import { writable } from "svelte/store";

const getInitialAnimeList = () => {
  const storedData = localStorage.getItem("currentlyWatchingList");
  return storedData ? JSON.parse(storedData) : [];
};

const watchingStore = writable(getInitialAnimeList());

const saveToLocalStorage = (list) => {
  localStorage.setItem("currentlyWatchingList", JSON.stringify(list));
};

export const addAnime = (anime) => {
  const newAnime = { ...anime, watched: 0, isComplete: false };
  watchingStore.update((list) => {
    const updatedList = [...list, newAnime];
    saveToLocalStorage(updatedList);
    return updatedList;
  });
};

export const removeAnime = (anime) => {
  watchingStore.update((list) => {
    const updatedList = list.filter((item) => item.id !== anime.id);
    saveToLocalStorage(updatedList);
    return updatedList;
  });
};

export const watchEpisode = (anime) => {
  if (
    (anime.nextAiringEpisode &&
      anime.watched >= anime.nextAiringEpisode.episode) ||
    anime.watched >= anime.episodes
  ) {
    return;
  }
  watchingStore.update((list) => {
    const updatedList = list.map((item) => {
      if (item.id === anime.id) {
        const isComplete = anime.watched == anime.episodes - 1;
        return { ...item, watched: item.watched + 1, isComplete: isComplete };
      }
      return item;
    });
    saveToLocalStorage(updatedList);
    return updatedList;
  });
};

export const unwatchEpisode = (anime) => {
  if (anime.watched == 0) {
    return;
  }
  watchingStore.update((list) => {
    const updatedList = list.map((item) => {
      if (item.id === anime.id) {
        return { ...item, watched: item.watched - 1, isComplete: false };
      }
      return item;
    });
    saveToLocalStorage(updatedList);
    return updatedList;
  });
};

export const isWatchingAnime = (anime) => {
  let isWatching = false;
  watchingStore.subscribe((list) => {
    isWatching = list.some((item) => item.id === anime.id);
  });
  return isWatching;
};

export default watchingStore;
