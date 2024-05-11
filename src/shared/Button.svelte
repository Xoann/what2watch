<script>
  export let type = "primary";
  export let flat = false;
  export let inverse = false;
  export let extraStyle = "";
</script>

<button style={extraStyle} class:flat class:inverse class={type} on:click>
  <slot></slot>
</button>

<style>
  button {
    border: 0;
    cursor: pointer;
    border-radius: 6px;
    padding: 8px 12px;
    font-weight: bold;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  }
  .flat {
    box-shadow: none;
  }
  .primary {
    background: var(--primary);
    color: var(--text);
  }
  .secondary {
    background: var(--secondary);
    color: var(--text);
  }
  .primary.inverse {
    color: var(--primary);
    background: var(--text);
    border: 2px solid var(--primary);
  }
  .secondary.inverse {
    color: var(--secondary);
    background: var(--text);
    border: 2px solid var(--secondary);
  }
</style>
