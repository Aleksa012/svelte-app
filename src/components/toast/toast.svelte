<svelte:options accessors />

<script lang="ts">
  import { fly } from "svelte/transition";

  export let message: string;
  export let status: "invalid" | "success";
  let showToast: boolean = false;

  export function onShowToast() {
    showToast = !showToast;
  }

  $: endToast = (() => {
    if (showToast) {
      setTimeout(() => {
        showToast = false;
      }, 2000);
    }
  })();
</script>

{#if showToast}
  <div transition:fly={{ x: -200, duration: 500 }} class="toast">
    <div class="wrapper">
      <h2 class:error={status === "invalid"}>
        {status === "invalid" ? "Oops!" : "Yay!"}
      </h2>
      <p>{message}</p>
    </div>
    <div class="bar" />
  </div>
{/if}

<style>
  @keyframes expire {
    from {
      width: 100%;
    }

    to {
      width: 0px;
    }
  }
  .toast {
    background-color: white;
    width: 25rem;
    margin: 1rem;
    box-shadow: 0 0 1rem black;
    position: relative;
    padding: 2rem;
    box-sizing: border-box;
    border-radius: 10px;
    position: absolute;
    top: 0.5rem;
    left: 0;
  }
  .wrapper {
    margin: -1.5rem 0;
  }
  h2 {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    color: green;
  }

  h2.error {
    color: red;
  }

  p {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 1.1rem;
    letter-spacing: 1px;
    margin-top: -0.5rem;
    color: grey;
    word-break: break-all;
  }
  p::first-letter {
    text-transform: capitalize;
  }

  .bar {
    position: absolute;
    width: 0px;
    height: 0.4rem;
    border-radius: 0 0 10px 10px;
    background-color: brown;
    left: 0;
    bottom: 0;
    animation: expire 2s linear;
  }
</style>
