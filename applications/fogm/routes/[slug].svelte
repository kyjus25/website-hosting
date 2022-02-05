<script>
    import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
    import Gradient from "../components/Gradient.svelte";
    import { session } from '$app/stores';
    import { page } from '$app/stores';
    let content = null;
    $: content = $session.pages.find(i => i.slug === $page.params.slug)?.content;
</script>

<Gradient />

<article>
    <div class="wrapper">
        {#if content}
            <SvelteMarkdown source={content} />
        {:else}
            <h1>404</h1>
        {/if}
    </div>
</article>
