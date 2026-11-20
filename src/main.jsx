import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  ArrowLeft, CarFront, ChevronDown, ChevronLeft, ChevronRight, Images,
  Instagram, MapPin, Maximize2, Menu, Search, SlidersHorizontal, X,
} from 'lucide-react'
import { directions, instagram, phone, vehicleName, vehicles, whatsapp } from './catalog'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource-variable/manrope'
import './styles.css'

const navigation = [['Home', '/'], ['Shop', '/shop'], ['About', '/about'], ['Contact', '/contact']]
const makes = [...new Set(vehicles.map(car => car.make))].sort()
const categories = [['SUV', 'SUVs'], ['Sedan', 'Sedans'], ['Coupe', 'Coupes']]

function route() {
  const [path, query] = (window.location.hash.slice(1) || '/').split('?')
  return { path, params: new URLSearchParams(query) }
}

function External({ children, ...props }) {
  return <a {...props} target="_blank" rel="noreferrer">{children}</a>
}

function WhatsAppIcon({ size = 19 }) {
  const [width, height, , , path] = faWhatsapp.icon
  return <svg width={size} height={size} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
    <path fill="currentColor" d={path} />
  </svg>
}

function WhatsApp({ message, children = 'WhatsApp', className = 'button primary' }) {
  return <External href={whatsapp(message)} className={className}><WhatsAppIcon />{children}</External>
}

function Brand() {
  return <a className="brand" href="#/" aria-label="Keblawe Motors home">
    <span className="brand-mark"><img src="/images/logo.webp" width="150" height="150" alt="" /></span>
    <span className="brand-title">KEBLAWE<span>MOTORS</span></span>
  </a>
}

