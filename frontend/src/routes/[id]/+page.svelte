<script>
export let data;

</script>

<h1>{data.title}</h1>
<div>
    <p class="author-name">{data.username}</p>
    {@html data.text}
    <p class="article-date">{data.date}</p>
</div>
