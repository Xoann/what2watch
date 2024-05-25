<script>
  import { tweened } from "svelte/motion";
  export let anime;

  $: showProgressPercent = anime.nextAiringEpisode
    ? anime.episodes !== null && anime.nextAiringEpisode
      ? Math.floor((100 * anime.nextAiringEpisode.episode) / anime.episodes)
      : 0
    : 0;

  $: userProgressPercent = anime.nextAiringEpisode
    ? anime.episodes !== null
      ? Math.floor((100 * anime.watched) / anime.episodes)
      : Math.floor((100 * anime.watched) / anime.nextAiringEpisode.episode)
    : 0;

  // Tweened percentages
  const tweenedShowProgress = tweened(0);
  const tweenedUserProgress = tweened(0);
  $: tweenedShowProgress.set(showProgressPercent);
  $: tweenedUserProgress.set(userProgressPercent);
</script>

<div class="progress-bar">
  <div
    class="show-progress"
    style="width: {$tweenedShowProgress}%; {anime.episodes === null
      ? 'display: none'
      : ''}"
  >
    <span class="episode-count"
      >{anime.nextAiringEpisode ? anime.nextAiringEpisode.episode : "???"}</span
    >
  </div>
  <div class="user-progress" style="width: {$tweenedUserProgress}%">
    <span class="episode-count">
      {#if anime.watched}
        {anime.watched}
      {/if}
    </span>
  </div>
  {#if anime.episodes}
    <span class="episode-count">
      {#if (anime.episodes && anime.watched != anime.episodes) || (!anime.episodes && anime.watched != anime.nextAiringEpisode.episode)}
        {anime.episodes !== null
          ? anime.episodes
          : anime.nextAiringEpisode.episode}
      {/if}
    </span>
  {/if}
</div>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 5px;
  }

  .progress-bar {
    position: relative;
    height: 30px;
    border: solid 4px var(--text);
    border-radius: 5px;
  }

  .show-progress {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    height: 100%;
    border-right: solid 4px #84ff00ca;
    background-color: rgba(166, 255, 0, 0.377);
  }

  .user-progress {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    height: 100%;
    border-right: solid 4px #00ffffca;
    background-color: rgba(0, 255, 221, 0.377);
  }

  .episode-count {
    color: var(--text);
    font-family: var(--font);
    font-weight: bold;
    font-size: 18px;
  }
</style>
