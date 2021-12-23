<script>
    import { Link } from "svelte-routing";
</script>

<header>
    <div class="flex flex-align">
      <div id="logo">
        <Link to="/">
          {window.TITLE}
        </Link>
      </div>
      <div id="navigation" class="flex-1">
        <ul>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <!-- <div class="socialmedia">
        <i class="fab fa-facebook"></i>
      </div> -->
      <div id="phone">
        <i class="fas fa-phone"></i> 
        (217) 549-5555
      </div>
    </div>
</header>