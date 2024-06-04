<script>
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { createEventDispatcher } from "svelte";
  import { CollapsibleCard } from "svelte-collapsible";
  import { COMMENTS_URL } from "$lib/js/api-urls";

  export let data;
  export let comment, article_id;

  const dispatch = createEventDispatcher();

  let error = false;
  let success = false;
  let commentForm = false;

  function commentChange(){
    dispatch(`comment`);
  }

  async function deleteComment(comment_id) {
    let user_id = data.user.user_id;
    let is_admin = data.user.is_admin;

    try {
      const response = await fetch(`${COMMENTS_URL}/${comment_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, is_admin, article_id })
      });
      if (response.ok) {
        success = true;

        commentChange();
        
        setTimeout(() => {
          success = false;
        }, 1000);

      } else {
        error = true;
        
        setTimeout(() => {
          error = false;
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  }

  function toggleCommentForm() {
    commentForm = !commentForm;
  }
</script>

{#if comment}
  <div class="comment">
    <CollapsibleCard>
      <div slot="header">
        <h2>{comment.desc}</h2>
      </div>
      <div slot="body">
        <div><strong>{comment.username}</strong></div>
        <div>{comment.time} {comment.date}</div>
        {#if data.isLoggedIn}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <button on:click={toggleCommentForm} class="btn" title="Reply"
            ><i class="fa fa-mail-reply"></i></button
          >
          {#if comment.user_id == data.user.user_id || data.user.user_id == data.user_id || data.user.is_admin}
            <button on:click={() => deleteComment(comment.comment_id)}>Delete Comment</button>
            {#if error}<span class="error">Could not delete!</span>{/if}
            {#if success}<span class="success" id="success">Deleted!</span>{/if}
          {/if}
          {#if commentForm}
            <CommentForm on:comment={commentChange} {data} {article_id} parent_comment_id={comment.comment_id} />
          {/if}
        {/if}

        {#if comment.children}
          <div class="nested-comments">
            {#each comment.children as child}
              <svelte:self on:comment={commentChange} {data} comment={child} {article_id} />
            {/each}
          </div>
        {/if}
      </div>
    </CollapsibleCard>
  </div>
{/if}

<style>
  .comment {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  .comment .header h2 {
    margin: 0;
  }

  .nested-comments {
    list-style-type: none;
    margin: 10px 0 0 20px;
    padding: 0;
  }

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

  .btn {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 2em;
  }
</style>
