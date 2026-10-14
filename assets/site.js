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
  // Optional browser-agent tools read public profile and contact data.
  const registry = document.modelContext || navigator.modelContext;
  if (!window.__SITE_PREVIEW__ && typeof registry?.registerTool === 'function') {
    const lifecycle = new AbortController();
    window.addEventListener('pagehide', () => lifecycle.abort(), {once: true});
    const guide = document.querySelector('link[rel=describedby][type="text/markdown"]');
    const dataURL = guide ? new URL(guide.getAttribute('href').replace(/\.md$/, '.json'), document.baseURI) : null;
    const validate = (input, topic = false) => {
      if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Arguments must be an object');
      if (Object.keys(input).some(key => topic ? key !== 'topic' : true)) throw new Error('Unknown argument');
      if (topic && (typeof input.topic !== 'string' || !input.topic.trim() || input.topic.length > 300)) throw new Error('topic must contain 1–300 characters');
    };
    const read = async signal => {
      if (!dataURL) throw new Error('Profile resource unavailable');
      const response = await fetch(dataURL, {signal});
      if (!response.ok) throw new Error('Profile resource unavailable');
      return response.json();
    };
    const definitions = [
      {name: 'read_tianxing_contact', description: 'Read public email text, contact-page URL and GitHub profiles.',
        inputSchema: {type: 'object', properties: {}, additionalProperties: false},
        async execute(input, options = {}) { validate(input); const data = await read(options.signal); return {contact: data.profile.contact, source: data.profile.contact.url}; }},
      {name: 'read_tianxing_profile', description: 'Read Tianxing Ren’s public AI compiler research goals and background in the current page language.',
        inputSchema: {type: 'object', properties: {}, additionalProperties: false},
        async execute(input, options = {}) { validate(input); const data = await read(options.signal); return {profile: data.profile, source: data.profile.url}; }},
      {name: 'read_tianxing_projects', description: 'Read documented leading and contributing projects, with source links and evaluation scope.',
        inputSchema: {type: 'object', properties: {}, additionalProperties: false},
        async execute(input, options = {}) { validate(input); const data = await read(options.signal); return {leading_projects: data.leading_projects, participation: data.participation, source: data.url}; }},
      {name: 'match_tianxing_work', description: 'Find documented AI compiler work related to a short topic, with source links.',
        inputSchema: {type: 'object', properties: {topic: {type: 'string', minLength: 1, maxLength: 300}}, required: ['topic'], additionalProperties: false},
        async execute(input, options = {}) {
          validate(input, true);
          const language = {en: 'en', 'zh-Hans': 'zh', ko: 'ko', ms: 'ms'}[document.documentElement.lang] || 'en';
          const data = await read(options.signal);
          const topic = input.topic.trim().toLowerCase();
          const terms = [...new Set(topic.split(/[\s,，、/]+/).filter(Boolean))];
          if (/tpu|sophgo|bm1690|sg2260|算能/.test(topic)) terms.push('tpu');
          if (/risc|ame|matrix|矩阵/.test(topic)) terms.push('risc-v');
          const matches = data.leading_projects.map(project => ({project, score: terms.reduce((n, term) => n + (JSON.stringify(project).toLowerCase().includes(term) ? 1 : 0), 0)})).filter(item => item.score > 0).sort((a, b) => b.score - a.score).map(item => item.project);
          return {topic: input.topic, language, matches, source: data.url, profile: data.profile};
        }}
    ];
    for (const tool of definitions) {
      tool.annotations = {readOnlyHint: true, untrustedContentHint: false, consequentialHint: false};
      try { Promise.resolve(registry.registerTool(tool, {signal: lifecycle.signal})).catch(() => {}); }
      catch { /* Native registration is optional; ordinary reading stays available. */ }
    }
  }
})();
