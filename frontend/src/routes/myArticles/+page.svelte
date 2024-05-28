<script>
  import { onMount } from 'svelte';
  import { ART_URL } from '$lib/js/api-urls.js';
  import DisplayComments from '$lib/components/DisplayComments.svelte';
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';
    import UserArticle from '$lib/components/UserArticle.svelte';

  export let data;

  let articles = [];

  async function fetchArticles() {
    try {
      const response = await fetch(ART_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return await response.json();
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

{#if data.user}
<div class="main">
  <h2>My Profile</h2>
  <div class="card">
    <table>
      <tbody>
        <tr>
          <td>First Name</td>
          <td>:</td>
          <td>{data.user.firstName}</td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>:</td>
          <td>{data.user.lastName}</td>
        </tr>
        <tr>
          <td>Date of birth</td>
          <td>:</td>
          <td>{data.user.dob}</td>
        </tr>
        <tr>
          <td>Username</td>
          <td>:</td>
          <td>{data.user.username}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>:</td>
          <td>{data.user.desc}</td>
        </tr>
        <tr>
          <td>Avatar</td>
          <td>:</td>
          <td>{data.user.avatar}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
{/if}

{#if articles.length > 0}
  <h2>Articles</h2>
  {#each articles as article}
    {#if article.user_id === data.user.user_id}
      <UserArticle article={article} />
    {/if}
    
  {/each}
{:else}
  <p>No articles found.</p>
{/if}

{#each articles as article}
  <p>User ID of article: {article.user_id}</p>
  <p>ID of logged-in user: {data.user.user_id}</p>
  {#if article.user_id === data.user.user_id}
    <UserArticle article={article} />
  {/if}
{/each}

