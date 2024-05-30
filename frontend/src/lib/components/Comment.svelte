<script>

  import CommentForm from "$lib/components/CommentForm.svelte";

  export let comment, user_id, article_id;
</script>

{#if comment}
  <ul>
    <div class="container">
      <span><strong>user: {comment.username}</strong></span>
      <span>time: {comment.time} {comment.date}</span>
      <p>{comment.desc}</p>
      <CommentForm {user_id} {article_id} parent_comment_id={comment.comment_id}/>
    </div>
    <li>
      {#if comment.children}
        {#each comment.children as child}
          <svelte:self comment={child} {user_id} {article_id}/>
        {/each}
      {/if}
    </li>
  </ul>
{/if}

<style>
  .container {
    border: 1px solid black;
  }
</style>
