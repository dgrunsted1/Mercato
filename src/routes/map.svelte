<script type="module">
    const setupMapKitJs = async() => {
        // Create and Load the MapKit JS Script Tag
        await new Promise(resolve => {
            const element = document.createElement("script");
            element.addEventListener("load", () => { resolve(); });
            element.src = "https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js";
            document.head.appendChild(element);
        });
        // TODO: For production use, the JWT should not be hard-coded into JS.
        const jwt = "Insert Your JWT Here";
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
            new mapkit.Coordinate(37.3316850890998, -122.030067374026),
            new mapkit.CoordinateSpan(0.167647972, 0.354985255)
        );
    
        // Create a map in the element whose ID is "map-container"
        const map = new mapkit.Map("map-container");
        map.region = cupertino;
    };

    main();
</script>


<script>

</script>



<div id="map-container"></div>











<style>









</style>