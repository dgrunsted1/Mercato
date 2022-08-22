

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
    annotations = [];
    for (let i = 0; i < locations.length; i++){
        const event = new mapkit.Coordinate(locations[i].lattd, locations[i].lngtd);
        const eventAnnotation = new mapkit.MarkerAnnotation(event, {
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
        });
        lattd_in = coordinate.latitude;
        lngtd_in = coordinate.longitude;
        document.getElementById("location_new").style.display = "flex";
    });

    

};

if (browser) main();

const add_location = async () => {
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
            loc_desc_in = "";
            loc_name_in = "";
            lattd_in = 0;
            lngtd_in = 0;
            document.getElementById("location_new").style.display = "none";

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
                <div class="location" id={location.id}>
                    <div class="loc_name">{location.name}</div>
                    <div class="loc_description">{location.desc}</div>
                </div>
            {/each}
        {:else}
            <p>No locations added yet.</p>
        {/if}
        <div class="location" id="location_new">
            <input type="text" name="location_name_in" bind:value={loc_name_in} placeholder="Name">
            <input type="text" name="location_desc_in" bind:value={loc_desc_in} placeholder="Description">
            <input type="submit" value="Add Location" on:click={add_location}>
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