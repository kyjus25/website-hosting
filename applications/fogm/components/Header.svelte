<script>
  import SvelteMarkdown from "svelte-markdown/src/SvelteMarkdown.svelte";
  import { session } from '$app/stores';
</script>

<header>
  <div class="wrapper flex">
    <div id="logo">
      <a href="/">
        <i class="fas fa-cross" />
      </a>
    </div>
    <div id="navigation">
      <SvelteMarkdown source={$session.menu.content} />
     
    </div>
    <div id="social">
      <a href="https://www.facebook.com/fogtvinternational" target="_blank">
        <i class="fab fa-facebook-square" />
      </a>
      <a href="https://twitter.com/FOG_TFH" target="_blank">
        <i class="fab fa-twitter-square" />
      </a>
      <a
        href="https://www.youtube.com/channel/UC3OLduBLDqPjW0AndY2yYrA"
        target="_blank"
      >
        <i class="fab fa-youtube-square" />
      </a>
      <a href="https://vimeo.com/fogtvinternational" target="_blank">
        <i class="fab fa-vimeo-square" />
      </a>
    </div>
  </div>
</header>
