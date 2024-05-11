<script>
  export let span = "null";
</script>

<div class="card {span}">
  <slot></slot>
</div>

<style>
  .card {
    background: var(--card-background);
    padding: 0px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .null {
    max-width: 700px;
  }

  .full {
    width: 100%;
    max-width: 2000px;
  }
</style>
