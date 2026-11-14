<script lang="ts">
    import { locale } from '$lib/i18n';
    const videos = [
        { id: 't0Q2otsqC4I', title: 'Tom & Jerry', era: 'Clássicos', image: 'https://i.ytimg.com/vi/t0Q2otsqC4I/hqdefault.jpg' },
        { id: '_t8hJ9j-zXA', title: "What's New, Scooby-Doo?", era: '2002', image: 'https://i.ytimg.com/vi/_t8hJ9j-zXA/hqdefault.jpg' }
    ];
    const copy = {
        pt: { guide: 'Programação', play: 'Assistir', preview: 'Prévia interativa', source: 'Abrir no YouTube', channel: 'Canal', classics: 'Clássicos' },
        en: { guide: 'Program guide', play: 'Watch', preview: 'Interactive preview', source: 'Open on YouTube', channel: 'Channel', classics: 'Classics' },
        es: { guide: 'Programación', play: 'Ver', preview: 'Vista interactiva', source: 'Abrir en YouTube', channel: 'Canal', classics: 'Clásicos' }
    };
    $: labels = copy[$locale];
    let selected = 0;
    let playing = false;
</script>

<section class="demo" aria-label={labels.preview}>
    <div class="tv">
        <div class="bar"><strong>▶ Meutube</strong><span>{labels.preview}</span></div>
        <div class="screen">
            {#if playing}
                <iframe
                    title={videos[selected].title}
                    src="https://www.youtube-nocookie.com/embed/{videos[selected].id}?autoplay=1&rel=0"
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowfullscreen
                    referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
            {:else}
                <button class="poster" on:click={() => playing = true} aria-label={labels.play}>
                    <img src={videos[selected].image} alt={videos[selected].title} loading="lazy" />
                    <span class="play">▶</span>
                </button>
            {/if}
        </div>
        <div class="bar"><strong>{String(selected + 1).padStart(3, '0')} · {videos[selected].title}</strong></div>
    </div>
    <div class="remote">
        <div class="notch"></div>
        <strong class="brand">▶ Meutube</strong>
        <p>{labels.guide}</p>
        {#each videos as video, i}
            <button class:active={selected === i} on:click={() => { selected = i; playing = true; }} aria-pressed={selected === i}>
                <img src={video.image} alt="" loading="lazy" />
                <span><strong>{video.title}</strong><small>{labels.channel} {i + 1} · {i === 0 ? labels.classics : video.era}</small></span>
            </button>
        {/each}
        <a href="https://www.youtube.com/watch?v={videos[selected].id}" target="_blank" rel="noopener noreferrer">{labels.source} ↗</a>
    </div>
</section>

<style>
    .demo{display:flex;align-items:center;gap:16px;background:#e8eef3;padding:22px;border-radius:18px;margin:20px 0 24px}
    .tv{min-width:0;flex:1;border:8px solid #202832;border-radius:13px;background:#0b0f17;color:#f1f5f9;box-shadow:0 10px 20px #0a121e20}
    .bar{display:flex;justify-content:space-between;gap:8px;padding:12px;font-size:12px}.bar span{color:#94a3b8;font-size:10px}
    .screen{aspect-ratio:16/9;background:#000}.screen iframe,.poster,.poster img{width:100%;height:100%;border:0}.poster{position:relative;padding:0;cursor:pointer;display:block}.poster img{object-fit:cover}.play{position:absolute;inset:0;display:grid;place-items:center;font-size:45px;color:white;background:#0003}
    .remote{flex:0 0 185px;min-width:0;border:6px solid #202832;border-radius:25px;background:#0b0f17;padding:10px;color:#f1f5f9;align-self:stretch}.notch{width:50px;height:5px;border-radius:5px;background:#202832;margin:0 auto 15px}.brand{font-size:15px}.remote p{font-size:12px;color:#94a3b8;margin:12px 0}.remote button{display:flex;align-items:center;gap:7px;width:100%;background:#131a26;color:#f1f5f9;border:1px solid #2b394f;border-radius:8px;padding:7px;margin-bottom:9px;text-align:left;cursor:pointer}.remote button.active{border-color:#38bdf8;background:#0c2639}.remote button img{width:48px;height:35px;object-fit:cover;border-radius:4px}.remote button strong{font-size:10px;display:block}.remote small{font-size:9px;color:#94a3b8;display:block;margin-top:3px}.remote a{display:block;color:#7dd3fc;font-size:10px;margin-top:18px}.remote button:focus-visible,.poster:focus-visible{outline:3px solid #38bdf8;outline-offset:3px}
    @media(max-width:600px){.demo{padding:12px;gap:12px;flex-direction:column}.tv{width:100%;flex:auto}.remote{width:100%;flex:auto;border-radius:17px;align-self:auto}.remote button{min-height:55px}.remote button strong{font-size:13px}.remote small{font-size:11px}.remote a{font-size:12px;margin-top:10px}}
</style>
