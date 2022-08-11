<script>
import Header from '../lib/components/header.svelte';
import SideBar from '../lib/components/sidebar.svelte';
let pages = ['wordle', 'travel', 'music', 'sports', 'fashion', 'cooking', 'do_more', 'photography'];
</script>


<Header />
<SideBar {pages} />

<main>
<slot></slot>
</main>

<footer>
    <p>author: David Grunsted</p>
</footer>


<style>
    main {
		text-align: center;
		margin: 0 auto;
		height: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	main {
		padding-top: 60px;
        z-index: 0;
        max-width: 98%;
        margin: auto;
	}
</style>