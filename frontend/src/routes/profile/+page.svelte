<script>
  import UserInfoForm from "$lib/components/UserInfoForm.svelte";

  export let data;

  let editMode = false;

  //toggles profile editable version when edit button clicked
  function toggleEditMode() {
    editMode = !editMode;
  }
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
                          <td>{data.user.description}</td>
                      </tr>
                      <tr>
                          <td>Avatar</td>
                          <td>:</td>
                          <td>{data.user.avatar}</td>
                      </tr>
                  </tbody>
              </table>
              <button on:click={toggleEditMode}>Edit</button>
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
