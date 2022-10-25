<script lang="ts">
  const bart = new URL("/bart.png", import.meta.url).href;
  const firstEye = new URL("/eye1.png", import.meta.url).href;
  const secondEye = new URL("/eye2.png", import.meta.url).href;
</script>

<div class="bart-container">
  <img id="bart" src={bart} alt="bart" />
  <img id="eye1" src={firstEye} alt="/" />
  <img id="eye2" src={secondEye} alt="/" />
</div>

<style>
  .bart-container {
    position: absolute;
    z-index: -1;
    right: 0;
    top: -12rem;
  }

  #eye1 {
    position: absolute;
    top: 5.5rem;
    left: 5.6rem;
  }

  #eye2 {
    position: absolute;
    top: 5.8rem;
    left: 8rem;
  }
</style>
