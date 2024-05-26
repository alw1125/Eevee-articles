<script>
  import {COMMENTS_URL} from '$lib/js/api-urls'

  export let user;

  let text = "";
  let error = false;
  let success = false;
  let user_id = user.user_id;

  async function handleComment() {
    error = false;

    const response = await fetch(COMMENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({text, user_id})
    });

    success = response.status === 204;
    error = !success;
  }
</script>

<form on:submit|preventDefault={handleComment}>
  <textarea bind:value={text} rows="5" required />
  <button type="submit">Comment</button>
</form>
