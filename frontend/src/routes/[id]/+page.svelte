<script>
    import { onMount } from 'svelte';
    import { ART_URL } from "$lib/js/api-urls.js";
    import { decodeHtml, formatDate } from '$lib/js/utils';
    import { useParams } from 'svelte-routing';

    let article;

    async function fetchArticle(article_id) {
        try {
            const response = await fetch(`${ART_URL}/${article_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch article');
            }
            const data = await response.json();
            article = {
                ...data,
                text: decodeHtml(data.text),
                date: formatDate(data.date)
            };
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    }

    onMount(async () => {
        const { id } = useParams();
        await fetchArticle(id);
    });
</script>

<h1>{article.title}</h1>
<div>
    <p class="author-name">{article.username}</p>
    {@html article.text}
    <p class="article-date">{article.date}</p>
</div>
