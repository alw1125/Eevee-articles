<script>
import { USER_URL, ART_URL } from "$lib/js/api-urls.js";
import DisplayArticles from '$lib/components/DisplayArticles.svelte';

    let article;

</script>

<h1>{article.title}</h1>
<div>
    <p class="author-name">{article.username}</p>
    {@html article.text}
    <p class="article-date">{article.date}</p>
</div>
