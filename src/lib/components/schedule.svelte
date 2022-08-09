





<script>
    console.log("start schedule.svelte");
    export let type;
    export let events;    
    let todays_date = new Date();
    const get_days_of_week = () => {
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[todays_date.getDay()];
    }
    const days = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
    // console.log({events});
    const display_day = (day) => {
        console.log("start display_day");
        if (day === 0) {
            console.log("end display_day");
            return "Today";
        } else {
            var dd = todays_date.getDate();
            var mm = todays_date.getMonth();
            var yyyy = todays_date.getFullYear();
            let curr = new Date(yyyy, mm, dd+day);
            console.log("end display_day");
            return `${days[curr.getDay()]} ${curr.getDate()}`;
            
        }
    };

    const get_weeks_schedule = (events) => {
        // let queue = events.sort((a, b) => { a.start_date - b.start_date } );
        let queue = [];
        let weeks = [];
        for (let i = 0; i < 7; i++) {
            let temp_date_begin = new Date(todays_date.getFullYear(), todays_date.getMonth(), todays_date.getDate()+i);
            let temp_date_end = new Date(todays_date.getFullYear(), todays_date.getMonth(), todays_date.getDate()+i+1);
            for (let j = 0; j < queue.length; j++) {
                if (queue[j].start_date >= temp_date_begin && queue[j].start_date < temp_date_end ||
                    queue[j].end_date >= temp_date_begin && queue[j].end_date < temp_date_end) {
                    weeks.push(queue[j]);
                }else {

                }
            }
        }
    };

    let weeks_schedule = get_weeks_schedule(events);
    console.log("end schedule.svelte");
</script>

<div id="new_entry">

</div>

<div id="main">
    {#each Array(7) as _, i}
    <div class="day">
        <div class="date">{display_day(i)}</div>
        <!-- TODO:: loop for multiple events in a single day -->
        {#if events}
            {#each Object.entries(events) as curr}
                <div class="event">
                    <!-- TODO::  remove hardcoded content -->
                    <div class="time">6pm<br>|<br>9pm</div>
                    <div class="content">
                        <div class="title">Title Here</div>
                        <div class="desc">description of event will go here</div>
                    </div>
                </div>
            {/each} 
        {:else}
            <div class="event">
                
            </div>
        {/if}
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