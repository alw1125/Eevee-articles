<script>
  import { invalidate } from "$app/navigation";
  import { USER_URL } from "$lib/js/api-urls.js";
  import { createEventDispatcher } from "svelte";


  export let user;

  const dispatch = createEventDispatcher();

  let username = user.username;
  let dob = user.dob;
  let firstName = user.firstName;
  let lastName = user.lastName;
  let desc = user.desc;
  let password = user.password;
  let error = false;
  let success = false;


  //once user clicks save, sends info to backend to be updated.
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
      body: JSON.stringify({ username, dob, firstName, lastName, desc, password })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidate(USER_URL);
  
  dispatch('save');
  }
  
  //cancel editing profile
  function cancel() {
  dispatch('cancel');
  }
</script>

<form on:submit|preventDefault={handleSave}>
  <label for="username">Username:</label>
  <input type="text" name="username" bind:value={username} required />
  <label for="firstName">First name:</label>
  <input type="text" name="firstName" bind:value={firstName} required />
  <label for="lastName">Last name:</label>
  <input type="text" name="lastName" bind:value={lastName} required />
  <label for="dob">Date of birth:</label>
  <input type="text" name="dob" bind:value={dob} required />
  <label for="password">Password:</label>
  <input type="text" name="password" bind:value={password} required />
  <textarea bind:value={desc} rows="12" required />
  <button type="submit">Save</button>
  <button type="button" on:click={cancel}>Cancel</button>
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