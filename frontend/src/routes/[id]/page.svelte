<script>
    import ArticleView from "$lib/components/ArticleView.svelte";

    export let data;
    $: article = data.article;
    $: author = data.username;
</script>

<ArticleView {article} {author} />
