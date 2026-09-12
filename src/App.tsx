import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sent, setSent] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 },
    );
    revealRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const addReveal = (element: HTMLElement | null) => {
    if (element && !revealRefs.current.includes(element)) revealRefs.current.push(element);
  };

  const jumpTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="virexo-page">
      <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top" data-testid="link-brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">VX</span> virexo
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#studio" data-testid="link-about">Studio</a>
            <a href="#services" data-testid="link-services">Services</a>
            <a href="#work" data-testid="link-work">Work</a>
            <a href="#contact" data-testid="link-contact">Contact</a>
          </nav>
          <a className="nav-cta mono" href="#contact" data-testid="link-start-project">
            Start a project <ArrowUpRight size={14} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
          {menuOpen && (
            <nav className="mobile-menu" aria-label="Mobile navigation">
              <a href="#studio" onClick={() => setMenuOpen(false)} data-testid="mobile-link-about">Studio</a>
              <a href="#services" onClick={() => setMenuOpen(false)} data-testid="mobile-link-services">Services</a>
              <a href="#work" onClick={() => setMenuOpen(false)} data-testid="mobile-link-work">Work</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} data-testid="mobile-link-contact">Contact</a>
            </nav>
          )}
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy reveal visible" ref={addReveal}>
              <div className="eyebrow mono">Independent digital studio / 2024—25</div>
              <h1>Make it <em>make sense.</em></h1>
              <div className="hero-intro">
                <p>Virexo turns ambitious, tangled ideas into digital experiences that feel obvious to use and impossible to ignore.</p>
              </div>
              <div className="hero-actions">
                <button className="button-primary" type="button" onClick={() => jumpTo('contact')} data-testid="button-hero-contact">
                  Tell us what’s next <ArrowRight size={16} />
                </button>
                <a className="button-secondary mono" href="#work" data-testid="link-hero-work">
                  See the work <ArrowDownRight size={15} />
                </a>
              </div>
            </div>
            <div className="hero-visual reveal delay-2 visible" ref={addReveal} aria-label="Virexo visual identity composition" data-testid="visual-hero-art">
              <div className="visual-frame">
                <div className="visual-grid" />
                <div className="orb" />
                <span className="visual-stamp mono">BRING<br />CLARITY</span>
                <span className="visual-word serif">forward.</span>
              </div>
              <span className="visual-caption mono">Strategy × Design × Build</span>
              <span className="hero-index mono">01 / 04 — VIREXO SYSTEM</span>
            </div>
          </div>
          <div className="container scroll-cue mono"><span>Scroll to explore</span><span /></div>
        </section>

        <div className="marquee" aria-label="Virexo capabilities">
          <div className="marquee-track">
            {['Digital strategy', 'Identity systems', 'Product design', 'Web experiences', 'Digital strategy', 'Identity systems', 'Product design', 'Web experiences'].map((item, index) => (
              <span className="marquee-item mono" key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="section manifesto" id="studio">
          <div className="container manifesto-grid">
            <div className="reveal" ref={addReveal}>
              <div className="eyebrow mono">The studio / 01</div>
              <h2 className="section-title">Big picture.<br /><em>Sharp edges.</em></h2>
            </div>
            <div className="reveal delay-1" ref={addReveal}>
              <p className="manifesto-copy">The best digital work is not louder. It is <strong>clearer.</strong> We find the signal, build the system, and make the whole thing move.</p>
              <p className="manifesto-note"><span className="mono">A note from Virexo</span>We are a small, senior team for founders and teams in motion. No layers of account management. No theatre. Just good questions, decisive thinking, and a digital presence built to pull its weight.</p>
            </div>
          </div>
        </section>

        <section className="section services" id="services">
          <div className="container">
            <div className="reveal" ref={addReveal}>
              <div className="eyebrow mono">What we do / 02</div>
              <h2 className="section-title">From first thought<br />to <em>full force.</em></h2>
            </div>
            <div className="service-list">
              {[
                ['01', 'Brand & positioning', 'Find the sharpest version of your story, then give it a visual language with enough range to grow.'],
                ['02', 'Digital products', 'Make complex tools feel calm, considered, and fast. We turn product ambition into a clear, useful experience.'],
                ['03', 'Websites that work', 'A considered website is your best salesperson. We make yours articulate, memorable, and ready to perform.'],
              ].map(([number, title, description], index) => (
                <article className={`service-item reveal delay-${index + 1}`} ref={addReveal} key={number} data-testid={`card-service-${number}`}>
                  <span className="service-number mono">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ArrowUpRight size={19} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process" id="process">
          <div className="container">
            <div className="process-head reveal" ref={addReveal}>
              <div>
                <div className="eyebrow mono">How we move / 03</div>
                <h2 className="section-title">A little structure<br />creates <em>momentum.</em></h2>
              </div>
              <p>Clear steps, senior attention, and enough room for the good ideas to surprise us.</p>
            </div>
            <div className="process-grid">
              {[
                ['01', 'Align', 'We get close to the problem before touching the pixels.'],
                ['02', 'Shape', 'We turn the signal into a direction people can get behind.'],
                ['03', 'Make', 'We build the sharp, useful thing — not a deck about it.'],
                ['04', 'Move', 'We launch, learn, and leave your team with momentum.'],
              ].map(([number, title, description], index) => (
                <article className={`process-step reveal delay-${index + 1}`} ref={addReveal} key={number} data-testid={`step-process-${number}`}>
                  <div className="step-index mono"><span>{number}</span><b>→</b></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section work" id="work">
          <div className="container">
            <div className="work-head reveal" ref={addReveal}>
              <div>
                <div className="eyebrow mono">Selected work / 04</div>
                <h2 className="section-title">Useful can be<br /><em>beautiful.</em></h2>
              </div>
              <p>Real outcomes for teams with somewhere to go.</p>
            </div>
            <div className="work-grid">
              <article className="work-card tall reveal" ref={addReveal} data-testid="card-work-arc">
                <div className="work-label mono"><span>Arc / Climate intelligence</span><span>2024</span></div>
                <h3>Making the future legible.</h3>
                <p>A new identity and data platform that gives climate teams a clearer line from evidence to action.</p>
                <ArrowUpRight className="work-arrow" size={23} />
              </article>
              <article className="work-card alt reveal delay-1" ref={addReveal} data-testid="card-work-kite">
                <div className="work-label mono"><span>Kite / Financial wellness</span><span>2023</span></div>
                <h3>Money, without the fog.</h3>
                <p>A friendlier product experience for a new kind of financial guide.</p>
                <ArrowUpRight className="work-arrow" size={23} />
              </article>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container contact-inner">
            <div className="reveal" ref={addReveal}>
              <div className="eyebrow mono">Have a good problem?</div>
              <h2>Let’s make<br /><em>something clear.</em></h2>
              <p className="contact-copy">Tell us what you are building, where it is stuck, or where you want it to go. We will come back with a point of view — usually within two working days.</p>
            </div>
            <form className="contact-form reveal delay-1" ref={addReveal} onSubmit={handleSubmit} data-testid="form-contact">
              <label className="mono" htmlFor="name">Your name</label>
              <input id="name" name="name" placeholder="Ada Lovelace" required data-testid="input-name" />
              <label className="mono" htmlFor="email">Your email</label>
              <input id="email" name="email" type="email" placeholder="ada@company.com" required data-testid="input-email" />
              <label className="mono" htmlFor="brief">The short version</label>
              <textarea id="brief" name="brief" placeholder="We are trying to..." required data-testid="input-brief" />
              <button className="button-primary form-button" type="submit" data-testid="button-submit-contact">
                Send the brief <MoveUpRight size={15} />
              </button>
              {sent && <p className="form-success" role="status" data-testid="status-contact-success"><Check size={14} /> Received. We’ll be in touch shortly.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <a className="brand" href="#top" data-testid="link-footer-brand"><span className="brand-mark">VX</span> virexo</a>
            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#studio" data-testid="footer-link-studio">Studio</a>
              <a href="#services" data-testid="footer-link-services">Services</a>
              <a href="#work" data-testid="footer-link-work">Work</a>
              <a href="#contact" data-testid="footer-link-contact">Contact</a>
            </nav>
          </div>
          <div className="footer-bottom mono"><span>© 2025 Virexo Digital Studio</span><a href="#top" data-testid="link-back-to-top">Back to top ↑</a></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
