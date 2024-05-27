<script>
  import { onMount } from 'svelte';
  import { ART_URL } from "$lib/js/api-urls.js";
  export let article, username;
</script>

<article>
  <h1>{article.title}</h1>
  <p class="author"><strong>Author: </strong>{username}</p>
  <p>{article.text}</p>
</article>

<style>
  img {
    float: left;
    width: 320px;
    height: 320px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 20px green;
  }

  h1 {
    margin-top: 0;
  }

  .author {
    color: rgb(63, 63, 63);
    font-style: italic;
  }
</style>