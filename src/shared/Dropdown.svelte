<script>
  export let label;
  export let fields;
  export let selectedItem = "";

  let isOpen = false;

  const toggleDropdown = () => {
    isOpen = !isOpen;
  };

  const handleClick = (item) => {
    selectedItem = item;
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={toggleDropdown} class={`dropdown ${isOpen ? "open" : ""}`}>
  <div>
    <span>{label}</span>
    <span>{selectedItem}</span>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="var(--text)"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
  {#if isOpen}
    <div class={"dropdown-content"}>
      {#each fields as field}
        <div class={"field"}>{field}</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown {
    background-color: var(--header-background);
    height: 80px;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    position: relative;
  }

  .open {
    border-radius: 25px 25px 0px 0 !important;
  }

  span {
    color: var(--text);
    font-family: var(--font);
  }

  .field {
    color: var(--text);
    font-family: var(--font);
  }

  svg {
    width: 25px;
    height: 25px;
  }

  .dropdown-content {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    background-color: var(--header-background);
    z-index: 999;
    width: 100%;
    border-radius: 0 0 25px 25px;
    overflow: hidden;
  }

  .dropdown-content div {
    padding: 12px;
    margin: 0;
    cursor: pointer;
    font-size: 14px;
  }
</style>
