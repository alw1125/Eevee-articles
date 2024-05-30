<script>
  export let data;
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';
  import DisplayComments from '$lib/components/DisplayComments.svelte';
</script>

<svelte:head>
  <title>Authentication lab - Home</title>
</svelte:head>

<h1></h1>

<div class="container">
  <DisplayArticles />
  <div>
    <slot />
  </div>
</div>