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
        <div class="container mx-auto">
            <Header />
            <article class="bg-black/30 text-white p-3">
                <slot />
            </article>
            <Footer />
        </div>
    {/if}
</App>
