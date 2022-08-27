

<script>
    import { browser } from '$app/env';
import Clothes from '$lib/icons/Clothes.svelte';
    import { createEventDispatcher } from 'svelte';
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
    const jwt = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1NjQyVFFIQUsifQ.eyJpc3MiOiI1NjNRTFA2UzU1IiwiaWF0IjoxNjYwODU2OTI2LCJleHAiOjE2NjM0NDg2ODl9.6g-uHDjbeR9ndQRI5pTX3Uan2zfhRcGkHm1gtUXq03og-4RMo6vSPGkIlsfRf6JGs9AnhLRoG2AjCaaG-w20UQ";
    mapkit.init({
        authorizationCallback: done => { done(jwt); }
    });
};

const main = async() => {
    await setupMapKitJs();

    // Create the Map and Geocoder
    const map = new mapkit.Map("map");
    const geocoder = new mapkit.Geocoder({ language: "en-US" });
    // Create the "Event" annotation, setting properties in the constructor.

    var calloutDelegate = {
        // Return a div element and populate it with information from the
        // annotation, including a link to a review site.
        calloutContentForAnnotation: function(annotation) {
            var element = document.createElement("div");
            element.className = "review-callout-content";
            var title = element.appendChild(document.createElement("div"));
            title.className = "callout_title";
            title.textContent = annotation.title;
            var desc = element.appendChild(document.createElement("div"));
            desc.className = "callout_desc";
            desc.textContent = annotation.subtitle;
            // TODO add event btn
            var event_btn = element.appendChild(document.createElement("button"));
            event_btn.id = "callout_event";
            event_btn.textContent = "create event";
            event_btn.addEventListener("click", event => {
                dispatch("add_event", {
                    location_title: annotation.title
                });
            });
            // TODO edit location btn
            var edit_btn = element.appendChild(document.createElement("button"));
            edit_btn.id = "callout_edit";
            edit_btn.textContent = "edit location";
            edit_btn.addEventListener("click", event => {
                console.log(annotation);
                lattd_in = annotation.coordinate.latitude;
                lngtd_in = annotation.coordinate.longitude;

                edit_loc_name = annotation.title;
                // document.getElementById("add_loc_btn").value = "save";
                // document.getElementById("location_new").style.display = "flex";
            });
            // TODO delete location btn
            var delete_btn = element.appendChild(document.createElement("button"));
            delete_btn.id = "callout_delete";
            delete_btn.textContent = "delete";
            return element;
        }
    };

    annotations = [];
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
    

    // Create the "Work" annotation, setting properties after construction.
    // const work = new mapkit.Coordinate(37.3349, -122.0090);
    // const workAnnotation = new mapkit.MarkerAnnotation(work);
    // workAnnotation.color = "#969696";
    // workAnnotation.title = "Work";
    // workAnnotation.subtitle = "Apple Park";
    // workAnnotation.selected = "true";
    // workAnnotation.glyphText = "\u{F8FF}"; // Apple Symbol

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

};

if (browser) main();

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
        console.log("here");
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

</script>


<div id="map_container">
    <div id="list_container">
        <div id="list_header">{type} Locations</div>
        {#if locations.length}
            {#each locations as location}
                {#if location.name != edit_loc_name}
                    <div class="location" id={location.id}>
                        <div class="loc_name">{location.name}</div>
                        <div class="loc_description">{location.desc}</div>
                    </div>
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
   margin-left: 80px;
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
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.location {
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    
}

#location_new {
    display: none;
    justify-content: space-between;
}

.location > div {
    margin: 5px;
}




</style>