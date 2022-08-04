<script>
import Schedule from '../lib/components/schedule.svelte';
import Map from '../lib/components/map.svelte';
import Chat from '../lib/components/chat.svelte';
let curr_tabs = ["home", "golf", "beach", "dinner", "brunch", "lunch", "walk", "tennis", "hike", "shop", "eat", "drinks"];
let curr_tab = "home";





</script>


<div id="page">
    <div id="content">
        <h1>{curr_tab}</h1>

        <Schedule type={curr_tab}/>

        <!-- <Map type={curr_tab}/>

        <Chat type={curr_tab}/> -->
    </div>

    <div id="tabs">
        {#each curr_tabs as tab}
            <div class="tab" on:click={() => {curr_tab = tab;}}>
                {tab}
            </div>
        {/each}
    </div>
</div>









<style>

#page {
    position: absolute;
    margin: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 30px;
    padding-right: 20px;
    
}

.tab {
    padding: 5px;
    border: .5px solid black;
    /* border-radius: 5px; */
    /* margin: 2px; */
    background-color: #f0f0f0;
    cursor: pointer;
}




</style>