/* Fine Lines client review layer for the full-site mockup.
   Every section Michelle hasn't approved yet gets a "Change this text" button. It opens a pop-up where she
   types the text she'd like there instead. Notes save in this browser as she types (one store for all pages),
   and "My notes" (bottom right) lists the pages to check and sends every note to Dyllan on WhatsApp or email.
   Sections she already approved on the landing page get no button.
   Load after mockup.js and js/main.js. To turn review mode off, remove this file's <script> tags. */
(function () {
  'use strict';

  var SEND_TO = { name: 'Dyllan', whatsapp: '27817290632', email: 'dyllan.awsolutions@gmail.com' };
  var CLIENT = 'Michelle';
  var STORE_KEY = 'fl-review-v1';
  var WA_MAX = 4000;   // longest pre-filled WhatsApp text (URL-encoded) before switching to copy and paste
  var MAIL_MAX = 1800; // the same for email, where some mail apps cut long links short

  if (typeof TREATMENTS === 'undefined' || typeof HTMLDialogElement !== 'function') return;

  var ICON_EDIT = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
  var ICON_DONE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function find(list, test) {
    for (var i = 0; i < list.length; i++) if (test(list[i])) return list[i];
    return null;
  }
  function h(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- pages ---------- */
  var PAGES = [{ key: 'home', title: 'Home page', href: 'index.html' }]
    .concat(TREATMENTS.map(function (t) {
      return { key: 't-' + t.slug, title: t.name + ' page', href: 'treatment.html?t=' + t.slug };
    }))
    .concat([{ key: 'shop', title: 'Shop Homecare page', href: 'shop.html' }]);

  var type = document.body.getAttribute('data-page');
  var treatment = null;
  if (type === 'treatment') {
    var slug = new URLSearchParams(location.search).get('t') || 'microneedling';
    treatment = find(TREATMENTS, function (t) { return t.slug === slug; }) || TREATMENTS[0];
  }
  var pageKey = treatment ? 't-' + treatment.slug : type;
  var page = find(PAGES, function (p) { return p.key === pageKey; });
  if (!page) return;

  /* ---------- sections that still need Michelle's OK ---------- */
  var HOURS = 'Please add your opening hours here. They show as TBC for now.';
  var sections = [];

  function sectionOf(sel) {
    var el = document.querySelector(sel);
    return el ? el.closest('section') || el : null;
  }

  function add(key, label, el, opts) {
    if (!el) return;
    opts = opts || {};
    var mount = opts.mount || el.querySelector(':scope > .wrap') || el;
    sections.push({
      key: key,
      label: label,
      el: el,
      mount: mount,
      before: opts.before || mount.firstChild,
      center: !!mount.querySelector(':scope > .section-head.center, :scope > .shop-head'),
      hint: opts.hint || '',
      scope: opts.scope || pageKey
    });
  }

  if (type === 'home') {
    document.querySelectorAll('#svc-list .svc-card').forEach(function (card, i) {
      var t = TREATMENTS[i];
      if (t) add('card-' + t.slug, 'Treatment card: ' + t.name, card, {
        mount: card.querySelector('.svc-content'),
        hint: t.tbc ? 'Should Facial Wax & Tint be on the website as a full treatment with its own page? A yes or no is all I need.' : ''
      });
    });
    add('homecare', 'Homecare products', sectionOf('#featured'), {
      hint: 'The products here are examples until I have your list. Your picks go on the Shop Homecare page.'
    });
    add('salon-photos', 'Inside the salon', sectionOf('.home-gallery'), {
      hint: 'These 4 spots are for photos of the salon. Tell me which photos you want here, or if you would rather leave this section out.'
    });
    var newFaq = find(document.querySelectorAll('.faq-item'), function (el) { return /buy Lamelle/i.test(el.textContent); });
    add('faq-lamelle', 'New question: Can I buy Lamelle products through you?', newFaq, { mount: newFaq });
    add('contact', 'Contact details', document.querySelector('.cta'), { hint: HOURS });
  }

  if (treatment) {
    var hero = document.querySelector('.page-hero');
    var crumbs = hero && hero.querySelector('.crumbs');
    add('top', 'Top of the page', hero, {
      before: crumbs && crumbs.nextSibling,
      hint: 'Please also add how long the treatment takes, the downtime and the starting price. They show as TBC for now.' +
        (treatment.tbc ? ' And should Facial Wax & Tint be a full page on the website? A yes or no is all I need.' : '')
    });
    add('how', 'How it works & Good for', sectionOf('.split'));
    add('benefits', 'Benefits', sectionOf('.ben-grid'));
    add('day', 'What happens on the day', sectionOf('.steps'));
    add('photos', 'Photos', sectionOf('.gallery'), {
      hint: treatment.gallery ? '' : 'These spots are for photos of this treatment. Tell me which ones you want here.'
    });
    add('aftercare', 'Aftercare', sectionOf('.after'), {
      hint: 'Please check these points against your own aftercare sheet.' +
        (document.querySelector('.after .prod') ? ' The products next to them are examples until I have your list.' : '')
    });
    add('faq', 'Questions (FAQ)', sectionOf('.faq-list'), { hint: 'Want to add a question? Type the question and your answer.' });
    add('other', 'Other treatments', sectionOf('.other'), { hint: 'The short line under each treatment name is new too.' });
    add('booking', 'Booking section', document.querySelector('.cta'), { hint: HOURS });
  }

  if (type === 'shop') {
    var shopHero = document.querySelector('.page-hero');
    var shopCrumbs = shopHero && shopHero.querySelector('.crumbs');
    add('top', 'Top of the page', shopHero, { before: shopCrumbs && shopCrumbs.nextSibling });
    add('how', 'How ordering works', sectionOf('.how'));
    add('products', 'Products', document.getElementById('products'), {
      hint: 'These 12 products are examples. I need your 10 to 15 Lamelle picks, with the Skin Confidence link for each one. Add them here or send them to me on WhatsApp.'
    });
    add('no-pressure', '"You don\'t have to use Lamelle" section', sectionOf('.phil'));
    add('help', '"Not sure where to start?" section', document.querySelector('.cta'), { hint: HOURS });
  }

  add('footer', 'Menu & footer', document.querySelector('.site-footer'), {
    scope: 'site',
    hint: 'The menu at the top and the footer are new, and they are the same on every page. Want any of the wording changed?'
  });

  /* ---------- storage: one store in this browser, shared by every page ---------- */
  var storageOK = (function () {
    try { localStorage.setItem(STORE_KEY + '-test', '1'); localStorage.removeItem(STORE_KEY + '-test'); return true; }
    catch (e) { return false; }
  })();
  var memory = {};

  function load() {
    var st = memory;
    if (storageOK) {
      try { st = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { st = {}; }
    }
    st.notes = st.notes || {};
    st.visited = st.visited || {};
    return st;
  }
  function save(st) {
    memory = st;
    if (storageOK) { try { localStorage.setItem(STORE_KEY, JSON.stringify(st)); } catch (e) {} }
  }
  function update(change) { var st = load(); change(st); save(st); return st; }

  function pageIndex(key) {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].key === key) return i;
    return PAGES.length; // "every page" notes go last
  }
  function sortedNotes(st) {
    return Object.keys(st.notes).map(function (id) { return st.notes[id]; })
      .filter(function (n) { return n && n.text && n.text.trim(); })
      .sort(function (a, b) { return pageIndex(a.page) - pageIndex(b.page) || a.order - b.order; });
  }
  function hrefFor(key) {
    var p = find(PAGES, function (x) { return x.key === key; });
    return p ? p.href : 'index.html';
  }

  /* ---------- reading a section's current text ---------- */
  function tidy(str) {
    return str.replace(/ /g, ' ').split('\n')
      .map(function (line) { return line.replace(/\s+/g, ' ').trim(); })
      .join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  function squash(str) { return String(str).replace(/\s+/g, ' ').trim().toLowerCase(); }
  function readSection(s) {
    s.el.classList.add('rv-reading'); // drops uppercase styling and decorations for the moment it takes to read
    var txt = s.el.innerText || s.el.textContent || '';
    s.el.classList.remove('rv-reading');
    return tidy(txt);
  }

  /* ---------- styles ---------- */
  var css = [
    '.mk-note,.mk-bar{display:none!important}',
    '.rv-target{scroll-margin-top:84px}',
    '.rv-pin{display:flex;margin:0 0 22px;position:relative;z-index:2}',
    '.rv-pin.rv-center{justify-content:center}',
    '.svc-content>.rv-pin{margin:0 0 2px}',
    '.faq-item>.rv-pin{margin:0 0 14px}',
    '.page-hero .rv-pin{margin:18px 0 -8px}',
    '.rv-btn,.rv-chip{display:inline-flex;align-items:center;gap:7px;font-family:"Jost",Helvetica,Arial,sans-serif;font-size:12.5px;font-weight:500;line-height:1.2;letter-spacing:.01em;text-transform:none;color:#5A4510;background:#FFF3C4;border:1.5px dashed #D9AE45;border-radius:20px;padding:7px 14px 7px 11px;white-space:nowrap}',
    '.rv-btn{cursor:pointer;box-shadow:0 8px 18px -12px rgba(90,69,16,.55);transition:background-color .15s,transform .15s}',
    '.rv-btn:hover{background:#FFEAA3;transform:translateY(-1px)}',
    '.rv-btn:focus-visible{outline:2px solid #5A4510;outline-offset:2px}',
    '.rv-btn.has-note{background:#E3EFDA;border:1.5px solid var(--sage);color:var(--forest-deep)}',
    '.rv-btn.has-note:hover{background:#D6E8CA}',
    '.rv-chip{padding:5px 11px 5px 9px;font-size:12px;vertical-align:middle}',
    '.rv-reading,.rv-reading *{text-transform:none!important}',
    '.rv-reading .rv-pin,.rv-reading .qmark,.rv-reading .ben .n,.rv-reading .crumbs,.rv-reading .ph-label,.rv-reading .ph small,.rv-reading .mk-note{display:none!important}',

    '.rv-fab{position:fixed;right:18px;bottom:18px;z-index:60;display:inline-flex;align-items:center;gap:9px;font-family:"Jost",Helvetica,Arial,sans-serif;font-size:13.5px;font-weight:500;line-height:1;color:var(--cream);background:var(--forest-deep);border:none;border-radius:26px;padding:11px 12px 11px 17px;cursor:pointer;box-shadow:0 16px 34px -14px rgba(0,0,0,.55)}',
    '.rv-fab:hover{background:#1f281c}',
    '.rv-fab:focus-visible{outline:2px solid var(--gold);outline-offset:3px}',
    '.rv-count{min-width:24px;height:24px;padding:0 7px;border-radius:12px;background:#F2C94C;color:#3B2C05;font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;justify-content:center}',
    '.site-footer .foot-bottom{padding-bottom:96px}',

    '.rv-dialog{width:min(560px,calc(100% - 24px));max-height:calc(100vh - 24px);max-height:calc(100dvh - 24px);padding:0;border:none;border-radius:20px;background:var(--paper);color:var(--ink);box-shadow:0 40px 80px -30px rgba(43,54,39,.5);overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain}',
    '.rv-dialog::backdrop{background:rgba(43,54,39,.55)}',
    '.rv-box{position:relative;display:flex;flex-direction:column;gap:14px;padding:34px 34px 28px;font-family:"Jost",Helvetica,Arial,sans-serif}',
    '.rv-box p{margin:0}',
    '.rv-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:var(--sage);font-weight:500;padding-right:44px}',
    '.rv-box h2{font-family:"Cormorant Garamond",Georgia,serif;font-size:30px;font-weight:600;color:var(--forest);line-height:1.15;margin:-6px 0 0;padding-right:40px}',
    '.rv-help,.rv-lead{font-size:14px;line-height:1.6;color:#4a4a42}',
    '.rv-help{color:var(--muted)}',
    '.rv-hint{font-size:13.5px;line-height:1.55;color:#5A4510;background:#FFF8DC;border:1px dashed #D9AE45;border-radius:12px;padding:10px 14px}',
    '.rv-hint[hidden],.rv-link[hidden],.rv-list[hidden],.rv-empty[hidden],.rv-paste[hidden]{display:none}',
    '.rv-label{font-size:12.5px;font-weight:500;color:var(--forest);margin-bottom:-8px}',
    '.rv-box textarea{display:block;width:100%;min-height:180px;font-family:inherit;font-size:16px;line-height:1.55;color:var(--ink);padding:12px 14px;border:1px solid var(--hair);border-radius:12px;background:#fff;resize:vertical}',
    '.rv-box textarea:focus{outline:2px solid var(--sage);outline-offset:1px;border-color:var(--sage)}',
    '.rv-under{display:flex;justify-content:space-between;align-items:center;gap:6px 16px;flex-wrap:wrap;margin-top:-6px}',
    '.rv-link{font-family:inherit;font-size:13px;color:var(--forest);background:none;border:none;padding:4px 0;cursor:pointer;text-decoration:underline;text-underline-offset:3px}',
    '.rv-link:hover{color:var(--sage)}',
    '.rv-status{font-size:12.5px;color:var(--sage);margin-left:auto}',
    '.rv-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin-top:4px}',
    '.rv-primary,.rv-secondary{display:inline-flex;align-items:center;justify-content:center;font-family:inherit;font-size:14px;font-weight:500;line-height:1.2;padding:13px 28px;border-radius:26px;border:1.4px solid var(--forest);cursor:pointer;text-decoration:none;text-align:center}',
    '.rv-primary{background:var(--forest);color:var(--cream)}',
    '.rv-primary:hover{background:var(--forest-deep);border-color:var(--forest-deep);color:var(--cream)}',
    '.rv-secondary{background:transparent;color:var(--forest)}',
    '.rv-secondary:hover{background:var(--sage-soft);color:var(--forest)}',
    '.rv-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:1px solid var(--hair);background:transparent;font-size:22px;line-height:1;color:var(--forest);cursor:pointer;padding:0}',
    '.rv-x:hover{background:var(--sage-soft)}',
    '.rv-x:focus:not(:focus-visible){outline:none}',

    '.rv-h3{display:flex;justify-content:space-between;align-items:baseline;gap:12px;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin:10px 0 -4px}',
    '.rv-h3 span+span{text-transform:none;letter-spacing:0;font-size:12px}',
    '.rv-list{list-style:none;margin:0;padding:0;border:1px solid var(--hair);border-radius:14px;background:#fff;overflow:hidden}',
    '.rv-list li+li{border-top:1px solid var(--hair)}',
    '.rv-list a{display:flex;align-items:center;gap:11px;padding:11px 14px;color:var(--ink);text-decoration:none}',
    '.rv-list a:hover{background:var(--sage-soft);color:var(--ink)}',
    '.rv-tick{flex-shrink:0;width:18px;height:18px;border-radius:50%;border:1.5px solid var(--hair);background:#fff}',
    '.rv-pages a.seen .rv-tick{border-color:var(--sage);background:var(--sage) url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%273.4%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M20 6 9 17l-5-5%27/%3E%3C/svg%3E") center/11px no-repeat}',
    '.rv-pt{font-size:14px}',
    '.rv-pt em{font-style:normal;font-size:11.5px;color:var(--muted);margin-left:6px}',
    '.rv-pages b{margin-left:auto;flex-shrink:0;font-size:11.5px;font-weight:600;color:#5A4510;background:#FFF3C4;border-radius:10px;padding:3px 9px}',
    '.rv-notes a{display:block}',
    '.rv-notes b{display:block;font-size:13px;font-weight:500;color:var(--forest)}',
    '.rv-notes span{display:block;font-size:13px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.rv-empty{font-size:13.5px;line-height:1.55;color:var(--muted);padding:12px 14px;border:1px dashed var(--hair);border-radius:14px}',
    '.rv-send{display:flex;gap:10px;flex-wrap:wrap}',
    '.rv-send a{flex:1 1 190px}',
    '.rv-paste{font-size:12.5px;line-height:1.55;color:#5A4510;background:#FFF8DC;border-radius:12px;padding:10px 14px}',
    '.rv-small{font-size:12px;line-height:1.55;color:var(--muted)}',
    '.rv-warn{font-size:13px;color:#8a3b25;background:#fbe9e4;border-radius:12px;padding:10px 14px}',
    '.rv-steps{margin:0;padding-left:20px;font-size:14px;line-height:1.55;color:#4a4a42;display:flex;flex-direction:column;gap:6px}',
    '.rv-sign{font-family:"Cormorant Garamond",Georgia,serif;font-size:21px;font-weight:600;color:var(--forest)}',
    '@media (max-width:760px){.rv-dialog{margin:12px auto auto}.rv-box{padding:26px 20px 22px}.rv-box h2{font-size:26px}.rv-fab{right:12px;bottom:12px}}'
  ].join('\n');
  var style = document.createElement('style');
  style.id = 'rv-style';
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- dialogs ---------- */
  function dialog(cls, inner, labelId) {
    var d = document.createElement('dialog');
    d.className = 'rv-dialog ' + cls;
    if (labelId) d.setAttribute('aria-labelledby', labelId);
    d.innerHTML = '<div class="rv-box"><button type="button" class="rv-x" aria-label="Close">&times;</button>' + inner + '</div>';
    d.querySelector('.rv-x').addEventListener('click', function () { d.close(); });
    // Close on a backdrop click, but not when a text selection that started inside ends outside.
    var downOnBackdrop = false;
    d.addEventListener('mousedown', function (e) { downOnBackdrop = e.target === d; });
    d.addEventListener('click', function (e) { if (e.target === d && downOnBackdrop) d.close(); });
    document.body.appendChild(d);
    return d;
  }

  /* ---------- section buttons ---------- */
  sections.forEach(function (s, i) {
    s.id = s.scope + '|' + s.key;
    s.order = i;
    s.pageTitle = s.scope === 'site' ? 'Every page' : page.title;
    var pin = document.createElement('div');
    pin.className = 'rv-pin' + (s.center ? ' rv-center' : '');
    pin.innerHTML = '<button type="button" class="rv-btn"></button>';
    s.btn = pin.firstChild;
    s.btn.addEventListener('click', function () { openNote(s); });
    s.mount.insertBefore(pin, s.before);
    s.el.classList.add('rv-target');
  });

  /* ---------- note pop-up ---------- */
  var noteDlg = dialog('rv-note',
    '<div class="rv-eyebrow"></div>' +
    '<h2 id="rv-note-title"></h2>' +
    '<p class="rv-help">Type the text you\'d like in this section, or tell me what to change. Happy with it as it is? Just close this.</p>' +
    '<p class="rv-hint" hidden></p>' +
    '<label class="rv-label" for="rv-text">Your note</label>' +
    '<textarea id="rv-text" rows="7" placeholder="Type here"></textarea>' +
    '<div class="rv-under"><button type="button" class="rv-link rv-start">Start from the current text</button><span class="rv-status" aria-live="polite"></span></div>' +
    '<div class="rv-actions"><button type="button" class="rv-primary rv-done">Done</button><button type="button" class="rv-link rv-remove">Remove my note</button></div>',
    'rv-note-title');
  var text = noteDlg.querySelector('textarea');
  var hintEl = noteDlg.querySelector('.rv-hint');
  var statusEl = noteDlg.querySelector('.rv-status');
  var startBtn = noteDlg.querySelector('.rv-start');
  var removeBtn = noteDlg.querySelector('.rv-remove');
  var coarse = window.matchMedia('(pointer: coarse)').matches;
  var active = null;
  var timer = null;

  function openNote(s) {
    if (panel.open) panel.close();
    active = s;
    s.current = readSection(s);
    var note = load().notes[s.id];
    noteDlg.querySelector('.rv-eyebrow').textContent = s.pageTitle;
    noteDlg.querySelector('h2').textContent = s.label;
    hintEl.textContent = s.hint;
    hintEl.hidden = !s.hint;
    text.value = note ? note.text : '';
    statusEl.textContent = '';
    syncNoteButtons();
    noteDlg.showModal();
    noteDlg.scrollTop = 0;
    if (!coarse) text.focus(); // on phones, let her read the pop-up before the keyboard covers it
  }

  function syncNoteButtons() {
    var has = text.value.trim().length > 0;
    startBtn.hidden = has;
    removeBtn.hidden = !has;
  }

  // Saves the open note. Empty text, or text identical to what's on the page, means no note.
  function commitNote() {
    clearTimeout(timer);
    if (!active) return 'empty';
    var s = active;
    var value = text.value.replace(/\s+$/, '');
    var same = !!value.trim() && squash(value) === squash(s.current);
    paint(update(function (st) {
      if (!value.trim() || same) delete st.notes[s.id];
      else st.notes[s.id] = {
        id: s.id, key: s.key, page: s.scope, pageTitle: s.pageTitle, label: s.label,
        order: s.order, text: value, updated: Date.now()
      };
    }));
    return same ? 'same' : value.trim() ? 'saved' : 'empty';
  }

  function showStatus(result) {
    statusEl.textContent = {
      saved: storageOK ? 'Saved on this device' : 'Not saved: send your notes before you leave this page',
      same: 'Same as the current text. Change it and it saves.',
      empty: ''
    }[result] || '';
  }

  text.addEventListener('input', function () {
    syncNoteButtons();
    statusEl.textContent = '';
    clearTimeout(timer);
    timer = setTimeout(function () { showStatus(commitNote()); }, 400);
  });

  startBtn.addEventListener('click', function () {
    text.value = active.current;
    syncNoteButtons();
    text.focus();
    text.setSelectionRange(0, 0);
    text.scrollTop = 0;
    showStatus('same');
  });

  removeBtn.addEventListener('click', function () {
    if (!window.confirm('Remove your note for "' + active.label + '"?')) return;
    text.value = '';
    noteDlg.close();
  });

  noteDlg.querySelector('.rv-done').addEventListener('click', function () { noteDlg.close(); });
  noteDlg.addEventListener('close', function () { commitNote(); active = null; });
  window.addEventListener('pagehide', function () { if (active) commitNote(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && active) commitNote(); });

  /* ---------- "My notes" button and panel ---------- */
  var fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'rv-fab';
  fab.setAttribute('aria-haspopup', 'dialog');
  document.body.appendChild(fab);

  var panel = dialog('rv-panel',
    '<div class="rv-eyebrow">Fine Lines &middot; website preview</div>' +
    '<h2 id="rv-panel-title">Your notes</h2>' +
    '<p class="rv-help">Every section with a <span class="rv-chip">' + ICON_EDIT + 'Change this text</span> button is new. Tap it to type the text you\'d like there. The home page text you approved stays as it is.</p>' +
    (storageOK ? '' : '<p class="rv-warn">This browser isn\'t saving your notes. Send them before you close this page.</p>') +
    '<h3 class="rv-h3"><span>Pages to check</span><span class="rv-opened"></span></h3>' +
    '<ul class="rv-list rv-pages"></ul>' +
    '<h3 class="rv-h3"><span>Your notes</span><span class="rv-total"></span></h3>' +
    '<ul class="rv-list rv-notes"></ul>' +
    '<p class="rv-empty">No notes yet. Happy with everything? Send that to me and I\'ll take it as your go-ahead.</p>' +
    '<h3 class="rv-h3"><span>Send to ' + h(SEND_TO.name) + '</span></h3>' +
    '<div class="rv-send"><a class="rv-primary rv-wa" target="_blank" rel="noopener">Send on WhatsApp</a><a class="rv-secondary rv-mail">Send by email</a></div>' +
    '<p class="rv-paste" hidden>Long notes are copied for you instead of typed in. If the message is empty when WhatsApp or your email opens, tap and hold in the message box and choose Paste.</p>' +
    '<div class="rv-under"><button type="button" class="rv-link rv-copy">Copy my notes</button><button type="button" class="rv-link rv-reset">Delete all my notes</button></div>' +
    '<p class="rv-small">Your notes are saved on this phone or computer until you send them. Notes made on another device won\'t show here.</p>',
    'rv-panel-title');
  var waLink = panel.querySelector('.rv-wa');
  var mailLink = panel.querySelector('.rv-mail');
  var outgoing = { text: '', waCopy: false, mailCopy: false };

  function message(st, notes) {
    var unopened = PAGES.filter(function (p) { return !st.visited[p.key]; });
    var out = [];
    if (!notes.length) {
      out.push('Hi ' + SEND_TO.name + ', I\'ve been through the new website and I\'m happy with the text as it is.');
    } else {
      out.push('Hi ' + SEND_TO.name + ', here are my notes on the new website.');
      var last = '';
      notes.forEach(function (n) {
        if (n.page !== last) { out.push('', '*' + n.pageTitle.toUpperCase() + '*'); last = n.page; }
        out.push('', '*' + n.label + '*', n.text.trim());
      });
      out.push('', 'Everything without a note is fine as it is.');
    }
    out.push('', 'Pages opened: ' + (PAGES.length - unopened.length) + ' of ' + PAGES.length +
      (unopened.length ? ' (not opened yet: ' + unopened.map(function (p) { return p.title; }).join(', ') + ')' : ''));
    return out.join('\n');
  }

  function renderPanel(st) {
    var notes = sortedNotes(st);
    var opened = PAGES.filter(function (p) { return st.visited[p.key]; }).length;
    panel.querySelector('.rv-opened').textContent = opened + ' of ' + PAGES.length + ' opened';
    panel.querySelector('.rv-pages').innerHTML = PAGES.map(function (p) {
      var n = notes.filter(function (x) { return x.page === p.key; }).length;
      var here = p.key === pageKey;
      return '<li><a href="' + h(p.href) + '"' + (st.visited[p.key] ? ' class="seen"' : '') + (here ? ' aria-current="page"' : '') + '>' +
        '<i class="rv-tick" aria-hidden="true"></i><span class="rv-pt">' + h(p.title) + (here ? '<em>you\'re here</em>' : '') + '</span>' +
        (n ? '<b>' + n + (n === 1 ? ' note' : ' notes') + '</b>' : '') + '</a></li>';
    }).join('');

    var list = panel.querySelector('.rv-notes');
    panel.querySelector('.rv-total').textContent = notes.length ? String(notes.length) : '';
    list.hidden = !notes.length;
    panel.querySelector('.rv-empty').hidden = !!notes.length;
    panel.querySelector('.rv-reset').hidden = !notes.length;
    list.innerHTML = notes.map(function (n) {
      var where = n.page === 'site' ? '' : hrefFor(n.page);
      return '<li><a href="' + h(where + '#note-' + n.key) + '" data-id="' + h(n.id) + '">' +
        '<b>' + h(n.pageTitle + ' · ' + n.label) + '</b><span>' + h(n.text.replace(/\s+/g, ' ')) + '</span></a></li>';
    }).join('');

    var msg = message(st, notes);
    var enc = encodeURIComponent(msg);
    outgoing = { text: msg, waCopy: enc.length > WA_MAX, mailCopy: enc.length > MAIL_MAX };
    waLink.href = 'https://wa.me/' + SEND_TO.whatsapp + (outgoing.waCopy ? '' : '?text=' + enc);
    mailLink.href = 'mailto:' + SEND_TO.email + '?subject=' + encodeURIComponent('Fine Lines website: my notes') +
      '&body=' + (outgoing.mailCopy ? encodeURIComponent('(Paste your notes here)') : enc);
    panel.querySelector('.rv-paste').hidden = !outgoing.mailCopy;
  }

  function legacyCopy(str) {
    var ta = document.createElement('textarea');
    ta.value = str;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    (panel.open ? panel : document.body).appendChild(ta); // outside an open modal, the page is inert
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    ta.remove();
    return ok;
  }
  function copyText(str) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(str).then(function () { return true; }, function () { return legacyCopy(str); });
    }
    return Promise.resolve(legacyCopy(str));
  }

  waLink.addEventListener('click', function () {
    if (outgoing.waCopy) copyText(outgoing.text);
    update(function (st) { st.sentAt = Date.now(); });
  });
  mailLink.addEventListener('click', function () {
    if (outgoing.mailCopy) copyText(outgoing.text);
    update(function (st) { st.sentAt = Date.now(); });
  });
  panel.querySelector('.rv-copy').addEventListener('click', function (e) {
    var b = e.currentTarget;
    copyText(outgoing.text).then(function (ok) {
      b.textContent = ok ? 'Copied' : 'Couldn\'t copy on this device';
      setTimeout(function () { b.textContent = 'Copy my notes'; }, 2200);
    });
  });
  panel.querySelector('.rv-reset').addEventListener('click', function () {
    if (!window.confirm('Delete all your notes? This can\'t be undone.')) return;
    paint(update(function (st) { st.notes = {}; }));
  });
  panel.querySelector('.rv-notes').addEventListener('click', function (e) {
    var a = e.target.closest('a[data-id]');
    if (!a) return;
    var s = find(sections, function (x) { return x.id === a.getAttribute('data-id'); });
    if (!s) return; // the note is on another page: follow the link there
    e.preventDefault();
    panel.close();
    goTo(s);
  });

  fab.addEventListener('click', function () {
    renderPanel(load());
    panel.showModal();
    panel.scrollTop = 0;
  });

  function goTo(s) {
    s.el.scrollIntoView({ block: 'start' });
    openNote(s);
  }

  /* ---------- painting ---------- */
  function paint(st) {
    sections.forEach(function (s) {
      var has = !!(st.notes[s.id] && st.notes[s.id].text);
      var label = has ? 'Note saved · edit' : 'Change this text';
      s.btn.classList.toggle('has-note', has);
      s.btn.innerHTML = (has ? ICON_DONE : ICON_EDIT) + '<span>' + label + '</span>';
      s.btn.setAttribute('aria-label', label + ': ' + s.label);
    });
    var n = sortedNotes(st).length;
    fab.innerHTML = ICON_EDIT + '<span>My notes</span><b class="rv-count">' + n + '</b>';
    fab.setAttribute('aria-label', 'My notes (' + n + ')');
    if (panel.open) renderPanel(st);
  }
  window.addEventListener('storage', function (e) { if (e.key === STORE_KEY) paint(load()); });

  /* ---------- first visit ---------- */
  function intro() {
    var hour = new Date().getHours();
    var greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    var d = dialog('rv-intro',
      '<div class="rv-eyebrow">Fine Lines &middot; website preview</div>' +
      '<h2 id="rv-intro-title">' + greet + ' ' + h(CLIENT) + '</h2>' +
      '<p class="rv-lead">This is the full website. The home page text you approved stays as it is. Everything that\'s new has this button on it:</p>' +
      '<p><span class="rv-chip">' + ICON_EDIT + 'Change this text</span></p>' +
      '<ol class="rv-steps">' +
        '<li>Go through each page. The list is under <b>My notes</b>, bottom right.</li>' +
        '<li>Tap the button on any section you\'d like worded differently, and type what you want there instead.</li>' +
        '<li>Happy with a section? Leave it.</li>' +
        '<li>When you\'re done, open <b>My notes</b> and send them to me on WhatsApp.</li>' +
      '</ol>' +
      '<p class="rv-small">Your notes save on this device as you type, so you can stop and carry on later.</p>' +
      '<div class="rv-actions"><button type="button" class="rv-primary rv-go">Start</button></div>' +
      '<p class="rv-sign">' + h(SEND_TO.name) + '</p>',
      'rv-intro-title');
    d.querySelector('.rv-go').addEventListener('click', function () { d.close(); });
    d.addEventListener('close', function () { update(function (st) { st.introSeen = Date.now(); }); });
    d.showModal();
  }

  /* ---------- start ---------- */
  var state = update(function (st) { st.visited[pageKey] = Date.now(); });
  paint(state);

  var deepLink = /^#note-(.+)$/.exec(location.hash);
  if (deepLink) {
    var target = find(sections, function (x) { return x.key === decodeURIComponent(deepLink[1]); });
    history.replaceState(null, '', location.pathname + location.search);
    if (target) setTimeout(function () { goTo(target); }, 250);
  } else if (!state.introSeen) {
    intro();
  }
})();
