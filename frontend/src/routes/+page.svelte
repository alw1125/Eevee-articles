<script>
  export let data;
  import DisplayArticles from '$lib/components/DisplayArticles.svelte';
</script>

<svelte:head>
  <title>Eevee's Engineers</title>
</svelte:head>



<div class="container">
  <DisplayArticles />
  <div>
    <slot />
  </div>
</div>