<script>
    import { createEventDispatcher } from 'svelte'; 
    const dispatch = createEventDispatcher() ;
    import Around from '/static/icons/Around.svelte';
    import Basketball from '/static/icons/Basketball.svelte';
    import Cooking from '/static/icons/Cooking.svelte';
    import Up from '/static/icons/Up.svelte';
    import Down from '/static/icons/Down.svelte';
    import Photography from '/static/icons/Photography.svelte';
    import Clothes from '/static/icons/Clothes.svelte';
    import Laptop from '/static/icons/Laptop.svelte';
    import Music from '/static/icons/MusicIcon.svelte';
    import Puzzle from '/static/icons/Puzzle.svelte';
    let expanded = false;
    export let pages = [];
    export let currPage = "";

    function hideShowDock(){
        expanded = !expanded;
    }
</script>

<div id="sidebar" class:expanded>
    <div id="main_container">
        <div id="page_container" class:expanded>

            {#each pages as page}
                <div class="icon" class:expanded>
                    {#if page == 'travel'}
                    <a href="/travel"><Around /></a>
                    {:else if page == 'sports'}
                    <Basketball active={currPage == page}/>
                    {:else if page == 'photography'}
                    <Photography active={currPage == page}/>
                    {:else if page == 'cooking'}
                    <Cooking active={currPage == page}/>
                    {:else if page == 'fashion'}
                    <Clothes active={currPage == page}/>
                    {:else if page == 'tech'}
                    <Laptop active={currPage == page}/>
                    {:else if page == 'music'}
                    <Music active={currPage == page}/>
                    {:else if page == 'wordle'}
                    <Puzzle active={currPage == page}/>
                    {/if}
                </div>
            {/each }
        </div>
    
        <div id="toggle_container">
            <div on:click={hideShowDock}>
                <div>
                    {#if expanded}
                        <Up/>
                    {:else}
                        <Down/>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>

    #sidebar {
        display: flex;
        justify-content: center;
        width: 60px;
        position: fixed;
        bottom: 0;
        right: 0;
        
    }

    #main_container {
        margin: 3px;
        height:min-content;
        position: fixed;
        bottom: 0;
    }
    #page_container {
        background-color: rgba(192, 192, 192, 0.75);
        padding: 5px;
        border: .5px solid black;
        border-radius: 5px;
        transform: scaleY(1);
        -webkit-transition: transform .25s ease;
    }
    #toggle_container {
        padding: 10px;
    }

    #page_container.expanded {
        /* height:1px; */
        transform: translateY(100%) scaleY(0);
        -webkit-transition: transform .25s ease;
        
    }

</style>