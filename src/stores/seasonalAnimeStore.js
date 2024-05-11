import { writable } from "svelte/store";

async function fetchSeasonalAnime(season) {
  let allAnime = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const query = `
          {
            Page(page: ${currentPage}, perPage: 50) {
              pageInfo {
                currentPage
                hasNextPage
              }
              media(season: ${season.season}, seasonYear: ${season.year}, type: ANIME) {
                id
                title {
                  english
                  romaji
                }
                popularity
                format
                isAdult
                startDate {
                  year
                  month
                  day
                }
                episodes
                nextAiringEpisode {
                  episode
                  airingAt
                }
                coverImage {
                  large
                }
              }
            }
          }
        `;

    try {
      const response = await fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not OK: ${response.statusText}`);
      }

      const result = await response.json();
      allAnime = allAnime.concat(result.data.Page.media);
      hasMore = result.data.Page.pageInfo.hasNextPage;
      currentPage++;
      if (currentPage == 10) {
        return allAnime;
      }
    } catch (error) {
      console.error("Error fetching anime data:", error);
    }
  }
  return allAnime;
}

const getSeason = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let season;
  if (month >= 0 && month <= 2) {
    season = "WINTER";
  } else if (month >= 3 && month <= 5) {
    season = "SPRING";
  } else if (month >= 6 && month <= 8) {
    season = "SUMMER";
  } else if (month >= 9 && month <= 11) {
    season = "FALL";
  }

  return { season, year };
};

const isNewSeason = () => {
  const oldSeason = JSON.parse(localStorage.getItem("season")) || {
    season: "",
    year: -1,
  };
  const newSeason = getSeason();
  return !(
    oldSeason.season === newSeason.season && oldSeason.year == newSeason.year
  );
};
// localStorage.removeItem("seasonalAnimeList");

const seasonalAnimeStore = writable([]);

async function initializeSeasonalAnime() {
  const storedData = localStorage.getItem("seasonalAnimeList");

  if (!storedData || isNewSeason()) {
    console.log("fetching...");
    const season = getSeason();
    localStorage.setItem("season", JSON.stringify(season));
    localStorage.removeItem("currentlyWatchingList");

    const animeList = await fetchSeasonalAnime(season);
    localStorage.setItem("seasonalAnimeList", JSON.stringify(animeList));
    seasonalAnimeStore.set(animeList);
  } else {
    console.log("Getting from local storage");
    const storedList = JSON.parse(storedData);
    seasonalAnimeStore.set(storedList);
  }
  sortAnime("Popularity");
}

export const sortAnime = (field) => {
  seasonalAnimeStore.update((animeList) => {
    return [...animeList].sort((a, b) => {
      if (field === "Popularity") {
        return b.popularity - a.popularity;
      } else if (field === "Start Date") {
        const aDate = new Date(
          a.startDate.year,
          a.startDate.month - 1,
          a.startDate.day
        );
        const bDate = new Date(
          b.startDate.year,
          b.startDate.month - 1,
          b.startDate.day
        );
        return aDate - bDate; // Ascending order
      } else if (field === "Title") {
        const aTitle = a.title.romaji.toLowerCase();
        const bTitle = b.title.romaji.toLowerCase();
        return aTitle.localeCompare(bTitle);
      }
    });
  });
};

initializeSeasonalAnime();

export default seasonalAnimeStore;
