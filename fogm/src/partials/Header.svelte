<script>
    import { Link } from "svelte-routing";
</script>

<header>
    <div class="wrapper flex">
      <div id="logo">
        <Link to="/">
          <i class="fas fa-cross"></i>
        </Link>
      </div>
      <div id="navigation">
        <ul>
          <li><Link to="/pages/the-fathers-house">The Father's House</Link>
            <ul>
              <li><Link to='/pages/brazil-ministry'>Brazil Ministry</Link>
                <ul>
                  <li><Link to='/pages/jump-start-english'>Jump Start English</Link></li>
                  <li><Link to='/pages/jump-start-spanish'>Jump Start Spanish</Link></li>
                </ul>
              </li>
              <li><Link to='/pages/usa-ministry'>USA Ministry</Link></li>
              <li><Link to='/pages/jerusalem-ministry'>Jerusalem Ministry</Link></li>
              <li><Link to='/pages/kenya-ministry'>Kenya Ministry</Link></li>
            </ul>
          </li>
          <li><Link to='/pages/the-unknown-god'>The Unknown God</Link>
            <ul>
              <li><Link to='/pages/prison-ministry'>Prison Ministry</Link></li>
              <li><Link to='/pages/teen-challenge'>Teen Challenge</Link></li>
            </ul>
          </li>
          <li><Link to='/pages/sermons'>Sermons</Link>
            <ul>
              <li><Link to='/pages/live-feed'>Live Feed</Link></li>
              <li><Link to='/pages/study-words'>Study Words</Link></li>
            </ul>
          </li>
          <li><Link to='/mission-statement'>Mission Statement</Link></li>
          <li><Link to='/contact-us'>Contact US</Link></li>
        </ul>
      </div>
      <div id="social">
        <a href="https://www.facebook.com/fogtvinternational" target="_blank">
          <i class="fab fa-facebook-square"></i>
        </a>
        <a href="https://twitter.com/FOG_TFH" target="_blank">
          <i class="fab fa-twitter-square"></i>
        </a>
        <a href="https://www.youtube.com/channel/UC3OLduBLDqPjW0AndY2yYrA" target="_blank">
          <i class="fab fa-youtube-square"></i>
        </a>
        <a href="https://vimeo.com/fogtvinternational" target="_blank">
          <i class="fab fa-vimeo-square"></i>
        </a>
      </div>
    </div>
  </header>


  