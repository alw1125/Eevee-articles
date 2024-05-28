<script>
import { decodeHtml, formatDate } from "$lib/js/utils";
import { onMount } from "svelte";
import { ART_URL }from "$lib/js/api-urls"
import { invalidate } from "$app/navigation";
export let data;

let likeCount; 
$: likeNumber = likeCount; 
let userId = data.user.user_id
let articleId = data.article_id; 
let isLiked= false; 
let error = false; 
let success = false;
let buttonEnabled = true;
 


async function handleEnableButton(){
   if(userId==null) {
    buttonEnabled = false;
   }
   else {
    buttonEnabled= true; 
   }

}

async function getLikeCount (articleId){
    
      const response = await fetch(`${ART_URL}/${articleId}/like`, 
        {
      method: "GET",
      credentials: "include"
      });
     
      const result = await response.json();
      likeCount = result;

      success = response.status===204;
      error != success
      console.log(likeCount)

      if (success) invalidate(`${ART_URL}/${articleId}/like`);
    

}

async function checkIfUserLiked(articleId,userId){
    const response = await fetch(`${ART_URL}/${articleId}/like/${userId}/check`, {
        method: "GET",
        credentials: "include"
      });
      const result = await response.json();
      isLiked = result;
      console.log(isLiked)

      success = response.status===204;
      error != success
    

      if (success) invalidate(`${ART_URL}/${articleId}/like/${userId}/check`);
    

}
async function like(){ const response = await fetch(`${ART_URL}/${articleId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  user_id: userId  })
    });

    success = response.status === 204;
    error = !success;
    console.log(`hi`)

    if (success) invalidate(`${ART_URL}/${articleId}/like`);}

async function unLike(){const response = await fetch(`${ART_URL}/${articleId}/unlike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({  user_id: userId  })
    });

    success = response.status === 204;
    error = !success;
    console.log(`bye`)

    if (success) invalidate(`${ART_URL}/${articleId}/unlike`);}


    function likeOperation(){
        if(isLiked==false) {
            like();
        } 

        else if (isLiked==true) {
            unLike();
        }
        else {
            console.log(`could not conduct like operation`)
        }
    }



onMount(()=>{{
    getLikeCount(articleId)
    checkIfUserLiked(articleId, userId);
    handleEnableButton();
}})

</script>


<div class="container">
    <article class="article-post">
        <h1 class="article-title">{data.title}</h1>
        <div class="article-content">
            <p class="article-author">{data.username}</p>
            <div class="article-text">{@html data.text}</div>
            <p class="article-date">{formatDate(data.date)}</p>
        </div>
    </article>
   
</div>




<button on:click={likeOperation} disabled={!buttonEnabled}>Like</button>
<div> current likecount is {likeNumber}</div>


<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .article-post {
        max-width: 600px;
        padding: 40px;
        background-color: #f9f9f9;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .article-title {
        font-size: 2em;
        margin-bottom: 10px;
    }

    .article-author {
        font-size: 0.9em;
        color: #666;
        margin-bottom: 10px;
    }

    .article-text {
        font-size: 1.1em;
        line-height: 1.6;
        margin-bottom: 20px;
    }

    .article-date {
        font-style: italic;
        align-self: flex-end;
    }
</style>
