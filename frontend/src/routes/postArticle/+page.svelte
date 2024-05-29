<svelte:head><script src="https://cdn.tiny.cloud/1/x0j317jyptd01ki3pnw74apyl45v249opero67lbp6yj5lj7/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script></svelte:head>
<svelte:window on:mouseup={stopExpand} />

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


  const grabberWidth = 10
	
	export let width = 60
	export let x = 20
	
	let expanding = null
	let start = null, initial = null
	
	function startExpand(type, event) {
		expanding = type
		start = event.pageX
		initial = { x, width }
	}
	
	function stopExpand() {
		expanding = null
		start = null
		initial = null
	}
	
	function expand(event) {
		if (!expanding) return
		
		if (expanding == 'left') {
			const delta = start-event.pageX
			x = initial.x - delta
			width = initial.width + delta
			return
		}
		
		if (expanding == 'right') {
			const delta = event.pageX-start
			width = initial.width + delta
			return
		}
	}

  

  async function handlePost() {
    error = false;
    
    const response = await fetch(ART_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, image, text, user_id })
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




<form on:submit|preventDefault={handlePost}>
  <label for="title">Title:</label>
  {#if (image != null)}
  <label for = "image"> <img src={image} alt="" width="341" height="93" on:mousemove={expand} class:expanding>  </label>
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
