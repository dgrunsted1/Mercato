

<script>
    import { browser } from '$app/env';
    import Clothes from '$lib/icons/Clothes.svelte';
    import { afterUpdate, createEventDispatcher, tick } from 'svelte';
    const dispatch = createEventDispatcher() ;
    export let type;
    export let locations;
    let lattd_in = 0;
    let lngtd_in = 0;
    let loc_name_in = "";
    let loc_desc_in = "";
    let annotations = [];
    let added_last = false;
    let edit_loc_name;

/**
 * Creates a script tag that loads the MapKitJS Library and then
 * calls `mapkit.init` to initialize the library with your JWT.
 */
 const setupMapKitJs = async() => {
    // Create and Load the MapKit JS Script Tag
    await new Promise(resolve => {
        const element = document.createElement("script");
        element.addEventListener("load", () => { resolve(); });
        element.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";
        document.head.appendChild(element);
    });
    // TODO: For production use, the JWT should not be hard-coded into JS.
    const jwt = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1NjQyVFFIQUsifQ.eyJpc3MiOiI1NjNRTFA2UzU1IiwiaWF0IjoxNjYzNzk4MjU4LCJleHAiOjE2NjYzODk4NDJ9.Hh-8RskkX1TbuDr7M7RERjSsLhmAHMuKB1jj6ro0kEp3QMJLp5YfA7R4RVihyMu5RPlD0XvU_fKanB9g_He8cg";
    mapkit.init({
        authorizationCallback: done => { done(jwt); }
    });
};

