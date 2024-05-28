<script>
  import { onMount } from "svelte";
  import { COMMENTS_URL } from "$lib/js/api-urls";
  import { decodeHtml, formatDate } from "$lib/js/utils";
  import CommentBox from "./CommentBox.svelte";

  let comments = [];
  export let user;
  console.log(user);

  //fetches already existing comments
  async function fetchComments() {
    try {
      const response = await fetch(COMMENTS_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      console.log("comment data: ", data);
      data.forEach((comment) => {
        comment.desc = decodeHtml(comment.desc);
        comment.date = formatDate(comment.date);
      });
      return data;
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
    comments = await fetchComments();
  });

  async function deleteComment(comment_id) {

    const response = await fetch(`${COMMENTS_URL}/${comment_id}`, {
      method: "DELETE",
    });
  }
</script>

{#if comments.length > 0}
  {#each comments as comment}
    <div class="dialogbox">
      <div class="body">
        <span class="tip tip-up"></span>
        <div class="message">
          {@html comment.desc}
          <p class="comment-date">{comment.time} {comment.date}</p>
          <p>{comment.comment_id}</p>
          <button type="button" on:click={deleteComment(comment.comment_id)}>DELETE COMMENT</button>
        </div>
      </div>
    </div>
  {/each}
{:else}
  <p>No comments found.</p>
{/if}

<CommentBox {user} onCommentPosted={handleCommentPosted} />

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
