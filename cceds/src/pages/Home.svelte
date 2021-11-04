<script>
	import { Link } from "svelte-routing";
	import SvelteMarkdown from 'svelte-markdown';
	import Hero from "../partials/Hero.svelte";

	export let pages = [];
</script>

<Hero />

<article>
	<div class="wrapper">
		<SvelteMarkdown source={pages.find(i => i.title.toLowerCase().replace(new RegExp(" ", "g"), '-') === 'home').content} />
		<button class="btn-primary active">Get Involved</button>
	</div>
</article>

