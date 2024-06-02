<script>
  import { onMount } from 'svelte';
  import { USER_URL } from '$lib/js/api-urls.js';
  import { decodeHtml, formatDate } from '$lib/js/utils';
  import UserInfoForm from "$lib/components/UserInfoForm.svelte";
  import { goto } from "$app/navigation";
  import { invalidateAll } from "$app/navigation";
  import { LOGOUT_URL } from "$lib/js/api-urls";

  export let data;

  let user_id = data.user.user_id;
  let articles = [];
  let editMode = false;

  //toggles profile editable version when edit button clicked
  function toggleEditMode() {
    editMode = !editMode;
  }

  async function deleteUser() {
    let user_id = data.user.user_id;
    let is_admin = data.user.is_admin;

    try {
      const response = await fetch(`${USER_URL}/${user_id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id , is_admin })
      });

      if (response.ok) {
        // Redirect to home page or another page after successful deletion
        goto('/');

        const response = await fetch(LOGOUT_URL, {
          method: "POST",
          credentials: "include"
        });
        await invalidateAll();
      
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async function fetchArticles() {
    try {
      const response = await fetch(`${USER_URL}/${user_id}/articles`);
      if (!response.ok) {
        throw new Error("Failed to fetch user articles");
      }
      let data = await response.json();
      data.forEach(article => {
        article.text = decodeHtml(article.text);
        article.date = formatDate(article.date); 
      });
      return data;
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }

  onMount(async () => {
    articles = await fetchArticles();
  });
</script>

<svelte:head>
  <title>Articles</title>
</svelte:head>


<div class="container">
  <div class="profile-container">
  {#if data.user}
    {#if editMode}
      <UserInfoForm user={data.user} on:save={toggleEditMode} on:cancel={toggleEditMode}/>
    {:else}
      <div class="profile-info">
          <div class="avatar-container">
          <img src={data.user.avatar} alt="avatar" class="avatar" />
        </div>
        <h2>
          {data.user.username}'s Profile
        </h2>
        <div class="profile-details">
          <div class="profile-detail">
            <span class="detail-label">First Name:</span> {data.user.firstName}
          </div>
          <div class="profile-detail">
            <span class="detail-label">Last Name:</span> {data.user.lastName}
          </div>
          <div class="profile-detail">
            <span class="detail-label">Date of Birth:</span> {data.user.dob}
          </div>
          <div class="profile-detail">
            <span class="detail-label">Username:</span> {data.user.username}
          </div>
          <div class="profile-detail">
            <span class="detail-label">Description:</span> {data.user.desc}
          </div>
          <div class="profile-detail">
            <span class="detail-label">Avatar:</span> {data.user.avatar}
          </div>
        </div>
        <div class="profile-actions">
          <button on:click={toggleEditMode}>Edit</button>
          <button on:click={deleteUser}>Delete Account</button>
        </div>
      </div>
    {/if}
  {/if}
</div>

{#if articles.length > 0}

<div class="articles-container">
  {#each articles as article}
    <button onclick={`window.location.href='/${article.article_id}'`} class="article-tile">
      <h2 class="article-title">{article.title}</h2>
      <p class="article-date">{article.date}</p>
    </button>
  {/each}
</div>
{:else}
  <p>No user articles found.</p>
{/if}
</div>

<style>

  :global(html),
    :global(body),
    .articles-container,
    .article-tile,
    .article-date {
      zoom: 0.9;
    }

    .container {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 40px;
    padding: 10px;
  }

  .profile-container {
  width: 30%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-info h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

.detail-label {
  font-weight: bold;
}

.profile-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.profile-actions button {
  cursor: pointer;
    color: rgb(224, 224, 224);
    text-decoration: none;
    background-color: transparent;
    border: 1px solid rgb(142, 142, 142);
    border-radius: 4px;
    padding: 8px 12px;
    margin-right: 10px;
    font: inherit;
    outline: none;
    transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.3s;
}

.profile-actions button:hover {
  background-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: translateY(-2px);
}
.avatar-container {
  display: flex;
  justify-content: center;
}

.avatar {
  width: 70px;
  height: 70px; 
  border-radius: 50%; 
}

  .articles-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-left: 15%;
    width: 100%;
    max-height: 70vh;
    margin-top: 50px;
    overflow-y: auto;
    padding-right: 0px;
    margin-right: -200px;
  }
    
    .articles-container::-webkit-scrollbar {
      width: 8px; 
    }
  
    
    .articles-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1); 
      border-radius: 8px; 
    }
  
      .articles-container::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3); 
      border-radius: 8px; 
    }
  
      
      .articles-container::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  
    .article-tile {
      width: calc(27%);
      height:130px;
      margin-top: 5px;
      margin-bottom: 35px;
      padding: 10px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 8px;
      text-align: left;
      transition: transform 0.3s ease;
      margin-right: 50px;
      background-color: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(4px); 
    }
  
    .article-tile:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .article-title{
      font-size: 1.9em;
    }
  
    .article-date {
      font-style: italic;
      align-self: flex-end;
      font-size: 1.2em;
    }
    
  </style>
  
