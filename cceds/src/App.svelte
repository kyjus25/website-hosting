<script>
	import { Router, Link, Route } from "svelte-routing";
	import Header from './partials/Header.svelte';
	import Footer from './partials/Footer.svelte';
	import Page from './pages/Page.svelte';
	import Home from './pages/Home.svelte';
	import { onMount } from "svelte";

	let pages = [];
	let posts = [];
	let loading = true;

	async function fetchData() {
		pages = await fetch(`${window.BASE_URL}/pages`).then(response => response.json()).then(response => response.filter(i => i.website === 'cceds'));
		posts = await fetch(`${window.BASE_URL}/posts`).then(response => response.json()).then(response => response.filter(i => i.website === 'cceds'));
		loading = false;
	}

	onMount(async () => {
		fetchData();
	});
</script>

<Router>
	{#if loading}
		<div class="flex" id="loading">
			<div class="loader">Loading...</div>
		</div>
	{:else}
		<Header/>
		<Route path="/pages/:id" let:params>
			<Page pages={pages} {...params} />
		</Route>
		<Route path="/"><Home pages={pages} /></Route>
		<Footer />
	{/if}
</Router>

<!-- https://preview.colorlib.com/theme/thelogistico -->