'use client'

import { useMemo, useState } from 'react'

const mountains = [
  { name:'Nanda Devi', range:'Himalaya', sub:'Garhwal Himalaya', elevation:'7,817 m', country:'India', firstAscent:'1936', status:'Sacred protected landscape', note:'A great summit enclosed by the Nanda Devi Sanctuary, one of the most extraordinary natural fortresses of the Himalaya.', x:47, y:58, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nanda_Devi_peak.jpg/1280px-Nanda_Devi_peak.jpg', credit:'Ashwani Kumar · CC BY-SA 4.0 · Wikimedia Commons' },
  { name:'Everest', range:'Himalaya', sub:'Mahalangur Himal', elevation:'8,848.86 m', country:'Nepal / China', firstAscent:'1953', status:'World’s highest point', note:'Sagarmāthā / Qomolangma — the highest point above sea level on Earth.', x:76, y:55, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Everest%2C_Himalayas.jpg/1280px-Everest%2C_Himalayas.jpg', credit:'Vyacheslav Argenberg · CC BY 4.0 · Wikimedia Commons' },
  { name:'Khangchendzonga', range:'Himalaya', sub:'Kangchenjunga Himal', elevation:'8,586 m', country:'India / Nepal', firstAscent:'1955', status:'World’s third-highest mountain', note:'A sacred five-summit massif central to the landscape and identity of Sikkim.', x:90, y:60, image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kangchenjunga%20Mountain.jpg', credit:'Ripon Kalita · Wikimedia Commons' },
  { name:'Annapurna I', range:'Himalaya', sub:'Annapurna Himal', elevation:'8,091 m', country:'Nepal', firstAscent:'1950', status:'First 8,000 m peak climbed', note:'A huge massif surrounded by one of the most celebrated trekking regions on Earth.', x:66, y:59, image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Annapurna%20I.jpg', credit:'Wolfgang Beyer · CC BY-SA 3.0 · Wikimedia Commons' },
  { name:'Shivling', range:'Himalaya', sub:'Gangotri Group', elevation:'6,543 m', country:'India', firstAscent:'1974', status:'Sacred alpine icon', note:'A sharply sculpted peak above the Gangotri Glacier near Tapovan.', x:43, y:55, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shivling_from_Nandanvan%2C_Mountain_peaks_of_Himalayas_Uttarakhand_India.jpg/1280px-Shivling_from_Nandanvan%2C_Mountain_peaks_of_Himalayas_Uttarakhand_India.jpg', credit:'Sharada Prasad CS · CC BY 2.0 · Wikimedia Commons' },
  { name:'K2', range:'Karakoram', sub:'Baltoro Muztagh', elevation:'8,611 m', country:'Pakistan / China', firstAscent:'1954', status:'World’s second-highest mountain', note:'K2 belongs to the Karakoram, not the Himalaya — one of the atlas’s key geographic distinctions.', x:21, y:40, image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/K-2_mountain.jpg/1280px-K-2_mountain.jpg', credit:'Abbas pakistani · CC BY-SA 4.0 · Wikimedia Commons' },
  { name:'Kailash', range:'Transhimalaya', sub:'Gangdise Range', elevation:'6,638 m', country:'China (Tibet)', firstAscent:'Unclimbed', status:'Sacred pilgrimage mountain', note:'The central journey is the kora around the mountain, not a summit ascent.', x:55, y:43, image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mount%20Kailash%2C%20Tibet.jpg', credit:'Amitbalani · CC0 · Wikimedia Commons' }
]

export default function Home() {
  const [range, setRange] = useState('All')
  const [selected, setSelected] = useState(mountains[0])
  const filtered = useMemo(() => range === 'All' ? mountains : mountains.filter(m => m.range === range), [range])

  return (
    <main>
      <header className="masthead">
        <div className="brand">HIGH ASIA</div>
        <div className="edition">MOUNTAIN ATLAS · FOUNDING EDITION</div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="kicker">Explore the roof of the world</div>
          <h1>Mountains,<br/>in context.</h1>
          <p>Explore ranges, sacred landscapes, expedition history and the journeys that lead toward them.</p>
        </div>
      </section>

      <nav className="filters" aria-label="Mountain range filter">
        {['All','Himalaya','Karakoram','Transhimalaya'].map(item => (
          <button key={item} className={range === item ? 'active' : ''} onClick={() => {
            setRange(item)
            const next = item === 'All' ? mountains[0] : mountains.find(m => m.range === item)
            if (next) setSelected(next)
          }}>{item === 'All' ? 'All High Asia' : item}</button>
        ))}
      </nav>

      <section className="atlas-grid">
        <div className="map-panel">
          <div className="map-label">SELECT A PEAK · SCHEMATIC / NOT TO SCALE</div>
          <div className="ridge ridge-a"></div>
          <div className="ridge ridge-b"></div>
          {filtered.map(m => (
            <button key={m.name} className={'marker ' + (selected.name === m.name ? 'selected' : '')} style={{left:`${m.x}%`, top:`${m.y}%`}} onClick={() => setSelected(m)} aria-label={`Select ${m.name}`}>
              <span className="dot"></span><span className="marker-label">{m.name}</span>
            </button>
          ))}
        </div>

        <aside className="detail-card">
          <div className="detail-image">
            <img className="detail-photo" src={selected.image} alt={`${selected.name} mountain`} />
            <div className="detail-image-copy">
              <small>{selected.sub} · {selected.range}</small>
              <strong>{selected.name}</strong>
            </div>
          </div>
          <div className="detail-body">
            <div className="verified">✓ CORE RECORD VERIFIED</div>
            <div className="stats">
              <div><small>Elevation</small><strong>{selected.elevation}</strong></div>
              <div><small>First ascent</small><strong>{selected.firstAscent}</strong></div>
            </div>
            <div className="taxonomy"><b>{selected.range}</b> · {selected.sub}<br/>{selected.country}</div>
            <h2>{selected.status}</h2>
            <p>{selected.note}</p>
            <div className="photo-credit">{selected.credit}</div>
            <button className="explore-button" onClick={() => document.getElementById('nanda')?.scrollIntoView({behavior:'smooth'})}>Explore mountain page</button>
          </div>
        </aside>
      </section>

      <section className="collection">
        <div className="section-heading"><div><span>FOUNDING COLLECTION</span><h2>Start with the great peaks.</h2></div><p>The atlas deliberately crosses range boundaries so the geography stays accurate.</p></div>
        <div className="cards">
          {mountains.map(m => <button key={m.name} onClick={() => {setSelected(m); setRange('All'); window.scrollTo({top: 430, behavior:'smooth'})}} className={selected.name === m.name ? 'mountain-card active-card' : 'mountain-card'}><small>{m.range}</small><strong>{m.name}</strong><span>{m.elevation}<br/>{m.sub}</span></button>)}
        </div>
      </section>

      <section className="mountain-page" id="nanda">
        <div className="mountain-hero">
          <img className="mountain-photo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nanda_Devi_peak.jpg/1280px-Nanda_Devi_peak.jpg" alt="Nanda Devi in the Garhwal Himalaya" />
          <div className="mountain-overlay"></div>
          <div className="mountain-copy"><small>MOUNTAIN 011 · GARHWAL HIMALAYA · INDIA</small><h2>Nanda Devi</h2><p>नन्दा देवी · “Bliss-Giving Goddess”</p><div><span>7,817 m</span><span>Chamoli, Uttarakhand</span><span>First ascent · 1936</span><span>Protected sanctuary</span></div></div>
        </div>
        <div className="mountain-content">
          <article><small>01 · THE MOUNTAIN</small><h3>A summit inside a fortress.</h3><p className="lead">Nanda Devi rises from one of the most extraordinary natural enclosures in the Himalaya: a ring of high ridges and peaks broken by the Rishi Ganga gorge.</p><p>UNESCO describes Nanda Devi National Park as an exceptionally beautiful West Himalayan wilderness dominated by the 7,817-metre summit of Nanda Devi. Its isolation is part of its character: reaching the Inner Sanctuary historically required passage through the formidable Rishi Ganga gorge.</p></article>
          <aside className="record"><small>CORE RECORD</small><strong>7,817 <i>m</i></strong><dl><div><dt>Range</dt><dd>Garhwal Himalaya</dd></div><div><dt>District</dt><dd>Chamoli, Uttarakhand</dd></div><div><dt>Country</dt><dd>India</dd></div><div><dt>First ascent</dt><dd>Tilman & Odell · 1936</dd></div><div><dt>Protection</dt><dd>UNESCO World Heritage landscape</dd></div></dl></aside>
        </div>
        <div className="history"><div><small>02 · EXPEDITION HISTORY</small><h3>The way in was almost as important as the way up.</h3></div><div className="timeline"><div><b>1934</b><p><strong>Inner Sanctuary reached.</strong><br/>Eric Shipton and H. W. Tilman pioneered a passage through the upper Rishi Ganga gorge.</p></div><div><b>1936</b><p><strong>First ascent.</strong><br/>Bill Tilman and Noel Odell reached Nanda Devi’s summit.</p></div><div><b>1983</b><p><strong>Protection tightened.</strong><br/>Mountaineering and adventure activity inside the national park were banned after environmental degradation.</p></div><div><b>1988</b><p><strong>World Heritage recognition.</strong><br/>Nanda Devi National Park entered UNESCO’s World Heritage List.</p></div></div></div>
        <div className="sources"><small>03 · SOURCES & NOTES</small><h3>Evidence stays visible.</h3><p>Core geographic, protected-area and historical facts are based on UNESCO World Heritage Centre material. Travel and permit information should always be time-stamped and rechecked before a trip.</p><div className="photo-license-note">Nanda Devi photograph: Ashwani Kumar, CC BY-SA 4.0, via Wikimedia Commons. Other mountain photographs carry their credit directly in the explorer.</div><div className="source-grid"><div><b>UNESCO</b><span>Elevation, protected landscape, history and conservation status.</span></div><div><b>Uttarakhand Tourism</b><span>Visitor approach, seasonal access and permit guidance.</span></div><div><b>EDITORIAL RULE</b><span>Travel information expires; permanent facts and current access are stored separately.</span></div></div><div className="checked">RECORD CHECKED · AUGUST 2026</div></div>
      </section>

      <footer>HIGH ASIA · MOUNTAIN ATLAS <span>Built for free static hosting</span></footer>
    </main>
  )
}
