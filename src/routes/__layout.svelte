<script>
import Header from '../lib/components/header.svelte';
import SideBar from '../lib/components/sidebar.svelte';
let pages = ['wordle', 'travel', 'music', 'sports', 'fashion', 'cooking', 'tech', 'photography'];
</script>


<Header />
<SideBar />

<main>
<slot/>
</main>

<footer>
    <p>author: David Grunsted</p>
</footer>


<style>
    /* body {
        margin: 0;
    } */
</style>