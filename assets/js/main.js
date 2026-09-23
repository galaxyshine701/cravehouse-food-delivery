const menuGrid = document.querySelector('#menu-grid');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const cartDrawer = document.querySelector('#cart-drawer');
const cartItems = document.querySelector('#cart-items');
const cartBadge = document.querySelector('.cart-badge');
const cartTitleCount = document.querySelector('.cart-title-count');
const cartTotal = document.querySelector('#cart-total');
const checkoutButton = document.querySelector('#checkout-button');
const checkoutPanel = document.querySelector('#checkout-panel');
const checkoutForm = document.querySelector('#checkout-form');
const orderSuccess = document.querySelector('#order-success');
const toast = document.querySelector('#toast');
const siteNav = document.querySelector('#site-nav');
const menuToggle = document.querySelector('.menu-toggle');

const cart = new Map();
let activeFilter = 'All';
let toastTimer;
let cartOpener;
const backgroundElements = [...document.body.children].filter((element) => element !== cartDrawer && element !== toast);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const formatPrice = (value) => `$${value.toFixed(2)}`;
const getCartQuantity = () => [...cart.values()].reduce((total, item) => total + item.quantity, 0);
const getCartTotal = () => [...cart.values()].reduce((total, item) => total + item.price * item.quantity, 0);

function renderMenu(filter = activeFilter) {
  const items = filter === 'All' ? menuItems : menuItems.filter((item) => item.category === filter);
  menuGrid.innerHTML = items.map((item) => `
    <article class="food-card" data-category="${item.category}">
      <div class="food-image-wrap">
        <img src="${item.image}" alt="${item.alt}" width="640" height="442" loading="lazy">
        ${item.deal ? '<span class="deal-label">Best value</span>' : ''}
      </div>
      <div class="food-card-body">
        <span class="food-category">${item.category}</span>
        ${item.category === 'Drinks' ? '<svg class="drink-bubbles" viewBox="0 0 52 24" aria-hidden="true" focusable="false"><circle cx="9" cy="15" r="4"/><circle cx="26" cy="9" r="3"/><circle cx="43" cy="15" r="5"/></svg>' : ''}
        <h3>${item.name}</h3>
        <p class="food-description">${item.description}</p>
        <div class="food-card-bottom">
          <span class="price">${formatPrice(item.price)}</span>
          <button class="add-button" type="button" data-add-item="${item.id}">Add to cart <span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>
  `).join('');
}

function updateFilter(nextFilter) {
  activeFilter = nextFilter;
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  renderMenu();
}

