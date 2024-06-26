<script>
  import { decodeHtml, formatDate } from "$lib/js/utils";
  import { onMount } from "svelte";
  import { ART_URL } from "$lib/js/api-urls";
  import { COMMENTS_URL } from "$lib/js/api-urls";
  import { invalidate } from "$app/navigation";
  import { goto } from "$app/navigation";
  import Comment from "$lib/components/Comment.svelte";
  import CommentForm from "$lib/components/CommentForm.svelte";

  export let data;

  let likeCount;
  $: likeNumber = likeCount;
  let userId;
  let articleId = data.article_id;
  let isLiked = false;
  $: error = false;
  $: success = false;
  let comments = [];
  let showComments = false;
  $: isRed = isLiked;

  async function getLikeCount() {
    const response = await fetch(`${ART_URL}/${articleId}/like`, {
      method: "GET",
      credentials: "include"
    });

    const result = await response.json();
    likeCount = result;

    success = response.status === 204;
    error != success;

    if (success) invalidate(`${ART_URL}/${articleId}/like`);
  }

  async function checkIfUserLiked() {
    userId = data.user.user_id;
    const response = await fetch(`${ART_URL}/${articleId}/like/${userId}/check`, {
      method: "GET",
      credentials: "include"
    });
    const result = await response.json();
    isLiked = result;

    success = response.status === 204;
    error != success;

    if (success) invalidate(`${ART_URL}/${articleId}/like/${userId}/check`);
  }

  async function like() {
    userId = data.user.user_id;
    const response = await fetch(`${ART_URL}/${articleId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    success = response.status === 204;
    error = !success;

    if (success) {
      invalidate(`${ART_URL}/${articleId}/like`);
    }
  }

  async function unLike() {
    userId = data.user.user_id;
    const response = await fetch(`${ART_URL}/${articleId}/unlike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId })
    });

    success = response.status === 204;
    error = !success;

    if (success) {
      invalidate(`${ART_URL}/${articleId}/unlike`);
    }
  }

  function likeOperation() {
    if (isLiked == false) {
      like();
      getLikeCount();
      checkIfUserLiked();
      isRed = true;
    } else if (isLiked == true) {
      unLike();
      getLikeCount();
      checkIfUserLiked();
      isRed = false;
    } else {
      console.log(`could not conduct like operation`);
    }
  }

  onMount(async () => {
    {
      getLikeCount();
      checkIfUserLiked();
      comments = await fetchComments(articleId);
    }
  });

  // delete
  async function deleteArticle() {
    let user_id = data.user.user_id;
    let is_admin = data.user.is_admin;

    try {
      const response = await fetch(`${ART_URL}/${data.article_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, is_admin })
      });

      if (response.ok) {
        // Redirect to home page or another page after successful deletion
        goto("/profile");
      } else {
        console.error("Failed to delete article:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  }

  export async function fetchComments(articleId) {
    try {
      const response = await fetch(`${COMMENTS_URL}/${articleId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch article comments");
      }
      const comments = await response.json();
      comments.forEach((comment) => {
        comment.desc = decodeHtml(comment.desc);
        comment.date = formatDate(comment.date);
      });
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  function goEdit() {
    goto(`/${articleId}/articleEdit`);
  }

  async function toggleComments() {
    showComments = !showComments;
    if (showComments) {
      comments = await fetchComments(articleId);
    }
  }

  function onComment() {
    setTimeout(async () => {
      comments = await fetchComments(articleId);
    }, 1000);
  }
</script>

<div class="container">
  <article class="article-post">
    {#if data.image != null}
      <div class="article-image">
        <h1>
          <img src={data.image} width={data.image_width} height={data.image_height} alt="hi" />
        </h1>
      </div>
    {/if}
    <h1 class="article-title">{data.title}</h1>
    <div class="article-content">
      <p class="article-author">{data.username}</p>
      <div class="article-text">{@html data.text}</div>
      <p class="article-date">{formatDate(data.date)}</p>
      {#if data.isLoggedIn}
        {#if data.user.user_id == data.user_id || data.user.is_admin}
          <button type="button" on:click={deleteArticle} class="toggle-comments-btn">Delete Article</button>
          <button on:click={goEdit} class="toggle-comments-btn">Edit</button>
        {/if}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <button on:click={likeOperation} class="btn" class:red={isRed}
          ><i class="fa fa-heart"></i></button
        >
      {/if}
      <span class="like-text">Likes: {likeNumber}</span>
      <button on:click={toggleComments} class="toggle-comments-btn">
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>
  </article>

  <div class="comment-container" style="display: {showComments ? 'block' : 'none'};">
    <div class="comments-tile">
      {#if data.isLoggedIn}
        <div class="leave-comment">
          <h2>Leave your comment!</h2>
          <CommentForm
            on:comment={onComment}
            {data}
            article_id={articleId}
            parent_comment_id={null}
          />
        </div>
      {/if}
      <div class="comments-container">
        <h2>Other Comments:</h2>
        {#if comments}
          {#each comments as comment}
            <Comment on:comment={onComment} {data} {comment} article_id={articleId} />
          {/each}
        {:else}
          <p>No comments to display</p>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  :global(html),
  :global(body),
  .article-date {
    zoom: 0.9;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: auto;
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .article-post {
    width: 45vw;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    text-align: left;
    transition: transform 0.3s ease;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    max-height: 90vh;
    overflow-y: auto;
  }

  .article-post::-webkit-scrollbar {
    width: 6px;
  }

  .article-post::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .article-post::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
  }

  .article-post::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .comment-container {
    margin-left: 50px;
    width: 30vw;
    background-color: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    max-height: 92vh;
    overflow-y: auto;
    padding: 10px;
  }

  .comment-container::-webkit-scrollbar {
    width: 6px;
  }

  .comment-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .comment-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
  }

  .comment-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .comments-tile {
    padding: 10px;
    margin-bottom: 10px;
  }

  .leave-comment,
  .comments-container {
    margin-bottom: 10px;
  }

  .leave-comment h2,
  .comments-container h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }

  .article-title {
    font-size: 1.8em;
    margin-bottom: 8px;
    word-wrap: break-word;
  }

  .article-author {
    font-size: 1em;
    font-style: italic;
    margin-bottom: 8px;
  }

  .article-text {
    font-size: 1.1em;
    line-height: 1.3;
    margin-bottom: 12px;
    word-wrap: break-word;
  }

  .article-date {
    font-style: italic;
    align-self: flex-end;
    font-size: 0.8em;
  }

  .like-text {
    color: white;
  }

  button {
    cursor: pointer;
    outline: 0;
    color: #aaa;
  }

  .red {
    color: red;
  }

  .btn {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 1.6em;
  }


  .toggle-comments-btn {
    cursor: pointer;
    color: rgb(224, 224, 224);
    text-decoration: none;
    background-color: transparent;
    border: 1px solid rgb(142, 142, 142);
    border-radius: 4px;
    padding: 3px 12px;
    margin-right: 10px;
    font: inherit;
    outline: none;
    transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.3s;
}


.toggle-comments-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-2px);
}

  
  
</style>
