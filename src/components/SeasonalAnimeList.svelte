<script>
  import { sortAnime } from "../stores/seasonalAnimeStore";
  import seasonalAnimeStore from "../stores/seasonalAnimeStore";
  import SeasonalAnimeDetails from "./SeasonalAnimeDetails.svelte";

  let searchQuery = "";

  const animeFormats = ["All", "TV", "MOVIE", "OVA", "ONA", "SPECIAL"];
  let formatFilter = "All";

  const animeSortingFields = ["Popularity", "Start Date", "Title"];
  let animeSort = "Popularity";

  $: filters = { format: formatFilter };

  const isFiltered = (anime, filter) => {
    if (filter.format === "All") {
      return true;
    }

    return anime.format === filter.format;
  };

  const isSearched = (anime, searchQuery) => {
    if (searchQuery === "") {
      return true;
    }
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const englishTitle = anime.title.english?.toLowerCase() || "";
    const romajiTitle = anime.title.romaji?.toLowerCase() || "";

    return (
      englishTitle.includes(normalizedQuery) ||
      romajiTitle.includes(normalizedQuery)
    );
  };

  const handleSelectSort = () => {
    sortAnime(animeSort);
  };
</script>

<div class="search-area">
  <div class="search-bar">
    <input type="text" placeholder="Search anime..." bind:value={searchQuery} />
  </div>
  <div class="search-tools">
    <div class="search-tool">
      <div class="tool-type">
        <p>Filter by:</p>
      </div>
      <select bind:value={formatFilter}>
        {#each animeFormats as format}
          <option value={format}>{format}</option>
        {/each}
      </select>
    </div>

    <div class="search-tool">
      <div class="tool-type">
        <p>Sort by:</p>
      </div>
      <select bind:value={animeSort} on:change={handleSelectSort}>
        {#each animeSortingFields as sortingField}
          <option value={sortingField}>{sortingField}</option>
        {/each}
      </select>
    </div>
  </div>
</div>

<div class="seasonal-anime-list">
  {#each $seasonalAnimeStore as anime (anime.id)}
    {#if isSearched(anime, searchQuery) && isFiltered(anime, filters)}
      <div>
        <SeasonalAnimeDetails {anime} />
      </div>
    {/if}
  {/each}
</div>

<style>
  .seasonal-anime-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  @media (max-width: 1400px) {
    .seasonal-anime-list {
      grid-template-columns: 1fr;
      place-items: center;
    }
  }

  .search-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 3rem;
  }

  .search-bar {
    position: relative;
    width: 100%;
    height: 60px;
    max-width: 600px;
    margin: 20px auto;
    margin-bottom: 30px;
    display: flex;
    border: 4px solid var(--header-background);
    border-radius: 2500px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    /* overflow: hidden; */
  }

  .search-tool {
    display: flex;
    border: 4px solid var(--header-background);
    border-radius: 200px;
    overflow: hidden;
  }

  .tool-type {
    padding: 0px 15px;
  }

  .search-tools {
    color: var(--text);
    font-family: var(--font);
    display: flex;
    gap: 1rem;
  }

  .search-tools select {
    position: relative;
    background-color: var(--header-background);
    color: var(--text);
    cursor: pointer;
    outline: none;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 15px;
    font-weight: bold;
  }

  .search-tools select:focus {
    /* border-bottom-right-radius: 0; */
  }

  .search-tools select option {
    outline: none;
    border: none;
    background-color: transparent;
  }

  .search-bar input {
    background-color: transparent;
    width: 100%;
    padding: 0px 35px;
    height: 100%;
    font-size: 24px;
    color: var(--text);
    border: none;
    transition: all 300ms ease;
  }

  .search-bar input:focus {
    border-color: var(--primary);
    outline: none;
  }

  .search-bar input::placeholder {
    color: var(--header-background);
    opacity: 1;
  }
</style>
