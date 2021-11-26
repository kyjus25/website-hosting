<script>
    import { Player, Hls } from '@vime/svelte';
    const hlsConfig = {};
</script>

<article>
    <Player controls>
        <Hls version="latest" config="{hlsConfig}" poster="/media/poster.png">
          <source data-src="http://173.21.195.160:8080/hls/test.m3u8" type="application/x-mpegURL" />
        </Hls>
    </Player>
</article>
