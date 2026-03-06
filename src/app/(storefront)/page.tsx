'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard/ProductCard';
import { products, categories, testimonials as staticTestimonials, formatPrice } from '@/data/products';
import './page.css';

export default function HomePage() {
  const [settings, setSettings] = React.useState<any>(null);
  const [testimonials, setTestimonials] = React.useState<any[]>(staticTestimonials);

  React.useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data.settings) setSettings(data.settings);
        if (data.testimonials && data.testimonials.length > 0) setTestimonials(data.testimonials);
      })
      .catch(err => console.error('Failed to load dynamic content'));
  }, []);

  const trendingProducts = products.filter((p) => p.badge === 'bestseller' || p.badge === 'popular').slice(0, 4);
  const saleProducts = products.filter((p) => p.originalPrice).slice(0, 4);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div
          className="hero-bg"
          style={settings?.heroImage && !settings.heroImage.includes('hero-bg.png') ? { backgroundImage: `url(${settings.heroImage})` } : {}}
        >
          <div className="hero-pattern"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-badge">Freshly Baked in Abuja 🇳🇬</span>
            <h1>{settings?.heroTitle ? <>{settings.heroTitle.split(',')[0]}, <br /><span className="hero-highlight">{settings.heroTitle.split(',')[1] || ''}</span></> : <>Artisan Bakes, <br /><span className="hero-highlight">Made with Love</span></>}</h1>
            <p className="hero-desc">
              {settings?.heroSubtitle || 'Handcrafted cakes, cupcakes & pastries made from premium ingredients. Perfect for birthdays, weddings, corporate events, or just because you deserve something sweet.'}
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-highlight btn-lg">
                Shop Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/shop?category=event-packages" className="btn btn-secondary btn-lg">
                Event Packages
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">5,000+</span>
                <span className="hero-stat-label">Happy Customers</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-num">4.9★</span>
                <span className="hero-stat-label">Average Rating</span>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <span className="hero-stat-num">Same Day</span>
                <span className="hero-stat-label">Delivery in Abuja</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-cake-display" style={{ width: '100%', height: '100%', position: 'relative' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '120%', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-2xl)' }}>
                <Image src="/images/hero.png" alt="Artisan Bakery Display" fill style={{ objectFit: 'cover' }} priority />
              </div>
              <div className="hero-cake-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section categories-section" id="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <div className="section-divider"></div>
            <p>Find the perfect treat for every occasion</p>
          </div>
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-card-image">
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className="category-card-icon">
                      {cat.slug === 'cakes' && '🎂'}
                      {cat.slug === 'cupcakes' && '🧁'}
                      {cat.slug === 'desserts' && '🍮'}
                      {cat.slug === 'pastries' && '🥐'}
                      {cat.slug === 'event-packages' && '🎁'}
                    </div>
                  )}
                </div>
                <div className="category-card-content">
                  <h3 className="category-card-name">{cat.name}</h3>
                  <p className="category-card-desc">{cat.description}</p>
                  <span className="category-card-link">
                    Browse
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="section trending-section" id="trending-section">
        <div className="container">
          <div className="section-header">
            <h2>Trending Now</h2>
            <div className="section-divider"></div>
            <p>Our most loved bakes this week</p>
          </div>
          <div className="grid grid-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link href="/shop" className="btn btn-secondary btn-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {saleProducts.length > 0 && (
        <section className="section offers-section" id="offers-section">
          <div className="container">
            <div className="offers-banner">
              <div className="offers-banner-text">
                <span className="offers-badge">💰 Special Offers</span>
                <h2>Sweet Deals, Sweeter Prices</h2>
                <p>Limited-time savings on our finest bakes</p>
              </div>
            </div>
            <div className="grid grid-4">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="section why-section" id="why-section">
        <div className="container">
          <div className="section-header">
            <h2>Why The Little Bake Store?</h2>
            <div className="section-divider"></div>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🌿</div>
              <h4>Premium Ingredients</h4>
              <p>We use only the finest ingredients — Belgian chocolate, European butter, and farm-fresh eggs</p>
            </div>
            <div className="why-card">
              <div className="why-icon">👩‍🍳</div>
              <h4>Expert Bakers</h4>
              <p>Our team of artisan bakers brings years of experience and passion to every creation</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🚚</div>
              <h4>Same-Day Delivery</h4>
              <p>Order before 2pm for same-day delivery anywhere in Abuja</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🤖</div>
              <h4>AI-Powered Service</h4>
              <p>Our BakeBot helps you find the perfect treats and track your orders with ease</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section" id="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <div className="section-divider"></div>
            <p>Thousands of happy customers across Abuja</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }, (_, i) => (
                    <span key={i} className="star filled">★</span>
                  ))}
                </div>
                <p className="testimonial-text">&ldquo;{t.content}&rdquo;</p>
                <div className="testimonial-author">
                  <span className="testimonial-avatar">{t.avatar}</span>
                  <div>
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner" id="cta-section">
        <div className="container">
          <div className="cta-inner">
            <h2>Ready to Order Something Delicious?</h2>
            <p>Browse our full catalog and get same-day delivery in Abuja</p>
            <Link href="/shop" className="btn btn-highlight btn-lg">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
