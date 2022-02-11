<script>
  import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
  import { session } from '$app/stores';
</script>
<div class="w-full carousel opacity-80">
  <div id="slide1" class="relative w-full carousel-item">
    <img src="/fogm/usa-project-snow.jpg" class="w-full" alt="usa pic"> 
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" class="btn btn-circle">❮</a> 
      <a href="#slide2" class="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" class="relative w-full carousel-item">
    <img src="/fogm/Full Layout Of Proposed Land Area.png" class="w-full"alt="land"> 
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" class="btn btn-circle">❮</a> 
      <a href="#slide3" class="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" class="relative w-full carousel-item">
    <img src="/fogm/tent.jpeg" class="w-full"alt="tent"> 
    <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" class="btn btn-circle">❮</a> 
      <a href="#slide4" class="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" class="relative w-full carousel-item">
    <img src="/fogm/camp.jpeg" class="w-full"alt="camp ground"> 
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

<div class="flex">
  <div class="flex-2">
    <h2 class="uppercase bg-transparent mb-3 text-white font-thin text-3xl">Current <span class="font-bold">FUND RAISER</span></h2>
    <img src="/fogm/fundraiser.png" class="w-full pr-3 opacity-70" alt="usa pic">
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">You can <span class="font-bold">Donate Now</span></h2>
  </div>
  <div class="flex-1">
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">Tent <span class="font-bold">Spring Revival</span></h2>
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">Led sign <span class="font-bold">Program display and advertising</span></h2>
    <h2 class="uppercase bg-transparent text-white font-thin mb-10 text-3xl">New land <span class="font-bold">Parking and new led sign</span></h2>
    
    <h2 class="uppercase bg-transparent text-white mb-2 font-bold text-1xl"> <center>Don't miss your chance to give and be blessed in our fund raisers.</center></h2>
    <h2><center>Kingdom work is vital and we must build His Kingdom as one body.</center></h2> 
    <h2><center>These three things will allow us to host a much larger revival with land for safer parking.</center></h2>
    <h2><center>It will also give a place for the Led sign to go that will display the tenet revival service and all other events. 
    You can be a part of this great harvest work with donation of your time or money.</center></h2>
  </div>
  
</div>

<div class="flex">
  <div class="flex-2">
  

    <h2 class="uppercase bg-transparent mb-3 text-white font-thin text-3xl">Current <span class="font-bold">FUND RAISER</span></h2>
    <div class="flex-1">
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">Cash app <span class="font-bold">$USAProject</span></h2>
    <h2 class="uppercase bg-transparent text-white font-thin text-3xl">Paypal <span class="font-bold">paypal.me/fogusaproject</span></h2>
    <h2 class="uppercase bg-transparent text-white font-thin mb-10 text-3xl">check <span class="font-bold">Fire of God Movement International</span></h2>
    
    
  </div>
    <img src="/fogm/cash app USAproject.png" class="w-full pr-3 opacity-70" alt="usa pic">
    
  </div>
  
  
</div>

<h2 class="uppercase bg-transparent text-white text-center font-thin text-3xl">Bring your church group <span class="font-bold">worship fellowship and hotdogs around the campfire now</span></h2>

<!-- Image 3 -->
<div id="img3"> 
  <img src="/fogm/fire-pit.png">

 <div id="learning-scrypt">
 <di class="campground-pic">
  <img src="/fogm/camp.jpg"align="right"pt-3 alt="camp" width="200"height="200">
    <div class="flex">

    </div>
  </div>
</div>
<div> proper way to make paragraph= <br> for break 
      or we can do a <p> for paragraph at the start and a close = <p> the new line and <b> for bold</b>> and <i> for italised</i> and  <u>u for underline</u></p>
      <h2>this is a heading by using h2 and this is a !Document type html> This starts the decluration of what the page is before any header</h2>
      <p> this. is a hyppertype link to a web page and link to page such as <a href="https://www.msn.com/">"msn"</a>.</p>
       <p>This is an internel website page link <a href="page-name.html">page-name</a></p>
       <center>
       <p>a simple imge<img width="100" height="100" src="/fogm/camp.jpg"></p>
       </center>
      </div>