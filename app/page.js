'use client'

import { useEffect, useMemo, useState } from 'react'

const countries = {
  Pakistan:["M354.9,133.9 L310.3,139.8 L249.6,130.0 L230.0,147.3 L258.1,209.4 L290.3,229.2 L256.2,252.3 L256.9,280.8 L218.0,320.9 L193.0,361.5 L151.1,403.5 L104.7,400.4 L60.6,442.4 L86.8,460.3 L91.3,491.1 L113.8,511.4 L121.7,545.7 L33.7,545.6 L19.4,560.0 L0.0,560.0 L0.0,255.3 L22.3,251.5 L37.1,255.2 L52.7,243.9 L50.5,219.9 L67.5,195.8 L92.9,185.7 L77.2,159.2 L115.3,160.4 L126.3,146.0 L124.6,130.7 L144.5,113.9 L130.5,77.0 L153.9,59.6 L242.7,46.6 L286.3,34.7 L315.9,53.3 L327.7,84.1 L393.5,100.2 L354.9,133.9 Z"],
  India:["M937.1,560.0 L956.6,554.8 L975.0,520.9 L952.0,514.1 L876.8,509.2 L873.3,481.4 L854.2,479.4 L822.5,462.1 L808.4,489.3 L837.3,510.5 L812.3,525.4 L803.4,539.9 L828.0,550.7 L825.4,560.0 L19.4,560.0 L33.7,545.6 L121.7,545.7 L113.8,511.4 L91.3,491.1 L86.8,460.3 L60.6,442.4 L104.7,400.4 L151.1,403.5 L193.0,361.5 L218.0,320.9 L256.9,280.8 L256.2,252.3 L290.3,229.2 L258.1,209.4 L230.0,147.3 L249.6,130.0 L310.3,139.8 L354.9,133.9 L393.5,100.2 L436.5,147.1 L432.4,179.8 L448.4,200.2 L447.0,220.6 L418.3,215.3 L429.6,259.4 L524.5,312.7 L499.1,330.8 L483.5,368.2 L612.2,425.4 L667.0,430.6 L690.1,451.0 L769.1,464.1 L802.4,463.4 L807.0,447.6 L801.7,422.2 L804.8,404.9 L829.2,396.5 L833.4,436.0 L869.8,451.2 L894.9,445.0 L961.3,446.5 L964.1,421.9 L947.9,409.1 L980.1,404.1 L1000.0,387.9 L1000.0,560.0 L937.1,560.0 Z"],
  Nepal:["M801.7,422.2 L807.0,447.6 L802.4,463.4 L769.1,464.1 L690.1,451.0 L667.0,430.6 L612.2,425.4 L483.5,368.2 L499.1,330.8 L541.0,303.1 L573.1,315.4 L613.5,341.5 L636.0,347.2 L649.4,366.4 L680.5,374.3 L712.9,391.9 L804.8,404.9 L801.7,422.2 Z"],
  Bhutan:["M964.1,421.9 L961.3,446.5 L894.9,445.0 L869.8,451.2 L833.4,436.0 L832.6,428.0 L859.0,398.3 L880.6,388.1 L909.2,397.4 L930.4,398.4 L964.1,421.9 Z"],
  China:["M980.1,404.1 L947.9,409.1 L930.4,398.4 L909.2,397.4 L880.6,388.1 L859.0,398.3 L832.6,428.0 L829.2,396.5 L804.8,404.9 L712.9,391.9 L680.5,374.3 L649.4,366.4 L636.0,347.2 L613.5,341.5 L573.1,315.4 L541.0,303.1 L524.5,312.7 L468.9,284.7 L429.6,259.4 L418.3,215.3 L447.0,220.6 L448.4,200.2 L432.4,179.8 L436.5,147.1 L393.5,100.2 L327.7,84.1 L315.9,53.3 L286.3,34.7 L273.2,0.0 L1000.0,0.0 L1000.0,387.9 L980.1,404.1 Z"]
}

