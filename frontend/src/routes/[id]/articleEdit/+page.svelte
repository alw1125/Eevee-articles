<svelte:head><script src="https://cdn.tiny.cloud/1/x0j317jyptd01ki3pnw74apyl45v249opero67lbp6yj5lj7/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script></svelte:head>


<script>
  import { ART_URL } from "$lib/js/api-urls"
  import { invalidate } from "$app/navigation";
  import {onMount} from 'svelte';
  import ImageUpload from "$lib/components/ImageUpload.svelte";
  import { goto } from "$app/navigation";

  export let data; 
  

  let title = data.title;
  let getText;
  let text = data.text;
  let error = false;
  let success = false;
  let user_id = data.user.user_id;
  let article_id = data.article_id;
  let tempImage; 
  let image = data.image;
  let imageWidth = data.image_width;
  let imageHeight = data.image_height;


  function handleImageSize () {
    if (imageWidth > 600) {
      imageWidth = 600
      
    } else if(imageHeight >200) {
      imageHeight= 200
    }
  }


  

  async function handleEdit() {
    console.log(`handleEdit`)
    error = false;
    
    const response = await fetch(`${ART_URL}/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image, imageWidth, imageHeight, user_id, text, article_id})
    });

    success = response.status === 204;
    error = !success;

    if (success) {
         invalidate(ART_URL);
         goBack();
        }
  }
  
  function goBack() { setTimeout (()=> {
    goto(`/${article_id}`)
  }, 700);
   
  }
  onMount(() => {
    
    
    setTimeout(() => {
      tinymce.init({
        selector: 'textarea',
        width: 600,
        height: 300,
        plugins: [
          'advlist', 'lists', 'charmap', 'anchor', 'pagebreak',
          'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
           'table', 'emoticons'
        ],
        toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent  | ' +
          'forecolor backcolor emoticons | help',
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


  <title>Edit datas here!</title> 




  {#if imageWidth >600}
  {handleImageSize()}
  {/if}

  {#if imageHeight >200}
  {handleImageSize()}
  {/if}




<form on:submit|preventDefault={handleEdit}>
  <label for="title">Title:</label>
  {#if (image != null)}
  <label for = "image"> 
    
    <img src={image} alt="" width={imageWidth} height={imageHeight}> 
  
  </label>
  <label for = "image width"> Image width (max 600px): </label>
  <input type ="text" name = "image width" bind:value= {imageWidth} required />
  <label for = "image height"> Image height (max 200px): </label>
  <input type ="text" name = "image height" bind:value = {imageHeight} required/>


  {/if}
  <input type="text" name="title" bind:value={title} required />
  <textarea id='postText' bind:value={text} rows="12" required />
  
  <ImageUpload on:upload={handleUpload} />
  <button type="submit" on:click = {getText}>Save!</button>
  <button type="button" on:click={goBack}>Cancel</button>
  {#if error}<span class="error">Could not save!</span>{/if}
  {#if success}
  <span class="success">Saved!</span>
  {/if}
</form>






<style>
  form {
    display: flex;
    width: 75%;
    margin: auto;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3); 
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px); 
    display: grid;
    gap: 10px;
    max-height: 100vh;
    overflow-y: auto;
    }

    
  ::-webkit-scrollbar {
    width: 6px; 
  }

  
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px; 
  }

  
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3); 
    border-radius: 8px; 
  }

  
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5); 
  }

  button,
  textarea,
  .error,
  .success {
    grid-column: 1 / -1;
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