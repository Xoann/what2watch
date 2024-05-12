<script>
  import Header from "./components/Header.svelte";
  import Tabs from "./shared/Tabs.svelte";
  import SeasonalAnimeList from "./components/SeasonalAnimeList.svelte";
  import { themeStore, toggleTheme } from "./stores/themeStore";
  import CurrentlyWatchingList from "./components/CurrentlyWatchingList.svelte";
  import SeasonalAnimeDetails from "./components/SeasonalAnimeDetails.svelte";

  const TABS = ["Seasonal Anime", "Currently Watching"];
  let activeTab = "Seasonal Anime";
  // let activeTab = "Currently Watching";

  const tabChange = (e) => {
    activeTab = e.detail;
  };
</script>

<Header />
<main class={$themeStore}>
  <div class="content">
    <Tabs items={TABS} activeItem={activeTab} on:tabChange={tabChange} />
    {#if activeTab === "Seasonal Anime"}
      <SeasonalAnimeList />
    {:else if activeTab === "Currently Watching"}
      <CurrentlyWatchingList />
    {/if}
  </div>
</main>

<style>
  main {
    width: 100%;
    min-height: 100vh;
    background-color: var(--background);
  }
  .content {
    width: 100%;
    max-width: 1060px;
    margin: 0px auto;
    padding: 40px;
  }
</style>
