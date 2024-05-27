<script>
    import ArticleView from "$lib/components/ArticleView.svelte";

    export let data;
    $: article = data.currentArticle;
    $: author = data.username;
</script>

<ArticleView {article} {username} />