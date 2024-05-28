<script>
  import { onMount } from 'svelte';
  import { ART_URL } from '$lib/js/api-urls.js';
  import DisplayComments from '$lib/components/DisplayComments.svelte';
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';
  import UserArticle from '$lib/components/UserArticle.svelte';

  export let data;

  let user_id = data.user_id

  let articles = [];

  async function fetchArticles() {
    try {
      const response = await fetch(`${ART_URL}/${user_id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user articles");
      }
      return articles = await response.json();
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  }

  onMount(async () => {
    articles = await fetchArticles();
  });
</script>

<svelte:head>
  <title>My Articles</title>
</svelte:head>

<h1>My Articles</h1>

{#if articles}
  {#each articles as article}
    <h2>{article.user_id}Articles</h2>
    <p>{article.title}</p>
    <p>{article.text}</p>
    
  {/each}
{:else}
  <p>No user articles found.</p>
{/if}





