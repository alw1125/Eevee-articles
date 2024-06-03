<script>
  import { onMount } from 'svelte';
  import { USER_URL } from '$lib/js/api-urls.js';
  import { decodeHtml, formatDate } from '$lib/js/utils';

  export let data;

  let user_id = data.user.user_id;
  let articles = [];
  // let sortBy = 'date';

  async function fetchArticles() {
    try {
      const response = await fetch(`${USER_URL}/${user_id}/articles`);
      if (!response.ok) {
        throw new Error("Failed to fetch user articles");
      }
      let data = await response.json();
            data.forEach(article => {
                article.text = decodeHtml(article.text);
                article.date = formatDate(article.date); 
              
            });
          
            return data;
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }
  
    onMount(async () => {
      articles = await fetchArticles();
    });
  </script>
  
  <svelte:head>
    <title>Articles</title>
</svelte:head>

<div class="sidebar">

</div>


{#if articles.length > 0}
<div class="profile-container">
  <h1>{data.user.username}'s Articles</h1>
</div>
  <div class="articles-container">
    {#each articles as article}
    <button onclick={`window.location.href='/${article.article_id}'`} class="article-tile">
      <h2 class="article-title">{article.title}</h2>
      <p class="author-name">{article.username}</p>
      <p class="article-date">{article.date}</p>
  </button>
    {/each}
  </div>
{:else}
  <p>No user articles found.</p>
{/if}



<style>

:global(html),
  :global(body),
  .articles-container,
  .article-tile,
  .author-name,
  .article-date {
    zoom: 0.9; /* Adjust the zoom level as needed */
  }

  .profile-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 30%;
    margin-top: 50px;
    margin-bottom: 40px;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    text-align: center;
    margin-left: -70px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px); 

  }

  .articles-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-left: 35%; /* Start 30% from left */
    width: 80%; /* Take up 70% of the available width */
    max-height: 80vh; /* Set maximum height for the container */
    margin-top: -80px;
    overflow-y: auto; /* Enable vertical scrollbar */
    padding-right: 0px; /* Add some padding to prevent content from overlapping with the scrollbar */
    margin-right: -15px;
  }
  /* Style the scrollbar */
  .articles-container::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
  }

  /* Track */
  .articles-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1); /* Background color of the scrollbar track */
    border-radius: 8px; /* Border radius of the scrollbar track */
  }

   /* Handle */
    .articles-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3); /* Background color of the scrollbar handle */
    border-radius: 8px; /* Border radius of the scrollbar handle */
  }

    /* Hover style for scrollbar handle */
    .articles-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5); /* Adjust hover color */
  }

  .article-tile {
    width: calc(26%); /* Two tiles per line with a 20px gap between them */
    margin-bottom: 40px;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    text-align: left;
    transition: transform 0.3s ease;
    margin-right: 50px; /* Adjust the margin-right for the gap */
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px); 
  }

  .article-tile:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .article-title{
    font-size: 1.2em;
  }

  .article-date {
    font-style: italic;
    align-self: flex-end;
    font-size: 0.8em;
  }

  .author-name {
    font-size: 1.0em;
    font-style: italic;
  }

</style>
