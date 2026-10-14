/* Progressive enhancement. Public content and language links need no JavaScript. */
(() => {
  'use strict';
  const html = document.documentElement;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let preferredMotion;
  try { preferredMotion = sessionStorage.getItem('site-motion'); } catch { /* optional */ }
  let moving = preferredMotion ? preferredMotion === 'on' : !motionQuery.matches;
  function updateMotion() {
    html.classList.add('motion-ready');
    html.dataset.motion = moving ? 'on' : 'off';
    html.classList.toggle('document-hidden', document.hidden);
    document.querySelectorAll('[data-motion-toggle]').forEach(button => {
      button.textContent = moving ? button.dataset.pause : button.dataset.resume;
      button.setAttribute('aria-pressed', String(!moving));
    });
  }
  motionQuery.addEventListener('change', event => {
    moving = !event.matches; preferredMotion = null; updateMotion();
  });
  document.addEventListener('visibilitychange', updateMotion);
  window.addEventListener('site:render', updateMotion);
  updateMotion();
  let toastTimer;
  function toast(text) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = text; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 3500);
  }
  function reveal(card, address) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) throw new Error('Invalid address');
    card.querySelector('.email-output').textContent = address;
    card.querySelector('[data-reveal-email]').hidden = true;
    const mail = card.querySelector('[data-mail-link]');
    mail.href = 'mailto:' + address; mail.hidden = false;
    const copy = card.querySelector('[data-copy-email]');
    copy.dataset.value = address; copy.hidden = false;
    card.querySelector('.verification-slot').hidden = true;
    card.querySelector('.contact-feedback').textContent = '';
  }
  let turnstileLoading;
  function loadTurnstile() {
    if (window.turnstile) return Promise.resolve(window.turnstile);
    if (!turnstileLoading) turnstileLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('Unavailable'));
      script.onerror = () => { turnstileLoading = null; script.remove(); reject(new Error('Unavailable')); };
      document.head.append(script);
    });
    return turnstileLoading;
  }
  async function protectedReveal(card, button) {
    if (!card.dataset.sitekey) throw new Error('Verification not configured');
    const feedback = card.querySelector('.contact-feedback');
    feedback.textContent = card.dataset.verify;
    const ts = await loadTurnstile();
    // A previous failed widget is removed before allowing an explicit retry.
    if (card.dataset.widgetId) ts.remove(card.dataset.widgetId);
    card.dataset.widgetId = ts.render(card.querySelector('.verification-slot'), {
      sitekey: card.dataset.sitekey, action: 'contact-reveal', theme: 'light',
      callback: async token => {
        try {
          const response = await fetch(card.dataset.endpoint, {
            method: 'POST', credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'}, body: JSON.stringify({token})
          });
          if (!response.ok) throw new Error('Verification failed');
          const data = await response.json(); reveal(card, data.email);
        } catch {
          feedback.textContent = card.dataset.error; button.disabled = false;
          ts.reset(card.dataset.widgetId);
        }
      },
      'error-callback': () => { feedback.textContent = card.dataset.error; button.disabled = false; },
      'expired-callback': () => { feedback.textContent = card.dataset.verify; button.disabled = false; }
    });
  }
  document.addEventListener('click', async event => {
    if (!(event.target instanceof Element)) return;
    const motion = event.target.closest('[data-motion-toggle]');
    if (motion) {
      moving = !moving; preferredMotion = moving ? 'on' : 'off';
      try { sessionStorage.setItem('site-motion', preferredMotion); } catch { /* optional */ }
      updateMotion();
    }
    const revealButton = event.target.closest('[data-reveal-email]');
    if (revealButton) {
      const card = revealButton.closest('[data-contact-widget]');
      revealButton.disabled = true;
      try {
        if (card.dataset.contactMode === 'protected') await protectedReveal(card, revealButton);
        else {
          const address = card.dataset.address.split('.').map(n => String.fromCharCode(Number(n) ^ 93)).join('');
          reveal(card, address);
        }
      } catch {
        card.querySelector('.contact-feedback').textContent = card.dataset.error;
        revealButton.disabled = false;
      }
    }
    const copyButton = event.target.closest('[data-copy-email]');
    if (copyButton) {
      const card = copyButton.closest('[data-contact-widget]');
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(copyButton.dataset.value); toast(card.dataset.success);
      } catch {
        const output = card.querySelector('.email-output');
        const range = document.createRange(); range.selectNodeContents(output);
        const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        // Selection is a fallback, not a successful clipboard operation.
        card.querySelector('.contact-feedback').textContent = card.dataset.copyFallback;
      }
    }
    document.querySelectorAll('details.language[open], details.mobile-menu[open]').forEach(el => {
      if (!el.contains(event.target)) el.open = false;
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.querySelectorAll('details.language[open], details.mobile-menu[open]').forEach(el => {
      el.open = false; el.querySelector('summary')?.focus();
    });
  });
  // Send one small anonymous page event. Rendering never depends on the backend.
  const endpoint = document.body.dataset.statistics;
  if (endpoint && document.body.dataset.page !== '404' && !window.__SITE_PREVIEW__) {
    let referrer = '';
    try { referrer = new URL(document.referrer).origin; } catch { /* direct visit */ }
    const payload = JSON.stringify({path: location.pathname, language: document.body.dataset.language, referrer});
    fetch(endpoint, {method: 'POST', mode: 'cors', credentials: 'omit', keepalive: true,
      headers: {'Content-Type': 'text/plain;charset=UTF-8'}, body: payload}).catch(() => {});
  }
})();
