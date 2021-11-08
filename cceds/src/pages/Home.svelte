<script>
	import { Link } from "svelte-routing";
	import SvelteMarkdown from 'svelte-markdown';
	import Hero from "../partials/Hero.svelte";

	export let pages = [];
</script>

<Hero />

<article>
	
	<div class="flex">
		<div class="flex-1">
			<h2>Commercial Solutions</h2>
			<p>A small business helping out other small businesses.</p>
		</div>
		<div class="flex-1">
			<h2>Insured & Reliable</h2>
			<p>We'll take care of the logistics. Our one and only goal is to make sure your package arrives safely.</p>
		</div>
		<div class="flex-1">
			<h2>Family Owned</h2>
			<p>Family operated since the early beginings.</p>
		</div>
		<div class="flex-1">
			<h2>Community Driven</h2>
			<p>The success of our business depends on the success of the community.</p>
		</div>
	</div>

		<SvelteMarkdown source={pages.find(i => i.title.toLowerCase().replace(new RegExp(" ", "g"), '-') === 'home').content} />
		<button class="btn-primary active">Get Involved</button>
	
</article>

