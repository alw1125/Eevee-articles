<script>
  import { onMount } from "svelte";
  import { ART_URL } from "$lib/js/api-urls.js";
  import { decodeHtml, formatDate } from "$lib/js/utils";
  import SearchBar from "./SearchBar.svelte";
  import { page } from "$app/stores";

  let articles = [];
  let sortBy = "date";
  let activeSortOption = "";
  let originalSortBy = "date";
  $: q = $page.url.searchParams.get("q");

  async function fetchArticles() {
    try {
      const response = await fetch(ART_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      let data = await response.json();
      data.forEach((article) => {
        article.text = decodeHtml(article.text);
        article.date = formatDate(article.date);
      });

      if (sortBy === "date") {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy === "username") {
        data.sort((a, b) => a.username.localeCompare(b.username));
      } else if (sortBy === "title") {
        data.sort((a, b) => a.title.localeCompare(b.title));
      }

      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  async function sortArticles(option) {
    if (sortBy === option) {
      // If the same option is clicked again, reset sortBy and activeSortOption to default
      sortBy = "date";
      activeSortOption = "";
    } else {
      sortBy = option;
      activeSortOption = option;
      originalSortBy = option; // Update original state
    }
    articles = await fetchArticles();
  }

  onMount(async () => {
    articles = await fetchArticles();
  });
</script>

<svelte:head>
  <title>Articles</title>
</svelte:head>


<div class="toolbar">
  <SearchBar />
  <div class="sort-buttons">
    <span class="sort-text">Sort:</span>
    <button
      class="sort-button {activeSortOption === 'username' ? 'active' : ''}"
      on:click={() => sortArticles("username")}>Username</button
    >
    <button
      class="sort-button {activeSortOption === 'title' ? 'active' : ''}"
      on:click={() => sortArticles("title")}>Title</button
    >
    <button
      class="sort-button {activeSortOption === 'date' ? 'active' : ''}"
      on:click={() => sortArticles("date")}>Date</button
    >
  </div>
</div>

<div class="articles-container">
  {#if q != null && articles.length > 0}
    <div>
      {#each articles as article}
        {#if article.text.toLowerCase().includes(q) || article.title
            .toLowerCase()
            .includes(q) || article.username.toLowerCase().includes(q)}
          <button onclick={`window.location.href='/${article.article_id}'`} class="article-tile">
            <h2 class="article-title">{article.title}</h2>
            <p class="author-name">{article.username}</p>
            <p class="article-date">{article.date}</p>
          </button>
        {/if}
      {/each}
    </div>
  {/if}

  {#if q == null && articles.length > 0}
    <div>
      {#each articles as article}
        <button onclick={`window.location.href='/${article.article_id}'`} class="article-tile">
          <h2 class="article-title">{article.title}</h2>
          <p class="author-name">{article.username}</p>
          <p class="article-date">{article.date}</p>
        </button>
      {/each}
    </div>
  {/if}
</div>

{#if articles.length <= 0}
  <p>No articles found.</p>
{/if}

<style>
  :global(html),
  :global(body),
  .toolbar,
  .articles-container,
  .sort-buttons,
  .sort-text,
  .sort-button,
  .article-tile,
  .author-name,
  .article-date {
    zoom: 0.9; /* Adjust the zoom level as needed */
  }

  .articles-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-height: 83vh; /* Set maximum height for the container */
    margin-top: 60px;
    overflow-y: auto; /* Enable vertical scrollbar */
    padding-right: 20px; /* Add some padding to prevent content from overlapping with the scrollbar */
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

    width: 400px;
    margin-top: 5px;
    margin-bottom: 15px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    text-align: left;
    transition: transform 0.3s ease;
    margin-right: 20px;
    margin-left: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    overflow: hidden; /* Ensure the pseudo-element doesn't overflow */
  }

  .article-tile::before {
    content: "";
    position: absolute;
    top: -10px; /* Adjust the position of the glow */
    left: -10px; /* Adjust the position of the glow */
    width: calc(100% + 20px); /* Extend the width of the glow */
    height: calc(100% + 20px); /* Extend the height of the glow */
    background: radial-gradient(
      rgba(255, 255, 255, 0.2) 40%,
      transparent 70%
    ); /* Adjust the color and opacity of the glow */
    border-radius: 10px; /* Adjust the radius of the gradient */
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .article-tile:hover::before {
    opacity: 1;
  }

  .article-tile:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .article-title {
    font-size: 1.7em;

  }

  .author-name {
    font-size: 1.5em;
    font-style: italic;
  }

  .article-date {
    font-size: 1.3em;
    font-style: italic;
    align-self: flex-end;
  }

  .sort-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .sort-text {
    margin-right: 10px;
    font-weight: bold;
    color: rgb(224, 224, 224);
  }

  .sort-button {
    cursor: pointer;
    color: rgb(224, 224, 224);
    text-decoration: none;
    background-color: transparent;
    border: 1px solid rgb(142, 142, 142);
    border-radius: 4px;
    padding: 8px 12px;
    font: inherit;
    outline: none;
    transition:
      background-color 0.3s,
      color 0.3s,
      transform 0.3s;
  }

  .sort-button:not(:last-child) {
    margin-right: 10px;
  }

  .sort-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-2px);
  }

  .sort-button.active {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-2px);
  }

  

  .toolbar {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .sort-buttons {
    margin-left: auto;
  }
</style>
