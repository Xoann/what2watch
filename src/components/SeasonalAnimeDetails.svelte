<script>
  import Card from "../shared/Card.svelte";
  import Button from "../shared/Button.svelte";
  import {
    addAnime,
    removeAnime,
    isWatchingAnime,
  } from "../stores/watchingStore";
  import { blurStore } from "../stores/blurStore";

  export let anime;

  $: isBlurred = anime.isAdult && $blurStore === "on";

  let isWatching = isWatchingAnime(anime);

  const toggleWatch = () => {
    if (isWatching) {
      removeAnime(anime);
    } else {
      addAnime(anime);
    }
    isWatching = !isWatching;
  };

  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[monthNumber - 1];
  }

  const getDateEnding = (day) => {
    if (day == 1) {
      return "st";
    } else if (day == 2) {
      return "nd";
    } else if (day == 3) {
      return "rd";
    } else {
      return "th";
    }
  };
</script>

<Card>
  <div class="anime">
    <div class="cover-image">
      <img
        src={anime.coverImage.large}
        alt="Anime cover"
        class={isBlurred ? "blurred" : ""}
      />
    </div>
    <div class="anime-details">
      <h3>{anime.title.romaji}</h3>
      <h4>{anime.title.english || ""}</h4>
      <span
        >Episodes: {anime.episodes ||
          (anime.nextAiringEpisode
            ? `${anime.nextAiringEpisode.episode} (released)`
            : "???")}</span
      ><br />
      <span
        >Start Date: {getMonthName(anime.startDate.month)}
        {anime.startDate.day}{getDateEnding(anime.startDate.day)}</span
      ><br />
      <Button on:click={toggleWatch} type={isWatching ? "secondary" : "primary"}
        >{isWatching ? "Drop" : "Watch"}</Button
      >
    </div>
  </div>
</Card>

<style>
  .blurred {
    filter: blur(10px);
    transition: filter 300ms;
  }

  .anime {
    display: grid;
    grid-template-columns: 4fr 5fr;
    gap: 30px;
    height: 350px;
    width: 600px;
  }
  .cover-image {
    /* height: 100%; */
    width: 100%;
    overflow: hidden;
    object-fit: cover;
  }
  .cover-image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  h3,
  h4,
  span {
    color: var(--text);
    font-family: var(--font);
  }

  h3 {
    font-size: 32px;
    margin: 20px auto 5px auto;
  }

  h4 {
    font-size: 18px;
    margin: 0;
  }
</style>
