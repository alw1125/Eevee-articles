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
  h1 {
      text-align: center;
    }

  .profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

</style>
