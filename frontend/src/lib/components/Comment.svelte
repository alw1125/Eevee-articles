<script>
  import CommentForm from "$lib/components/CommentForm.svelte";
  import { CollapsibleCard } from "svelte-collapsible";
  export let comment, user_id, article_id;
</script>

{#if comment}
  <CollapsibleCard>
    <h2 slot="header">{comment.desc}</h2>
    <div slot="body">
      <span><strong>user: {comment.username}</strong></span>
      <span>time: {comment.time} {comment.date}</span>
      <p>{comment.desc}</p>
      <CommentForm {user_id} {article_id} parent_comment_id={comment.comment_id} />

      <li>
        {#if comment.children}
          {#each comment.children as child}
            <svelte:self comment={child} {user_id} {article_id} />
          {/each}
        {/if}
      </li>
    </div>
  </CollapsibleCard>
{/if}

<style>
</style>
