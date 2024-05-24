<script>
  // Import the DisplayArticles component
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';

  export let data;
</script>

<svelte:head>
  <title>Authentication lab - Home</title>
</svelte:head>

<h1>Home</h1>

{#if data.isLoggedIn}
  <!-- Render DisplayArticles component when logged in -->
  <DisplayArticles />
{:else}
  <p>Hi there! Please login to see your personalized homepage.</p>
{/if}
