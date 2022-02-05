<script>
  import { session } from '$app/stores';
</script>

<video id="hero" onloadedmetadata="this.muted=true" autoplay loop preload="auto">
  <source src={`${$session.baseUrl}/uploads/2firespark4_a490727ca6.mp4`} type="video/mp4" />
  <track kind="captions" />
</video>
