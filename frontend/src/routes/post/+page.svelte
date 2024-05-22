<svelte:head><script src="https://cdn.tiny.cloud/1/x0j317jyptd01ki3pnw74apyl45v249opero67lbp6yj5lj7/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script></svelte:head>

<script>
  import { ART_URL } from "$lib/js/api-urls"
  import { invalidate } from "$app/navigation";
  import {onMount} from 'svelte';
  import ImageUpload from "$lib/components/ImageUpload.svelte";

  export let data;

  let title = "";
  let getText;
  let text = "";
  let error = false;
  let success = false;
  let username = data.user.username;
  let tempImage; 
  let image;

  async function handlePost() {
    error = false;
    
    const response = await fetch(ART_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image, text, username })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidate(ART_URL);
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
      content_css: '',
      image_list: [
    { title: 'My image 1', value: 'http://localhost:3000/images/Screenshot 2023-03-15 173916.png' } ]
      
    
    
    })
    getText = () => {
        text = tinymce.get('postText').getContent();
        image =tempImage;
    }
    
  });

  function handleUpload(event) {
    const { imageUrl } = event.detail;
    tempImage=imageUrl;
  }

   

</script>


  <title>Post articles here!</title> 

<h1>Post</h1>


<form on:submit|preventDefault={handlePost}>
  <label for="title">Title:</label>
  <input type="text" name="title" bind:value={title} required />
  <textarea id='postText' bind:value={text} rows="12" required />
  
  <ImageUpload on:upload={handleUpload} />
  <label>Your image link {image}</label>
  <button type="submit" on:click = {getText}>Post!</button>
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
