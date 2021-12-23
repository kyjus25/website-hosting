<script>
	import { Router, Link, Route } from "svelte-routing";
	import Header from './partials/Header.svelte';
	import Footer from './partials/Footer.svelte';
	import Sidebar from './partials/Sidebar.svelte';
	import Contact from './pages/Contact.svelte';
	import Live from './pages/Live.svelte';
	import Page from './pages/Page.svelte';
	import Home from './pages/Home.svelte';
	import { onMount } from "svelte";

	let pages = [];
	let posts = [];
	let loading = true;

	async function fetchData() {
		pages = await fetch(`${window.BASE_URL}/pages`).then(response => response.json()).then(response => response.filter(i => i.website === 'webtv'));
		posts = await fetch(`${window.BASE_URL}/posts`).then(response => response.json()).then(response => response.filter(i => i.website === 'webtv'));
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
		<div class="wrapper">
			<Header/>
			<div id="content" class="flex">
				<Sidebar/>
				<Route path="/pages/contact"><Contact/></Route>
				<Route path="/pages/live"><Live/></Route>
				<Route path="/pages/:id" let:params>
					<Page pages={pages} {...params} />
				</Route>
				<Route path="/"><Home pages={pages} /></Route>
			</div>
		</div>
		<div class="wrapper">
			<Footer />
		</div>
	{/if}
</Router>