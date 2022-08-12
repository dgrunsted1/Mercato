<script>


    import { createEventDispatcher } from 'svelte';



    export let type;
    export let events; 


    const dispatch = createEventDispatcher();
    const todays_date = new Date(); 
    const days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];



    const display_day = (day) => {
        if (day === 0) {
            return {
                display: "Today",
                date: todays_date
            } 
        } else {
            var dd = todays_date.getDate();
            var mm = todays_date.getMonth();
            var yyyy = todays_date.getFullYear();
            let curr = new Date(yyyy, mm, dd+day);
            return {
                display: `${days[curr.getDay()]} ${curr.getDate()}`,
                date: curr
            };
            
        }
    };



    const get_time_range = (event) => {
        

        let start = new Date(event.start_date).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        let end = new Date(event.end_date).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        
        return {
            start_time: start,
            end_time: end
        }

    };



    function new_entry(date_in){
        dispatch('new_entry', {
			date: date_in
		});
    }


</script>

<div id="new_entry">

</div>

<div id="main">
    {#each Array(7) as _, i}
    <div class="day">
        <div class="date" on:click={() => new_entry(display_day(i).date)}>{display_day(i).display}</div>
        <!-- TODO:: loop for multiple events in a single day -->
        {#if events[i].length > 0}
            {#each Object.entries(events[i]) as curr}
                <div class="event">
                    <!-- TODO::  remove hardcoded content -->
                    <div class="time">{get_time_range(curr[1]).start_time}<br>|<br>{get_time_range(curr[1]).end_time}</div>
                    <div class="content">
                        <div class="title">{curr[1].name}</div>
                        <div class="desc">{curr[1].event_description}<br>{curr[1].location_description}</div>
                    </div>
                </div>
            {/each} 
        {:else}
            <div class="event" on:click={() => new_entry(display_day(i).date)}>
                <div class="time">no events today</div>
                <div class="content">
                    <div class="title">no events today</div>
                    <div class="desc">no events today</div>
                </div>
            </div>
        {/if}
        <!-- <div class="event"> -->
            <!-- TODO::  remove hardcoded content -->
            <!-- <div class="time">6pm<br>|<br>9pm</div> -->
            <!-- <div class="content"> -->
                <!-- <div class="title">Title Here</div> -->
                <!-- <div class="desc">description of event will go here</div> -->
            <!-- </div> -->
        <!-- </div> -->
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