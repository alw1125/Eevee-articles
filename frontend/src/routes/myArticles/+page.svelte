<script>
  // Import the DisplayArticles component
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';
  import CommentBox from '$lib/components/CommentBox.svelte';

  export let data;
</script>

<svelte:head>
  <title>My Articles</title>
</svelte:head>

<h1>My Articles</h1>


  <DisplayArticles />
  <CommentBox user={data.user}/>