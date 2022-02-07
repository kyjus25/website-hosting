<script>
    import App from "$lib/components/App.svelte";
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
</script>

<App>
    <Header />
    <slot />
    <Footer />
</App>

<style>
    @import "../components/fogm.css";
</style>
