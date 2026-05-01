<script>
import { onMount } from "svelte";
import { Toaster, toast } from 'svelte-sonner';


const apiURL = import.meta.env.VITE_DB_HOST_URL;


let groceryList = [];
async function fetchListData() {
    const response = await fetch(`${apiURL}/api/list`);
    const data = await response.json();

    groceryList = data.groceryList; 
  }


onMount(() => {
    fetchListData();
});


let itemName = '';
async function handleSubmit() {
    const res = await fetch(`${apiURL}/api/list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName })
    });
    if(res.ok) {
        fetchListData();
        toast.success('Item added to your list!');
    } else {
        toast.error('couldnt add your item, please try again');
    }
}


async function deleteItem(id) {
    const res = await fetch(`${apiURL}/api/list/${id}`, {
        method: 'DELETE'
    });
    if(res.ok) {
        fetchListData();
        toast.success('Your item was deleted correctly!');
    } else {
        toast.error('server did not respond, please try again');
    }
}


let editItemName = '';
async function updateItem(id) {
    if(!editItemName) {
        toast.error('please write something before saving');
        return;
    } 
    const res = await fetch(`${apiURL}/api/list/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ editItemName })
    });
    if(res.ok) {
        editingID = null;
        fetchListData();
        toast.success('Your item is updated!');
    } else {
    toast.error('something went wrong, please try again');
    }
}


let editingID = null;
</script>



<main>
<Toaster />

<form on:submit|preventDefault={handleSubmit}>
    <label for="itemName">Add item</label><br>
    <input bind:value={itemName} type="text" id="itemName" name="itemName">
    <button type="submit">Add</button> 
</form>    


<ul>
{#each groceryList as list}
{#if editingID === list.id}
    <input bind:value={editItemName} type="text" id="editItemName" name="editItemName">
    <button on:click={() => { updateItem(list.id); editItemName = ''; }} type="button">Save</button>
    <button on:click={() => editingID = null }>Cancel</button>
{:else}
   <li>{list.item}</li> 
    <button on:click={() => deleteItem(list.id)} type="button">Delete</button> 
    <button on:click={() => editingID = list.id} type="button">Edit</button>
{/if}
{/each}
</ul>

</main>



<style>



</style>