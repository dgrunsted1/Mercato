<script context="module">
    export async function load({ fetch }) {
      const url = `/apis/get_itinerary_data`;
      const response = await fetch(url);
  
      return {
        status: response.status,
        props: {
            input_data: response.ok && (await response.json())
        }
      };
    }
  </script>
<script>
import { check_outros } from "svelte/internal";


    let trip_config = {
        default: {value: true, type:"none"}, 
        start_date: {value: "", type:"date"}, 
        return_date: {value: "", type:"date"}, 
        start_location: {value: "", type:"text"}
    };


    // for testing
    trip_config = {
        default: {value: false, type:"none"}, 
        start_date: {value: "2022-06-20", type:"date"}, 
        return_date: {value: "2022-07-05", type:"date"}, 
        start_location: {value: "Milwaukee, WI, USA", type:"text"}
    }


    let activities = {};
    let travel = {};
    let entry_types = [ 'travel', 'activity', 'stay'];
    let entries = {
        "travel": [
            {
                title: "flight to italy",
                departure_date: "2022-06-20T04:48",
                arrival_date: "2022-06-20T16:48",
                departure_location: "chicago",
                arrival_location: "rome"

            },
            {
                title: "flight home from italy",
                departure_date: "2022-07-05T04:48",
                arrival_date: "2022-07-05T16:48",
                departure_location: "Rome",
                arrival_location: "Chicago"
            },
            {
                title: "train to florence",
                departure_date: "2022-06-23T08:48",
                arrival_date: "2022-06-23T11:48",
                departure_location: "Rome",
                arrival_location: "florence"
            },
            {
                title: "rental car to rietine",
                departure_date: "2022-06-23T13:48",
                arrival_date: "2022-06-23T14:48",
                departure_location: "florence",
                arrival_location: "rietine"
            },
            {
                title: "rental car to rome",
                departure_date: "2022-06-28T08:48",
                arrival_date: "2022-06-28T11:48",
                departure_location: "rietine",
                arrival_location: "rome"
            },
            {
                title: "train to naples",
                departure_date: "2022-06-28T13:48",
                arrival_date: "2022-06-28T17:48",
                departure_location: "rome",
                arrival_location: "naplese"
            },
            {
                title: "train to solerno",
                departure_date: "2022-06-30T08:48",
                arrival_date: "2022-06-30T11:48",
                departure_location: "naples",
                arrival_location: "solerno"
            },
            {
                title: "bus to praiano",
                departure_date: "2022-06-30T12:48",
                arrival_date: "2022-06-30T14:48",
                departure_location: "solerno",
                arrival_location: "praiano"
            },
            {
                title: "bus to solerno",
                departure_date: "2022-07-04T07:48",
                arrival_date: "2022-07-04T09:48",
                departure_location: "praiano",
                arrival_location: "solerno"
            },
            {
                title: "train to Rome",
                departure_date: "2022-07-05T10:48",
                arrival_date: "2022-07-05T15:48",
                departure_location: "solerno",
                arrival_location: "rome"
            }
        ],
        "stays": [
            {
                title: "Rome airbnb",
                checkin_date: "2022-06-20T02:00",
                checkout_date: "2022-06-23T11:00",
                city: "rome"
            },
            {
                title: "Tuscany airbnb",
                checkin_date: "2022-06-23T02:00",
                checkout_date: "2022-06-28T11:00",
                city: "reitine"
            },
            {
                title: "Naples airbnb",
                checkin_date: "2022-06-28T02:00",
                checkout_date: "2022-06-30T11:00",
                city: "naples"
            },
            {
                title: "Praiano airbnb",
                checkin_date: "2022-06-30T02:00",
                checkout_date: "2022-07-04T11:00",
                city: "praiano"
            },
            {
                title: "second Rome airbnb",
                checkin_date: "2022-07-04T02:00",
                checkout_date: "2022-07-05T11:00",
                city: "rome"
            }
        ],
        "activities": []
    };


    //for testing
    // entries = [{}];




    let curr_type = entry_types[0];
    let trip_days = (new Date(trip_config.return_date.value).getTime() - new Date(trip_config.start_date.value).getTime())/(1000*60*60*24);
    let calender_title = `Your ${trip_days} days trip`;
    export let input_data;
    input_data = input_data.input_data;
    input_data = input_data;
    
    const add_entry = () => {
        let vals = document.getElementsByTagName('input');
        let result = {};
        let vals_exist = true;
        let is_config = false;
        [...vals].forEach(element => {
            if (!element.value) vals_exist = false;
            if (element.name == 'start_location' && element.value != '' ) {
                trip_config.default.value = false;
                is_config = true;
            }
            if (element.name == "start_date") trip_config.start_date.value = element.value;
            if (element.name == "return_date") trip_config.return_date.value = element.value;
            if (element.name == "start_location") trip_config.start_location.value = element.value;
            result[element.name] = element.value;
            
        });

        if (vals_exist) {
            [...vals].forEach(element => {
            element.value = "";
            });
            if (!is_config){
                if (curr_type == 'activity') entries.activities.push(result);
                // entries = entries;
            }
            
           
        }else {
            alert("missing value");
        }
        console.log(entries.activities);
    }

    const get_entries_for_the_day = (day_index, entries) => {
        let result = [];
        let day_to_return = daysIntoYear(trip_config.start_date.value) + day_index + 1;
        entries?.forEach(element => {
            let start = daysIntoYear(element.departure_date ? element.departure_date : element.checkin_date);
            let end = daysIntoYear(element.arrival_date ? element.arrival_date : element.checkout_date);
            if (    (start == day_to_return && end == day_to_return) ||
                    (start <= day_to_return && end >= day_to_return)){
                let temp_date = "";
                if (start == day_to_return) temp_date = element.departure_date ? element.departure_date : `check-in: ${new Date(element.checkin_date).getHours()}:${new Date(element.checkin_date).getMinutes()}`;
                if (end == day_to_return && !temp_date) temp_date = element.arrival_date ? element.arrival_date : `check-out: ${new Date(element.checkout_date).getHours()}:${new Date(element.checkout_date).getMinutes()}`;
                else if (end == day_to_return && temp_date && element.departure_date) temp_date = `depart: ${new Date(element.departure_date).getHours()}:${new Date(element.departure_date).getMinutes()} arrive: ${new Date(element.arrival_date).getHours()}:${new Date(element.arrival_date).getMinutes()}`;
                let temp_city = element.city ? element.city : `${element.departure_location} -> ${element.arrival_location}`;
                let temp;
                if (temp_date != "") {
                    temp = {
                        title: element.title,
                        date: temp_date,
                        city: temp_city
                    }
                }else {
                    temp = {
                        title: element.title,
                        city: temp_city
                    }
                }
                result.push(temp);
            }
        });
        return result;
    }

    const daysIntoYear = (date) => {
        date = new Date(date);
        return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }
    
    </script>
    
    <div id="main_container">
        <div id="visual"></div>
        <div class="row">
            {#each Array(trip_days) as _, i}
                <div class="day">
                    <div class="date" id="date-{i}">
                        <p>Day {i+1}</p></div>
                </div>
            {/each}
        </div>
        <div class="row stays">
            {#each Array(trip_days) as _, i}
                <div class="day">
                    <div class="stay" id="stay-{i}">
                            {#each get_entries_for_the_day(i, entries.stays) as {title, city, date}}
                                <div class="card_text"><p>{title}</p><p>{city}</p>
                                    {#if date}<p>{date}</p>{/if}
                                </div>
                            {/each}
                    </div>
                </div>
            {/each}
        </div>
        <div class="row activities">
            {#each Array(trip_days) as _, i}
                <div class="day">
                    <div class="activities" id="activity-{i}">
                        {#if get_entries_for_the_day(i, entries.activities).length}
                            {#each get_entries_for_the_day(i, entries.activities) as {title, city, date}}
                                <div class="card_text"><p>{title}</p><p>{city}</p>
                                    {#if date}<p>{date}</p>{/if}
                                </div>
                            {/each}
                        {:else}
                            <div class="card_text"><p>no activities today</p>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        <div class="row travel">
            {#each Array(trip_days) as _, i}
                <div class="day">
                    <div class="travel" id="travel-{i}">
                        {#if get_entries_for_the_day(i, entries.travel).length}
                            {#each get_entries_for_the_day(i, entries.travel) as {title, city, date}}
                                <div class="card_text"><p>{title}</p><p>{city}</p>
                                    {#if date}<p>{date}</p>{/if}
                                </div>
                            {/each}
                        {:else}
                        <div class="card_text"><p>no travel today</p>
                        </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
            
    
        <div id="new_entry_container">
            
            {#if trip_config.default.value}
                <div class="row">
                    {#each Object.entries(trip_config) as [key, val]}
                        {#if key != 'default'}
                            <span for={key}>{key}</span>
                            <div class="input"><input type="{val.type}" value={val.value} name={key}></div>
                        {/if}
                    {/each}
                </div>
            {:else}
            <div class="row dropdown"><span >Type</span><div class="input"><select bind:value={curr_type} type="dropdown" name="Type">
                {#each entry_types as curr}
                    <option value={curr}>{curr}</option>
                {/each}</select></div></div>
                {#each input_data[curr_type] as rows}
                <div class="row">
                    {#each rows as curr}
                        <span for={curr.name}>{curr.name}</span>
                        <div class="input"><input type="{curr.type}" name={curr.name}></div>
                    {/each}
                </div>
                {/each}
            {/if}
    
            
            <button class="button" on:click={add_entry}>ADD</button>
        </div>
    </div>
    
    
    
    <style>
    
    #main_container {
        display: flex;
        flex-direction: column;
    }
    .row {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0px;
        flex-wrap: wrap;
    }
    
    .entry_container {
        display: flex;
        flex-direction: column;
    }
    
    #new_entry_container {
        /* max-width: 600px; */
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
    
    .row > div{
        margin: 3px;
        flex-grow: 1;
    }

    input, select {
        line-height: 2;
        width: 100%;
        margin: 0;
        flex-grow: 2;
        padding-left: 20px;
    }
    select {
        margin:5px;
        appearance: none;
    }
    
    .button {
      background-color: #c2fbd7;
      border-radius: 100px;
      box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
      color: green;
      padding: 7px 20px;
      text-align: center;
      transition: all 250ms;
    }
    
    .input {
        display: flex;
        flex-direction: row;
        border: 2px solid black;
        padding-left: 10px;
    }



    span {
        position: relative;
        bottom: -1.3em;
        left: -6em;
        background-color: white;
        padding: 3px;
        margin: auto;
    }
    
    .button:hover {
      box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
      transform: scale(1.05) rotate(-1deg);
    }

    .card_text {
        font-size: 12px;
        border: 1px solid midnightblue;
        border-radius: 8px;
        padding: 0px 1px;
    }

    .stay > .card_text {
        background-color: purple;
        color: whitesmoke;
    }

    .travel > .card_text {
        background-color: green;
        color: white;
    }

    .activities > .card_text {
        background-color: orange;
        color: black;
    }

    p {
        margin: 0px;
    }

    .day {
        width: 200px;
    }
    
    @media only screen and (min-width: 600px) {
        .row, #new_entry_container {
            flex-direction: row;
        }
    
        .row {
            flex-wrap: nowrap;
        }

        span {
            bottom: 1px;
            left: 25px;
        }
        
        .dropdown {
            width: 200px;
        }
    }
    </style>