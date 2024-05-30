<script>
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { CollapsibleCard } from "svelte-collapsible";
  import { COMMENTS_URL } from "$lib/js/api-urls";

  export let user;
  export let comment, article_id;

  let error = false;
  let success = false;

  async function deleteComment(comment_id) {
    let user_id = user.user_id;
    let is_admin = user.is_admin;

    try {
      const response = await fetch(`${COMMENTS_URL}/${comment_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, is_admin })
      });
      if (response.ok) {
        success = true;
      } else {
        error = true;
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  }
</script>

{#if comment}
  <CollapsibleCard>
    <h2 slot="header">{comment.desc}</h2>
    <div slot="body">
      <span><strong>user: {comment.username}</strong></span>
      <span>time: {comment.time} {comment.date}</span>
      <p>{comment.desc}</p>
      {#if user.isLoggedIn}
        <button on:click={deleteComment(comment.comment_id)}>DELETE COMMENT</button>
        {#if error}<span class="error">Could not delete!</span>{/if}
        {#if success}<span class="success" id="success">Deleted!</span>{/if}
        <CommentForm {user} {article_id} parent_comment_id={comment.comment_id} />
      {/if}
      <li>
        {#if comment.children}
          {#each comment.children as child}
            <svelte:self {user} comment={child} {article_id} />
          {/each}
        {/if}
      </li>
    </div>
  </CollapsibleCard>
{/if}

<style>
</style>
