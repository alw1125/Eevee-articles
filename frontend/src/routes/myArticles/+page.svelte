<script>
  // Import the DisplayArticles component
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';
  import DisplayComments from '$lib/components/DisplayComments.svelte';
  import UserArticle from '$lib/components/UserArticle.svelte';

  export let data;
</script>

<svelte:head>
  <title>My Articles</title>
</svelte:head>

<h1>My Articles</h1>


  <UserArticle/>
  <DisplayComments user={data.user}/>