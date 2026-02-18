/* ============================================================
   RideSur — main.js
   Navigation · Animations · Profile · Admin · Avatars
   ============================================================ */

// ── Page Registry ─────────────────────────────────────────────
var PAGES = {
  home:          'home-page',
  features:      'features-page',
  pricing:       'pricing-page',
  safety:        'safety-page',
  'user-login':  'user-login-page',
  'driver-login':'driver-login-page',
  profile:       'profile-page',
  'admin-login': 'admin-login-page',
  admin:         'admin-page'
};

var BOTTOM_NAV = {
  home:         'nav-home',
  features:     'nav-features',
  pricing:      'nav-pricing',
  profile:      'nav-profile',
  'user-login': 'nav-ride'
};

// ── Avatar Library ─────────────────────────────────────────────
var AVATARS = [
  { id: 'a1', emoji: '🧑', label: 'Person' },
  { id: 'a2', emoji: '👩', label: 'Woman' },
  { id: 'a3', emoji: '👨', label: 'Man' },
  { id: 'a4', emoji: '🧕', label: 'Hijab' },
  { id: 'a5', emoji: '👩‍💼', label: 'Pro woman' },
  { id: 'a6', emoji: '👨‍💼', label: 'Pro man' },
  { id: 'a7', emoji: '🧑‍🎓', label: 'Student' },
  { id: 'a8', emoji: '🧑‍💻', label: 'Tech' },
];

var selectedAvatarId = 'a1';

// ── Navigation ────────────────────────────────────────────────

function showPage(page) {
  // Hide all pages
  Object.values(PAGES).forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  // Show target
  var targetId = PAGES[page] || PAGES.home;
  var target = document.getElementById(targetId);
  if (target) {
    target.classList.remove('hidden');
  }

  // Update bottom nav active states
  Object.keys(BOTTOM_NAV).forEach(function(p) {
    var btn = document.getElementById(BOTTOM_NAV[p]);
    if (btn) btn.classList.toggle('active', p === page);
  });

  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Trigger reveal animations on newly visible page
  setTimeout(initRevealObserver, 50);
}

function toggleMobileMenu() {
  document.getElementById('menu-overlay').classList.toggle('hidden');
  document.getElementById('side-menu').classList.toggle('hidden');
}

function closeMobileMenu() {
  document.getElementById('menu-overlay').classList.add('hidden');
  document.getElementById('side-menu').classList.add('hidden');
}

// ── Admin Tabs ────────────────────────────────────────────────

function showAdminTab(tab) {
  var tabs = ['overview', 'drivers', 'riders', 'trips', 'revenue'];
  tabs.forEach(function(t) {
    var panel = document.getElementById('admin-' + t);
    var btn   = document.getElementById('atab-' + t);
    if (panel) panel.classList.toggle('hidden', t !== tab);
    if (btn)   btn.classList.toggle('active',  t === tab);
  });
}

// ── Form Handlers ─────────────────────────────────────────────

function handleUserForm(e) {
  e.preventDefault();
  alert('Thanks! Download the RideSur app to complete your first booking.');
  showPage('home');
}

function handleDriverForm(e) {
  e.preventDefault();
  alert("Application received! We'll review it and reach out within 24 hours.");
  showPage('home');
}

function handleAdminForm(e) {
  e.preventDefault();
  showPage('admin');
  showAdminTab('overview');
}

function handleProfileForm(e) {
  e.preventDefault();
  var name = document.getElementById('profile-name-input').value.trim();
  if (name) {
    document.getElementById('profile-name-display').textContent = name;
  }
  // Visual feedback
  var btn = e.target.querySelector('button[type=submit]');
  if (btn) {
    var orig = btn.textContent;
    btn.textContent = '✓ Saved!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(function() {
      btn.textContent = orig;
      btn.style.background = '';
    }, 2000);
  }
}

// ── Avatar System ─────────────────────────────────────────────

