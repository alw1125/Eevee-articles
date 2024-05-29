<script>
  import UserInfoForm from "$lib/components/UserInfoForm.svelte";
  import { USER_URL } from "$lib/js/api-urls";
  import { goto } from "$app/navigation";

  export let data;

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
  } else {
    console.error('Failed to delete user:', response.statusText);
    alert('Failed to delete user.');
  }
} catch (error) {
  console.error('Error deleting user:', error);
  
  alert('An error occurred while trying to delete the user.');
}}
</script>

<svelte:head>
  <title>My Profile</title>
</svelte:head>

{#if data.user}
  {#if editMode}
    <UserInfoForm user={data.user} on:save={toggleEditMode} on:cancel={toggleEditMode}/>
  {:else}
    <div class="main">
      <h2>My Profile</h2>
      <div class="card">
              <table>
                  <tbody>
                      <tr>
                          <td>First Name</td>
                          <td>:</td>
                          <td>{data.user.firstName}</td>
                      </tr>
                      <tr>
                          <td>Last Name</td>
                          <td>:</td>
                          <td>{data.user.lastName}</td>
                      </tr>
                      <tr>
                          <td>Date of birth</td>
                          <td>:</td>
                          <td>{data.user.dob}</td>
                      </tr>
                      <tr>
                          <td>Username</td>
                          <td>:</td>
                          <td>{data.user.username}</td>
                      </tr>
                      <tr>
                          <td>Description</td>
                          <td>:</td>
                          <td>{data.user.desc}</td>
                      </tr>
                      <tr>
                          <td>Avatar</td>
                          <td>:</td>
                          <td>{data.user.avatar}</td>
                      </tr>
                  </tbody>
              </table>
              <button on:click={toggleEditMode}>Edit</button>
              <button on:click={deleteUser}>Delete Account</button>
          </div>
      </div>
  {/if}
{/if}
<style>

.main {
    margin: auto;
    font-size: 28px;
    padding: 50px;
    width: 50%;
}

.main h2 {
    color: #333;
    font-size: 30px;
    margin-bottom: 20px;
}

.main .card {
    background-color: #fff;
    border-radius: 18px;
    box-shadow: 1px 1px 8px 0 grey;
    height: auto;
    margin-bottom: 20px;
    padding: 20px 0 20px 50px;
}

.main .card table {
    border: none;
    font-size: 16px;
    height: 270px;
    width: 80%;
}
</style>
