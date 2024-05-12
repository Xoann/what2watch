<script>
  import { createEventDispatcher } from "svelte/internal";
  import { numBehindStore } from "../stores/watchingStore";
  let dispatch = createEventDispatcher();

  export let items;
  export let activeItem;

  $: console.log($numBehindStore);
</script>

<div class="tabs">
  <ul>
    {#each items as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li on:click={() => dispatch("tabChange", item)}>
        <div class="tab" class:active={item === activeItem}>
          <span>{item}</span>
          {#if item === "Currently Watching" && $numBehindStore}
            <div class="notif">
              <span>{$numBehindStore}</span>
            </div>
          {/if}
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .tabs {
    margin-bottom: 40px;
  }
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }
  li {
    margin: 0 16px;
    font-size: 24px;
    font-family: var(--font);
    color: #555;
    cursor: pointer;
  }
  .active {
    color: var(--primary);
    border-bottom: 2px solid var(--primary);
    padding-bottom: 8px;
  }

  .tab {
    position: relative;
  }

  .notif {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 100px;
    width: 20px;
    height: 20px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(50%, -50%);
  }

  .notif span {
    color: var(--text);
    font-family: var(--font);
    font-size: 16px;
  }
</style>
