<script>
  import { onMount } from "svelte";
  import { COMMENTS_URL } from "$lib/js/api-urls";
  import { decodeHtml, formatDate } from "$lib/js/utils";
  import CommentBox from "./CommentBox.svelte";

  let comments = [];

  export let data;

  let article_id = data.article_id;

  //fetches already existing comments
  async function fetchComments(article_id) {
    try {
      const response = await fetch(`${COMMENTS_URL}/${article_id}`);
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

  //displays new comment (refer to callback function in CommentBox.svelte)
  function handleCommentPosted(newComment) {
    newComment.desc = decodeHtml(newComment.desc);
    newComment.date = formatDate(newComment.date);
    comments = [...comments, newComment];
  }

  onMount(async () => {
    comments = await fetchComments(article_id);
  });

</script>

{#if comments}
  {#each comments as comment}
    <div class="dialogbox">
      <div class="body">
        <span class="tip tip-up"></span>
        <div class="message">
          <p>{comment.desc}</p>
          <p>{comment.username}</p>
          <p class="comment-date">{comment.time} {comment.date}</p>
        </div>
      </div>
    </div>
    <CommentBox comment_id = {comment.comment_id}/>
  {/each}
{:else}
  <div class="dialogbox">
    <div class="body">
      <span class="tip tip-up"></span>
      <div class="message">
        <p class="message">No comments found...</p>
      </div>
    </div>
  </div>
{/if}

<style>
  .tip {
    position: absolute;
    background: transparent;
    border: 10px solid #ccc;
    top: -25px;
    left: 10px;
    border-right-color: transparent;
    border-left-color: transparent;
    border-top-color: transparent;
  }

  .dialogbox .body {
    position: relative;
    max-width: 50%;
    height: auto;
    margin: 20px;
    padding: 5px;
    background-color: #ebebeb;
    border-radius: 3px;
    border: 5px solid #ccc;
  }

  .body .message {
    min-height: 30px;
    border-radius: 3px;
    font-family: Arial;
    font-size: 14px;
    line-height: 1.5;
    color: #797979;
  }

  .dialogbox {
    margin: 0, auto;
  }

  .comment-date {
    font-style: italic;
    align-self: flex-end;
  }
</style>
