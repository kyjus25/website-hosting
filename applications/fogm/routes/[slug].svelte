<script>
    import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
    import Gradient from "../components/Gradient.svelte";
    import { pages } from "$lib/stores/data.js";
    import { page } from '$app/stores'
    let content = null;
    $: content = $pages.find(
        (i) => i.title.toLowerCase().replace(new RegExp(" ", "g"), "-") === $page.params.slug
    )?.content;
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