function Header({ path }) {
  const [open, setOpen] = useState(false)

  return <header className="header" onKeyDown={event => { if (event.key === 'Escape') setOpen(false) }}>
    <div className="wrap header-inner">
      <Brand />
      <nav id="site-nav" className={open ? 'nav shown' : 'nav'} aria-label="Main navigation">
        {navigation.map(([label, page]) => (
          <a key={page} href={`#${page}`} aria-current={path === page || (page === '/shop' && path.startsWith('/shop/')) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <External className="icon-button" href={whatsapp()} aria-label="WhatsApp"><WhatsAppIcon size={21} /></External>
        <External className="icon-button" href={instagram} aria-label="Instagram"><Instagram size={20} aria-hidden="true" /></External>
        <button className="icon-button menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-controls="site-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>Buy, sell, and exchange cars<br />in Ghazieh, near Saida.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Explore</h2>
          <a href="#/shop">Browse cars</a>
          <a href="#/about">About the showroom</a>
          <a href="#/contact">Contact</a>
        </nav>
        <div className="footer-links">
          <h2>Find us</h2>
          <WhatsApp className="footer-link">{phone}</WhatsApp>
          <External href={directions}><MapPin size={17} />Ghazieh, Lebanon</External>
          <External href={instagram}><Instagram size={17} />Instagram</External>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Keblawe Motors</div>
    </div>
  </footer>
}

function CarCard({ car }) {
  const [cover] = car.photos
  return <a className="car-card" href={`#/shop/${car.id}`} aria-label={`View ${vehicleName(car)}`}>
    <div className="car-media">
      <img src={cover.src} alt={cover.alt} loading="lazy" style={{ objectPosition: cover.position }} />
      <span className="photo-count"><Images size={15} />{car.photos.length} {car.photos.length === 1 ? 'photo' : 'photos'}</span>
    </div>
    <div className="car-info">
      <div className="car-name">
        <p className="car-meta">{[car.make, car.year].filter(Boolean).join(' · ')}</p>
        <h3>{car.model}</h3>
      </div>
      <div className="car-bottom"><span>{car.category}</span><span>Price on inquiry</span></div>
    </div>
  </a>
}

function Home() {
  const [query, setQuery] = useState('')

  function findCars(event) {
    event.preventDefault()
    window.location.hash = query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop'
  }

  return <>
    <section className="wrap hero">
      <div className="hero-content">
        <p className="eyebrow"><MapPin size={15} />Ghazieh, Lebanon</p>
        <h1>Find your<br />next car<span>.</span></h1>
        <p className="hero-tagline" lang="ar" dir="rtl">التعامل معنا واضح، والثقة قبل كل شي</p>
        <p className="hero-description">Buy, sell, and exchange cars in Ghazieh, near Saida.</p>
        <a className="button primary" href="#/shop">Browse cars</a>
      </div>
      <a className="hero-media" href="#/shop/mercedes-c300" aria-label="View the 2018 Mercedes-Benz C 300 AMG">
        <img src="/images/c300-front.webp" alt="White Mercedes-Benz C 300 AMG photographed by Keblawe Motors" fetchPriority="high" />
        <span className="hero-caption"><span>Mercedes-Benz</span><strong>C 300 AMG</strong></span>
      </a>
    </section>
    <div className="wrap">
      <section className="finder" aria-label="Find a vehicle">
        <form onSubmit={findCars}>
          <label className="search-field"><Search size={20} /><input type="search" placeholder="Make, model or year" aria-label="Search by make, model, or year" value={query} onChange={event => setQuery(event.target.value)} /></label>
          <button className="button dark">Search</button>
        </form>
        <nav className="body-links" aria-label="Browse by body style">
          {categories.map(([id, label]) => <a key={id} href={`#/shop?body=${id}`}>{label}</a>)}
        </nav>
      </section>
      <section className="section">
        <div className="section-head"><h2>Featured cars</h2><a className="text-link" href="#/shop">View all cars</a></div>
        <div className="car-grid featured-grid">{vehicles.slice(0, 3).map(car => <CarCard key={car.id} car={car} />)}</div>
      </section>
      <section className="section style-section">
        <div className="section-head"><h2>Shop by body style</h2></div>
        <div className="style-grid">
          {categories.slice(0, 2).map(([category, label]) => {
            const car = vehicles.find(item => item.category === category)
            const cover = car.photos[0]
            return <a key={category} className="style-card" href={`#/shop?body=${category}`}>
              <img src={cover.src} alt="" loading="lazy" style={{ objectPosition: cover.position }} />
              <h3>{label}</h3>
            </a>
          })}
        </div>
      </section>
      <VisitPanel />
    </div>
  </>
}

function VisitPanel() {
  return <section className="visit">
    <div><p className="eyebrow"><MapPin size={15} />Ghazieh, near Saida</p><h2>Visit the showroom.</h2><p>Message us to confirm availability or arrange a visit.</p></div>
    <div className="actions"><WhatsApp>Message the showroom</WhatsApp><External className="button outline" href={directions}>Get directions</External></div>
  </section>
}

function PageHeading({ title, description }) {
  return <section className="page-heading"><div className="wrap"><h1>{title}</h1><p>{description}</p></div></section>
}

function Select({ label, value, onChange, children }) {
  return <label className="select"><span>{label}</span><select aria-label={label} value={value} onChange={event => onChange(event.target.value)}>{children}</select><ChevronDown size={16} /></label>
}

function Shop({ params }) {
  const [make, setMake] = useState(makes.includes(params.get('make')) ? params.get('make') : '')
  const [query, setQuery] = useState(params.get('q') || '')
  const [sort, setSort] = useState('featured')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selected, setSelected] = useState(categories.some(([id]) => id === params.get('body')) ? params.get('body') : '')
  const terms = query.toLowerCase().trim().split(/\s+/)
  const matches = vehicles.filter(car => (!make || car.make === make) && (!selected || car.category === selected)
    && terms.every(term => `${car.make} ${car.model} ${car.year ?? ''} ${car.category}`.toLowerCase().includes(term)))
  if (sort === 'year') matches.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
  if (sort === 'model') matches.sort((a, b) => a.model.localeCompare(b.model))

  function reset() {
    setMake('')
    setQuery('')
    setSort('featured')
    setSelected('')
    window.location.hash = '/shop'
  }

  return <>
    <PageHeading title="Browse cars" description="Explore the showroom. Ask us on WhatsApp for current pricing and availability." />
    <section className="wrap section shop">
      <div className="shop-tools">
        <label className="search-field"><Search size={20} /><input type="search" aria-label="Search by make, model, or year" placeholder="Make, model or year" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <button className="button secondary filter-toggle" aria-expanded={filterOpen} aria-controls="shop-filters" onClick={() => setFilterOpen(!filterOpen)}><SlidersHorizontal size={18} />Filters{make || sort !== 'featured' ? ' ·' : ''}</button>
      </div>
      <div className="shop-filter-row" id="shop-filters" hidden={!filterOpen}>
        <Select label="Make" value={make} onChange={setMake}><option value="">All makes</option>{makes.map(item => <option key={item}>{item}</option>)}</Select>
        <Select label="Sort by" value={sort} onChange={setSort}><option value="featured">Featured</option><option value="year">Newest model year</option><option value="model">Model A–Z</option></Select>
      </div>
      <div className="body-links shop-categories" role="group" aria-label="Vehicle body style">
        {[['', 'All cars'], ...categories].map(([id, label]) => (
          <button key={id} aria-pressed={selected === id} onClick={() => setSelected(id)}>{label}</button>
        ))}
      </div>
      <div className="results">
        <span role="status">{matches.length} {matches.length === 1 ? 'car' : 'cars'}</span>
        {(query || make || selected || sort !== 'featured') && <button className="text-link" onClick={reset}>Clear filters</button>}
      </div>
      {matches.length ? <div className="car-grid">{matches.map(car => <CarCard key={car.id} car={car} />)}</div>
        : <div className="empty"><CarFront size={28} /><h2>No matching cars</h2><p>Try a different search or clear the filters.</p><button className="button dark" onClick={reset}>Clear filters</button></div>}
    </section>
  </>
}

function Gallery({ car }) {
  const [index, setIndex] = useState(0)
  const rail = useRef(null)
  const modal = useRef(null)
  const { photos } = car
  const photo = photos[index]

  function select(next) {
    const selected = Math.max(0, Math.min(photos.length - 1, next))
    setIndex(selected)
    rail.current.scrollTo({ left: selected * rail.current.clientWidth })
  }

  function sync() {
    const { scrollLeft, clientWidth } = rail.current
    if (clientWidth) setIndex(Math.round(scrollLeft / clientWidth))
  }

  function keys(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    select(index + (event.key === 'ArrowRight' ? 1 : -1))
  }

  return <div className="gallery" aria-label="Vehicle photos" onKeyDown={keys}>
    <div className="gallery-main">
      <div className="gallery-rail" ref={rail} onScroll={sync} aria-label="Swipe to browse photos" tabIndex={photos.length > 1 ? 0 : undefined}>
        {photos.map((item, n) => <img key={item.src} src={item.src} alt={item.alt} loading={n ? 'lazy' : 'eager'} style={{ objectPosition: item.position }} />)}
      </div>
      {photos.length > 1 && <>
        <button className="icon-button gallery-prev" aria-label="Previous photo" disabled={!index} onClick={() => select(index - 1)}><ChevronLeft /></button>
        <button className="icon-button gallery-next" aria-label="Next photo" disabled={index === photos.length - 1} onClick={() => select(index + 1)}><ChevronRight /></button>
      </>}
      <span className="gallery-indicator" aria-live="polite">{index + 1} / {photos.length}</span>
      <button className="icon-button gallery-expand" aria-label="View full-size photo" onClick={() => modal.current.showModal()}><Maximize2 size={18} /></button>
    </div>
    {photos.length > 1 && <div className="thumbs" aria-label="Photo thumbnails">
      {photos.map((item, n) => <button key={item.src} className="thumb" aria-label={`Photo ${n + 1} of ${photos.length}`} aria-pressed={n === index} onClick={() => select(n)}><img src={item.src} alt="" style={{ objectPosition: item.position }} /></button>)}
    </div>}
    <dialog className="lightbox" aria-label="Full-size vehicle photo" ref={modal} onClick={event => { if (event.target === modal.current) modal.current.close() }}>
      <div className="lightbox-inner">
        <button autoFocus className="icon-button lightbox-close" aria-label="Close full-size photo" onClick={() => modal.current.close()}><X /></button>
        <img src={photo.src} alt={photo.alt} />
        {photos.length > 1 && <div className="lightbox-nav">
          <button className="icon-button" aria-label="Previous full-size photo" disabled={!index} onClick={() => select(index - 1)}><ChevronLeft /></button>
          <span>{index + 1} / {photos.length}</span>
          <button className="icon-button" aria-label="Next full-size photo" disabled={index === photos.length - 1} onClick={() => select(index + 1)}><ChevronRight /></button>
        </div>}
      </div>
    </dialog>
  </div>
}

function Details({ car }) {
  const message = `Hi Keblawe Motors, is the ${vehicleName(car)} still available? Could you share the price and more details?`
  return <div className="wrap detail-page">
    <a href="#/shop" className="back-link"><ArrowLeft size={17} />All cars</a>
    <section className="detail-grid">
      <div className="detail-title"><p className="eyebrow">{car.make}</p><h1>{car.model}</h1><p>{[car.year, car.category].filter(Boolean).join(' · ')}</p></div>
      <Gallery car={car} />
      <div className="detail-info">
        <h2>Vehicle overview</h2>
        <dl>
          {car.year && <div><dt>Model year</dt><dd>{car.year}</dd></div>}
          <div><dt>Body style</dt><dd>{car.category}</dd></div>
          <div><dt>Price</dt><dd>On inquiry</dd></div>
        </dl>
        <p>Message the showroom for pricing, availability, and a closer look.</p>
        <div className="detail-whatsapp"><WhatsApp message={message}>Ask on WhatsApp</WhatsApp></div>
        <External className="source-link" href={car.source}><Instagram size={17} /> {car.source.includes('/reel/') ? 'Watch the walkaround on Instagram' : 'View original on Instagram'}</External>
      </div>
    </section>
  </div>
}

const faqs = [
  ['How do I check if a car is available?', 'Open the vehicle page and tap Ask on WhatsApp. The message includes the car you selected, so the showroom can confirm pricing and availability.'],
  ['Can I sell or exchange a car?', 'Message Keblawe Motors with your car’s make, model, year, and a few photos to discuss selling or exchanging it.'],
  ['Where is the showroom?', 'Keblawe Motors is in Ghazieh, near Saida. Use Get directions to search for the showroom in Google Maps.'],
]

function FAQ() {
  return <section className="faq"><h2>Common questions</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={19} /></summary><p>{answer}</p></details>)}</section>
}

function About() {
  return <>
    <PageHeading title="Keblawe Motors" description="A car showroom in Ghazieh, near Saida." />
    <div className="wrap section">
      <section className="about-grid">
        <img src="/images/showroom.webp" alt="Cars at the Keblawe Motors showroom" />
        <div><p className="eyebrow">Buy · Sell · Exchange</p><h2>Visit the showroom.</h2><p>Browse the cars featured on the site, or chat with us about selling or exchanging your car.</p><a className="button dark" href="#/shop">Browse the showroom</a></div>
      </section>
      <VisitPanel />
    </div>
  </>
}

function Contact() {
  return <>
    <PageHeading title="Get in touch" description="Ask about a car, discuss an exchange, or plan your visit." />
    <div className="wrap section contact-layout">
      <section className="contact-cards" aria-label="Contact options">
        <article><WhatsAppIcon size={25} /><h2>WhatsApp</h2><p>{phone}</p><WhatsApp>Start a chat</WhatsApp></article>
        <article><MapPin size={25} /><h2>Visit us</h2><p>Ghazieh, near Saida, Lebanon</p><External href={directions} className="button secondary">Get directions</External></article>
        <article><Instagram size={25} /><h2>Instagram</h2><p>@keblawe_motors1</p><External href={instagram} className="button secondary">Open Instagram</External></article>
      </section>
      <FAQ />
    </div>
  </>
}

function App() {
  const [{ path, params }, setRoute] = useState(route)
  const car = vehicles.find(item => path === `/shop/${item.id}`)
  const page = navigation.find(([, url]) => url === path)?.[0]

  useEffect(() => {
    function navigate() {
      setRoute(route())
      window.scrollTo(0, 0)
      document.getElementById('main').focus({ preventScroll: true })
    }
    window.addEventListener('hashchange', navigate)
    return () => window.removeEventListener('hashchange', navigate)
  }, [])

  useEffect(() => {
    document.title = path === '/' ? 'Keblawe Motors | Ghazieh, Lebanon' : `${car?.model ?? page ?? 'Page not found'} | Keblawe Motors`
  }, [path, car, page])

  let content
  if (path === '/') content = <Home />
  else if (path === '/shop') content = <Shop key={params.toString()} params={params} />
  else if (path === '/about') content = <About />
  else if (path === '/contact') content = <Contact />
  else if (car) content = <Details key={car.id} car={car} />
  else content = <><PageHeading title="Page not found" description="This page may have moved." /><div className="wrap section"><a className="button dark" href="#/shop">Browse cars</a></div></>

  return <>
    <a className="skip" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main').focus() }}>Skip to content</a>
    <Header key={path} path={path} />
    <main id="main" tabIndex={-1}>{content}</main>
    <Footer />
  </>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
