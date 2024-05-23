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