const mountains = [
  { slug:'nanda-devi', name:'Nanda Devi', local:'नन्दा देवी · “Bliss-Giving Goddess”', range:'Himalaya', sub:'Garhwal Himalaya', elevation:'7,817 m', country:'India', region:'Chamoli, Uttarakhand', firstAscent:'1936', status:'Sacred protected landscape', lat:30.3753, lon:79.9707, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nanda_Devi_peak.jpg/1280px-Nanda_Devi_peak.jpg', credit:'Ashwani Kumar · CC BY-SA 4.0 · Wikimedia Commons', headline:'A summit inside a fortress.', lead:'Nanda Devi rises from one of the most extraordinary natural enclosures in the Himalaya: a ring of high ridges and peaks broken by the Rishi Ganga gorge.', body:'Its isolation is part of its identity. The mountain stands within the Nanda Devi Sanctuary, a protected landscape whose difficult approaches shaped both expedition history and modern conservation.', history:[['1934','Inner Sanctuary reached','Eric Shipton and H. W. Tilman pioneered a passage through the upper Rishi Ganga gorge.'],['1936','First ascent','Bill Tilman and Noel Odell reached Nanda Devi’s summit.'],['1983','Protection tightened','Mountaineering and adventure activity inside the national park were banned after environmental degradation.'],['1988','World Heritage recognition','Nanda Devi National Park entered UNESCO’s World Heritage List.']], sources:['UNESCO World Heritage Centre','Uttarakhand Tourism'] },
  { slug:'everest', name:'Everest', local:'Sagarmāthā · Qomolangma', range:'Himalaya', sub:'Mahalangur Himal', elevation:'8,848.86 m', country:'Nepal / China', region:'Khumbu / Tibet', firstAscent:'1953', status:'World’s highest point', lat:27.9881, lon:86.9250, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Everest%2C_Himalayas.jpg/1280px-Everest%2C_Himalayas.jpg', credit:'Vyacheslav Argenberg · CC BY 4.0 · Wikimedia Commons', headline:'The highest point above sea level.', lead:'Everest is globally famous for its altitude, but the mountain is also rooted in the lived geography of the Khumbu and the Tibetan Plateau.', body:'The atlas treats Everest as more than a summit record: a border mountain, a Sherpa homeland, a pilgrimage landscape and a central chapter in twentieth-century expedition history.', history:[['1921','Reconnaissance begins','British expeditions began systematic reconnaissance from the Tibetan side.'],['1953','First ascent','Tenzing Norgay and Edmund Hillary reached the summit on 29 May.'],['1978','Without bottled oxygen','Reinhold Messner and Peter Habeler made the first ascent without supplemental oxygen.'],['2020','Modern height agreed','Nepal and China jointly announced an elevation of 8,848.86 m.']], sources:['Nepal Department of Tourism','Survey of Nepal / China announcement'] },
  { slug:'khangchendzonga', name:'Khangchendzonga', local:'Kangchenjunga · Khangchendzonga', range:'Himalaya', sub:'Kangchenjunga Himal', elevation:'8,586 m', country:'India / Nepal', region:'Sikkim / eastern Nepal', firstAscent:'1955', status:'World’s third-highest mountain', lat:27.7025, lon:88.1475, image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kangchenjunga%20Mountain.jpg', credit:'Ripon Kalita · Wikimedia Commons', headline:'Five summits, one sacred massif.', lead:'Khangchendzonga dominates the eastern Himalaya and holds a central place in Sikkimese sacred geography.', body:'Its great scale is matched by cultural importance. The massif forms both a physical borderland and a sacred presence that shapes how the mountain is understood beyond mountaineering.', history:[['1899','Early exploration','Douglas Freshfield’s expedition helped establish detailed geographic knowledge of the massif.'],['1955','First ascent','Joe Brown and George Band made the first ascent, stopping just short of the absolute summit in respect for local belief.'],['2016','UNESCO recognition','Khangchendzonga National Park was inscribed as a mixed World Heritage property.']], sources:['UNESCO World Heritage Centre'] },
  { slug:'annapurna-i', name:'Annapurna I', local:'Annapurna I', range:'Himalaya', sub:'Annapurna Himal', elevation:'8,091 m', country:'Nepal', region:'Gandaki, Nepal', firstAscent:'1950', status:'First 8,000 m peak climbed', lat:28.5958, lon:83.8203, image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Annapurna%20I.jpg', credit:'Wolfgang Beyer · CC BY-SA 3.0 · Wikimedia Commons', headline:'A massif that became an entire trekking world.', lead:'Annapurna I anchors a vast mountain system of glaciers, deep valleys, high passes and inhabited landscapes.', body:'Its 1950 first ascent made history, while the surrounding Annapurna region later became one of the most influential trekking destinations in the world.', history:[['1950','First 8,000er climbed','Maurice Herzog and Louis Lachenal reached Annapurna I.'],['1970','South Face ascent','A British expedition climbed the immense south face.'],['Modern era','Trekking region expands','The Annapurna Circuit and Sanctuary became globally known long-distance routes.']], sources:['Himalayan Database','Nepal Tourism Board'] },
  { slug:'shivling', name:'Shivling', local:'शिवलिंग', range:'Himalaya', sub:'Gangotri Group', elevation:'6,543 m', country:'India', region:'Uttarakhand, India', firstAscent:'1974', status:'Sacred alpine icon', lat:30.8620, lon:79.0630, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shivling_from_Nandanvan%2C_Mountain_peaks_of_Himalayas_Uttarakhand_India.jpg/1280px-Shivling_from_Nandanvan%2C_Mountain_peaks_of_Himalayas_Uttarakhand_India.jpg', credit:'Sharada Prasad CS · CC BY 2.0 · Wikimedia Commons', headline:'A technical peak above the source landscape of the Ganges.', lead:'Shivling rises dramatically above the Gangotri Glacier near Tapovan, with one of the most recognizable profiles in the Indian Himalaya.', body:'Its importance combines steep technical climbing with a setting deeply connected to pilgrimage and the headwaters of the Bhagirathi.', history:[['1974','First ascent','An Indo-Tibetan Border Police team made the first recorded ascent.'],['Later decades','Technical routes','Steep new lines established Shivling as a major technical climbing objective.'],['Today','Tapovan approach','Trekkers experience the mountain from the Gangotri–Gaumukh–Tapovan corridor.']], sources:['Uttarakhand Tourism','Indian mountaineering records'] },
  { slug:'k2', name:'K2', local:'K2 · Chhogori', range:'Karakoram', sub:'Baltoro Muztagh', elevation:'8,611 m', country:'Pakistan / China', region:'Karakoram', firstAscent:'1954', status:'World’s second-highest mountain', lat:35.8808, lon:76.5158, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/K-2_mountain.jpg/1280px-K-2_mountain.jpg', credit:'Abbas pakistani · CC BY-SA 4.0 · Wikimedia Commons', headline:'The great pyramid of the Karakoram.', lead:'K2 stands apart from the Himalaya proper, rising in the Baltoro Muztagh of the Karakoram.', body:'Its severe weather, technical difficulty and remote approach have made it one of the defining mountains of high-altitude mountaineering.', history:[['1856','Survey designation','The mountain received the survey label K2 during the Great Trigonometrical Survey.'],['1954','First ascent','Achille Compagnoni and Lino Lacedelli reached the summit.'],['2021','First winter ascent','A Nepali team completed the first winter ascent.']], sources:['Pakistan mountaineering records','Himalayan Database'] },
  { slug:'kailash', name:'Kailash', local:'Kailāsa · Gang Rinpoche', range:'Transhimalaya', sub:'Gangdise Range', elevation:'6,638 m', country:'China (Tibet)', region:'Western Tibet', firstAscent:'Unclimbed', status:'Sacred pilgrimage mountain', lat:31.0675, lon:81.3119, image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mount%20Kailash%2C%20Tibet.jpg', credit:'Amitbalani · CC0 · Wikimedia Commons', headline:'A mountain defined by circumambulation, not conquest.', lead:'Kailash rises in western Tibet and is revered in Hindu, Buddhist, Jain and Bön traditions.', body:'Its central journey is the kora around the mountain. The summit remains unclimbed, and the mountain belongs to the Gangdise system of the Transhimalaya rather than the Himalaya proper.', history:[['Ancient tradition','Sacred landscape','The mountain became embedded in multiple religious cosmologies and pilgrimage traditions.'],['Modern era','Kora continues','Pilgrims continue the high-altitude circuit around the mountain.'],['Present','No summit ascent','Climbing remains prohibited in recognition of its religious significance.']], sources:['Tibetan cultural records','Pilgrimage literature'] }
]

const bounds = { minLon:68, maxLon:93, minLat:24, maxLat:38 }
function project(lon, lat){
  const x=((lon-bounds.minLon)/(bounds.maxLon-bounds.minLon))*1000
  const y=560-((lat-bounds.minLat)/(bounds.maxLat-bounds.minLat))*560
  return [x,y]
}

export default function Home(){
  const [range,setRange]=useState('All')
  const [selectedSlug,setSelectedSlug]=useState('nanda-devi')
  const [activeChapter,setActiveChapter]=useState(0)
  const [scrollProgress,setScrollProgress]=useState(0)
  const selected=useMemo(()=>mountains.find(m=>m.slug===selectedSlug) || mountains[0],[selectedSlug])
  const filtered=useMemo(()=>range==='All'?mountains:mountains.filter(m=>m.range===range),[range])
  const selectedPoint=useMemo(()=>project(selected.lon,selected.lat),[selected])

  useEffect(()=>{
    const onScroll=()=>{
      const doc=document.documentElement
      const total=Math.max(1,doc.scrollHeight-window.innerHeight)
      setScrollProgress(Math.min(1,Math.max(0,window.scrollY/total)))
    }
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true})
    return ()=>window.removeEventListener('scroll',onScroll)
  },[])

  useEffect(()=>{
    const nodes=[...document.querySelectorAll('[data-story-step]')]
    if(!nodes.length)return
    const obs=new IntersectionObserver(entries=>{
      const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]
      if(visible) setActiveChapter(Number(visible.target.getAttribute('data-story-step'))||0)
    },{rootMargin:'-32% 0px -48% 0px',threshold:[0,.25,.6,1]})
    nodes.forEach(n=>obs.observe(n)); return ()=>obs.disconnect()
  },[selectedSlug])

  function choose(m, scroll=false){
    setSelectedSlug(m.slug)
    if(scroll) requestAnimationFrame(()=>document.getElementById('mountain-story')?.scrollIntoView({behavior:'smooth',block:'start'}))
  }

  return <main>
    <div className="scroll-progress" aria-hidden="true"><i style={{transform:`scaleX(${scrollProgress})`}}/></div>
    <header className="masthead"><div className="brand">HIGH ASIA</div><div className="edition">MOUNTAIN ATLAS · FOUNDING EDITION</div></header>

    <section className="hero"><div className="hero-inner"><div><div className="kicker">Explore the roof of the world</div><h1>Mountains,<br/>in context.</h1></div><p>Explore ranges, sacred landscapes, expedition history and the journeys that lead toward them.</p></div></section>

    <section className="atlas-wrap">
      <div className="atlas-topline"><div><span>01 · GEOGRAPHIC EXPLORER</span><h2>Choose a range. Then choose a peak.</h2></div><p>Every marker is plotted from geographic coordinates. The map is simplified for clarity, but it is no longer schematic.</p></div>
      <nav className="filters" aria-label="Mountain range filter">{['All','Himalaya','Karakoram','Transhimalaya'].map(item=><button key={item} className={range===item?'active':''} onClick={()=>{setRange(item);const next=item==='All'?mountains[0]:mountains.find(m=>m.range===item);if(next)setSelectedSlug(next.slug)}}>{item==='All'?'All High Asia':item}</button>)}</nav>
      <div className="atlas-grid">
        <div className="geo-panel">
          <div className="map-label">HIGH ASIA · REAL GEOGRAPHIC POSITIONS</div>
          <svg viewBox="0 0 1000 560" role="img" aria-label="Map of major mountains across High Asia">
            <g className="map-world" style={{transformOrigin:`${selectedPoint[0]}px ${selectedPoint[1]}px`,transform:`scale(${range==='All'?1.018:1.05})`}}>
            <defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#dfe5df"/><stop offset="1" stopColor="#cfd7cf"/></linearGradient></defs>
            <rect width="1000" height="560" fill="url(#sea)"/>
            {Object.entries(countries).map(([name,paths])=>paths.map((d,i)=><path key={name+i} d={d} className={'country '+name.toLowerCase()}/>))}
            <path d="M85 250 C220 180 320 190 430 245 C550 305 650 345 805 390 C860 405 910 408 965 405" className="range-line himalaya-line"/>
            <path d="M65 115 C150 85 225 75 330 110" className="range-line karakoram-line"/>
            <path d="M430 175 C500 145 575 145 655 185" className="range-line trans-line"/>
            <text x="445" y="335" className="map-country-label">INDIA</text><text x="612" y="420" className="map-country-label">NEPAL</text><text x="125" y="300" className="map-country-label">PAKISTAN</text><text x="590" y="110" className="map-country-label">TIBET / CHINA</text><text x="870" y="420" className="map-country-label">BHUTAN</text>
            <text x="520" y="300" className="range-label">HIMALAYA</text><text x="120" y="92" className="range-label">KARAKORAM</text><text x="485" y="150" className="range-label">TRANSHIMALAYA</text>
            {filtered.map(m=>{const [x,y]=project(m.lon,m.lat);return <g key={m.name} transform={`translate(${x} ${y})`} className={'map-peak '+(selected.name===m.name?'selected':'')} role="button" tabIndex="0" aria-label={`Select ${m.name}`} onClick={()=>choose(m)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(m)}}}><circle r="7"/><circle r="15" className="hit"/><text x="13" y="-11">{m.name}</text></g>})}
            </g>
            <circle className="map-radar" cx={selectedPoint[0]} cy={selectedPoint[1]} r="20"/>
          </svg>
          <div className="map-legend"><span><i className="legend-dot selected-dot"></i>Selected peak</span><span><i className="legend-line"></i>Range axis</span><span>Map boundaries simplified from Natural Earth geography</span></div>
        </div>

        <aside className="detail-card">
          <div className="detail-image"><img className="detail-photo" src={selected.image} alt={`${selected.name} mountain`}/><div className="detail-image-copy"><small>{selected.sub} · {selected.range}</small><strong>{selected.name}</strong></div></div>
          <div className="detail-body"><div className="verified">✓ CORE RECORD</div><div className="stats"><div><small>Elevation</small><strong>{selected.elevation}</strong></div><div><small>First ascent</small><strong>{selected.firstAscent}</strong></div></div><div className="taxonomy"><b>{selected.range}</b> · {selected.sub}<br/>{selected.country}</div><h2>{selected.status}</h2><p>{selected.lead}</p><div className="photo-credit">{selected.credit}</div><button className="explore-button" onClick={()=>choose(selected,true)}>Explore {selected.name}</button></div>
        </aside>
      </div>
    </section>

    <section className="collection"><div className="section-heading"><div><span>02 · FOUNDING COLLECTION</span><h2>Start with the great peaks.</h2></div><p>Selecting a mountain changes the map, the summary card and the full story below.</p></div><div className="cards">{mountains.map(m=><button key={m.name} onClick={()=>{setRange('All');choose(m,true)}} className={selected.name===m.name?'mountain-card active-card':'mountain-card'}><small>{m.range}</small><strong>{m.name}</strong><span>{m.elevation}<br/>{m.sub}</span></button>)}</div></section>

    <section className="mountain-page" id="mountain-story" key={selected.slug}>
      <div className={'mountain-hero chapter-'+activeChapter}><img className="mountain-photo" src={selected.image} alt={`${selected.name} in ${selected.sub}`}/><div className="mountain-atmosphere" aria-hidden="true"><span/><span/><span/></div><div className="mountain-overlay"></div><div className="mountain-copy"><small>{selected.range.toUpperCase()} · {selected.sub.toUpperCase()} · {selected.country.toUpperCase()}</small><h2>{selected.name}</h2><p>{selected.local}</p><div><span>{selected.elevation}</span><span>{selected.region}</span><span>First ascent · {selected.firstAscent}</span><span>{selected.status}</span></div></div></div>

      <div className="ice-gallery" aria-label={`${selected.name} visual gallery`}>
        <figure className="ice-gallery-main"><img src={selected.image} alt={`${selected.name} mountain landscape`}/><figcaption><b>{selected.name}</b><span>{selected.sub} · {selected.credit}</span></figcaption></figure>
        <figure><img src={mountains[(mountains.findIndex(m=>m.slug===selected.slug)+1)%mountains.length].image} alt="High Asia mountain context"/><figcaption><b>High Asia</b><span>Neighboring mountain landscape</span></figcaption></figure>
        <figure><img src={mountains[(mountains.findIndex(m=>m.slug===selected.slug)+2)%mountains.length].image} alt="Himalayan ice and mountain context"/><figcaption><b>Ice & altitude</b><span>Mountain landscape study</span></figcaption></figure>
      </div>
      <div className="mountain-content reveal" data-story-step="0"><article><small>03 · THE MOUNTAIN</small><h3>{selected.headline}</h3><p className="lead">{selected.lead}</p><p>{selected.body}</p><div className="living-note"><span className="pulse-dot"></span>Scroll to travel through the story</div></article><aside className="record"><small>CORE RECORD</small><strong>{selected.elevation.replace(' m','')} <i>m</i></strong><dl><div><dt>Range</dt><dd>{selected.range}</dd></div><div><dt>Sub-range</dt><dd>{selected.sub}</dd></div><div><dt>Region</dt><dd>{selected.region}</dd></div><div><dt>Country</dt><dd>{selected.country}</dd></div><div><dt>First ascent</dt><dd>{selected.firstAscent}</dd></div></dl></aside></div>
      <div className="storytelling">
        <aside className="story-visual"><div className="story-compass"><span>N</span><i></i></div><div className="story-altitude"><small>STORY ALTITUDE</small><div><i style={{height:`${Math.min(96,22+activeChapter*14)}%`}}></i></div><strong>{activeChapter===0?'LANDSCAPE':selected.history[Math.min(activeChapter-1,selected.history.length-1)]?.[0]||'PRESENT'}</strong></div><p>{selected.name}<br/><span>{selected.sub}</span></p></aside>
        <div className="story-steps"><div className="story-step" data-story-step="1"><small>04 · ORIGIN</small><h3>Enter the landscape.</h3><p>{selected.lead}</p></div>{selected.history.map(([year,title,text],i)=><div className="story-step" data-story-step={i+2} key={year+title}><small>{year}</small><h3>{title}</h3><p>{text}</p></div>)}<div className="story-step" data-story-step={selected.history.length+2}><small>NOW</small><h3>The mountain continues.</h3><p>{selected.body}</p></div></div>
      </div>
      <div className="history"><div><small>05 · EXPEDITION / CULTURAL HISTORY</small><h3>{selected.name}, through time.</h3></div><div className="timeline">{selected.history.map(([year,title,text])=><div key={year+title}><b>{year}</b><p><strong>{title}</strong><br/>{text}</p></div>)}</div></div>
      <div className="sources"><small>06 · SOURCES & NOTES</small><h3>Evidence stays visible.</h3><p>This page separates stable geographic facts from historical accounts and changing travel information. Access, permits and route conditions should always be rechecked before travel.</p><div className="photo-license-note">Photograph: {selected.credit}</div><div className="source-grid">{selected.sources.map(s=><div key={s}><b>{s}</b><span>Used for geographic, historical or visitor context in the atlas record.</span></div>)}<div><b>EDITORIAL RULE</b><span>Travel information expires; permanent facts and current access are stored separately.</span></div></div><div className="checked">RECORD CHECKED · AUGUST 2026</div></div>
    </section>

    <footer>HIGH ASIA · MOUNTAIN ATLAS <span>Built for free static hosting</span></footer>
  </main>
}
