
<svelte:head>  <script src="https://cdn.tiny.cloud/1/x0j317jyptd01ki3pnw74apyl45v249opero67lbp6yj5lj7/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script> </svelte:head>


<script>
  import { invalidate } from "$app/navigation";
  import { USER_URL } from "$lib/js/api-urls.js";
  import {onMount} from 'svelte';
  export let user;


  

  let firstName = user.firstName;
  let lastName = user.lastName;
  let getdisc;
  let desc = user.desc;
  let error = false;
  let success = false;

  async function handleSave() {
    error = false;
    success = false;

    const response = await fetch(USER_URL, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, desc })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidate(USER_URL);

    
  }

  onMount(() => {
      tinymce.init({
      selector: 'textarea',
      width: 600,
      height: 300,
      plugins: [
      'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
      'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
      'media', 'table', 'emoticons', 'help'
    ],
    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
      'forecolor backcolor emoticons | help',
      menu: {
        favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons' }
      },
      menubar: 'favs file edit view insert format tools table help',
      content_css: ''
    
    })
    getdisc = () => {
        desc = tinymce.get('editDis').getContent();
    }
  });

</script>

<form on:submit|preventDefault={handleSave}>
  <label  for="firstName">First name:</label>
  <input type="text" name="firstName" bind:value={firstName} required />
  <label for="lastName">Last name:</label>
  <input type="text" name="lastName" bind:value={lastName} required />
  <textarea id="editDis" bind:value={desc} rows="12" required />

  <button type="submit" on:click = {getdisc}>Save</button>

  {#if error}<span class="error">Could not save!</span>{/if}
  {#if success}<span class="success">Saved!</span>{/if}
</form>



<style>
  form {
    margin: auto;
    max-width: 800px;
    border: 1px dashed green;
    padding: 10px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
  }

  button,
  textarea,
  .error,
  .success {
    grid-column: 1 / 3;
  }

  .error,
  .success {
    font-weight: bold;
    padding: 5px;
    text-align: center;
  }

  .error {
    color: darkred;
    background-color: lightcoral;
  }

  .success {
    color: darkgreen;
    background-color: lightgreen;
  }
</style>
