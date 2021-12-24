<script>
    import App from "$lib/components/App.svelte";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";

    import { fetchData, loading } from "$lib/stores/data.js";

    fetchData("led");
</script>

<App>
    {#if $loading}
        Loading...
    {:else}
        <Header />
        <slot />
        <Footer />
    {/if}
</App>
