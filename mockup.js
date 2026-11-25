/* Fine Lines full-site mockup: shared data, header/footer and page renderers.
   Load before js/main.js so the booking modal, menu and reveal hook onto the rendered markup. */

var WA = 'https://wa.me/27712562703?text=';
var SHOP_URL = 'https://skinconfidence.co.za/?sc=230984738';
var TBC = '<span class="tbc">TBC</span>';

function wa(text) { return WA + encodeURIComponent(text); }
function note(text) { return '<div class="mk-note">' + text + '</div>'; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

function photo(label, hint) {
  return '<div class="ph"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="15" rx="2"></rect><circle cx="12" cy="12.5" r="3.5"></circle><path d="M8 5l1.5-2h5L16 5"></path></svg><b>' + label + '</b>' + (hint ? '<small>' + hint + '</small>' : '') + '</div>';
}

/* ---------- treatments ---------- */
var TREATMENTS = [
  {
    slug: 'microneedling',
    name: 'Microneedling',
    short: 'Collagen induction for texture, scarring and fine lines',
    img: 'images/services/microneedling-card.jpg',
    hero: { src: 'images/services/microneedling-hero.jpg', alt: 'Michelle performing a microneedling treatment in the Fine Lines treatment room' },
    gallery: [
      { src: 'images/services/microneedling-1.jpg', alt: 'Close-up of the microneedling pen on a client\'s forehead' },
      { src: 'images/services/microneedling-2.jpg', alt: 'Michelle preparing the microneedling pen before a treatment', pos: '60% 50%' },
      { src: 'images/services/microneedling-3.jpg', alt: 'Michelle microneedling a smiling client\'s forehead', pos: '62% 50%' },
      { src: 'images/services/microneedling-4.jpg', alt: 'Michelle massaging a client\'s face during a microneedling treatment', pos: '50% 58%' }
    ],
    lead: 'Microneedling uses small needles to create micro-channels in the skin, triggering your skin\'s natural healing response so it rebuilds smoother, firmer and more even.',
    what: [
      'Microneedling (also called collagen induction therapy) creates thousands of controlled micro-channels in the skin. Your skin responds by producing new collagen and elastin, the proteins that keep it firm, smooth and resilient.',
      'Those same channels let the serums applied during your treatment absorb far deeper than they could on their own, so the treatment works on two levels at once.'
    ],
    goodFor: ['Fine lines & wrinkles', 'Acne scarring', 'Enlarged pores', 'Uneven texture', 'Dull, tired skin', 'Mild pigmentation'],
    notFor: 'Not suitable during active breakouts, on broken or infected skin, or during pregnancy. Michelle will check this with you first.',
    benefits: [
      ['Boosts collagen and elastin', 'Your skin\'s own repair process does the work, so results build gradually and look natural.'],
      ['Softens fine lines and wrinkles', 'New collagen plumps the skin from within, softening lines over a course of treatments.'],
      ['Refines pore size', 'Firmer skin around the pore makes pores look smaller and texture more even.'],
      ['Improves acne scarring', 'Repeated sessions help remodel the skin around shallow scars.'],
      ['Better product absorption', 'Serums reach deeper while the micro-channels are open.'],
      ['Suits most skin types', 'Treatment depth is adjusted to your skin and your concern.']
    ],
    steps: [
      ['Consultation', 'We look at your skin, your concerns and your history, and agree on a plan.'],
      ['Preparation', 'Skin is cleansed and prepped so it is ready for treatment.'],
      ['Treatment', 'The microneedling pen is passed over the skin with a treatment serum.'],
      ['Aftercare', 'A calming mask and SPF, plus your homecare plan for the days that follow.']
    ],
    aftercare: [
      'Expect redness, similar to mild sunburn, for 24 to 48 hours.',
      'No make-up for 24 hours, and avoid the gym, sauna and swimming for 48 hours.',
      'Use SPF every day and keep out of direct sun.',
      'Skip retinol, acids and scrubs until Michelle says your skin is ready.'
    ],
    concerns: ['Anti-ageing', 'Acne'],
    faq: [
      ['Does microneedling hurt?', 'Most clients describe it as a light scratching or vibrating feeling. Depth is adjusted to your comfort.'],
      ['How many sessions will I need?', 'Most concerns respond best to a course of treatments spaced a few weeks apart. Michelle will advise a plan for your skin.']
    ]
  },
  {
    slug: 'chemical-peel',
    name: 'Chemical Peel',
    short: 'Brighter, smoother, more even skin tone',
    img: 'images/services/chemical-peel-card.jpg',
    hero: { src: 'images/services/chemical-peel-hero.jpg', alt: 'Michelle applying a chemical peel with a fan brush' },
    gallery: [
      { src: 'images/services/chemical-peel-1.jpg', alt: 'Chemical peel being applied with a fan brush', pos: '50% 45%' },
      { src: 'images/services/chemical-peel-2.jpg', alt: 'Peel solution ready on the fan brush during a chemical peel', pos: '50% 38%' },
      { src: 'images/services/chemical-peel-3.jpg', alt: 'Neck and shoulder massage to finish a chemical peel treatment', pos: '50% 45%' }
    ],
    lead: 'A chemical peel gently exfoliates the skin for a smoother, brighter, more even complexion, targeting pigmentation, texture and breakouts.',
    what: [
      'A professional peel uses a carefully selected acid solution to loosen the bond between dead skin cells, so they shed and reveal fresher, more even skin underneath.',
      'Peels are chosen and layered for your skin and your concern, from a gentle brightening peel to a deeper corrective peel for pigmentation or acne.'
    ],
    goodFor: ['Pigmentation', 'Uneven skin tone', 'Breakouts & congestion', 'Rough texture', 'Dull skin', 'Early signs of ageing'],
    notFor: 'Not suitable on sunburnt or broken skin, or if you are using certain prescription skin medication. Michelle will check this with you first.',
    benefits: [
      ['Brightens and evens skin tone', 'Removes the dull surface layer so skin reflects light more evenly.'],
      ['Softens the look of pigmentation', 'Helps fade sun spots and uneven patches over a course of peels.'],
      ['Refines texture', 'Skin feels smoother and looks more refined.'],
      ['Helps clear breakouts', 'Keeps pores clear and calms congested skin.'],
      ['Tailored strength', 'The peel is matched to your skin, not one-size-fits-all.'],
      ['Little to no downtime', 'Most clients go straight back to their day.']
    ],
    steps: [
      ['Consultation', 'We look at your skin and choose the right peel and strength.'],
      ['Cleanse & prep', 'Skin is cleansed and degreased so the peel works evenly.'],
      ['Peel application', 'The peel is applied and closely monitored, then neutralised.'],
      ['Calm & protect', 'A soothing finish and SPF, plus your homecare plan.']
    ],
    aftercare: [
      'Light flaking can happen for a few days. Let it shed and don\'t pick.',
      'Use a gentle cleanser and moisturiser only for the first few days.',
      'SPF every day is essential after a peel.',
      'Avoid scrubs, retinol and other acids until your skin settles.'
    ],
    concerns: ['Pigmentation', 'Acne'],
    faq: [
      ['Will my skin peel a lot?', 'It depends on the peel. Many professional peels cause little or no visible peeling. Michelle will tell you what to expect.'],
      ['Can I have a peel in summer?', 'Yes, as long as you are strict with SPF. Michelle will choose a peel that suits the season.']
    ]
  },
  {
    slug: 'dermaplaning',
    name: 'Dermaplaning',
    short: 'Instant smoothness and a fresh glow',
    img: 'images/services/dermaplaning-card.jpg',
    hero: { src: 'images/services/dermaplaning-hero.jpg', alt: 'Michelle preparing a client\'s skin for dermaplaning under the treatment lamp' },
    gallery: [
      { src: 'images/services/dermaplaning-1.jpg', alt: 'Dermaplaning around the chin with a sterile blade' },
      { src: 'images/services/dermaplaning-2.jpg', alt: 'Michelle massaging a client\'s neck during a dermaplaning treatment', pos: '50% 45%' },
      { src: 'images/services/dermaplaning-3.jpg', alt: 'Dermaplaning blade gliding along a client\'s jawline' },
      { src: 'images/services/dermaplaning-4.jpg', alt: 'Client relaxing on the treatment bed in the Fine Lines treatment room', pos: '50% 55%' }
    ],
    lead: 'Dermaplaning is a manual exfoliation where a sterile blade gently removes the top layer of dead skin cells and fine vellus hair, for instantly smoother, brighter skin.',
    what: [
      'Using a sterile surgical blade held at a gentle angle, Michelle lifts away dead skin cells and the fine "peach fuzz" hair that traps oil and dulls your skin.',
      'The result is an instant glow, make-up that sits smoother, and skin that absorbs your homecare products far better.'
    ],
    goodFor: ['Dull skin', 'Peach fuzz', 'Rough texture', 'Make-up that won\'t sit smoothly', 'Before an event', 'Prep before a peel'],
    notFor: 'Not suitable during active acne breakouts or on inflamed skin. Michelle will check this with you first.',
    benefits: [
      ['Gently exfoliates', 'Removes the dead surface layer without harsh scrubs.'],
      ['Removes peach fuzz', 'Fine vellus hair is removed and grows back the same, not thicker.'],
      ['Better product absorption', 'Serums and moisturisers reach the skin more effectively.'],
      ['Instant glow', 'Visible results straight after your treatment.'],
      ['Smoother make-up', 'Foundation applies more evenly on a smooth surface.'],
      ['No downtime', 'Ideal before a special occasion.']
    ],
    steps: [
      ['Consultation', 'We check your skin and talk about what you want from the treatment.'],
      ['Cleanse & prep', 'Skin is cleansed and dried so the blade glides evenly.'],
      ['Dermaplane', 'Short, gentle strokes remove dead skin and fine hair.'],
      ['Nourish & protect', 'A hydrating finish and SPF to seal in the glow.']
    ],
    aftercare: [
      'Skin may be slightly pink for a few hours.',
      'Avoid exfoliants and retinol for a few days.',
      'Use SPF every day. Freshly exfoliated skin is more sun-sensitive.',
      'Keep hands off the face and use clean pillowcases.'
    ],
    concerns: ['Anti-ageing', 'Hydration'],
    faq: [
      ['Will the hair grow back thicker?', 'No. Vellus hair grows back exactly the same. Dermaplaning does not change the hair follicle.'],
      ['Can it be combined with other treatments?', 'Yes. Dermaplaning is often done before a peel so the peel can work more evenly.']
    ]
  },
  {
    slug: 'pedicure',
    name: 'Gel / Cutex Pedicure',
    short: 'Shaped nails, soft feet and a lasting finish',
    img: 'images/services/pedicure-card.jpg',
    hero: { src: 'images/services/pedicure-hero.jpg', alt: 'Freshly painted coral toenails after a pedicure at Fine Lines Aesthetic Salon', pos: '50% 80%' },
    gallery: [
      { src: 'images/services/pedicure-1.jpg', alt: 'Michelle applying polish during a gel / cutex pedicure', pos: '50% 62%' },
      { src: 'images/services/pedicure-2.jpg', alt: 'Close-up of polish being applied to a toenail', pos: '50% 50%' },
      { src: 'images/services/pedicure-3.jpg', alt: 'Michelle painting a client\'s toenails coral', pos: '50% 55%' }
    ],
    lead: 'A pedicure is a therapeutic treatment for your feet that shapes your toenails, cares for your skin and finishes with gel or cutex polish.',
    what: [
      'Your feet are soaked, nails shaped and cuticles tidied, then rough skin is smoothed and your feet and lower legs are massaged.',
      'Finish with gel for a long-lasting, chip-resistant shine, or classic cutex if you like to change your colour more often.'
    ],
    goodFor: ['Dry, rough heels', 'Untidy cuticles', 'Tired feet', 'Holiday or event prep', 'Long-lasting colour (gel)', 'Regular maintenance'],
    notFor: 'If you have a foot infection or open wounds, please let Michelle know before your booking.',
    benefits: [
      ['Improves foot health', 'Regular care keeps nails and skin healthy.'],
      ['Neater nails and feet', 'Shaped nails, tidy cuticles and smooth skin.'],
      ['Relaxes body and feet', 'Massage eases tired feet and legs.'],
      ['Gel or cutex', 'Choose long-lasting gel or classic polish.'],
      ['Softer heels', 'Hard skin is gently removed and hydrated.'],
      ['Time for you', 'An hour to sit back and switch off.']
    ],
    steps: [
      ['Soak', 'A warm soak softens skin and nails.'],
      ['Shape & tidy', 'Nails are cut, shaped and cuticles cared for.'],
      ['Smooth & massage', 'Hard skin is buffed away, then a relaxing massage.'],
      ['Polish', 'Gel or cutex colour of your choice.']
    ],
    aftercare: [
      'Gel is dry immediately. Cutex needs time to cure, so wear open shoes home.',
      'Moisturise your feet daily to keep heels soft.',
      'Book gel removal at the salon rather than peeling it off.'
    ],
    concerns: ['Body'],
    faq: [
      ['How long does gel last on toes?', 'Usually several weeks, depending on how fast your nails grow.'],
      ['Should I bring my own colour?', 'You are welcome to, but there is a range of colours to choose from at the salon.']
    ]
  },
  {
    slug: 'facial-wax-tint',
    name: 'Facial Wax & Tint',
    short: 'Defined brows and lashes, smooth skin',
    tbc: true,
    img: null,
    lead: 'Brow shaping, facial waxing and lash or brow tinting for a polished, low-maintenance look.',
    what: [
      'Facial waxing removes unwanted hair from the brows, lip and chin for smooth skin that lasts for weeks.',
      'Tinting adds definition to brows and lashes, so you can skip the mascara and brow pencil on busy mornings.'
    ],
    goodFor: ['Brow shaping', 'Upper lip & chin', 'Fair or sparse brows', 'Light lashes', 'Holiday prep', 'Low-maintenance routine'],
    notFor: 'A patch test is needed before your first tint. Not suitable on skin using retinol in the treatment area.',
    benefits: [
      ['Smooth for weeks', 'Hair is removed from the root.'],
      ['Defined brows', 'Shaped to suit your face.'],
      ['No mascara mornings', 'Tinted lashes look done without make-up.'],
      ['Quick appointment', 'Easy to add on to another treatment.'],
      ['Gentle on skin', 'Soothing products used after waxing.'],
      ['Patch tested', 'Your safety comes first.']
    ],
    steps: [
      ['Consultation', 'We agree on shape and shade.'],
      ['Patch test', 'For first-time tints, done before your appointment.'],
      ['Wax & tint', 'Hair removed and tint applied.'],
      ['Soothe', 'A calming finish for the skin.']
    ],
    aftercare: [
      'Avoid heat, sun and make-up on waxed areas for 24 hours.',
      'Avoid oil-based cleansers around tinted areas to make the tint last.'
    ],
    concerns: ['Body'],
    faq: [
      ['Do I need a patch test?', 'Yes, before your first tint, at least 48 hours before your appointment.'],
      ['How long does a tint last?', 'Usually three to six weeks.']
    ]
  }
];

/* ---------- products (sample line-up: swap for Michelle's picks + product links) ---------- */
var PRODUCTS = [
  { range: 'Lamelle Clarity', name: 'Clarity Cleansing Gel', desc: 'A foaming gel cleanser for oily and breakout-prone skin.', step: 'Cleanse', concerns: ['Acne'], best: true },
  { range: 'Lamelle Clarity', name: 'Clarity Active Serum', desc: 'A targeted serum to calm breakouts and keep pores clear.', step: 'Treat', concerns: ['Acne'] },
  { range: 'Lamelle Clarity', name: 'Clarity Oil-Free Moisturiser', desc: 'Lightweight hydration that won\'t clog pores.', step: 'Hydrate', concerns: ['Acne'] },
  { range: 'Lamelle Brightening', name: 'Brightening Cleanser', desc: 'A gentle cleanser for skin prone to pigmentation.', step: 'Cleanse', concerns: ['Pigmentation'] },
  { range: 'Lamelle Brightening', name: 'Brightening Serum', desc: 'Targets uneven tone and dark spots for a brighter complexion.', step: 'Treat', concerns: ['Pigmentation'], best: true },
  { range: 'Lamelle Brightening', name: 'Brightening Night Cream', desc: 'Works overnight to even out skin tone.', step: 'Hydrate', concerns: ['Pigmentation'] },
  { range: 'Lamelle Ollin', name: 'Ollin Firming Serum', desc: 'Supports firmness and softens the look of fine lines.', step: 'Treat', concerns: ['Anti-ageing'], best: true },
  { range: 'Lamelle Ollin', name: 'Ollin Day Cream', desc: 'A rich daily moisturiser for mature skin.', step: 'Hydrate', concerns: ['Anti-ageing', 'Hydration'] },
  { range: 'Lamelle Ollin', name: 'Ollin Eye Cream', desc: 'Hydrates and smooths the delicate eye area.', step: 'Treat', concerns: ['Anti-ageing'] },
  { range: 'Lamelle Dermaheal', name: 'Dermaheal Barrier Repair Cream', desc: 'Soothes and restores skin after treatments.', step: 'Hydrate', concerns: ['Sensitive', 'Hydration'], best: true },
  { range: 'Lamelle Serra', name: 'Serra Calming Cleanser', desc: 'A soft, non-foaming cleanser for sensitive skin.', step: 'Cleanse', concerns: ['Sensitive'] },
  { range: 'Lamelle Sun', name: 'Daily Sun Protection SPF 50', desc: 'Lightweight daily SPF. The one product every skin needs.', step: 'Protect', concerns: ['Pigmentation', 'Anti-ageing', 'Acne', 'Sensitive', 'Hydration'], best: true }
];

var BOTTLES = {
  Cleanse: '<rect x="44" y="18" width="12" height="10" rx="2"/><path d="M38 34c0-4 3-6 6-6h12c3 0 6 2 6 6v52c0 4-3 6-6 6H44c-3 0-6-2-6-6Z"/>',
  Treat: '<rect x="45" y="14" width="10" height="14" rx="4"/><rect x="42" y="28" width="16" height="6" rx="1"/><path d="M40 40c0-4 2-6 6-6h8c4 0 6 2 6 6v46c0 4-2 6-6 6h-8c-4 0-6-2-6-6Z"/>',
  Hydrate: '<rect x="30" y="44" width="40" height="10" rx="3"/><path d="M32 54h36v26c0 6-4 10-10 10H42c-6 0-10-4-10-10Z"/>',
  Protect: '<rect x="44" y="16" width="12" height="8" rx="2"/><path d="M40 24h20l6 62c0 4-3 6-6 6H40c-3 0-6-2-6-6Z"/>'
};

function productCard(p) {
  return '<article class="prod" data-concerns="' + esc(p.concerns.join('|')) + '">' +
    '<div class="prod-img">' + (p.best ? '<span class="tag">Michelle\'s pick</span>' : '') +
    '<svg width="110" height="110" viewBox="0 0 100 100" fill="#fff" stroke="#b9c4ae" stroke-width="1.6" stroke-linejoin="round">' + BOTTLES[p.step] + '<path d="M44 62h12" stroke="#C9A66B"/></svg>' +
    '<span class="ph-label">Product photo</span></div>' +
    '<div class="prod-body"><div class="prod-range">' + esc(p.range) + ' &middot; ' + p.step + '</div>' +
    '<h3 class="prod-name">' + esc(p.name) + '</h3><p class="prod-desc">' + esc(p.desc) + '</p>' +
    '<div class="prod-tags">' + p.concerns.slice(0, 3).map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>' +
    '<div class="prod-actions"><a class="btn btn-primary btn-sm" href="' + SHOP_URL + '" target="_blank" rel="noopener sponsored">Shop<span class="long"> on Skin Confidence</span> &#8599;</a>' +
    '<a class="prod-ask" href="' + wa('Hi Michelle, is the ' + p.name + ' right for my skin?') + '" target="_blank" rel="noopener">Not sure? Ask Michelle</a></div></div></article>';
}

/* ---------- shared header / footer ---------- */
var PAGE = document.body.getAttribute('data-page');
var BOOK_HREF = wa('Hi there.\nI am interested in booking an appointment with you.');

function header() {
  var t = TREATMENTS.map(function (x) { return '<a href="treatment.html?t=' + x.slug + '">' + x.name + '</a>'; }).join('');
  var on = function (p) { return PAGE === p ? ' class="is-active"' : ''; };
  return '<div class="topbar"><div class="wrap">' +
    '<a class="brandmark" href="index.html"><img src="images/logo.jpg" alt="Fine Lines Aesthetic Salon" width="320" height="320" /><div class="bt">Fine Lines<small>Aesthetic Salon</small></div></a>' +
    '<nav class="navlinks"><a href="index.html"' + on('home') + '>Home</a>' +
    '<div class="nav-drop"><a href="index.html#services"' + on('treatment') + '>Treatments</a><div class="nav-menu">' + t + '</div></div>' +
    '<a href="shop.html"' + on('shop') + '>Shop Homecare</a><a href="index.html#about">About</a><a href="index.html#faq">FAQ</a><a href="index.html#contact">Contact</a></nav>' +
    '<div class="topbar-actions"><a class="btn btn-primary btn-sm" data-book href="' + BOOK_HREF + '" target="_blank" rel="noopener">Book Now</a>' +
    '<button class="hamburger" aria-label="Open menu" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B4A34" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"></path></svg></button></div></div>' +
    '<nav class="mobile-panel" hidden><a href="index.html">Home</a><a href="index.html#services">Treatments</a>' +
    TREATMENTS.map(function (x) { return '<a class="mp-sub" href="treatment.html?t=' + x.slug + '">' + x.name + '</a>'; }).join('') +
    '<a href="shop.html">Shop Homecare</a><a href="index.html#about">About</a><a href="index.html#faq">FAQ</a><a href="index.html#contact">Contact</a></nav></div>';
}

function cta(title, text) {
  return '<div class="cta" id="contact"><div class="wrap"><div class="eyebrow">Get in touch</div><h2>' + title + '</h2><p>' + text + '</p>' +
    '<div class="cta-actions"><a class="btn btn-primary" data-book href="' + BOOK_HREF + '" target="_blank" rel="noopener">Book on WhatsApp</a>' +
    '<a class="btn btn-secondary" style="border-color:rgba(255,255,255,0.5);color:#fff" href="https://www.facebook.com/finelinesaestheticsalon" target="_blank" rel="noopener">Visit Our Facebook</a></div>' +
    '<div class="cta-details"><div class="item"><div class="k">WhatsApp / Phone</div><div class="v"><a href="tel:+27712562703">071 256 2703</a></div></div>' +
    '<div class="item"><div class="k">Address</div><div class="v">18 Durban Street, Paglande, Worcester</div></div>' +
    '<div class="item"><div class="k">Hours</div><div class="v">' + TBC + '</div></div></div></div></div>';
}

function footer() {
  return '<footer class="site-footer"><div class="wrap"><div class="foot-grid foot-four">' +
    '<div class="foot-about"><div class="foot-brand"><img src="images/logo.jpg" alt="" width="320" height="320" /><div class="ft">Fine Lines<small>Aesthetic Salon</small></div></div>' +
    '<p>Facial treatments built around your actual skin concern, using professional-grade Lamelle products and homecare guidance that makes the results last.</p>' +
    '<a class="btn btn-primary btn-sm" data-book href="' + BOOK_HREF + '" target="_blank" rel="noopener">Book on WhatsApp</a></div>' +
    '<div class="foot-col"><h4>Treatments</h4><ul>' + TREATMENTS.map(function (x) { return '<li><a href="treatment.html?t=' + x.slug + '">' + x.name + '</a></li>'; }).join('') + '</ul></div>' +
    '<div class="foot-col"><h4>Explore</h4><ul><li><a href="shop.html">Shop Homecare</a></li><li><a href="index.html#about">About Michelle</a></li><li><a href="index.html#faq">FAQ</a></li><li><a href="index.html#contact">Contact</a></li></ul></div>' +
    '<div class="foot-col"><h4>Get in touch</h4><ul><li><a href="tel:+27712562703">071 256 2703</a></li><li><a href="mailto:rossouwmiche@gmail.com">rossouwmiche@gmail.com</a></li><li>18 Durban Street, Paglande, Worcester</li><li><a href="https://www.facebook.com/finelinesaestheticsalon" target="_blank" rel="noopener">Facebook</a></li></ul></div></div>' +
    '<div class="foot-bottom"><div>&copy; <span data-year>2026</span> Fine Lines Aesthetic Salon. All rights reserved.</div>' +
    '<nav class="foot-legal" aria-label="Legal"><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms of Use</a></nav>' +
    '<div class="foot-credit">Website by <a href="https://autowebsolutions.co.za" target="_blank" rel="noopener">AutoWeb Solutions</a></div></div></div></footer>';
}

function mockBar() {
  var cur = PAGE === 'treatment' ? new URLSearchParams(location.search).get('t') : PAGE;
  var link = function (href, label, key) { return '<a href="' + href + '"' + (cur === key ? ' class="on"' : '') + '>' + label + '</a>'; };
  var bar = document.createElement('div');
  bar.className = 'mk-bar';
  bar.innerHTML = '<div class="mk-panel" hidden><div class="mh">Mockup pages</div>' +
    link('index.html', 'Home', 'home') +
    TREATMENTS.map(function (x) { return link('treatment.html?t=' + x.slug, '&nbsp;&nbsp;' + x.name, x.slug); }).join('') +
    link('shop.html', 'Shop Homecare', 'shop') +
    '<label><input type="checkbox" class="mk-clean" /> Hide notes (client view)</label></div>' +
    '<button class="mk-toggle" type="button"><i></i>Mockup &middot; pages</button>';
  document.body.appendChild(bar);
  var panel = bar.querySelector('.mk-panel');
  var clean = bar.querySelector('.mk-clean');
  try { if (localStorage.getItem('fl-mk-clean') === '1') { clean.checked = true; document.body.classList.add('mk-clean'); } } catch (e) {}
  bar.querySelector('.mk-toggle').addEventListener('click', function () { panel.hidden = !panel.hidden; });
  clean.addEventListener('change', function () {
    document.body.classList.toggle('mk-clean', clean.checked);
    try { localStorage.setItem('fl-mk-clean', clean.checked ? '1' : '0'); } catch (e) {}
  });
}

/* ---------- treatment page ---------- */
function renderTreatment(el) {
  var slug = new URLSearchParams(location.search).get('t') || 'microneedling';
  var t = TREATMENTS.filter(function (x) { return x.slug === slug; })[0] || TREATMENTS[0];
  document.title = t.name + ' in Worcester | Fine Lines Aesthetic Salon';

  var paired = PRODUCTS.filter(function (p) {
    return p.concerns.some(function (c) { return t.concerns.indexOf(c) > -1; });
  }).sort(function (a, b) { return (b.best ? 1 : 0) - (a.best ? 1 : 0); }).slice(0, 3);
  if (t.concerns[0] === 'Body') paired = [];

  var pos = function (p) { return p.pos ? ' style="object-position:' + p.pos + '"' : ''; };
  var heroImg = t.hero ? '<img src="' + t.hero.src + '" width="900" height="1125" fetchpriority="high" alt="' + esc(t.hero.alt) + '"' + pos(t.hero) + ' />'
    : photo('Hero photo from the shoot', 'Brow / tint close-up, portrait crop');
  var gallery = t.gallery && t.gallery.length
    ? '<div class="gallery g' + t.gallery.length + '">' + t.gallery.map(function (g) {
        return '<img src="' + g.src + '" loading="lazy" alt="' + esc(g.alt) + '"' + pos(g) + ' />';
      }).join('') + '</div>'
    : '<div class="gallery">' + photo('Treatment in progress', 'Landscape or square, Michelle at work') + photo('Close-up', 'Hands / tool / product') + photo('Treatment room', 'Wide, natural light') +
      photo('Result or detail', 'Finished look') + photo('Before / after', 'Optional, with consent') + '</div>';

  el.innerHTML =
    '<div class="page-hero"><div class="wrap">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><a href="index.html#services">Treatments</a><span aria-hidden="true">/</span><span>' + t.name + '</span></nav>' +
      (t.tbc ? note('Page only goes live once Michelle confirms Facial Wax &amp; Tint as a full service. Copy below is a draft.') : '') +
      '<div class="ph-grid"><div>' +
        '<div class="eyebrow">Treatment</div><h1>' + t.name + '</h1><p class="lead">' + t.lead + '</p>' +
        '<div class="facts"><div class="fact"><div class="k">Duration</div><div class="v">' + TBC + '</div></div>' +
        '<div class="fact"><div class="k">Downtime</div><div class="v">' + TBC + '</div></div>' +
        '<div class="fact"><div class="k">From</div><div class="v">R ' + TBC + '</div></div></div>' +
        '<div class="hero-actions"><a class="btn btn-primary" data-book href="' + BOOK_HREF + '" target="_blank" rel="noopener">Book this treatment</a>' +
        '<a class="btn btn-secondary" href="' + wa('Hi there,\nI am interested in ' + t.name + ', can you tell me more.') + '" target="_blank" rel="noopener">Ask Michelle a question</a></div>' +
        note('Michelle to supply duration, downtime and starting price per treatment. Prices also go into Google\'s salon listing data.') +
      '</div><div class="ph-media">' + heroImg + '</div></div>' +
    '</div></div>' +

    '<section><div class="wrap"><div class="split"><div><div class="eyebrow">What it is</div><h2 class="section-title" style="margin-bottom:24px">How ' + t.name.toLowerCase().replace('gel / cutex ', '') + ' works</h2>' +
      t.what.map(function (p) { return '<p>' + p + '</p>'; }).join('') + note('Expanded copy is a draft built from Michelle\'s card copy. She reviews for accuracy before launch.') + '</div>' +
      '<div class="good-for"><h3>Good for</h3><div class="chips">' + t.goodFor.map(function (g) { return '<span class="chip">' + g + '</span>'; }).join('') + '</div>' +
      '<p class="not-for">' + t.notFor + '</p></div></div></div></section>' +

    '<section style="background:var(--cream)"><div class="wrap"><div class="section-head"><div class="eyebrow">Benefits</div><h2 class="section-title">What you can expect from ' + t.name.replace('Gel / Cutex ', 'a ') + '</h2></div>' +
      '<div class="ben-grid">' + t.benefits.map(function (b, i) { return '<div class="ben why-item"><div><div class="n">0' + (i + 1) + '</div><h3>' + b[0] + '</h3><p>' + b[1] + '</p></div></div>'; }).join('') + '</div></div></section>' +

    '<section><div class="wrap"><div class="section-head"><div class="eyebrow">Your appointment</div><h2 class="section-title">What happens on the day</h2></div>' +
      '<div class="steps">' + t.steps.map(function (s) { return '<div class="step faq-item" style="border:none;padding-bottom:0"><h3>' + s[0] + '</h3><p>' + s[1] + '</p></div>'; }).join('') + '</div></div></section>' +

    '<section><div class="wrap"><div class="section-head"><div class="eyebrow">At the salon</div><h2 class="section-title">' + t.name + ' at Fine Lines</h2>' +
      note(t.gallery ? 'Photos from the salon shoot, picked by Michelle. Before/after shots can be added later, only with the client\'s written consent.'
        : 'Gallery slots for the new shoot photos: 1 large + 4 small per treatment. Before/after shots only with the client\'s written consent.') + '</div>' +
      gallery + '</div></section>' +

    '<section style="background:var(--sage-soft)"><div class="wrap"><div class="after"><div><div class="eyebrow">Aftercare</div><h2 class="section-title" style="margin-bottom:26px">Looking after your skin afterwards</h2><ul>' +
      t.aftercare.map(function (a) { return '<li>' + a + '</li>'; }).join('') + '</ul>' + note('Aftercare points are a draft. Michelle to confirm against her own aftercare sheet.') + '</div>' +
      (paired.length
        ? '<div><div class="pair-head"><h3>Homecare to pair with it</h3><a href="shop.html">View all products &rarr;</a></div><div class="prod-grid three">' + paired.map(productCard).join('') + '</div></div>'
        : '<div class="good-for"><h3>Between appointments</h3><p style="font-size:14.5px;color:#4a4a42;margin:0 0 18px">Ask Michelle which homecare products will keep your results looking their best.</p><a class="btn btn-secondary btn-sm" href="shop.html">Browse homecare</a></div>') +
    '</div></div></section>' +

    '<section><div class="wrap"><div class="section-head center"><div class="eyebrow">Questions, answered</div><h2 class="section-title">' + t.name + ' FAQ</h2></div><div class="faq-list">' +
      t.faq.map(function (f) { return '<div class="faq-item"><div class="faq-q"><span class="qmark">Q</span>' + f[0] + '</div><div class="faq-a">' + f[1] + '</div></div>'; }).join('') + '</div></div></section>' +

    '<section style="background:var(--cream)"><div class="wrap"><div class="section-head"><div class="eyebrow">Explore</div><h2 class="section-title">Other treatments</h2></div><div class="other">' +
      TREATMENTS.filter(function (x) { return x.slug !== t.slug; }).map(function (x) {
        return '<a href="treatment.html?t=' + x.slug + '"><div class="om">' + (x.img ? '<img src="' + x.img + '" width="960" height="720" loading="lazy" alt="" />' : photo('Shoot photo', '')) + '</div><div class="ot"><b>' + x.name + '</b><span>' + x.short + '</span></div></a>';
      }).join('') + '</div></div></section>' +

    cta('Ready to book ' + t.name.replace('Gel / Cutex ', 'a ') + '?', 'Send Michelle a WhatsApp to book, or ask whether this treatment is right for your skin.');
}

/* ---------- shop page ---------- */
function renderShop(el) {
  var filters = ['All', 'Pigmentation', 'Acne', 'Anti-ageing', 'Sensitive', 'Hydration'];
  el.innerHTML =
    '<div class="page-hero" style="padding-bottom:56px"><div class="wrap">' +
      '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span>Shop Homecare</span></nav>' +
      '<div class="shop-head"><div class="eyebrow">Homecare</div><h1>Keep your results working at home</h1>' +
      '<p class="lead">The Lamelle products Michelle uses and recommends, chosen by skin concern. You order online and it is delivered to your door.</p>' +
      '<div class="hero-actions"><a class="btn btn-primary" href="#products">Browse products</a><a class="btn btn-secondary" href="' + wa('Hi Michelle, can you help me choose a homecare routine for my skin?') + '" target="_blank" rel="noopener">Help me choose</a></div></div>' +
    '</div></div>' +

    '<section style="padding:56px 0"><div class="wrap"><div class="how">' +
      '<div class="how-item"><div class="num">1</div><div><h3>Choose your products</h3><p>Filter by your skin concern, or use the routine Michelle gave you.</p></div></div>' +
      '<div class="how-item"><div class="num">2</div><div><h3>Order on Skin Confidence</h3><p>Each button opens the product on Lamelle\'s online store, linked to Fine Lines.</p></div></div>' +
      '<div class="how-item"><div class="num">3</div><div><h3>Delivered to your door</h3><p>Skin Confidence handles payment and delivery. Questions? Ask Michelle.</p></div></div>' +
    '</div></div></section>' +

    '<section id="products"><div class="wrap"><div class="section-head"><div class="eyebrow">The range</div><h2 class="section-title">Shop by skin concern</h2>' +
      note('Sample line-up of 12. Michelle to send her 10&ndash;15 picks with the product page link from her Skin Confidence account for each, so every button goes straight to that product with her affiliate code. Product photos come from Lamelle\'s media pack or the shoot.') + '</div>' +
      '<div class="filters" role="group" aria-label="Filter by concern"><span class="lbl">Concern</span>' +
      filters.map(function (f, i) { return '<button type="button" class="filter' + (i ? '' : ' on') + '" data-f="' + f + '">' + f + '</button>'; }).join('') +
      '<span class="count"></span></div>' +
      '<div class="prod-grid">' + PRODUCTS.map(productCard).join('') + '</div>' +
      '<p class="disclose">Products are sold and delivered by Skin Confidence. Fine Lines Aesthetic Salon may earn a commission on purchases made through these links, at no extra cost to you.</p>' +
    '</div></section>' +

    '<section style="background:var(--cream)"><div class="wrap"><div class="phil"><div class="phil-quote"><p class="pull">&ldquo;Professional treatments are an investment, but your homecare is what keeps that investment working every day.&rdquo;</p></div>' +
      '<div class="phil-body"><div class="eyebrow">No pressure</div><h2 class="section-title" style="margin-bottom:16px">You don\'t have to use Lamelle to book.</h2>' +
      '<p>Every client is free to choose the skincare they are comfortable with. These are simply the products Michelle trusts and uses in the salon, if you want a routine that matches your treatments.</p>' +
      '<a class="btn btn-secondary btn-sm" href="' + wa('Hi Michelle, can you help me choose a homecare routine for my skin?') + '" target="_blank" rel="noopener">Get a routine from Michelle</a></div></div></div></section>' +

    cta('Not sure where to start?', 'Send Michelle a WhatsApp with your skin concern and she will suggest a simple routine, or book a treatment and get one at your appointment.');

  var buttons = el.querySelectorAll('.filter');
  var cards = el.querySelectorAll('.prod');
  var count = el.querySelector('.count');
  function apply(f) {
    var n = 0;
    cards.forEach(function (c) {
      var show = f === 'All' || c.getAttribute('data-concerns').split('|').indexOf(f) > -1;
      c.hidden = !show;
      if (show) n++;
    });
    count.textContent = n + ' product' + (n === 1 ? '' : 's');
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      buttons.forEach(function (x) { x.classList.toggle('on', x === b); });
      apply(b.getAttribute('data-f'));
    });
  });
  apply('All');
}

