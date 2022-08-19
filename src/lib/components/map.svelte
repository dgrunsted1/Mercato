<!-- <svelte:head>
    <script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"></script>
</svelte:head> -->
<script context="module">
    import { browser } from '$app/env';
    //Creates a script tag that loads the MapKitJS Library and then
    //calls `mapkit.init` to initialize the library with your JWT.
    console.log("here");
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
  
      // Create a map in the element whose ID is "map-container"
      const map = new mapkit.Map("map");
      map.region = cupertino;
  };
  
  if (browser) main();
   //const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQ1NjQyVFFIQUsifQ.eyJpc3MiOiI1NjNRTFA2UzU1IiwiaWF0IjoxNjYwODU2OTI2LCJleHAiOjE2NjM0NDg2ODl9.6g-uHDjbeR9ndQRI5pTX3Uan2zfhRcGkHm1gtUXq03og-4RMo6vSPGkIlsfRf6JGs9AnhLRoG2AjCaaG-w20UQ";

   // mapkit.init({
       // authorizationCallback: function(done) {
           // done(tokenID);
       // }
   // });

   // var map = new mapkit.Map("map");
</script>

<script>
   export let type;
</script>



<div id="map"></div>










<style>




#map {
   width: 50%;
   height: 600px;

}




</style>