

<script>
    import { browser } from '$app/env';
   export let type;
   export let locations;
   let clickAnnotation;

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
    const jwt = "";
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
    const event = new mapkit.Coordinate(37.7831, -122.4041);
    const eventAnnotation = new mapkit.MarkerAnnotation(event, {
        color: "#4eabe9",
        title: "Event",
        glyphText: "\u{1F37F}" // Popcorn Emoji
    });

    // Create the "Work" annotation, setting properties after construction.
    const work = new mapkit.Coordinate(37.3349, -122.0090);
    const workAnnotation = new mapkit.MarkerAnnotation(work);
    workAnnotation.color = "#969696";
    workAnnotation.title = "Work";
    workAnnotation.subtitle = "Apple Park";
    workAnnotation.selected = "true";
    workAnnotation.glyphText = "\u{F8FF}"; // Apple Symbol

    // Add and show both annotations on the map
    map.showItems([eventAnnotation, workAnnotation]);

    // This will contain the user-set single-tap annotation.
    let clickAnnotation = null;

    // Add or move an annotation when a user single-taps an empty space
    map.addEventListener("single-tap", event => {
        if (clickAnnotation) {
            map.removeAnnotation(clickAnnotation);
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
        });
    });

};

if (browser) main();

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
    </div>
    <div id="map" on:click={add_annotation}></div>
</div>











<style>




#map {
   width: 100%;
   height: 600px;

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




</style>