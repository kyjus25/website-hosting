<script>
    import { session } from '$app/stores';
    import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
    import Hero from "../components/Hero.svelte";
</script>

<Hero />

<div id="boxes" class="flex">
    <div
        class="box flex overlay"
        style="background-image: url(/fogm/sermons.png)"
    >
        <div>
            <h1>Live Sermons</h1>
            <p>
                Tune in daily to watch live sermons or scroll through our many
                past sermons archived
            </p>
            <a href="./live-feed">
                <button class="btn-primary">Watch Now</button>
            </a>
        </div>
    </div>
    <div class="box flex overlay" style="background-image: url(/fogm/dvd.jpg)">
        <div>
            <h1>Available DVDs</h1>
            <p>
                We offer 3 DVDs available in either English or Portuguese,
                presented by Pastor David White
            </p>
            <a href="./order">
                <button class="btn-primary">Order Now</button>
            </a>
        </div>
    </div>
    <div
        class="box flex overlay"
        style="background-image: url(/fogm/kenya.jpg)"
    >
        <div>
            <h1>Reaching Out</h1>
            <p>
                Spreading the message, truth, and teachings of The Unknown God
                throughout the globe
            </p>
            <a href="./contact-us"
                ><button class="btn-primary">Get Involved</button></a
            >
        </div>
    </div>
</div>
<article>
    <div class="wrapper">
        <SvelteMarkdown source={$session.pages.find(i => i.slug === "home").content}/>
        <button class="btn-primary active">Get Involved</button>
    </div>
</article>
