<script context="module">
    export let type;
    import { element_is } from "svelte/internal";
    async function load({ fetch }) {
        const url = `/../../routes/apis/schedule/get_activity_schedule`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type
            })
        });
        return {
            status: response.status,
            props: {
            events: response.ok && (await response.json())
            }
        };
    }

</script>






<script>
    import { browser } from '$app/env';
export let type;


let get_events = async function() {
    if (browser){
        const url = '/src/routes/apis/schedule/get_activity_schedule';
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type,
                user: 1
            })
        });
        if (response.ok) {
            return response
        } else {
            alert("no response from from ../../routes/apis/schedule/get_activity_schedule");
        }
    }else {
        return;
    }
    
}


let events = get_events();
console.log(events);

let todays_date = new Date();

const days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
// export let events;
// console.log({events});
// events = events.events;
const display_day = (day) => {
    if (day === 0) {
        return "Today";
    } else {
        var dd = todays_date.getDate()+day;
        var mm = todays_date.getMonth();
        var yyyy = todays_date.getFullYear();
        let curr = new Date(mm+'/'+dd+'/'+yyyy);
        return `${days[curr.getDay()]} ${curr.getDate()}`;
    }
};

// const add_event = () => {
    
// };
</script>

<div id="new_entry">

</div>

<div id="main">
    {#each Array(7) as _, i}
    <div class="day">
        <div class="date">{display_day(i)}</div>
        <!-- TODO:: loop for multiple events in a single day -->
        <div class="event">
            <!-- TODO::  remove hardcoded content -->
            <div class="time">6pm<br>|<br>9pm</div>
            <div class="content">
                <div class="title">Title Here</div>
                <div class="desc">description of event will go here</div>
            </div>
        </div>
    </div>
{/each}
</div>









<style>
    #main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .event {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .day, .event, .time, .content {
        margin: 2px
    }

    .day {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .time {
        background-color: #D9CAB3;
        padding: 10px 5px;
        border-radius: 5px;
    }
    .event {
        border-bottom: 1px solid black;
    }
    .date {
        background-color: #87A8A4;
        width: fit-content;
        padding: 5px 10px;
        border-radius: 5px;
    }

    @media (min-width: 640px) {
        #main {
            flex-direction: row;
        }
    }
</style>