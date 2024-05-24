<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { ART_URL } from "$lib/js/api-urls.js";

  $: articles = [];

  async function fetchArticles() {
    try {
      const response = await fetch(ART_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  onMount(async() => {
    articles = await fetchArticles();
  });

</script>

<svelte:head>
  <title>My Articles</title>
</svelte:head>

<h1>My Articles</h1>
{#if articles.length > 0}
  <ul>
    {#each articles as article}
      <li>
        <h2>{article.title}</h2>
        {article.text}
        <p>Author: {article.username}</p>
        <p>Date: {article.date}</p>
      </li>
    {/each}
  </ul>
{:else}
  <p>No articles found.</p>
{/if}

