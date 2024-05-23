<script>
  export let data;
</script>

<svelte:head>
  <title>Authentication lab - Home</title>
</svelte:head>

<h1>Home</h1>

{#if data.isLoggedIn}
  <p>Hi {data.user.firstName}! Welcome to your personalized homepage!</p>
  <p> This is your profile picture.</p>
  <img src = {data.user.avatar} alt = "hi"/>
{:else}
  <p>Hi there! Please login to see your personalized homepage.</p>
  
{/if}

