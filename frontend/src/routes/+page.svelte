<script>
  export let data;
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';
</script>

<svelte:head>
  <title>Authentication lab - Home</title>
</svelte:head>



<div class="container">
  <DisplayArticles />
  <div>
    <slot />
  </div>
</div>