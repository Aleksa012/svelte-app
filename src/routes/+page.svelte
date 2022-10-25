<script lang="ts">
  import type { ToastProps } from "src/types/toast";
  import Toast from "../components/toast/toast.svelte";

  let toast: ToastProps;

  const handleClick = () => {
    toast.onShowToast();
  };
</script>

<h1>Hello</h1>
<Toast message="User doesn't exist" status="invalid" bind:this={toast} />
<button on:click={handleClick}>show</button>
