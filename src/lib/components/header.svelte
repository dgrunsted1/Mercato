<script>
    import { createEventDispatcher } from 'svelte'; 
    import LongLogo from '../icons/LongLogo.svelte';
    
    const dispatch = createEventDispatcher() ;
</script>
<header>
        <div id="main_container">
            <a href="/"><LongLogo/></a>
        </div>
</header>

<style>
    #main_container {
        padding: 5px 0px 0px 20px;
    }

    header {
        display: flex;
        justify-content: left;
        position: fixed;
        width: 100%;
        top: 0;
        border-bottom: 1px solid #002919;
        z-index: 10;
    }
</style>