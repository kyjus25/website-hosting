<script>
    import App from "$lib/components/App.svelte";
    import Header from "$lib/components/Header.svelte";
</script>

<App>
    <Header />
    <article class="container">
        <slot />
    </article>
</App>
