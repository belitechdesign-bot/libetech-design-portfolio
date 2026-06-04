import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import './styles.css'

const logos = ['/assets/logos/logo-01.png', '/assets/logos/logo-02.png', '/assets/logos/logo-03.png', '/assets/logos/logo-04.png', '/assets/logos/logo-05.png', '/assets/logos/logo-06.jpg', '/assets/logos/logo-07.png', '/assets/logos/logo-08.png', '/assets/logos/logo-09.jpg', '/assets/logos/logo-10.png', '/assets/logos/logo-11.jpg', '/assets/logos/logo-12.png', '/assets/logos/logo-13.png', '/assets/logos/logo-14.png', '/assets/logos/logo-15.jpg', '/assets/logos/logo-16.jpg', '/assets/logos/logo-17.png', '/assets/logos/logo-18.png', '/assets/logos/logo-19.png', '/assets/logos/logo-20.png', '/assets/logos/logo-21.png', '/assets/logos/logo-22.png', '/assets/logos/logo-23.jpg', '/assets/logos/logo-24.png', '/assets/logos/logo-25.png', '/assets/logos/logo-26.png', '/assets/logos/logo-27.png', '/assets/logos/logo-28.jpg', '/assets/logos/logo-29.png', '/assets/logos/logo-30.jpg', '/assets/logos/logo-31.jpg', '/assets/logos/logo-32.jpeg', '/assets/logos/logo-33.jpg', '/assets/logos/logo-34.jpg']
const moods = ['/assets/moods/mood-01.png', '/assets/moods/mood-02.png', '/assets/moods/mood-03.png', '/assets/moods/mood-04.png', '/assets/moods/mood-05.png', '/assets/moods/mood-06.png', '/assets/moods/mood-07.png']
const flyers = ['/assets/flyers/flyer-01.png', '/assets/flyers/flyer-02.png', '/assets/flyers/flyer-03.png', '/assets/flyers/flyer-04.png', '/assets/flyers/flyer-05.png', '/assets/flyers/flyer-06.png', '/assets/flyers/flyer-07.png', '/assets/flyers/flyer-08.png']

function useReveal(){
  useEffect(()=>{
    const items = document.querySelectorAll('.observe')
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('is-visible') }
      })
    },{threshold:.14, rootMargin:'0px 0px -8% 0px'})
    items.forEach(item=>io.observe(item))
    return ()=>io.disconnect()
  },[])
}

function Nav(){
  return <header className="nav">
    <a href="#top" className="brand"><img src="/assets/brand/logo-libetch-azul.png"/> <span>LIBETECH</span></a>
    <nav><a href="#logos">Logos</a><a href="#moodboards">Moodboards</a><a href="#flyers">Flyers</a><a href="#contacto">Contacto</a></nav>
  </header>
}
function Hero(){
  return <section id="top" className="hero-minimal">
    <div className="hero-shell observe is-visible">
      <div className="hero-meta top-left">
        <img src="/assets/brand/logo-libetch-azul.png" />
        <span>Design Studio</span>
      </div>

      <div className="hero-art">
        <figure className="hero-mood">
          <img src={moods[0]} alt="Moodboard destacado LIBETECH" />
        </figure>
        <figure className="hero-logo-piece">
          <img src={logos[12]} alt="Logo destacado" />
        </figure>
        <figure className="hero-logo-piece second">
          <img src={logos[3]} alt="Logo destacado" />
        </figure>
      </div>

      <div className="hero-note">
        <p>Portafolio visual</p>
        <span>Logos · Moodboards · Publicidad</span>
      </div>

      <a href="#logos" className="hero-explore">Explorar <ArrowDown size={15}/></a>
    </div>
  </section>
}
function SectionTitle({kicker,title,desc}){return <div className="section-title observe"><p>{kicker}</p><h2>{title}</h2>{desc&&<span>{desc}</span>}</div>}
function Manifesto(){return <section className="manifest-light observe"><p>Diseño que se entiende.</p><h2>La imagen correcta hace que una marca se sienta más confiable antes de vender una sola palabra.</h2></section>}