function updateCartUi() {
  const quantity = getCartQuantity();
  cartBadge.textContent = quantity;
  cartTitleCount.textContent = `(${quantity})`;
  cartTotal.textContent = formatPrice(getCartTotal());
  checkoutButton.disabled = cart.size === 0;
  checkoutButton.setAttribute('aria-disabled', String(cart.size === 0));

  if (cart.size === 0) {
    cartItems.innerHTML = '<div class="empty-cart"><strong>Your cart is waiting.</strong><span>Add something delicious to get started.</span></div>';
    return;
  }

  cartItems.innerHTML = [...cart.values()].map((item) => `
    <div class="cart-line" data-cart-item="${item.id}">
      <img class="cart-line-image" src="${item.image}" alt="${item.alt}" width="68" height="68">
      <div>
        <h3>${item.name}</h3>
        <span class="cart-line-price">${formatPrice(item.price)}</span>
        <div class="quantity-controls" aria-label="Quantity for ${item.name}">
          <button type="button" data-decrease-item="${item.id}" aria-label="Decrease ${item.name} quantity">−</button>
          <output>${item.quantity}</output>
          <button type="button" data-increase-item="${item.id}" aria-label="Increase ${item.name} quantity">+</button>
        </div>
      </div>
      <span class="cart-line-subtotal">${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');
}

function announce(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function addToCart(id) {
  const product = menuItems.find((item) => item.id === id);
  if (!product) return;
  const current = cart.get(id);
  cart.set(id, { ...product, quantity: current ? current.quantity + 1 : 1 });
  updateCartUi();
  announce(`${product.name} added to your cart`);
}

function changeQuantity(id, amount) {
  const item = cart.get(id);
  if (!item) return;
  const focusedControl = document.activeElement;
  const action = focusedControl?.hasAttribute('data-increase-item') ? 'data-increase-item' : 'data-decrease-item';
  const nextQuantity = item.quantity + amount;
  if (nextQuantity <= 0) cart.delete(id);
  else cart.set(id, { ...item, quantity: nextQuantity });
  updateCartUi();
  if (cartItems.contains(focusedControl) || focusedControl?.hasAttribute(action)) {
    const replacement = [...cartItems.querySelectorAll(`[${action}]`)].find((button) => button.getAttribute(action) === id);
    (replacement || cartItems.querySelector('button') || document.querySelector('.drawer-panel .icon-button')).focus();
  }
}

function openCart() {
  cartOpener = document.activeElement;
  cartDrawer.inert = false;
  cartDrawer.classList.add('is-open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
  document.querySelector('.cart-trigger').setAttribute('aria-expanded', 'true');
  backgroundElements.forEach((element) => { element.inert = true; });
  document.querySelector('.drawer-panel .icon-button').focus();
}

function closeCart() {
  backgroundElements.forEach((element) => { element.inert = false; });
  if (cartOpener?.isConnected) cartOpener.focus();
  cartDrawer.inert = true;
  cartDrawer.classList.remove('is-open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
  document.querySelector('.cart-trigger').setAttribute('aria-expanded', 'false');
  orderSuccess.hidden = true;
  showCartView();
}

function showCheckout() {
  if (!cart.size) {
    announce('Add an item before checking out');
    return;
  }
  checkoutButton.closest('.cart-footer').hidden = true;
  cartItems.hidden = true;
  checkoutPanel.hidden = false;
  checkoutPanel.querySelector('input').focus();
}

function showCartView() {
  checkoutButton.closest('.cart-footer').hidden = false;
  cartItems.hidden = false;
  checkoutPanel.hidden = true;
}

function setFieldError(field, message) {
  const error = field.parentElement.querySelector('.field-error');
  error.id = `${field.id}-error`;
  field.setAttribute('aria-describedby', error.id);
  field.setAttribute('aria-invalid', String(Boolean(message)));
  field.classList.toggle('invalid', Boolean(message));
  error.textContent = message;
}

function placeOrder(event) {
  event.preventDefault();
  const checkoutMessage = document.querySelector('#checkout-message');
  checkoutMessage.textContent = '';
  if (!cart.size) {
    checkoutMessage.textContent = 'Add an item before placing an order.';
    return;
  }
  const requiredFields = [...checkoutForm.querySelectorAll('input[required], textarea[required]')];
  let isValid = true;
  requiredFields.forEach((field) => {
    const message = field.value.trim() ? '' : 'This field is required.';
    setFieldError(field, message);
    if (message) isValid = false;
  });

  const phone = checkoutForm.elements.phone;
  if (phone.value.trim() && (!/^[0-9()+\-\s]+$/.test(phone.value.trim()) || phone.value.replace(/\D/g, '').length < 7)) {
    setFieldError(phone, 'Enter a valid phone number.');
    isValid = false;
  }
  if (!checkoutForm.elements.payment.value) {
    checkoutMessage.textContent = 'Choose a payment method.';
    isValid = false;
  }
  if (!isValid) {
    document.querySelector('.field-error:not(:empty)')?.previousElementSibling?.focus();
    return;
  }

  const orderId = `CH-${Date.now().toString(36).toUpperCase().slice(-7)}`;
  document.querySelector('#order-id').textContent = orderId;
  checkoutForm.reset();
  checkoutPanel.hidden = true;
  orderSuccess.hidden = false;
  orderSuccess.querySelector('button').focus();
  checkoutButton.closest('.cart-footer').hidden = true;
  cart.clear();
  updateCartUi();
}

filterButtons.forEach((button) => button.addEventListener('click', () => updateFilter(button.dataset.filter)));
menuGrid.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add-item]');
  if (!addButton) return;
  addToCart(addButton.dataset.addItem);
  addButton.classList.add('added');
  addButton.innerHTML = 'Added <span aria-hidden="true">&#10003;</span>';
  setTimeout(() => { if (addButton.isConnected) { addButton.classList.remove('added'); addButton.innerHTML = 'Add to cart <span aria-hidden="true">+</span>'; } }, 1200);
});
cartItems.addEventListener('click', (event) => {
  const increase = event.target.closest('[data-increase-item]');
  const decrease = event.target.closest('[data-decrease-item]');
  if (increase) changeQuantity(increase.dataset.increaseItem, 1);
  if (decrease) changeQuantity(decrease.dataset.decreaseItem, -1);
});
document.querySelectorAll('.cart-trigger').forEach((button) => button.addEventListener('click', openCart));
document.querySelectorAll('[data-close-cart]').forEach((button) => button.addEventListener('click', () => {
  closeCart();
}));
checkoutButton.addEventListener('click', showCheckout);
document.querySelector('[data-back-cart]').addEventListener('click', () => {
  showCartView();
  checkoutButton.focus();
});
checkoutForm.addEventListener('submit', placeOrder);
document.querySelector('[data-jump-filter]').addEventListener('click', (event) => {
  updateFilter(event.currentTarget.dataset.jumpFilter);
  document.querySelector('#menu').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
});
menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Close navigation' : 'Open navigation';
});
siteNav.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.sr-only').textContent = 'Open navigation';
  }
});
document.addEventListener('keydown', (event) => {
  if (cartDrawer.classList.contains('is-open')) {
    if (event.key === 'Escape') closeCart();
    if (event.key === 'Tab') {
      const controls = [...cartDrawer.querySelectorAll('button, input, textarea, select, a[href], [tabindex="0"]')]
        .filter((element) => !element.disabled && element.getClientRects().length);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  } else if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.sr-only').textContent = 'Open navigation';
    menuToggle.focus();
  }
});

const heroVideo = document.querySelector('.hero video');
const videoToggle = document.querySelector('.hero-video-toggle');
let videoPausedByUser = false;
function updateVideoToggle() {
  videoToggle.hidden = reducedMotion.matches || heroVideo.closest('.hero-media').classList.contains('is-fallback');
  videoToggle.setAttribute('aria-label', heroVideo.paused ? 'Play hero video' : 'Pause hero video');
  videoToggle.querySelector('path').setAttribute('d', heroVideo.paused ? 'M5 3l10 6-10 6z' : 'M4 3h3v12H4zM11 3h3v12h-3z');
}
videoToggle.addEventListener('click', () => {
  videoPausedByUser = !heroVideo.paused;
  if (videoPausedByUser) heroVideo.pause();
  else heroVideo.play().catch(() => {});
  updateVideoToggle();
});
function showVideoFallback() {
  heroVideo.closest('.hero-media').classList.add('is-fallback');
  updateVideoToggle();
}
// Source errors do not bubble; capture them as well as errors on the video.
heroVideo.addEventListener('error', showVideoFallback, true);
if (heroVideo.error || heroVideo.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) showVideoFallback();
heroVideo.addEventListener('play', () => {
  if (reducedMotion.matches || videoPausedByUser) heroVideo.pause();
  updateVideoToggle();
});
heroVideo.addEventListener('pause', updateVideoToggle);
function syncVideoMotion() {
  if (reducedMotion.matches || videoPausedByUser) heroVideo.pause();
  else heroVideo.play().catch(() => {});
  updateVideoToggle();
}
reducedMotion.addEventListener('change', syncVideoMotion);
syncVideoMotion();
cartDrawer.inert = true;

renderMenu();
updateCartUi();
