<script>
    import { pages } from "$lib/stores/data.js";
    import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
    import Hero from '../components/Hero.svelte';
</script>

<Hero />

<article>
	
	<div id="blocks" class="flex">
		<div class="flex-1">
			<i class="fas fa-briefcase"></i>
			<h2>Commercial Solutions</h2>
			<p>A small business helping out other small businesses.</p>
		</div>
		<div class="flex-1">
			<i class="fas fa-shield-alt"></i>
			<h2>Insured & Reliable</h2>
			<p>We'll take care of the logistics. Our one and only goal is to make sure your package arrives safely.</p>
		</div>
		<div class="flex-1">
			<i class="fas fa-house"></i>
			<h2>Family Owned</h2>
			<p>Family operated since the early beginings.</p>
		</div>
		<div class="flex-1">
			<i class="fas fa-users"></i>
			<h2>Community Driven</h2>
			<p>The success of our business depends on the success of the community.</p>
		</div>
	</div>

	<div id="about" class="wrapper">
		<div class="flex">
			<div id="home-image"></div>
			<div>
				<h1>About Us</h1>
				<SvelteMarkdown source={$pages.find(i => i.title.toLowerCase().replace(new RegExp(" ", "g"), '-') === 'home').content} />
				<button class="btn-primary active">Contact Us</button>
			</div>
		</div>
		<br>
		<h1>Some Things We Deliver... </h1>
		<div class="shippables flex">
			<div class="flex-1">
				<i class="fas fa-dog"></i>
				<h1>Pets</h1>
			</div>
			<div class="flex-1">
				<i class="fas fa-car"></i>
				<h1>Vehicles</h1>
			</div>
			<div class="flex-1">
				<i class="fas fa-shopping-basket"></i>
				<h1>Groceries</h1>
			</div>
		</div>
		<div class="shippables flex">
			<div class="flex-1">
				<i class="fas fa-suitcase-rolling"></i>
				<h1>Luggage</h1>
			</div>
			<div class="flex-1">
				<i class="fas fa-hard-hat"></i>
				<h1>Building Material</h1>
			</div>
			<div class="flex-1">
				<i class="fas fa-calendar"></i>
				<h1>Appliances</h1>
			</div>
		</div>
		<!-- <h1>From the Blog</h1>
		<p>There are no blog posts to display.</p> -->
	</div>
		
</article>