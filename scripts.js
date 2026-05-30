// scripts.js - ürünleri yükler, ana sayfada listeler ve sepete ekler
async function loadProducts() {
  try {
    const res = await fetch('products.json');
    const products = await res.json();
    window._products = products;
    renderProductGrid(products);
  } catch (e) {
    console.error('products.json yüklenemedi', e);
  }
}

function renderProductGrid(products) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = products.map(p => `
    <article class="product-card">
      <a href="product.html?id=${p.id}">
        <img loading="lazy" src="${p.image}" alt="${p.title}" />
      </a>
      <div class="product-info">
        <h4><a href="product.html?id=${p.id}">${p.title}</a></h4>
        <p>${p.short}</p>
        <span style="color:var(--muted);font-size:0.95rem">${p.material} • ${p.size}</span>
        <div style="display:flex;gap:0.6rem;margin-top:0.7rem">
          <button class="add-cart-btn" data-id="${p.id}">Sepete Ekle</button>
          <button class="contact-button" data-product="${p.title}">Teklif Al</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.add-cart-btn').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.id;
    addToCartById(id, 1);
  }));

  document.querySelectorAll('.contact-button').forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      const form = document.getElementById('contactForm');
      if (!form) return;
      const messageField = form.querySelector("textarea[name='message']");
      messageField.value = `${productName} için teklif almak istiyorum.`;
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      messageField.focus();
    });
  });
}

function addToCartById(id, qty = 1) {
  const products = window._products || [];
  const p = products.find(x => x.id === id);
  if (!p) {
    alert('Ürün bulunamadı.');
    return;
  }
  const cart = JSON.parse(localStorage.getItem('mp_cart') || '[]');
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += qty; else cart.push({ id: p.id, title: p.title, price: p.price, image: p.image, qty });
  localStorage.setItem('mp_cart', JSON.stringify(cart));
  alert('Sepete eklendi: ' + p.title);
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  const form = document.getElementById('contactForm');
  if (form) {
    const msg = document.getElementById('formMessage');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (msg) { msg.textContent = 'Teşekkürler! Talebiniz alındı, en kısa sürede dönüş yapacağız.'; msg.style.color = '#3a5b2a'; }
      form.reset();
    });
  }
});
