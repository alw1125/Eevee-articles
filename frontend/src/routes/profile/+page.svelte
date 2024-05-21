<script>
  import UserInfoForm from "$lib/components/UserInfoForm.svelte";

  export let data;
</script>

<svelte:head>
  <title>My Profile</title>
</svelte:head>

<h1>My Profile</h1>

{#if data.user}
  <UserInfoForm user={data.user} />
{/if}