const main = async(locations_in) => {
    console.log("main");
    console.log({locations_in});
    // return;
    // if (document.getElementById("map").innerHTML){
        // document.getElementById("map").innerHTML = "";
        // let temp_div = document.createElement("div");
        // temp_div.id = "map";
        // document.getElementById("map_container")?.append(temp_div);
    
    await setupMapKitJs();

    // Create the Map and Geocoder
        const map = new mapkit.Map("map", {
            showsUserLocation: true
        });
    
    const geocoder = new mapkit.Geocoder({ language: "en-US" });
    // Create the "Event" annotation, setting properties in the constructor.

    let calloutDelegate = {
        // Return a div element and populate it with information from the
        // annotation, including a link to a review site.
        calloutContentForAnnotation: function(annotation) {
            let element = document.createElement("div");
            element.className = "review-callout-content";
            let title = element.appendChild(document.createElement("div"));
            title.className = "callout_title";
            title.textContent = annotation.title;
            let desc = element.appendChild(document.createElement("div"));
            desc.className = "callout_desc";
            desc.textContent = annotation.subtitle;
            // TODO add event btn
            let event_btn = element.appendChild(document.createElement("button"));
            event_btn.id = "callout_event";
            event_btn.textContent = "create event";
            event_btn.addEventListener("click", event => {
                dispatch("add_event", {
                    location_title: annotation.title
                });
            });
            // TODO edit location btn
            let edit_btn = element.appendChild(document.createElement("button"));
            edit_btn.id = "callout_edit";
            edit_btn.textContent = "edit location";
            edit_btn.addEventListener("click", event => {
                lattd_in = annotation.coordinate.latitude;
                lngtd_in = annotation.coordinate.longitude;

                edit_loc_name = annotation.title;
                // document.getElementById("add_loc_btn").value = "save";
                // document.getElementById("location_new").style.display = "flex";
            });
            // TODO delete location btn
            let delete_btn = element.appendChild(document.createElement("button"));
            delete_btn.id = "callout_delete";
            delete_btn.textContent = "delete";
            delete_btn.addEventListener("click", event => {
                edit_loc_name = annotation.title;
                setTimeout(() => {
                    confirm("Delete this location?");
                    const url = `/apis/map/delete_location`;
                    const response = fetch(url, {
                        method: "post",
                        body: JSON.stringify({
                            id: document.getElementById("edit_loc_id").value,
                            act_loc_id: document.getElementById("edit_act_loc_id").value
                        })
                    });
                        edit_loc_name = "";
                        lattd_in = 0;
                        lngtd_in = 0;
                        document.getElementById("location_edit").style.display = "none";
                        dispatch('map_update');
                        added_last = true;
                }, 500);
                
            });
            return element;
        }
    };

    annotations = [];
    for (let i = 0; i < locations_in.length; i++){
        const event = new mapkit.Coordinate(locations_in[i].lattd, locations_in[i].lngtd);
        const eventAnnotation = new mapkit.MarkerAnnotation(event, {
            callout: calloutDelegate,
            color: "#4eabe9",
            title: locations_in[i].name,
            subtitle: locations_in[i].desc,
            glyphText: "\u{1F37F}" // Popcorn Emoji
        });
        annotations.push(eventAnnotation);
    }

    // Add and show both annotations on the map
    map.showItems(annotations);

    // This will contain the user-set single-tap annotation.
    let clickAnnotation = null;

    // Add or move an annotation when a user single-taps an empty space
    map.addEventListener("single-tap", event => {
        if (type == "home") return;
        if (clickAnnotation && !added_last) {
            map.removeAnnotation(clickAnnotation);
        }else if (added_last){
            added_last = false;
        }

        // Get the clicked coordinate and add an annotation there
        const point = event.pointOnPage;
        const coordinate = map.convertPointOnPageToCoordinate(point);

        clickAnnotation = new mapkit.MarkerAnnotation(coordinate, {
            title: "Loading...",
            color: "#c969e0"
        });

        map.addAnnotation(clickAnnotation);

        // Look up the address with the Geocoder's Reverse Lookup Function
        geocoder.reverseLookup(coordinate, (error, data) => {
            const first = (!error && data.results) ? data.results[0] : null;
            clickAnnotation.title = (first && first.name) || "";
            loc_name_in = clickAnnotation.title;
            edit_loc_name = loc_name_in;
        });
        lattd_in = coordinate.latitude;
        lngtd_in = coordinate.longitude;
        document.getElementById("location_new").style.display = "flex";
    });

    const change_tab = () => {
        map.removeAnnotations(annotations);
        annotations = [];
        console.log(locations);
        for (let i = 0; i < locations.length; i++){
            const event = new mapkit.Coordinate(locations[i].lattd, locations[i].lngtd);
            const eventAnnotation = new mapkit.MarkerAnnotation(event, {
                callout: calloutDelegate,
                color: "#4eabe9",
                title: locations[i].name,
                subtitle: locations[i].desc,
                glyphText: "\u{1F37F}" // Popcorn Emoji
            });
            annotations.push(eventAnnotation);
        }
        map.showItems(annotations);
    }

    // let tabs = document.getElementsByClassName("tab");
    // for (let curr_tab in tabs){

    //     console.log(tabs[curr_tab]);
    //     tabs[curr_tab].addEventListener("click", event => {
    //         map.removeAnnotations(annotations);
    //         annotations = [];
    //         async () => {
    //             await tick();
    //             console.log(locations);
    //             for (let i = 0; i < locations.length; i++){
    //                 const event = new mapkit.Coordinate(locations[i].lattd, locations[i].lngtd);
    //                 const eventAnnotation = new mapkit.MarkerAnnotation(event, {
    //                     callout: calloutDelegate,
    //                     color: "#4eabe9",
    //                     title: locations[i].name,
    //                     subtitle: locations[i].desc,
    //                     glyphText: "\u{1F37F}" // Popcorn Emoji
    //                 });
    //                 annotations.push(eventAnnotation);
    //             }
    //             map.showItems(annotations);
    //         }
    //     });
    // }



};


afterUpdate(() =>{
    document.getElementById("map").innerHTML = "";
    main(locations);
})