/* ---------- home page fragments ---------- */
function renderHome() {
  var svc = document.getElementById('svc-list');
  if (svc) {
    svc.innerHTML = TREATMENTS.map(function (t, i) {
      var media = t.img ? '<img src="' + t.img + '" width="960" height="720" loading="lazy" alt="' + esc(t.name) + ' at Fine Lines Aesthetic Salon" />' : photo('Shoot photo', 'Brow / tint close-up');
      var ben = t.benefits.slice(0, 3).map(function (b) { return '<li>' + b[0] + '</li>'; }).join('');
      return '<div class="svc-card' + (i % 2 ? ' reverse' : '') + '"><div class="svc-media">' + media + '</div><div class="svc-content">' +
        '<h3 class="svc-name">' + t.name + '</h3>' + (t.tbc ? note('Shown only if Michelle confirms it as a full service.') : '') +
        '<div class="svc-desc">' + t.lead + '</div><ul class="svc-benefits">' + ben + '</ul>' +
        '<div class="svc-links"><a class="svc-link" href="treatment.html?t=' + t.slug + '">Read more about ' + t.name + ' &rarr;</a>' +
        '<a class="svc-more" href="' + wa('Hi there,\nI am interested in ' + t.name + ', can you tell me more.') + '" target="_blank" rel="noopener">or ask Michelle on WhatsApp</a></div></div></div>';
    }).join('');
  }
  var feat = document.getElementById('featured');
  if (feat) feat.innerHTML = PRODUCTS.filter(function (p) { return p.best; }).slice(0, 4).map(productCard).join('');
  var homeCta = document.getElementById('home-cta');
  if (homeCta) homeCta.outerHTML = cta('Let\'s talk about your skin', 'The fastest way to book a treatment or ask a question is a WhatsApp message straight to Michelle.');
}

/* ---------- boot ---------- */
(function () {
  document.body.insertAdjacentHTML('afterbegin', header());
  var main = document.getElementById('page');
  if (PAGE === 'treatment') renderTreatment(main);
  if (PAGE === 'shop') renderShop(main);
  if (PAGE === 'home') renderHome();
  document.body.insertAdjacentHTML('beforeend', footer());
  mockBar();
})();
