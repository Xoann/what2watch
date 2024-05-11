<script>
  import watchingStore from "../stores/watchingStore";

  export let anime;

  $: showProgressPercent = Math.floor(
    (100 * anime.nextAiringEpisode.episode) / anime.episodes
  );
  $: userProgressPercent = Math.floor((100 * anime.watched) / anime.episodes);
</script>

<div class="progress-bar">
  <div class="show-progress" style="width: {showProgressPercent}%">
    <span class="episode-count">{anime.nextAiringEpisode.episode}</span>
  </div>
  <div class="user-progress" style="width: {userProgressPercent}%">
    <span class="episode-count">
      {#if anime.watched}
        {anime.watched}
      {/if}
    </span>
  </div>
  <span class="episode-count">{anime.episodes}</span>
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