const add_location = async (event) => {
        if (document.getElementById("edit_name")) console.log(document.getElementById("edit_name").value);
        const url = `/apis/map/add_location`;
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                type: type,
                name: loc_name_in,
                desc: loc_desc_in,
                lattd: lattd_in,
                lngtd: lngtd_in
            })
        });
        if (response.ok) {
            // annotations
            edit_loc_name = "";
            loc_desc_in = "";
            loc_name_in = "";
            lattd_in = 0;
            lngtd_in = 0;
            document.getElementById("location_new").style.display = "none";

            dispatch('map_update');
            added_last = true;
        }
    }

    const edit_location = async (event) => {
        const url = `/apis/map/update_location`;
            const response = await fetch(url, {
                method: "post",
                body: JSON.stringify({
                    id: document.getElementById("edit_loc_id").value,
                    name: document.getElementById("edit_name").value,
                    desc: document.getElementById("edit_desc").value,
                    act_loc_id: document.getElementById("edit_act_loc_id").value
                })
            });
            if (response.ok) {
                // annotations
                edit_loc_name = "";
                lattd_in = 0;
                lngtd_in = 0;
                dispatch('map_update');
                added_last = true;
            }
    }

    const check_location = async (event) => {
        let url = '';
        let temp_id = event.target.parentElement.getAttribute('data-id');
        let temp_element_id = event.target.parentElement.id;
        if (document.getElementById(temp_element_id)?.classList.contains('checked')){
            url = `/apis/map/uncheck_location`;
            document.getElementById(temp_element_id)?.classList.remove("checked");
        }else {
            url = `/apis/map/check_location`;
            document.getElementById(temp_element_id)?.classList.add("checked");
        }
        const response = await fetch(url, {
            method: "post",
            body: JSON.stringify({
                act_loc_id: temp_id
            })
        });
    }



</script>


<div id="map_container">
    <div id="list_container">
        <div id="list_header">{type} Locations</div>
        {#if locations.length}
            {#each locations as location}
                {#if location.name != edit_loc_name}
                        {#if location.is_checked}
                        <div class="location checked" id={location.id} data-id={location.activity_location_id}>
                            <div class="loc_name">{location.name}</div>
                            <div class="loc_description">{location.desc}</div>
                            <div id="check {location.id}" class="check" on:click={check_location} value="uncross">X</div>
                        </div>
                        {:else}
                        <div class="location" id={location.id} data-id={location.activity_location_id}>
                            <div class="loc_name">{location.name}</div>
                            <div class="loc_description">{location.desc}</div>
                            <div id="check {location.id}" class="check" on:click={check_location} value="cross off">X</div>
                        </div>
                        {/if}
                {:else}
                    <div class="location" id="location_edit">
                        <input type="text" name="location_name_in" id="edit_name" value={location.name} placeholder="Name">
                        <input type="text" name="location_desc_in" id="edit_desc" value={location.desc} placeholder="Description">
                        <input type="text" id="edit_loc_id" style="display=none;" value={location.id}>
                        <input type="text" id="edit_act_loc_id" style="display=none;" value={location.activity_location_id}>
                        <input type="submit" id="add_loc_btn" value="save" on:click={edit_location}>
                    </div>
                {/if}
            {/each}
        {:else}
            <p>No locations added yet.</p>
            <p>add locations by clicking on the map.</p>
        {/if}
        <div class="location" id="location_new">
            <input type="text" name="location_name_in" bind:value={loc_name_in} placeholder="Name">
            <input type="text" name="location_desc_in" bind:value={loc_desc_in} placeholder="Description">
            <input type="submit" id="add_loc_btn" value="Add Location" on:click={add_location}>
        </div>
    </div>
    <div id="map"></div>
</div>











<style>




#map {
   width: 100%;
   height: 600px;
   margin-left: 20px;
    margin-right: 40px;
}

#map_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* width: 100%; */
    height: 100%;
    margin: 2% 2%;
}

#list_container {
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: scroll;
}

.location {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    
}

.checked > .loc_name, .checked > .loc_description {
    text-decoration: line-through;
    text-decoration-thickness: 2px;
    text-decoration-color: black;
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

#location_new {
    display: none;
    justify-content: space-between;
}

.location > div {
    margin: 5px;
}

.loc_name {
    font-size: 21px;
}

.loc_description {
    font-size: 14px;
}

#list_header {
    font-size: 36px;
}

.check {
    /* align-items: center; */
    appearance: none;
    background-color: #FCFCFD;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 0px 8px -3px,#D6D6E7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    /* font-family: "JetBrains Mono",monospace; */
    /* height: 48px; */
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    /* font-size: 18px; */
    margin: 1px;
    }

    .check:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    }

    .check:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
    }

    .check:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
    }


</style>