<script>
    import App from "$lib/components/App.svelte";
    import Header from "../components/Header.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import Footer from "../components/Footer.svelte";

    import { fetchData, loading } from "$lib/stores/data.js";

    fetchData("webtv");
</script>

<App>
    {#if $loading}
        Loading...
    {:else}
        <div class="wrapper">
			<Header/>
			<div id="content" class="flex">
				<Sidebar/>
				<slot />
			</div>
		</div>
		<div class="wrapper">
			<Footer />
		</div>
    {/if}
</App>

<style>
    @import "../components/webtv.css";
</style>
