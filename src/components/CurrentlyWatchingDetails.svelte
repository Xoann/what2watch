<script>
  import Button from "../shared/Button.svelte";
  import Card from "../shared/Card.svelte";
  import ProgressBar from "../shared/ProgressBar.svelte";
  import {
    addAnime,
    removeAnime,
    watchEpisode,
    unwatchEpisode,
    isWatchingAnime,
  } from "../stores/watchingStore";
  export let anime;

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

  const getDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.getDate();
  };
  const getMonth = (timestamp) => {
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
    const date = new Date(timestamp * 1000);
    return monthNames[date.getMonth()];
  };
  const getWeekday = (timestamp) => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(timestamp * 1000);
    return dayNames[date.getDay()];
  };
  const getHour = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.getHours();
  };
  const getMin = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.getMinutes();
  };

  const handleWatchClick = () => {
    watchEpisode(anime);
  };

  const handleUnatchClick = () => {
    unwatchEpisode(anime);
  };

  const handleDropClick = () => {
    removeAnime(anime);
  };
</script>

<Card span={"full"}>
  <div class="anime">
    {#if anime.isComplete}
      <div class="complete"><span>COMPLETE</span></div>
    {/if}
    <div class="cover-image">
      <img src={anime.coverImage.large} alt="anime cover" />
    </div>
    <!-- <div class="anime-details"> -->
    <div class="titles">
      <div class="titles-container">
        <h3>{anime.title.romaji}</h3>
        <h4>{anime.title.english || ""}</h4>
      </div>
    </div>

    <div class="progress">
      <ProgressBar {anime} />
      {#if anime.nextAiringEpisode}
        {#if anime.watched == anime.nextAiringEpisode.episode}
          <p>
            Next episode: {getWeekday(anime.nextAiringEpisode.airingAt)},
            {getMonth(anime.nextAiringEpisode.airingAt)}
            {getDate(anime.nextAiringEpisode.airingAt)}{getDateEnding(
              getDate(anime.nextAiringEpisode.airingAt)
            )}
          </p>
        {:else if anime.nextAiringEpisode.episode - anime.watched == 1}
          <p>New episode is out!</p>
        {:else}
          <p>
            You are {anime.nextAiringEpisode.episode - anime.watched} episodes behind.
          </p>
        {/if}
      {/if}
    </div>
    <div class="buttons">
      <div class="buttons-container">
        <Button on:click={handleWatchClick}>+</Button>
        <Button on:click={handleUnatchClick}>-</Button>

        <Button
          extraStyle="grid-column-start: 1; grid-column-end: 3"
          on:click={handleDropClick}>Drop</Button
        >
      </div>
    </div>
  </div>
  <!-- </div> -->
</Card>

<style>
  .anime {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    position: relative;
    /* gap: 20px; */
  }

  .complete {
    position: absolute;
    background-color: var(--accent);
    color: var(--text);
    font-family: var(--font);
    font-weight: bold;
    font-size: 18px;
    padding: 5px 15px;
    border-radius: 0 0 6px 0;
  }

  .anime-details {
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
  }

  .cover-image {
    display: flex;
    justify-content: center;
    height: 150px;
    width: 100px;
    flex-shrink: 0;
    overflow: hidden;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .cover-image img {
    height: auto;
    width: 100%;
    object-fit: cover;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-start: 10;
    grid-column-end: 11;
  }

  .buttons-container {
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .progress {
    display: flex;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    grid-column-start: 6;
    grid-column-end: 10;
  }

  .titles {
    padding: 0 10px;
    grid-column-start: 2;
    grid-column-end: 6;
  }

  .titles-container {
  }

  h3,
  h4,
  p {
    font-family: var(--font);
    color: var(--text);
  }
</style>
