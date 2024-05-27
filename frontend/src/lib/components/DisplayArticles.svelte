<script>
    import { onMount } from 'svelte';
    import { ART_URL } from "$lib/js/api-urls.js";
    import { decodeHtml, formatDate } from '$lib/js/utils';
    import { navigate } from 'svelte-routing'; 

    let articles = [];
    let sortBy = 'date';

    async function fetchArticles() {
        try {
            const response = await fetch(ART_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            let data = await response.json();
            data.forEach(article => {
                article.text = decodeHtml(article.text);
                article.date = formatDate(article.date); 
            });
            
            if (sortBy === 'date') {
                data.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else if (sortBy === 'username') {
                data.sort((a, b) => a.username.localeCompare(b.username));
            } else if (sortBy === 'title') {
                data.sort((a, b) => a.title.localeCompare(b.title));
            }
            return data;
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    async function sortArticles(option) {
        sortBy = option;
        articles = await fetchArticles();
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
            display: flex;
            flex-direction: column; 
            align-items: flex-start; 
        }
        .article-date {
            font-style: italic;
            align-self: flex-end; 
        }
        .author-name {
            font-size: 1.1em;
            font-style: italic;
        }
        .sort-buttons {
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .sort-text {
            margin-right: 10px;
            font-weight: bold;
        }
        .sort-button {
            cursor: pointer;
            color: blue;
            text-decoration: underline;
            background: none;
            border: none;
            padding: 0;
            font: inherit;
            outline: inherit;
        }
        .sort-button:not(:last-child) {
            margin-right: 10px;
        }
    </style>
</svelte:head>

<h1>Articles</h1>
<div class="sort-buttons">
    <span class="sort-text">Sort:</span>
    <button class="sort-button" on:click={() => sortArticles('username')}>Username</button>
    <button class="sort-button" on:click={() => sortArticles('title')}>Title</button>
    <button class="sort-button" on:click={() => sortArticles('date')}>Date</button>
</div>
{#if articles.length > 0}
    <div>
        {#each articles as article}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="article-tile" on:click={() => navigate(`/article/${article.article_id}`)} style="cursor: pointer;">
                <h2>{article.title}</h2>
                <p class="author-name">{article.username}</p>
                {@html article.text}
                <p class="article-date">{article.date}</p>
            </div>
        {/each}
    </div>
{:else}
    <p>No articles found.</p>
{/if}
