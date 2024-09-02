<script>
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { watchingStore } from "../stores/watchingStore";
  import CurrentlyWatchingDetails from "./CurrentlyWatchingDetails.svelte";
</script>

<div class="currently-watching-list">
  {#await $watchingStore then animes}
    {#if animes.length == 0}
      <div in:fade class="no-anime">
        <p>Try adding some animes</p>
      </div>
    {/if}
    {#each animes as anime (anime.id)}
      <!-- {#each $watchingStore as anime (anime.id)} -->
      <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
        <CurrentlyWatchingDetails {anime} />
      </div>
    {/each}
  {/await}
</div>

<style>
  .currently-watching-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    position: relative;
  }

  .no-anime {
    color: var(--text);
    font-family: var(--font);
    font-size: 18px;
    margin: 80px auto;
    position: absolute;
    top: 80px;
    right: 50%;
    transform: translateX(50%);
  }
</style>
