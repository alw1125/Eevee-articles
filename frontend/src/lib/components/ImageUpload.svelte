<script>
    
    import { UPLOAD_URL } from "$lib/js/api-urls.js";
      import { createEventDispatcher } from "svelte"; 
    
      let filesToUpload;
      let messageToSend;
    
      let serverResponse = null;
      const eventDispatch = createEventDispatcher();
    
      
      
      async function handleSubmit(e) {
        
        const formData = new FormData();
        formData.append("message", messageToSend);
        formData.append("image-file", filesToUpload[0]);
    
        
        const response = await fetch(UPLOAD_URL, {
          method: "POST",
          body: formData
        });
    
        serverResponse = await response.json();
        if (response.status !== 401) {
        eventDispatch(`upload`, { imageUrl: `${serverResponse.imageUrl}` });
  
      }
      }
    </script>
  
  
  
  
  <form on:submit|preventDefault={handleSubmit}>
    <label for="imageFile" class = "article-text">Choose an image to upload:</label>
    <input
      type="file"
      multiple={false}
      name="image-file"
      accept="image/png, image/jpeg"
      bind:files={filesToUpload}
      required
    />
    
    <button type="submit">Upload</button>
  </form>
  
  <style>

.article-text{
color: white;
}

  </style>