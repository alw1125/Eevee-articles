<script>
  import { invalidate } from "$app/navigation";
  import { USER_URL } from "$lib/js/api-urls.js";
  import { onMount } from "svelte";
  export let user;

  let firstName = user.firstName;
  let lastName = user.lastName;
  let desc = user.desc;
  let error = false;
  let success = false;

  function adjustTextarea() {
    const textarea = document.querySelector('textarea[name="description"]');
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + "px"; 
  }
  onMount(() => {
    adjustTextarea();
  });

  async function handleSave() {
    error = false;
    success = false;

    if (desc.length > 100) {
      error = true;
      return;
    }

    const response = await fetch(USER_URL, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, desc })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidate(USER_URL);
  }
</script>

<form on:submit|preventDefault={handleSave}>
  <label for="firstName">First name:</label>
  <input type="text" name="firstName" bind:value={firstName} required />
  <label for="lastName">Last name:</label>
  <input type="text" name="lastName" bind:value={lastName} required />
  <label for="description">Description (max 100 characters):</label>
  <textarea name="description" bind:value={desc} on:input={adjustTextarea} maxlength="100"></textarea>
  <button type="submit">Save</button>
  {#if error}<span class="error">Could not save!</span>{/if}
  {#if success}<span class="success">Saved!</span>{/if}
</form>

<style>

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 15px;
    font-size: 16px;
    transition: border-color 0.3s ease;
  }

  input[type="text"]:focus,
  textarea:focus {
    border-color: #45a049;
    outline: none;
  }

  button {
    width: 100%;
    padding: 10px 0;
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
    color: #dc3545;
    background-color: #f8d7da;
  }
  textarea {
    resize: vertical;
  }
</style>