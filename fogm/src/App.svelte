<script>
	import { Router, Link, Route } from "svelte-routing";
	import Header from './partials/Header.svelte';
	import Footer from './partials/Footer.svelte';
	import Page from './pages/Page.svelte';
	import Home from './pages/Home.svelte';
	import { onMount } from "svelte";
	import Gradient from "./partials/Gradient.svelte";

	let pages = [];
	let posts = [];
	let videos = [];
	let loading = true;

	async function fetchData() {
		pages = await fetch(`${window.BASE_URL}/pages`).then(response => response.json()).then(response => response.filter(i => i.website === 'fogm'));;
		posts = await fetch(`${window.BASE_URL}/posts`).then(response => response.json()).then(response => response.filter(i => i.website === 'fogm'));;
		videos = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC3OLduBLDqPjW0AndY2yYrA&maxResults=10&order=date&type=video&key=AIzaSyABnWW2s4thhFHUPF5FAwt5p1G_pr_faXY`).then(response => response.json()).then(response => response.items);
		console.log('videos', videos);
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
			<Gradient />
			<Page pages={pages} {...params} />
		</Route>
		<Route path="/"><Home pages={pages} /></Route>
		<Footer />
	{/if}
</Router>

<!-- https://colorlib.com/preview/#activitar -->