function Logos(){
  const [active, setActive] = useState(0)
  const total = logos.length
  const prev = () => setActive((active - 1 + total) % total)
  const next = () => setActive((active + 1) % total)
  const prevIndex = (active - 1 + total) % total
  const nextIndex = (active + 1) % total

  useEffect(()=>{
    const timer = setInterval(()=>setActive(v => (v + 1) % total), 5200)
    return ()=>clearInterval(timer)
  },[total])

  return <section id="logos" className="section logos-section logos-carousel-section">
    <SectionTitle kicker="01 / Logos" title="Identidades presentadas como marcas, no como archivos." desc="Cada logo aparece con su propia presencia: protagonista al centro y su misma silueta desenfocada al fondo."/>

    <div className="premium-logo-carousel observe">
      <img className="logo-blur-bg" key={`bg-${active}`} src={logos[active]} alt="" aria-hidden="true" />

      <button className="carousel-side side-left" onClick={prev} aria-label="Logo anterior">
        <img src={logos[prevIndex]} alt="Logo anterior" />
      </button>

      <article className="carousel-main-logo" key={`logo-${active}`}>
        <div className="logo-stage-label">
          <span>{String(active + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
          <small>Brand identity</small>
        </div>
        <img src={logos[active]} alt={`Logo destacado ${active + 1}`} />
      </article>

      <button className="carousel-side side-right" onClick={next} aria-label="Siguiente logo">
        <img src={logos[nextIndex]} alt="Siguiente logo" />
      </button>

      <div className="carousel-controls">
        <button onClick={prev}>Anterior</button>
        <div className="logo-dots" aria-label="Indicadores de logos">
          {logos.slice(0, 12).map((_,i)=><button key={i} onClick={()=>setActive(i)} className={i===active ? 'active' : ''} aria-label={`Ver logo ${i+1}`}></button>)}
        </div>
        <button onClick={next}>Siguiente</button>
      </div>
    </div>
  </section>
}

function Moods(){return <section id="moodboards" className="section moods">
  <SectionTitle kicker="02 / Moodboards" title="Moodboards como presentación de marca." desc="Tarjetas apiladas al hacer scroll: más dinámico, pero claro y fácil de entender."/>
  <div className="mood-stack">
    {moods.map((src,i)=><article className="mood-card observe" key={src} style={{'--i':i}}>
      <div className="mood-card-info"><span>{String(i+1).padStart(2,'0')}</span><p>Brand presentation</p></div>
      <img src={src}/>
    </article>)}
  </div>
</section>}

function Flyers(){return <section id="flyers" className="section flyers-section">
  <SectionTitle kicker="03 / Flyers" title="Publicidad con ritmo visual." desc="Piezas más vivas: composición escalonada, hover limpio y lectura completa."/>
  <div className="flyer-stage">
    {flyers.map((src,i)=><article className="flyer-piece observe" key={src} style={{'--i':i}}>
      <img src={src}/>
      <div><span>Campaña {String(i+1).padStart(2,'0')}</span><ArrowUpRight size={15}/></div>
    </article>)}
  </div>
</section>}

function Footer(){return <footer id="contacto" className="footer"><img className="watermark" src="/assets/brand/logo-libetch-isotipo.png"/><div className="footer-inner observe"><p>LIBETECH Design Studio</p><h2>¿Listo para elevar tu marca?</h2><a className="whatsapp" href="https://wa.me/522331368383" target="_blank">233 136 8383</a><span>Facebook / Libetech Design</span></div></footer>}
function App(){useReveal(); return <><Nav/><main><Hero/><Manifesto/><Logos/><Moods/><Flyers/><Footer/></main></>}
createRoot(document.getElementById('root')).render(<App />)
