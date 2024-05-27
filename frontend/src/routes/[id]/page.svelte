<script>
    import DisplayArticles from "$lib/components/DisplayArticles.svelte";

    export let data;
    $: article = data.currentArticle;
    $: author = data.username;
</script>

<DisplayArticles {article} {author} />
