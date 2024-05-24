<script>
    import { onMount } from 'svelte';
    import { ART_URL } from "$lib/js/api-urls.js";

    let articles = [];

    function decodeHtml(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const day = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        const suffix = dayOfMonth % 10 == 1 && dayOfMonth != 11 ? "st" :
                    dayOfMonth % 10 == 2 && dayOfMonth != 12 ? "nd" :
                    dayOfMonth % 10 == 3 && dayOfMonth != 13 ? "rd" : "th";
        
        return `${day} the ${dayOfMonth}${suffix} of ${month}, ${year}`;
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
                <p class="article-date">{article.date}</p>
            </div>
        {/each}
    </div>
{:else}
    <p>No articles found.</p>
{/if}
