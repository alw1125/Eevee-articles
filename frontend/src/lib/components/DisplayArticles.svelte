<script>
    import { onMount } from 'svelte';
    import { ART_URL } from "$lib/js/api-urls.js";

    let articles = [];

    function decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    async function fetchArticles() {
        try {
            const response = await fetch(ART_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            const data = await response.json();
            data.forEach(article => {
                article.text = decodeHtml(article.text);
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
    <style>
        .article-tile {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: left;
        }
        .article-tile {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: left;
        }
        .author-name {
            font-size: 1.1em;
            font-style: italic;
        }
    </style>
</svelte:head>

<h1>Articles</h1>
{#if articles.length > 0}
    <div>
        {#each articles as article}
            <div class="article-tile">
                <h2>{article.title}</h2>
                <p class="author-name">{article.username}</p>
                {@html article.text}
                <p>{article.date}</p>
            </div>
        {/each}
    </div>
{:else}
    <p>No articles found.</p>
{/if}
