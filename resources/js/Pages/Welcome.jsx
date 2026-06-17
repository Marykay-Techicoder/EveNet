import { useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import "../../css/app.css";

import { Calendar, MapPin, Users } from 'lucide-react';

const heroBg = "/images/hero-event-bg.jpg";
const aboutImg = "/images/hero-event-bg.jpg";
const eventCardImg = "/images/image2.png";
const legacyImg = "/images/image2.png";
const logo = "/images/logo.png";

export default function Home({ ongoingEvents = [], upcomingEvents = [], pastEvents = [] }) {
  const { url } = usePage();
  const carouselRef = useRef(null);

  // Demo fallback data (remove when backend provides real data)
  const demoOngoing = [
    { id: 1, title: 'Tech Summit 2024', date: 'DEC 12', location: 'San Francisco, CA' },
    { id: 2, title: 'Neon Music Festival', date: 'JAN 05', location: 'New York, NY' },
    { id: 3, title: 'Global Investment Forum', date: 'FEB 18', location: 'London, UK' },
  ];
  const demoUpcoming = [
    { id: 4, title: 'Future AI Summit 2024', date: 'DEC 12', location: 'San Francisco, CA' },
    { id: 5, title: 'Creative Leadership Expo', date: 'JAN 05', location: 'New York, NY' },
    { id: 6, title: 'Green Venture Forum', date: 'FEB 18', location: 'London, UK' },
  ];
  const displayOngoing = ongoingEvents.length ? ongoingEvents : demoOngoing;
  const displayUpcoming = upcomingEvents.length ? upcomingEvents : demoUpcoming;

  // Carousel horizontal scroll with mouse wheel
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', handleWheel);
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // FAB scroll visibility (mobile only)
  useEffect(() => {
    const fab = document.getElementById('fab');
    if (!fab) return;
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      const footerTop = footer.getBoundingClientRect().top;
      if (footerTop < window.innerHeight) {
        fab.style.opacity = '0';
        fab.style.pointerEvents = 'none';
      } else {
        fab.style.opacity = '1';
        fab.style.pointerEvents = 'auto';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden">
      {/* Top Navigation */}
      <nav className="bg-surface/80 backdrop-blur-md font-label-md text-label-md fixed top-0 left-0 w-full z-50 border-b border-outline-variant flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4">
        <div className="flex items-center gap-4">
          {/* Logo image - replace with your own */}
          <img alt="Eventha Logo" className="h-10 w-auto" src={logo} />
          <span className="font-headline-md text-headline-md font-bold text-dark tracking-tight">Eventha</span>
        </div>
        <div className="hidden md:flex items-center gap-gutter">
          <a href="#hero" className="text-on-surface-variant hover:text-primary transition-colors">Home</a>
          <a href="#about" className="text-on-surface-variant hover:text-primary transition-colors">About</a>
          <a href="#events" className="text-on-surface-variant hover:text-primary transition-colors">Events</a>
          <a href="#register" className="text-on-surface-variant hover:text-primary transition-colors">Register</a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/events-page"
            className="bg-black text-on-primary px-6 py-2 rounded-full font-label-md active:scale-95 transition-transform hover:shadow-md"
          >
            explore
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative h-[795px] min-h-[600px] flex items-center justify-center overflow-hidden" id="hero">
          <div className="absolute inset-0 z-0">
            <img alt="Event background" className="w-full h-full object-cover scale-105" src={heroBg} />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-background"></div>
          </div>
          <div className="relative z-10 text-center px-margin-mobile max-w-container-max mx-auto">
            <h1 className="font-display-lg text-display-lg md:text-display-lg text-white mb-stack-md">
              Where Ambition <br className="hidden md:block" /> Meets <span className="text-secondary-container">Execution</span>
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 mb-stack-lg max-w-2xl mx-auto">
              The premium destination for corporate planners and visionary vendors. We turn logistics into legacies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/event-registration"
                className="bg-secondary-container text-primary px-8 py-4 rounded-full font-label-md text-lg active:scale-95 transition-all w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Book Your Event
              </Link>
              <Link
                href="/events-page"
                className="border border-white text-white px-8 py-4 rounded-full font-label-md text-lg active:scale-95 transition-all w-full sm:w-auto backdrop-blur-sm hover:bg-white/10"
              >
                Explore Venues
              </Link>
            </div>
          </div>
          {/* Marquee Overlay */}
          <div className="absolute bottom-0 left-0 w-full bg-black/90 text-white py-4 overflow-hidden z-20">
            <div className="flex whitespace-nowrap animate-marquee">
              <div className="flex gap-margin-desktop items-center">
                {displayOngoing.map((event) => (
                  <span key={event.id} className="flex items-center gap-2 font-label-md uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                    Ongoing: {event.title}
                  </span>
                ))}
              </div>
              {/* Duplicate for infinite effect */}
              <div className="flex gap-margin-desktop items-center ml-margin-desktop">
                {displayOngoing.map((event) => (
                  <span key={event.id} className="flex items-center gap-2 font-label-md uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                    Ongoing: {event.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section (Asymmetric Layout) */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="about">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-5 space-y-stack-md">
              <span className="text-secondary font-label-sm uppercase tracking-widest">About Eventha</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Architects of Atmosphere</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Eventha is more than a logistics firm; we are the bridge between high-stakes business objectives and the creative pulse of event management. We specialize in curating environments that foster connection and drive results.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container p-2 bg-secondary-fixed rounded-lg">verified</span>
                  <div>
                    <h4 className="font-label-md text-on-surface">Strategic Planning</h4>
                    <p className="text-label-sm text-on-surface-variant">Precision alignment with your brand goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-container p-2 bg-secondary-fixed rounded-lg">stadium</span>
                  <div>
                    <h4 className="font-label-md text-on-surface">Premium Venues</h4>
                    <p className="text-label-sm text-on-surface-variant">Exclusive access to top-tier global spaces.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 relative group">
              <div className="rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <img alt="Corporate gala event networking" className="w-full aspect-[1.5] object-cover" src={aboutImg} />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary-container/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-section-gap bg-surface-container-low" id="events">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
             {/* Past Conferences Bento Grid */}
            <div>
              <h3 className="font-headline-md text-headline-md mb-stack-md">Legacy Portfolio</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <div className="md:col-span-2 relative group rounded-xl overflow-hidden aspect-video md:aspect-auto">
                  <img alt="Past big conference" className="w-full h-full object-cover" src={legacyImg} />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-gutter">
                    <span className="text-white/70 text-label-sm uppercase tracking-widest mb-1">Retrospective 2023</span>
                    <h4 className="text-white font-headline-md">Global Marketing Summit</h4>
                    <p className="text-white/80 font-body-md max-w-md">3,000 attendees, 45 keynote speakers, and a carbon-neutral footprint.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-gutter">
                  <div className="bg-white p-gutter rounded-xl shadow-sm border border-outline-variant flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-label-md text-secondary uppercase">Case Study</h5>
                      <h4 className="font-headline-md mt-2">The Neon Gala</h4>
                    </div>
                    <Link href="#" className="text-primary font-label-md flex items-center gap-2 hover:underline">
                      Read Success Story <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                  <div className="bg-primary-container p-gutter rounded-xl shadow-sm flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-label-md text-secondary-fixed uppercase">Metrics</h5>
                      <div className="mt-4 flex flex-col gap-2">
                        <span className="text-white font-headline-lg">98%</span>
                        <span className="text-primary-fixed font-body-md">Planner Satisfaction Rate</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg gap-4 pt-10">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">Experience the Extraordinary</h2>
                <p className="text-on-surface-variant font-body-md">Discover our curated selection of high-impact gatherings.</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-2 rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Upcoming Events Carousel */}
            <div className="mb-section-gap">
              <h3 className="font-headline-md text-headline-md mb-stack-md flex items-center gap-2">
                Upcoming <span className="text-label-sm px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full">New</span>
              </h3>
              <div ref={carouselRef} className="flex gap-gutter overflow-x-auto hide-scrollbar pb-8">
                {displayUpcoming.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`} className="min-w-[300px] md:min-w-[400px] group block">
                    <div className="relative rounded-xl overflow-hidden aspect-[1.5] mb-4">
                      <img
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={eventCardImg}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-label-sm font-bold text-primary">
                          {event.date}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-label-md text-xl text-on-surface group-hover:text-secondary-container transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 text-on-surface-variant text-label-sm mt-1">
                      <span className="material-symbols-outlined text-[18px]">location_on</span> {event.location}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {/* Paast Events Carousel */}
            <div className="mb-section-gap">
              <h3 className="font-headline-md text-headline-md mb-stack-md flex items-center gap-2">
                Past <span className="text-label-sm px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full">Completed</span>
              </h3>
              <div ref={carouselRef} className="flex gap-gutter overflow-x-auto hide-scrollbar pb-8">
                {displayUpcoming.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`} className="min-w-[300px] md:min-w-[400px] group block">
                    <div className="relative rounded-xl overflow-hidden aspect-[1.5] mb-4">
                      <img
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={eventCardImg}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-label-sm font-bold text-primary">
                          {event.date}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-label-md text-xl text-on-surface group-hover:text-secondary-container transition-colors">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 text-on-surface-variant text-label-sm mt-1">
                      <span className="material-symbols-outlined text-[18px]">location_on</span> {event.location}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

           
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section-gap px-margin-mobile">
          <div className="max-w-[800px] mx-auto text-center glass-card p-12 rounded-3xl shadow-xl">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md">Ready to Dream Big?</h2>
            <p className="font-body-lg text-on-surface-variant mb-stack-lg">
              Connect with our event consultants today and transform your vision into an unforgettable experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/event-registration"
                className="bg-black text-white px-10 py-4 rounded-full font-label-md hover:shadow-lg active:scale-95 transition-all"
              >
                Start Planning
              </Link>
              <button className="bg-white border border-outline text-on-surface px-10 py-4 rounded-full font-label-md hover:bg-surface-container transition-all">
                View Brochure
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest font-body-md text-body-md w-full border-t border-outline-variant px-margin-mobile md:px-margin-desktop py-stack-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-md">
        <div className="flex flex-col gap-2">
          <span className="font-headline-md text-headline-md text-black font-bold">Eventha</span>
          <p className="text-on-surface-variant max-w-xs">Premium event management for corporate leaders and creative visionaries.</p>
        </div>
        <div className="flex flex-wrap gap-x-gutter gap-y-stack-sm text-on-surface-variant">
          <Link href="/privacy" className="hover:text-primary transition-all">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-all">Terms of Service</Link>
          <Link href="/contact" className="hover:text-primary transition-all">Contact Us</Link>
          <Link href="/careers" className="hover:text-primary transition-all">Careers</Link>
          <a href="#" className="hover:text-primary transition-all">Instagram</a>
          <a href="#" className="hover:text-primary transition-all">LinkedIn</a>
        </div>
        <div className="text-on-surface-variant text-label-sm mt-4 md:mt-0">
          © 2024 Eventha Events. All rights reserved.
        </div>
      </footer>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-surface py-3 px-4 border-t border-outline-variant shadow-lg md:hidden z-50">
        <Link href="/" className={`flex flex-col items-center justify-center ${url === '/' ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-label-sm">Home</span>
        </Link>
        <Link href="#events" className="flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">event</span>
          <span className="text-label-sm">Events</span>
        </Link>
        <Link href="#register" className="flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">confirmation_number</span>
          <span className="text-label-sm">Register</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined">person</span>
          <span className="text-label-sm">Profile</span>
        </Link>
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <Link
        href="/event-registration"
        id="fab"
        className="fixed bottom-24 right-6 bg-secondary-container text-white p-4 rounded-full shadow-2xl md:hidden z-40 active:scale-90 transition-transform flex items-center justify-center"
        style={{ opacity: 1, pointerEvents: 'auto' }}
      >
        <span className="material-symbols-outlined">add</span>
      </Link>
    </div>
  );
}