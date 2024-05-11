<script>
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import watchingStore from "../stores/watchingStore";
  import CurrentlyWatchingDetails from "./CurrentlyWatchingDetails.svelte";
</script>

<div class="currently-watching-list">
  {#each $watchingStore as anime (anime.id)}
    <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
      <CurrentlyWatchingDetails {anime} />
    </div>
  {/each}
</div>

<style>
  .currently-watching-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
  }
</style>
