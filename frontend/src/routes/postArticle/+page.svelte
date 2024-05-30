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
  let user_id = data.user.user_id;
  let tempImage; 
  let image;
  $: imageWidth = 600;
  $: imageHeight = 200;


  function handleImageSize () {
    if (imageWidth > 600) {
      imageWidth = 600
      
    } else if(imageHeight >200) {
      imageHeight= 200
    }
  }


  

  async function handlePost() {
    error = false;
    
    const response = await fetch(ART_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image, imageWidth, imageHeight, text, user_id })
    });

    success = response.status === 204;
    error = !success;

    if (success) invalidate(ART_URL);
  }
  
  onMount(() => {
    
    
    setTimeout(() => {
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
      });

      getText = () => {
        text = tinymce.get('postText').getContent();
      };
    }, 600);
    
  });

  function handleUpload(event) {
    const { imageUrl } = event.detail;
    tempImage=imageUrl;
    image =tempImage;
  }



</script>


  <title>Post articles here!</title> 

<h1>Post</h1>



  {#if imageWidth >600}
  {handleImageSize()}
  {/if}

  {#if imageHeight >200}
  {handleImageSize()}
  {/if}




<form on:submit|preventDefault={handlePost}>
  <label for="title" class = "article-text">Title:</label>
  {#if (image != null)}
  <label for = "image"> 
    
    <img src={image} alt="" width={imageWidth} height={imageHeight}> 
  
  </label>
  <label for = "image width" class = "dim-text"> Image width (max 600px): </label>
  <input type ="text" name = "image width" bind:value= {imageWidth} required />
  <label for = "image height" class = "dim-text"> Image height (max 200px): </label>
  <input type ="text" name = "image height" bind:value = {imageHeight} required/>


  {/if}
  <input type="text" name="title" bind:value={title} required />
  <textarea id='postText' bind:value={text} rows="12" required />
  
  <ImageUpload on:upload={handleUpload} />
  <label for="imageLink">Your image link {image}</label>
  <button type="submit" on:click = {getText}>Post!</button>
  {#if error}<span class="error">Could not save!</span>{/if}
  {#if success}<span class="success">Saved!</span>{/if}
</form>






<style>
form {
    
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3); 
    border-radius: 8px;
    margin-right: 20px; 
    margin-left: 20px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px); 
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

  .dim-text {

    color:white;
  }
</style>
