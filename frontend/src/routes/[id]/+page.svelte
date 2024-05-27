<script>

    let article;

</script>

<h1>{article.title}</h1>
<div>
    <p class="author-name">{article.username}</p>
    {@html article.text}
    <p class="article-date">{article.date}</p>
</div>
