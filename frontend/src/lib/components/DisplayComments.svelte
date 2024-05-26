<script>
  import { onMount } from "svelte";
  import { COMMENTS_URL } from "$lib/js/api-urls";
  import { decodeHtml, formatDate } from "$lib/js/utils";
  import CommentBox from "./CommentBox.svelte";

  let comments = [];
  export let user;

  //fetches already existing comments
  async function fetchComments() {
    try {
      const response = await fetch(COMMENTS_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
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
</script>

{#if comments.length > 0}
  <div>
    {#each comments as comment}
      <div class="comment-tile">
        {@html comment.desc}
        <p class="comment-date">{comment.time} {comment.date}</p>
      </div>
    {/each}
  </div>
{:else}
  <p>No comments found.</p>
{/if}

<CommentBox user={user} onCommentPosted={handleCommentPosted} />

<style>
  .comment-tile {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .comment-date {
    font-style: italic;
    align-self: flex-end;
  }

  .comment-name {
    font-size: 1.1em;
    font-style: italic;
  }
</style>
