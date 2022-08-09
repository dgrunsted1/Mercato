<script context="module">
    let type = "home";
    export async function load({ fetch }) {
        console.log("start load function");
        const url = `/apis/schedule/get_activity_schedule`;
        console.log("type");
        console.log(type);
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type,
                user: 1
            })
        });
        console.log("end load function");
        return {
            staus: response.status,
            props: {
                events: response.ok && (await response.json())
            }
        }
    }
</script>



<script>
    import { browser } from '$app/env';
    import Schedule from '../lib/components/schedule.svelte';
    import Map from '../lib/components/map.svelte';
    import Chat from '../lib/components/chat.svelte';
    const curr_tabs = ["home", "golf", "beach", "dinner", "brunch", "lunch", "walk", "tennis", "hike", "shop", "eat", "drinks"];
    // @ts-ignore
    export let type;
    export let events;
    events = events.events;
    console.log(events);
    

</script>


<div id="page">
    <div id="content">
        <h1>{type}</h1>

        <Schedule bind:type={type} bind:events={events}/>
        <!-- <Map type={curr_tab}/>

        <Chat type={curr_tab}/> -->
    </div>

    <div id="tabs">
        {#each curr_tabs as tab}
            <div class="tab" on:click={() => {type = tab;}}>
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