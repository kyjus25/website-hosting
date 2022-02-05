<script>
  import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
  import { session } from '$app/stores';
  import { page } from '$app/stores';

  let content = null;
    $: content = $session.pages.find(i => i.slug === 'usa-project-charleston-il')?.content;
    console.log('Pages', $session.pages);

</script>

<div class="w-full carousel mb-3 opacity-80">
  <div id="slide1" class="relative w-full carousel-item">
    <img src="https://picsum.photos/id/500/800/300" class="w-full" alt="led logo"> 
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" class="btn btn-circle">❮</a> 
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" class="relative w-full carousel-item">
    <img src="https://picsum.photos/id/501/800/300" class="w-full"alt="led logo"> 
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" class="btn btn-circle">❮</a> 
      <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" class="relative w-full carousel-item">
    <img src="https://picsum.photos/id/502/800/300" class="w-full"alt="led logo"> 
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" class="btn btn-circle">❮</a> 
      <a href="#slide4" class="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" class="relative w-full carousel-item">
    <img src="https://picsum.photos/id/503/800/300" class="w-full"alt="led logo"> 
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" class="btn btn-circle">❮</a> 
      <a href="#slide1" class="btn btn-circle">❯</a>
    </div>
  </div>
</div>

<div class="flex">
  <div class="flex-2">
    <h2 class="uppercase bg-transparent mb-3 text-white font-thin text-3xl">Our <span class="font-bold">Portfolio</span></h2>
    <img src="/fogm/usa.png" class="w-full pr-3 opacity-70" alt="usa pic">
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">Latest <span class="font-bold">Events</span></h2>
  </div>
  <div class="flex-1">
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">Photo <span class="font-bold">Gallery</span></h2>
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">Latest <span class="font-bold">Video</span></h2>
  </div>
</div>

<SvelteMarkdown source={content} />
