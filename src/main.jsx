import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

const products = [
  {
    name: 'Silver Bloom Necklace Set',
    description: 'Floral oxidized artistry with a touch of tradition',
    price: '₹230',
    category: 'necklaces',
    image: asset('products/Silver Bloom Necklace Set — Floral oxidized artistry with a touch of tradition.jpg'),
  },
  {
    name: 'Mirror Mystique Choker',
    description: 'Afghan-inspired statement with jhumkas',
    price: '₹380',
    category: 'necklaces',
    image: asset('products/Mirror Mystique Choker — Afghan-inspired statement with jhumkas.jpg'),
  },
  {
    name: 'Rainbow Whisper Rings',
    description: 'Vibrant AD stones for a pop of colour',
    price: '₹120(each)',
    category: 'rings',
    image: asset('products/Rainbow Whisper Rings — Vibrant AD stones for a pop of colour.jpg'),
  },
  {
    name: 'Golden Heart Long Set',
    description: 'Timeless grace for festive moments',
    price: '₹350',
    category: 'necklaces',
    image: asset('products/Golden Heart Long Set — Timeless grace for festive moments.jpg'),
  },
  {
    name: 'Evil Eye Star Anklets',
    description: 'Delicate protection for daily wear',
    price: '₹50(pair)',
    category: 'anklets',
    image: asset('products/Evil Eye Star Anklets — Delicate protection, daily wear.jpg'),
  },
];

const filters = [
  ['all', 'All pieces'],
  ['necklaces', 'Necklace sets'],
  ['rings', 'Rings'],
  ['anklets', 'Anklets'],
];

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [bagCount, setBagCount] = useState(0);
  const [toast, setToast] = useState('');
  const [email, setEmail] = useState('');

  const visibleProducts = activeFilter === 'all'
    ? products
    : products.filter((product) => product.category === activeFilter);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(''), 2000);
  }

  function addToBag() {
    setBagCount((count) => count + 1);
    showToast('Added to your bag');
  }

  function subscribe(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setEmail('');
    showToast('Thanks for subscribing!');
  }

  return (
    <>
      <div className="notice">Complimentary shipping on orders over ₹1,499</div>
      <header>
        <a className="brand" href="#top" aria-label="Zivara Jewels home">
          <img src={asset('business-logo.jpg')} alt="Zivara Jewels logo" />
          <span>ZIVARA JEWELS</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#products">Collections</a>
          <a href="#products">New arrivals</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="bag" type="button">Bag ({bagCount})</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-layout">
            <div className="hero-copy">
              <span className="eyebrow">Made for your moments</span>
              <h1>Jewels that make you the occasion.</h1>
              <p>Thoughtfully designed adornments for celebrations, big entrances, and everything beautiful in between.</p>
              <a className="button" href="#products">Shop new arrivals</a>
            </div>
            <aside className="payment-card" aria-label="Online payment details">
              <img src={asset('payment-qr-code.jpg')} alt="Zivara Jewels UPI payment QR code" />
              <div className="payment-copy">
                <span className="eyebrow">Order & pay online</span>
                <h2>Pay securely with UPI</h2>
                <p>We accept online payments for every order. Scan the QR code to pay with any UPI app.</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="products" id="products">
          <div className="inner">
            <span className="eyebrow">Zivara collection</span>
            <h2>Our jewellery collection</h2>
            <div className="filters" aria-label="Filter products">
              {filters.map(([value, label]) => (
                <button
                  className={activeFilter === value ? 'filter active' : 'filter'}
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="product-list">
              {visibleProducts.map((product) => (
                <article className="product" key={product.name}>
                  <div className="product-image"><img src={product.image} alt={product.name} /></div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <span>{product.price}</span>
                      <button className="add" type="button" onClick={addToBag}>Add to bag</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="signup" id="contact">
          <span className="eyebrow">Stay in the glow</span>
          <h2>New jewels, little offers and lovely things.</h2>
          <p>Join the Zivara list.</p>
          <form onSubmit={subscribe}>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Your email address" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        </section>
        <img className="campaign" src={asset('about-us.jpg')} alt="Zivara Jewels campaign" />
      </main>

      <footer>© 2026 Zivara Jewels. Sparkle, shine, be you.</footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
