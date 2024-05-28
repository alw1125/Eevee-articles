<script>
    let searchQuery="";
    function caseInsensitiveSearch (){
    searchQuery= searchQuery.toLowerCase();
     console.log(searchQuery)

        

    }
</script>
    

<form id="form"> 
    <input type="search" id="query" name="q" placeholder="Search..." bind:value={searchQuery}>
    <button on:click={caseInsensitiveSearch}>Search</button>
  </form>

