<script>
  import UserInfoForm from "$lib/components/UserInfoForm.svelte";

  export let data;
</script>

<svelte:head>
  <title>My Profile</title>
</svelte:head>

<h1>My Profile</h1>

{#if data.user}
  <div class="profile-container">
    <UserInfoForm user={data.user} />
  </div>
{/if}

<style>
  /* Profile Container */
  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  /* Form Styles */
  form {
    display: grid;
    gap: 20px;
  }

  label {
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error {
    color: #dc3545;
    font-size: 14px;
  }
</style>
