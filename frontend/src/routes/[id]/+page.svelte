<script>
import { formatDate } from "$lib/js/utils";
import { ART_URL } from "$lib/js/api-urls";
import { goto } from "$app/navigation";

export let data;
console.log("Article data: ", data);

async function deleteArticle() {
    try {
      const response = await fetch(`${ART_URL}/${data.article_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Redirect to home page or another page after successful deletion
        goto('/');
      } else {
        console.error('Failed to delete article:', response.statusText);
        alert('Failed to delete article.');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('An error occurred while trying to delete the article.');
    }
  }
</script>


<div class="container">
    <article class="article-post">
        <h1 class="article-title">{data.title}</h1>
        <div class="article-content">
            <p class="article-author">{data.username}</p>
            <div class="article-text">{@html data.text}</div>
            <p class="article-date">{formatDate(data.date)}</p>
            <button type="button" on:click={deleteArticle}>DELETE ARTICLE</button>
        </div>
    </article>
</div>


<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .article-post {
        max-width: 600px;
        padding: 40px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .article-title {
        font-size: 2em;
        margin-bottom: 10px;
    }

    .article-author {
        font-size: 0.9em;
        color: #666;
        margin-bottom: 10px;
    }

    .article-text {
        font-size: 1.1em;
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .article-date {
        font-style: italic;
        align-self: flex-end;
    }
</style>
