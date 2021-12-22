<script>
    import { Link } from "svelte-routing";
</script>

<header>
    <div class="flex">
      <div id="logo" class="flex-1">
        <Link to="/">
          <img alt="{window.TITLE}" src="/assets/led.png">
            <div id="logo" class="flex-2">
              <Link to="/">
                <img alt="{window.TITLE}" src="/home/mipps/Documents/website projects/website-hosting/led/public/assets/led.png">
              </Link>
            </div>">
        </Link>
      </div>

      <div>
        <input placeholder="Seach for a video or post..." type="text" value="" name="s" id="s">
      </div>
      
    </div>
  </header>

  <ul id="navigation">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/pages/news">News</Link></li>
    <li><Link to="/pages/live">Live</Link></li>
    <li><Link to="/pages/donate">Dontate</Link></li>
    <li><Link to="/pages/contact">Contact</Link></li>
  </ul>


  