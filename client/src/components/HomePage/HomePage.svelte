<script>
import { onMount } from "svelte";

let groceryList = [];
onMount(async () => {
    const response = await fetch('http://localhost:8080/api/list');
    const data = await response.json();

    groceryList = data.groceryList; 
});

let itemName = '';
async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/api/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName })
    });
}


</script>



<main>

<form on:submit={handleSubmit}>
    <label for="itemName">Add item</label><br>
    <input bind:value={itemName} type="text" id="itemName" name="itemName" required>
    <button type="submit">Tilføj</button> 
</form>    


<ul>
{#each groceryList as list}
<li>{list.item}</li> <button type="submit">slet</button>
{/each}
</ul>

</main>



<style>



</style>