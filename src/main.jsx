import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const events = [
  {
    id: 1, title: 'Accra After Dark', category: 'Music', date: 'FRI, NOV 20', time: '7:00 PM', venue: 'Untamed Empire, Accra', area: 'East Legon', price: 'From GH₵ 120', tag: 'Trending', poster: 'night', posterLabel: 'AFTER\nDARK', posterSub: 'THE CITY IS YOURS', description: 'A night of live sets, Afrobeats, highlife and good people. A fictional sample listing created to demonstrate the event detail experience.'
  },
  {
    id: 2, title: 'Chop & Chat Market', category: 'Food', date: 'SAT, NOV 21', time: '11:00 AM', venue: 'Alliance Française, Accra', area: 'Cantonments', price: 'Free entry', tag: 'Free entry', poster: 'chop', posterLabel: 'CHOP\n& CHAT', posterSub: 'A TASTE OF HOME', description: 'A relaxed food and makers market celebrating local flavours, independent kitchens and the people behind them. Sample event content only.'
  },
  {
    id: 3, title: 'The Creative Exchange', category: 'Business', date: 'THU, NOV 26', time: '5:30 PM', venue: 'Impact Hub, Accra', area: 'Osu', price: 'GH₵ 80', tag: 'Limited seats', poster: 'create', posterLabel: 'MAKE\nROOM', posterSub: 'IDEAS MEET ACTION', description: 'An evening for designers, founders and curious builders to share work, meet collaborators and trade useful ideas. Sample event content only.'
  },
  {
    id: 4, title: 'Colours of Jamestown', category: 'Art', date: 'SUN, NOV 29', time: '10:00 AM', venue: 'Brazil House, Jamestown', area: 'Jamestown', price: 'GH₵ 50', tag: 'Culture', poster: 'colour', posterLabel: 'COLOURS\nOF THE COAST', posterSub: 'ART · SOUND · STORIES', description: 'A neighbourhood art walk with visual artists, photography, music and stories from the coast. Sample event content only.'
  },
  {
    id: 5, title: 'Sunday Run Club', category: 'Community', date: 'SUN, DEC 06', time: '6:00 AM', venue: 'Independence Arch', area: 'Osu', price: 'Free', tag: 'Community', poster: 'run', posterLabel: 'MOVE\nTOGETHER', posterSub: 'ONE CITY · ONE PACE', description: 'A friendly community run followed by a cool-down and coffee. All paces welcome. Sample event content only.'
  },
  {
    id: 6, title: 'Live at the Courtyard', category: 'Music', date: 'SAT, DEC 12', time: '6:30 PM', venue: 'Republic Bar & Grill', area: 'Osu', price: 'GH₵ 90', tag: 'Live music', poster: 'live', posterLabel: 'GOOD\nSOUND', posterSub: 'LIVE IN THE COURTYARD', description: 'An intimate live music session with emerging Ghanaian performers and a courtyard full of good energy. Sample event content only.'
  }
];

const categories = ['All events', 'Music', 'Food', 'Art', 'Business', 'Community'];

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    close: <path d="m18 6-12 12M6 6l12 12"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    ticket: <><path d="M3 8a2 2 0 0 0 0 4v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0 0-4V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/><path d="M13 4v16" strokeDasharray="2 3"/></>
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Poster({ event, compact = false }) {
  return (
    <div className={`poster poster--${event.poster} ${compact ? 'poster-compact' : ''}`} aria-label={`${event.title} event artwork`}>
      <span className="poster-topline">ACCRA PULSE <i>✳</i> 2026</span>
      <span className="poster-shape shape-one" />
      <span className="poster-shape shape-two" />
      <span className="poster-copy">{event.posterLabel.split('\n').map((line) => <b key={line}>{line}</b>)}</span>
      <span className="poster-sub">{event.posterSub}</span>
      <span className="poster-index">0{event.id}</span>
    </div>
  );
}

