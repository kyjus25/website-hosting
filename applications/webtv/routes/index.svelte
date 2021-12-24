<script>
    import { pages } from "$lib/stores/data.js";
    import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
    import Hero from '../components/Hero.svelte';
</script>

<article>
	<Hero />
	<SvelteMarkdown source={$pages.find(i => i.title.toLowerCase().replace(new RegExp(" ", "g"), '-') === 'home').content} />
	<button class="btn-primary active">Get Involved</button>
</article>
