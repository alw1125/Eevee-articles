<script>
  import { goto } from "$app/navigation";
  import { AUTH_URL } from "$lib/js/api-urls.js";

  let username = "";
  let password = "";
  let error = false;

  /**
   * Handles logging in by sending a POST request to /api/auth, with the given username and password.
   *
   * If successful, redirect the user back to the homepage. Otherwise, display an error message.
   */
  async function handleSubmit() {
    error = false;
    const response = await fetch(AUTH_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.status === 401) {
      error = true;
    } else {
      goto("/", { invalidateAll: true, replaceState: true });
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label for="username">Username:</label>
  <input type="text" name="username" bind:value={username} required />
  <label for="password">Password:</label>
  <input type="password" name="password" bind:value={password} required />
  <button type="submit">Login</button>
  {#if error}
    <span class="error">Could not log in with those credentials, please try again.</span>
  {/if}
</form>

<style>
  form {
    margin: auto;
    max-width: 500px;
    border: 2px solid #4caf50;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    background-color: #f9f9f9;
  }

  button {
    grid-column: 1 / 3;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #45a049;
  }

  .error {
    grid-column: 1 / 3;
    font-weight: bold;
    color: #ff6347;
    background-color: #ffe4e1;
    padding: 10px;
    text-align: center;
    border-radius: 5px;
  }

  textarea {
    resize: vertical;
  }
</style>