function EventCard({ event, saved, onSave, onOpen }) {
  return (
    <article className="event-card">
      <button className={`save-button ${saved ? 'is-saved' : ''}`} type="button" aria-label={saved ? `Remove ${event.title} from saved events` : `Save ${event.title}`} aria-pressed={saved} onClick={() => onSave(event.id)}><Icon name="heart" size={17}/></button>
      <button className="poster-button" type="button" onClick={() => onOpen(event)} aria-label={`View details for ${event.title}`}><Poster event={event}/></button>
      <div className="event-card-body">
        <div className="event-meta-top"><span className="event-category">{event.category}</span><span className="event-tag">{event.tag}</span></div>
        <button className="event-title-button" type="button" onClick={() => onOpen(event)}><h3>{event.title}</h3><span className="title-arrow"><Icon name="arrow" size={15}/></span></button>
        <div className="event-detail-line"><Icon name="pin" size={14}/><span>{event.venue}</span></div>
        <div className="event-card-bottom"><span>{event.date}</span><strong>{event.price}</strong></div>
      </div>
    </article>
  );
}

function EventModal({ event, saved, onSave, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [onClose]);
  const message = encodeURIComponent(`Hi, I would like more information about ${event.title}.`);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close event details"><Icon name="close" size={20}/></button>
        <div className="modal-poster"><Poster event={event} compact/></div>
        <div className="modal-content">
          <span className="event-category">{event.category} / SAMPLE LISTING</span>
          <h2 id="modal-title">{event.title}</h2>
          <p className="modal-description">{event.description}</p>
          <div className="modal-facts"><div><Icon name="clock"/><span><b>{event.date}</b><small>{event.time}</small></span></div><div><Icon name="pin"/><span><b>{event.venue}</b><small>{event.area}, Accra</small></span></div><div><Icon name="ticket"/><span><b>{event.price}</b><small>Sample price display</small></span></div></div>
          <div className="modal-actions"><button className={`button button-dark ${saved ? 'button-saved' : ''}`} type="button" onClick={() => onSave(event.id)}><Icon name="heart" size={16}/>{saved ? 'Saved to your list' : 'Save this event'}</button><a className="button button-coral" href={`https://wa.me/?text=${message}`} target="_blank" rel="noreferrer">Ask about this event <Icon name="arrow" size={16}/></a></div>
          <p className="demo-disclaimer">Portfolio demo: all events, organisers and ticket prices shown here are illustrative.</p>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All events');
  const [saved, setSaved] = useState([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredEvents = useMemo(() => events.filter((event) => {
    const searchText = `${event.title} ${event.category} ${event.venue} ${event.area}`.toLowerCase();
    const matchesQuery = searchText.includes(query.trim().toLowerCase());
    const matchesCategory = category === 'All events' || event.category === category;
    const matchesSaved = !savedOnly || saved.includes(event.id);
    return matchesQuery && matchesCategory && matchesSaved;
  }), [query, category, saved, savedOnly]);

  const toggleSaved = (id) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const handleSubscribe = (e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); };
  useEffect(() => {
    const focusSearch = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        document.querySelector('input[type=search]')?.focus();
      }
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <a className="brand" href="#top" aria-label="AccraPulse home"><span className="brand-symbol"><i/><i/><i/></span><span>accra<span>pulse</span></span></a>
          <button className="mobile-menu-button" type="button" onClick={() => setMobileMenuOpen((v) => !v)} aria-expanded={mobileMenuOpen} aria-label="Toggle navigation"><Icon name={mobileMenuOpen ? 'close' : 'menu'}/></button>
          <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <a href="#discover" onClick={() => setMobileMenuOpen(false)}>Discover</a><a href="#about" onClick={() => setMobileMenuOpen(false)}>Our story</a><a href="#newsletter" onClick={() => setMobileMenuOpen(false)}>Get updates</a>
            <button className="saved-nav" type="button" onClick={() => { setSavedOnly((v) => !v); setCategory('All events'); document.querySelector('#discover')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} aria-pressed={savedOnly}><Icon name="heart" size={15}/> Saved <span>{saved.length}</span></button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-inner">
            <div className="hero-copy"><span className="hero-kicker"><span/> THE CITY HAS PLANS</span><h1>Find your next<br/><em>good thing.</em></h1><p>Live music, creative meetups, food pop-ups and the little moments that make Accra feel like Accra.</p><a className="hero-link" href="#discover">Explore what's on <Icon name="arrow" size={17}/></a></div>
            <div className="hero-feature" aria-label="Featured event artwork"><div className="feature-orbit orbit-a"/><div className="feature-orbit orbit-b"/><div className="feature-sticker">YOUR CITY.<br/>YOUR PEOPLE.</div><div className="feature-art"><span className="feature-art-label">PULSE CHECK / 001</span><span className="feature-sun"/><span className="feature-wave wave-a"/><span className="feature-wave wave-b"/><strong>OUT<br/>THERE.</strong><small>MAKE THE WEEKEND COUNT</small></div><div className="feature-caption"><span>01 — THE WEEKEND EDIT</span><b>Good plans live here ↗</b></div></div>
          </div>
          <div className="hero-bottomline"><span>ACCRA, GHANA</span><span className="hero-line"/><span>MEET · MAKE · MOVE</span><span className="hero-scroll">SCROLL TO DISCOVER ↓</span></div>
        </section>

        <section className="discover-section" id="discover">
          <div className="section-heading"><div><span className="section-kicker">THE CITY, PICKED FOR YOU</span><h2>What's happening<span>?</span></h2></div><p>Find something worth leaving the house for.</p></div>
          <div className="discovery-tools"><div className="category-list" role="group" aria-label="Filter events by category">{categories.map((item) => <button key={item} type="button" className={`category-chip ${category === item ? 'active' : ''}`} onClick={() => { setCategory(item); setSavedOnly(false); }} aria-pressed={category === item}>{item}</button>)}</div><label className="search-box"><Icon name="search" size={17}/><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, places..." aria-label="Search events and venues"/><kbd>/</kbd></label></div>
          <div className="results-bar"><span>{savedOnly ? 'YOUR SAVED LIST' : 'THE LATEST LINE-UP'} <b>— {filteredEvents.length} {filteredEvents.length === 1 ? 'EVENT' : 'EVENTS'}</b></span>{(query || category !== 'All events' || savedOnly) && <button type="button" onClick={() => { setQuery(''); setCategory('All events'); setSavedOnly(false); }}>Clear filters ×</button>}</div>
          {filteredEvents.length ? <div className="event-grid">{filteredEvents.map((event) => <EventCard key={event.id} event={event} saved={saved.includes(event.id)} onSave={toggleSaved} onOpen={setSelected}/>)}</div> : <div className="empty-state"><span>✳</span><h3>No plans found. Yet.</h3><p>Try another search or clear your filters to see the full line-up.</p><button className="button button-dark" type="button" onClick={() => { setQuery(''); setCategory('All events'); setSavedOnly(false); }}>Show all events</button></div>}
          <div className="discovery-foot"><span>MORE GOOD THINGS ARE ALWAYS AROUND THE CORNER.</span><span>MADE FOR THE CURIOUS <b>✳</b></span></div>
        </section>

        <section className="about-band" id="about"><div className="about-mark">AP<span>✳</span></div><div className="about-copy"><span className="section-kicker">A LITTLE ABOUT US</span><h2>Accra moves.<br/><em>We help you move with it.</em></h2><p>AccraPulse is a concept city guide for people who want to find their people, try a new thing and experience more of the city. Less endless scrolling. More being there.</p></div><div className="about-aside"><span className="aside-number">+233</span><p>Local energy.<br/>Open invitations.<br/>Better weekends.</p><a href="#discover">Find your next plan <Icon name="arrow" size={15}/></a></div></section>

        <section className="newsletter-section" id="newsletter"><div className="newsletter-inner"><div><span className="section-kicker">THE PULSE LETTER</span><h2>Good plans.<br/><em>Once a week.</em></h2><p>A short note with interesting things happening around the city. No noise, just the good stuff.</p></div><form className="newsletter-form" onSubmit={handleSubscribe}><label htmlFor="newsletter-email">YOUR EMAIL ADDRESS</label><div className="newsletter-input-row"><input id="newsletter-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setSubscribed(false); }} required/><button type="submit" aria-label="Subscribe to the Pulse Letter"><Icon name="arrow" size={20}/></button></div>{subscribed ? <p className="subscribe-message" role="status">You're on the demo list. Thanks for your interest.</p> : <small>By signing up, you agree to receive the AccraPulse demo newsletter.</small>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a className="brand brand-footer" href="#top"><span className="brand-symbol"><i/><i/><i/></span><span>accra<span>pulse</span></span></a><p>Find your next good thing.</p><a className="back-top" href="#top">BACK TO TOP ↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ACCRAPULSE — PORTFOLIO DEMO</span><span>DESIGNED & BUILT IN GHANA <b>✳</b></span></div></footer>
      {selected && <EventModal event={selected} saved={saved.includes(selected.id)} onSave={toggleSaved} onClose={() => setSelected(null)}/>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
