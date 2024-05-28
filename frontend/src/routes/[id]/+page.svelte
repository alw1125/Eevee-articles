<script>
import { decodeHtml, formatDate } from "$lib/js/utils";
export let data;

let likeCount;
let userId;
let articleId; 

</script>


<div class="container">
    <article class="article-post">
        <h1 class="article-title">{data.title}</h1>
        <div class="article-content">
            <p class="article-author">{data.username}</p>
            <div class="article-text">{@html data.text}</div>
            <p class="article-date">{formatDate(data.date)}</p>
        </div>
    </article>
</div>

{#if data.article_id == 1}

<div> AHDBHAbd</div>
{/if}

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
