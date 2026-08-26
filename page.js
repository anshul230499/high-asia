'use client'
import {useState} from 'react'

const mountains=[
{name:'Nanda Devi',elevation:'7,817 m',range:'Garhwal Himalaya',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Nanda_Devi_peak.jpg/1280px-Nanda_Devi_peak.jpg'},
{name:'Everest',elevation:'8,848.86 m',range:'Mahalangur Himal',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Everest%2C_Himalayas.jpg/1280px-Everest%2C_Himalayas.jpg'},
{name:'K2',elevation:'8,611 m',range:'Karakoram',image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/K-2_mountain.jpg/1280px-K-2_mountain.jpg'}
]
const hillStations=[
{name:'Shimla',state:'Himachal Pradesh',elevation:'≈ 2,200 m',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Shimla%20city.jpg',text:'A cedar ridge where old roads, winter light and the railway climb meet the western Himalaya.'},
{name:'Darjeeling',state:'West Bengal',elevation:'≈ 2,045 m',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Darjeeling%20town.jpg',text:'Tea gardens fall into cloud while Khangchendzonga appears and disappears beyond the roofs.'},
{name:'Mussoorie',state:'Uttarakhand',elevation:'≈ 2,000 m',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mussoorie%20view.jpg',text:'A long ridge above the Doon, receiving monsoon cloud and the first distant suggestion of snow.'},
{name:'Nainital',state:'Uttarakhand',elevation:'≈ 2,084 m',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nainital%20lake.jpg',text:'A green lake held in a bowl of forested hills, with Kumaon rising quietly beyond the water.'},
{name:'Dharamshala',state:'Himachal Pradesh',elevation:'≈ 1,450–2,080 m',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dharamshala%20and%20Dhauladhar.jpg',text:'The Dhauladhar rises almost directly behind the town — dark forest below, white stone and snow above.'},
{name:'Ooty',state:'Tamil Nadu',elevation:'≈ 2,240 m',image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ooty%20landscape.jpg',text:'The Nilgiris gather rain and cloud into shola forest, grassland and blue distance.'}
]

export default function Home(){
  const [section,setSection]=useState('mountains')
  const [selected,setSelected]=useState(mountains[0])
  return <main>
    <header className="top"><button className="logo" onClick={()=>setSection('mountains')}>HIGH ASIA</button><nav><button className={section==='mountains'?'active':''} onClick={()=>setSection('mountains')}>Mountains</button><button className={section==='hill-stations'?'active':''} onClick={()=>setSection('hill-stations')}>Hill Stations</button><span>Journeys</span><span>Atlas</span></nav><small>HS CLEAN v1</small></header>
    {section==='mountains' ? <>
      <section className="hero mountain-hero"><div><small>EXPLORE THE ROOF OF THE WORLD</small><h1>Mountains,<br/>in context.</h1><p>Ranges, sacred landscapes, expedition history and the journeys that lead toward them.</p></div></section>
      <section className="mountains"><div className="picker">{mountains.map(m=><button key={m.name} onClick={()=>setSelected(m)} className={selected.name===m.name?'selected':''}><span>{m.range}</span><strong>{m.name}</strong><em>{m.elevation}</em></button>)}</div><article className="feature"><img src={selected.image} alt={selected.name}/><div><small>{selected.range}</small><h2>{selected.name}</h2><p>{selected.elevation}</p></div></article></section>
    </> : <>
      <section className="hero hills-hero"><div><small>THE SISTER ATLAS</small><h1>Hill Stations<br/>of India.</h1><p>Forest, rain, railways, tea, pilgrimage and life lived closer to the clouds.</p></div></section>
      <section className="intro"><p>The mountains tell the story of altitude at its wildest. Hill Stations follows what people built beneath and among them.</p></section>
      <section className="stations">{hillStations.map((s,i)=><article key={s.name} className="station"><img src={s.image} alt={s.name}/><div><small>{s.state.toUpperCase()} · {s.elevation}</small><h2>{s.name}</h2><p>{s.text}</p></div></article>)}</section>
      <section className="rail"><small>COMING INTO VIEW</small><h2>Three mountain<br/>railways.</h2><p>Darjeeling · Kalka–Shimla · Nilgiri</p></section>
    </>}
    <footer>HIGH ASIA <span>Mountains · places · journeys · life at altitude</span></footer>
  </main>
}
