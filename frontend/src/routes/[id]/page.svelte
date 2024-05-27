<script>
    import articleView from "$lib/components/articleView.svelte";

    export let data;
    $: article = data.currentArticle;
    $: author = data.username;
</script>

<articleView {article} {username} />