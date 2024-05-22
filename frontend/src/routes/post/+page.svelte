<script>
  import { ART_URL } from "$lib/js/api-urls"
  import { invalidate } from "$app/navigation";

  export let data;

  let title = "";
  let text = "";
  let error = false;
  let success = false;
  let username = data.user.username;

  async function handlePost() {
    error = false;
    
    const response = await fetch(ART_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, text, username })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidate(ART_URL);
  }

</script>

<svelte:head>
  <title>Post articles here!</title>
</svelte:head>

<h1>Post</h1>


<form on:submit|preventDefault={handlePost}>
  <label for="title">Title:</label>
  <input type="text" name="title" bind:value={title} required />
  <textarea bind:value={text} rows="12" required />
  <button type="submit">Post!</button>
  {#if error}<span class="error">Could not save!</span>{/if}
  {#if success}<span class="success">Saved!</span>{/if}
</form>
<style>
  form {
    margin: auto;
    max-width: 800px;
    border: 1px dashed green;
    padding: 10px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
  }

  button,
  textarea,
  .error,
  .success {
    grid-column: 1 / 3;
  }

  .error,
  .success {
    font-weight: bold;
    padding: 5px;
    text-align: center;
  }

  .error {
    color: darkred;
    background-color: lightcoral;
  }

  .success {
    color: darkgreen;
    background-color: lightgreen;
  }
</style>
