
<script context="module">
    import { browser } from '$app/env';
    //Creates a script tag that loads the MapKitJS Library and then
    //calls `mapkit.init` to initialize the library with your JWT.
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

   /**
   * Script Entry Point
   */
  const main = async() => {
      await setupMapKitJs();
  
      const cupertino = new mapkit.CoordinateRegion(
          new mapkit.Coordinate(43.05407, -87.89288),
          new mapkit.CoordinateSpan(0.02, 0.04)
        //   new mapkit.CoordinateSpan(0.167647972, 0.354985255)
        // ratio 1st / 2nd = .472
      );
  
      // Create a map in the element whose ID is "map"
      const map = new mapkit.Map("map");
      map.region = cupertino;
  };
  
  if (browser) main();
</script>

<script>
   export let type;
   export let locations;
   export let map;
   let clickAnnotation;

   // Drop an annotation where a Shift-click is detected:
   const add_annotation = function(event) {
         console.log(event);
            if(!event.shiftKey) {
                return;
            }
        
            if(clickAnnotation) {
                map.removeAnnotation(clickAnnotation);
            }
        
            var coordinate = map.convertPointOnPageToCoordinate(new DOMPoint(event.pageX, event.pageY));
            clickAnnotation = new MarkerAnnotation(coordinate, {
                title: "Click!",
                color: "#c969e0"
            });
            map.addAnnotation(clickAnnotation);
        };
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