function buildAvatarGrid() {
  var grid = document.getElementById('avatar-grid');
  if (!grid) return;
  grid.innerHTML = '';
  AVATARS.forEach(function(av) {
    var btn = document.createElement('button');
    btn.className = 'avatar-option' + (av.id === selectedAvatarId ? ' selected' : '');
    btn.setAttribute('data-id', av.id);
    btn.setAttribute('title', av.label);
    btn.textContent = av.emoji;
    btn.onclick = function() { selectAvatar(av.id, av.emoji); };
    grid.appendChild(btn);
  });
}

function selectAvatar(id, emoji) {
  selectedAvatarId = id;
  // Update display
  var display = document.getElementById('profile-avatar-emoji');
  if (display) display.textContent = emoji;
  // Update selected state in grid
  var options = document.querySelectorAll('.avatar-option');
  options.forEach(function(opt) {
    opt.classList.toggle('selected', opt.getAttribute('data-id') === id);
  });
  // Close modal after short delay
  setTimeout(closeAvatarModal, 350);
}

function openAvatarModal() {
  buildAvatarGrid();
  document.getElementById('avatar-modal').classList.remove('hidden');
}

function closeAvatarModal(event) {
  if (!event || event.target === document.getElementById('avatar-modal')) {
    document.getElementById('avatar-modal').classList.add('hidden');
  }
}

// ── Scroll Reveal (IntersectionObserver) ──────────────────────

var _revealObserver = null;

function initRevealObserver() {
  // Disconnect old observer if any
  if (_revealObserver) _revealObserver.disconnect();

  var targets = document.querySelectorAll('.reveal:not(.visible)');
  if (!targets.length) return;

  _revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        _revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function(el) { _revealObserver.observe(el); });
}

// ── Config / SDK (Anthropic Element SDK support) ──────────────

var defaultConfig = {
  app_name:           'RideSur',
  hero_title:         'Paramaribo\nMoves With You.',
  hero_subtitle:      'Book a verified ride in 90 seconds. No haggling, no surprises — just safe, fast transport built for this city.',
  user_button_text:   'Book Your First Ride →',
  driver_button_text: 'Earn as a Driver'
};

function onConfigChange(config) {
  var c = Object.assign({}, defaultConfig, config);
  var heroTitle    = document.getElementById('hero-title');
  var heroSubtitle = document.getElementById('hero-subtitle');
  var userBtn      = document.getElementById('user-btn');
  var driverBtn    = document.getElementById('driver-btn');
  if (heroTitle)    heroTitle.textContent    = c.hero_title;
  if (heroSubtitle) heroSubtitle.textContent = c.hero_subtitle;
  if (userBtn)      userBtn.textContent      = c.user_button_text;
  if (driverBtn)    driverBtn.textContent    = c.driver_button_text;
}

function mapToCapabilities() {
  return { recolorables: [], borderables: [] };
}

function mapToEditPanelValues(config) {
  var c = Object.assign({}, defaultConfig, config);
  return new Map([
    ['app_name',           c.app_name],
    ['hero_title',         c.hero_title],
    ['hero_subtitle',      c.hero_subtitle],
    ['user_button_text',   c.user_button_text],
    ['driver_button_text', c.driver_button_text]
  ]);
}

// ── Init ──────────────────────────────────────────────────────

function init() {
  // Forms
  var uf = document.getElementById('user-form');
  var df = document.getElementById('driver-form');
  var af = document.getElementById('admin-form');
  var pf = document.getElementById('profile-form');
  if (uf) uf.addEventListener('submit', handleUserForm);
  if (df) df.addEventListener('submit', handleDriverForm);
  if (af) af.addEventListener('submit', handleAdminForm);
  if (pf) pf.addEventListener('submit', handleProfileForm);

  // SDK
  if (window.elementSdk) {
    window.elementSdk.init({ defaultConfig: defaultConfig, onConfigChange: onConfigChange, mapToCapabilities: mapToCapabilities, mapToEditPanelValues: mapToEditPanelValues });
  } else {
    onConfigChange(defaultConfig);
  }

  // Start on home
  showPage('home');

  // Kick off scroll reveals after first paint
  requestAnimationFrame(function() {
    setTimeout(initRevealObserver, 100);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}