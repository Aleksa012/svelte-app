<script lang="ts">
  import { movingBart } from "../../util/movingBart";
  import Bart from "../../components/bart/bart.svelte";
  import { applyAction, enhance } from "$app/forms";
  import { setUser } from "../../services/+instance";
  import Toast from "../../components/toast/toast.svelte";
  import type { ToastProps } from "src/types/toast";

  export let form: any;

  let toastStatus: "invalid" | "success";
  let toastMessage: string;

  let toast: ToastProps;

  const handleShowToast = (message: string, status: "invalid" | "success") => {
    toastMessage = message;
    toastStatus = status;
    toast.onShowToast();
  };
</script>

<div on:mousemove={movingBart} class="background">
  <form
    use:enhance={({ form }) => {
      return async ({ result, update }) => {
        if (result.type === "success") {
          form.reset();
          setUser(result.data?.user);
          handleShowToast(result.data?.message, result.type);
        }
        if (result.type === "invalid" && result.status === 400) {
          form.reset();
          await applyAction(result);
          handleShowToast(result.data?.message, result.type);
        }
        update();
      };
    }}
    method="POST"
    class="form"
  >
    <h2 class="title">Log In</h2>
    <input
      value={form?.name || ""}
      name="name"
      placeholder="name"
      class="input"
    />
    {#if form?.error === "name"}
      <p>{form.message}</p>
    {/if}
    <input name="password" placeholder="password" class="input" />
    {#if form?.error === "password"}
      <p>{form.message}</p>
    {/if}
    <button class="btn">LOG IN</button>
    <span class="link">register</span>
    <span class="link">forgot pass?</span>
    <Bart />
  </form>
  <Toast message={toastMessage || ""} status={toastStatus} bind:this={toast} />
</div>

<style>
  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(237, 94, 94);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    z-index: -2;
  }

  .form {
    position: relative;
    width: 30rem;
    height: 30rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem black;
    display: flex;
    flex-direction: column;
    padding: 2rem 4rem;
    align-items: center;
    margin-bottom: -10rem;
  }

  .title {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 2rem;
    font-weight: bold;
    text-decoration: underline;
  }

  .input {
    width: 100%;
    margin: 1rem 0;
    height: 2rem;
    border: none;
    border-bottom: 2px solid brown;
    outline: none;
    font-size: 1.4rem;
  }
  .btn {
    margin-top: auto;
    margin-bottom: 3rem;
    height: 3rem;
    width: 50%;
    border: 2px solid brown;
    font-weight: bold;
    transition: all 0.4s;
    cursor: pointer;
    border-radius: 8px;
  }
  .btn:hover {
    background-color: rgb(237, 94, 94);
    color: white;
  }

  .link {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .link:hover {
    color: rgb(237, 94, 94);
  }
</style>
