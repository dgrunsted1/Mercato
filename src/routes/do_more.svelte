<script context="module">
    let type = "home";
    let user_id = 1;
    export async function load({ fetch }) {
        const url = `/apis/schedule/get_activity_schedule`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type,
                user: user_id
            })
        });
        return {
            staus: response.status,
            props: {
                data: response.ok && (await response.json()),
                type: type,
                user_id: user_id
            }
        }
    }
</script>



<script>
    import { browser } from '$app/env';
    import Schedule from '../lib/components/schedule.svelte';
    import Map from '../lib/components/map.svelte';
    import Chat from '../lib/components/chat.svelte';
    import { displayPartsToString } from 'typescript';
    export let type;
    export let data;
    export let user_id;
    let events = data.this_week;
    let tabs = data.tabs;
    let locations = data.locations;
    let min = new Date();
    min.setHours(min.getHours()+1);
    let max = new Date();
    max.setDate(max.getDate()+7);
    max.setHours(0, 0, 0);


    const set_events = async (type_in) => {
        type = type_in;
        const url = `/apis/schedule/get_activity_schedule`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type,
                user: user_id
            })
        });
        data = response.ok && (await response.json());
        events = data.this_week;
        locations = data.locations;
    }

    const upload_entry = () => {
        if (document.getElementById("event_id").value){
            upload_edited_entry();
            return;
        }

        // TODO bind these values

        let selected_activity = document.getElementById("selected_activity").value;
        let selected_location = document.getElementById("selected_location").value;
        let selected_start_date = document.getElementById("selected_start_date").value;
        let selected_end_date = document.getElementById("selected_end_date").value;
        let selected_description = document.getElementById("selected_description").value;
        //fetch to insert entry
        let url = `/apis/schedule/add_event`;
        console.log({url});
        const response = fetch(url, {
            method: "post",
            body: JSON.stringify({
                act: selected_activity,
                loc: selected_location,
                start: selected_start_date,
                end: selected_end_date,
                description: selected_description,
                user: user_id
            })
        });
    }

    const upload_edited_entry = () => {
        let selected_activity = document.getElementById("selected_activity").value;
        let selected_location = document.getElementById("selected_location").value;
        let selected_start_date = document.getElementById("selected_start_date").value;
        let selected_end_date = document.getElementById("selected_end_date").value;
        let selected_description = document.getElementById("selected_description").value;
        let event_id = document.getElementById("event_id").value;
        //fetch to insert entry
        let url = `/apis/schedule/edit_event`;
        console.log({url});
        const response = fetch(url, {
            method: "post",
            body: JSON.stringify({
                id: event_id,
                act: selected_activity,
                loc: selected_location,
                start: selected_start_date,
                end: selected_end_date,
                description: selected_description,
                user: user_id
            })
        });
    }

    const remove_popup = () => {
        console.log("remove popup");
        document.getElementById("popup_overlay").style.display = "none";
    }

    const new_entry = (event) => {
        console.log(event.detail.event);
        document.getElementById("popup_overlay").style.display = "block";
        if (event.detail.date){
            let date = event.detail.date;
            let start = new Date(date);
            let end = new Date(date);
            start.setHours(13, 0, 0);
            end.setHours(16, 0, 0);
            // date = zero_out_date("hours", date);
            document.getElementById("selected_start_date").value = start.toISOString().slice(0,16);
            document.getElementById("selected_end_date").value = end.toISOString().slice(0,16);
        }
    }

    const edit_entry = (event) => {
        let event_data = event.detail.event;
        console.log(event_data);
        document.getElementById("popup_overlay").style.display = "block";
        if (event_data.start_date){
            let start_temp = new Date(event_data.start_date);
            document.getElementById("selected_start_date").value = start_temp.toISOString().slice(0,16);
        }
        if (event_data.end_date){
            let end_temp = new Date(event_data.end_date);
            document.getElementById("selected_end_date").value = end_temp.toISOString().slice(0,16);
        }
        if (event_data.event_description) document.getElementById("selected_description").value = event_data.event_description;
        if (event_data.id) document.getElementById("event_id").value = event_data.id;
    }

    const do_nothing = () => {
        console.log("do nothing");
    }
</script>


<div id="page">
    <div id="content">
        <h1>{type}</h1>
        <Schedule bind:type bind:events on:new_entry={new_entry} on:edit_entry={edit_entry}/>
        <Map bind:type/>

        <!-- <Chat type/> -->
    </div>

    <div id="tabs">
        {#each tabs as tab}
            <div class="tab" on:click={() => set_events(tab.type)}>
                {tab.type}
            </div>
        {/each}
    </div>
</div>

<div id="popup_overlay" on:click|self={remove_popup}>
    <div id="window">
        <form method="post">
            <label for="activity">Activity:</label><select name="activity" id="selected_activity">
                {#each tabs as activity}
                    {#if activity.type === type}
                        <option value={activity.id} selected>{activity.type}</option>
                    {:else}
                        <option value={activity.id}>{activity.type}</option>
                    {/if}
                {/each}
            </select>
            <label for="location">Location:</label><select name="location" id="selected_location">
                {#each locations as location}
                        <option value={location.id}>{location.name}</option>
                {/each}
            </select>
            <label for="start_date">Start:</label><input type="datetime-local" name="start_date" id="selected_start_date" min={min.toDateString()} max={max.toDateString()}>
            <label for="end_date">End:</label><input type="datetime-local" name="end_date" id="selected_end_date" min={min.toDateString()} max={max.toDateString()}>
            <label for="description">descirption</label><input type="text" name="description" id="selected_description" size="50">
            <input type="number" name="event_id" id="event_id">
            <input type="submit" on:click={() => upload_entry()} value="add event">
        </form>
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

    #popup_overlay {
        display: none;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background : rgba(0,0,0,0.5);
    }

    #window {
        margin: 70px auto;
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        width: 30%;
        position: relative;
        transition: all 5s ease-in-out;
    }

    #event_id {
        visibility: hidden;
    }

</style>