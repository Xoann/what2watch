import { writable } from "svelte/store";

const getNumBehind = () => {
  const storedData = localStorage.getItem("currentlyWatchingList");
  if (!storedData) {
    return 0;
  }
  const list = storedData ? JSON.parse(storedData) : [];
  let count = 0;
  list.forEach((anime) => {
    if (anime.nextAiringEpisode) {
      if (anime.watched < anime.nextAiringEpisode.episode) {
        count++;
      }
    }
  });
  console.log("Num behind", count);
  return count;
};

const updateNumBehind = () => {
  numBehindStore.set(getNumBehind());
};

const watchingStore = writable([]);
const numBehindStore = writable(getNumBehind());

const saveToLocalStorage = (list) => {
  localStorage.setItem("currentlyWatchingList", JSON.stringify(list));
};

export const addAnime = (anime) => {
  const newAnime = { ...anime, watched: 0, isComplete: false };
  watchingStore.update((list) => {
    const updatedList = [...list, newAnime];
    saveToLocalStorage(updatedList);
    updateNumBehind();
    return updatedList;
  });
};

export const removeAnime = (anime) => {
  watchingStore.update((list) => {
    const updatedList = list.filter((item) => item.id !== anime.id);
    saveToLocalStorage(updatedList);
    updateNumBehind();
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
    updateNumBehind();
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
    updateNumBehind();
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

async function getNextAiringEpisode(animeId) {
  console.log("fetching airing time...");
  const query = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      nextAiringEpisode {
        airingAt
        episode
      }
    }
  }
  `;

  const variables = {
    id: animeId,
  };

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables: variables }),
    });

    if (!response.ok) {
      throw new Error(`Network reponse was not OK: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data.Media.nextAiringEpisode;
  } catch (error) {
    console.error("Error fetching anime data:", error);
  }
}

async function updateNextEpisodes(list) {
  const updatedList = [];
  for (let i = 0; i < list.length; i++) {
    const updatedAnime = await updateNextEpisode(list[i]);
    updatedList.push(updatedAnime);
  }
  return updatedList;
}

async function updateNextEpisode(anime) {
  const now = Math.floor(Date.now() / 1000);

  if (now > anime.nextAiringEpisode.airingAt) {
    const nextAiringEpisode = await getNextAiringEpisode(anime.id);
    const updatedAnime = {
      ...anime,
      nextAiringEpisode: nextAiringEpisode,
    };
    return updatedAnime;
  } else {
    return anime;
  }
}

async function initializeAnimeList() {
  console.log("init anime list");
  const storedData = localStorage.getItem("currentlyWatchingList");
  const animeList = storedData ? JSON.parse(storedData) : [];
  const updatedList = await updateNextEpisodes(animeList);
  saveToLocalStorage(updatedList);
  watchingStore.set(updatedList);
}

initializeAnimeList();

export { watchingStore, numBehindStore };
