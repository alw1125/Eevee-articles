<script>
  import { COMMENTS_URL } from "$lib/js/api-urls";

  export let user;
  export let onCommentPosted;

  let desc = "";
  let user_id = user.user_id;

  async function handleComment() {
    let error = false;
    let success = false;

    const newComment = {
      desc, 
      user_id,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toISOString().slice(11, 19)
    };

    try {
      const response = await fetch(COMMENTS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, user_id })
      });

      if (response.status === 204) {
        success = true;
        desc = ""; //clears the comment box
        onCommentPosted(newComment); //callback function to display new comments at the instance of posting
      } else {
        error = true;
      }
    } catch (error) {
      console.error("Error posting comment: ", error);
      error = true;
    }
  }
</script>

<form on:submit|preventDefault={handleComment}>
  <textarea bind:value={desc} rows="5" required />
  <button type="submit">Comment</button>
</form>
