<script>
    import { createEventDispatcher } from 'svelte'; 
    import LongLogo from './icons/LongLogo.svelte';
    const dispatch = createEventDispatcher() ;
</script>

<div id="header">
    <div id="main_container">
        <div on:click={() => dispatch('tabChange', 'home')}><LongLogo/></div>
    </div>
</div>

<style>
    #main_container {
        padding: 5px 0px 0px 20px;
    }

    #header {
        display: flex;
        justify-content: left;
        position: fixed;
        width: 100%;
        background-color: white;
        top: 0;
        border-bottom: 1px solid #002919;
    }
</style>