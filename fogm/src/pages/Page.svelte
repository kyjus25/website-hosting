<script>
	import SvelteMarkdown from 'svelte-markdown';
    export let id = null;
	export let pages = [];
    $: content = pages.find(i => i.title.toLowerCase().replace(new RegExp(" ", "g"), '-') === id)?.content;
</script>
<article>
    <div class="wrapper">
        {#if content}
            <SvelteMarkdown source={content} />
        {:else}
                <h1>404</h1>
        {/if}
        
    </div>
</article>