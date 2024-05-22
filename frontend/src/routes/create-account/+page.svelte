<script>
  import { invalidate } from "$app/navigation";
  import { NEWUSER_URL } from "$lib/js/api-urls.js";
  import { onMount } from "svelte";

  let firstName = "";
  let lastName = "";
  let username = "";
  let password = "";
  let confirmPassword = "";
  let dob = "";
  let description = "";
  let selectedAvatar = "1";
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

  async function handleSubmit() {
    error = false;

    if (password !== confirmPassword) {
      error = true;
      return;
    }
    
    if (description.length > 100) {
      error = true;
      return;
    }

    const response = await fetch(NEWUSER_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, firstName, lastName, dob, description, password })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidate(NEWUSER_URL);
  }

</script>

<svelte:head>
  <title>Create Account</title>
</svelte:head>

<h1>Create Account</h1>

<form on:submit|preventDefault={handleSubmit}>
  <label for="firstName">First Name:</label>
  <input type="text" name="firstName" bind:value={firstName} required />

  <label for="lastName">Last Name:</label>
  <input type="text" name="lastName" bind:value={lastName} required />

  <label for="username">Username:</label>
  <input type="text" name="username" bind:value={username} required />

  <label for="password">Password:</label>
  <input type="password" name="password" bind:value={password} required />

  <label for="confirmPassword">Confirm Password:</label>
  <input type="password" name="confirmPassword" bind:value={confirmPassword} required />

  <label for="dob">Date of Birth:</label>
  <input type="date" name="dob" bind:value={dob} required />

  <label for="description">Description (max 100 characters):</label>
  <textarea name="description" bind:value={description} on:input={adjustTextarea} maxlength="100"></textarea>

  <label for="profileAvatar">Profile Avatar:</label>
  <div>
    <div>

      <label>
        <input type="radio" name="profileAvatar" value="1" group:selected={selectedAvatar} required />
        <img src="logo.png" alt="Profile Icon 1" />
      </label>

      <label>
        <input type="radio" name="profileAvatar" value="2" group:selected={selectedAvatar} required />
        <img src="logo.png" alt="Profile Icon 2" />
      </label>

      <label>
        <input type="radio" name="profileAvatar" value="3" group:selected={selectedAvatar} required />
        <img src="logo.png" alt="Profile Icon 3" />
      </label>
      
      <label>
        <input type="radio" name="profileAvatar" value="4" group:selected={selectedAvatar} required />
        <img src="logo.png" alt="Profile Icon 4" />
      </label>

  <button type="submit">Create Account</button>

  {#if error}
    <span class="error">Could not create account, please try again.</span>
  {/if}
</form>

<style>
  h1 {
      text-align: center;
    }
    
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

  input[type="text"],
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;
  }

  input[type="text"]:focus,
  textarea:focus {
    border-color: #45a049;
    outline: none;
  }
  

  input[type="password"],
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;
  }

  input[type="text"]:focus,
  textarea:focus {
    border-color: #45a049;
    outline: none;
  }

  input[type="date"],
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;
    transition: border-color 0.3s ease;
  }
  
  input[type="date"]:focus,
  textarea:focus {
    border-color: #45a049;
    outline: none;
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

  label {
    display: block;
    margin-bottom: 5px;
  }

  div {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked + img {
    transform: scale(1.1);
  }
</style>
