<script context="module">
    let type = "home";
    export async function load({ fetch }) {
        const url = `/apis/schedule/get_activity_schedule`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type,
                user: 1
            })
        });
        return {
            staus: response.status,
            props: {
                events: response.ok && (await response.json()),
                type: type
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
    export let type;
    export let events;
    events = events.this_week;
    console.log(events);

    const set_events = async (type_in) => {
        type = type_in;
        const url = `/apis/schedule/get_activity_schedule`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type,
                user: 1
            })
        });
        events = response.ok && (await response.json());
        events = events.this_week;
    }
    

</script>


<div id="page">
    <div id="content">
        <h1>{type}</h1>
        <Schedule bind:type bind:events/>
        <!-- <Map type={curr_tab}/>

        <Chat type={curr_tab}/> -->
    </div>

    <div id="tabs">
        {#each curr_tabs as tab}
            <div class="tab" on:click={() => set_events(tab)}>
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