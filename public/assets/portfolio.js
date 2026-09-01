/* One piece of state. The pill and the screen slot both read from it.
   Two input sources feed it — pointer hover and scroll position — but there
   is only one selection system (CLAUDE.md §1, interaction model). */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-project]'));
  var shots = Array.prototype.slice.call(document.querySelectorAll('[data-shot]'));
  if (!items.length || !shots.length) return;

  /* State A2. `More` replaces the canvas rather than expanding inline; the
     identity block is the fixed anchor and does not move. */
  var disclose = document.querySelector('.disclose');
  if (disclose) {
    var label = disclose.querySelector('.disclose-label');
    disclose.addEventListener('click', function () {
      var open = document.body.classList.toggle('is-about');
      disclose.setAttribute('aria-expanded', open ? 'true' : 'false');
      label.textContent = open ? 'Close' : 'More';
      if (open) window.scrollTo({ top: 0, behavior: 'auto' });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('is-about')) disclose.click();
    });
  }

  var active = -1;
  var swapTimer = null;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setActive(i) {
    if (i === active || i < 0 || i >= items.length) return;
    active = i;
    var key = items[i].getAttribute('data-project');

    /* The label changes immediately. The screen lags behind through the
       crossfade — that desync is deliberate, so don't synchronise them. */
    items.forEach(function (el, n) {
      el.classList.toggle('is-active', n === i);
      el.setAttribute('aria-current', n === i ? 'true' : 'false');
    });

    /* Crossfade through blank: everything fades out, then the incoming one
       fades up after the gap, leaving an empty screen at the midpoint. */
    clearTimeout(swapTimer);
    shots.forEach(function (img) { img.classList.remove('is-active'); });
    var gap = still.matches ? 0 : swapOut();
    swapTimer = setTimeout(function () {
      shots.forEach(function (img) {
        if (img.getAttribute('data-shot') === key) img.classList.add('is-active');
      });
    }, gap);
  }

  function swapOut() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--swap-out');
    var ms = parseFloat(v);
    if (!ms) return 100;
    return /\ds\s*$/.test(v.trim()) && !/ms/.test(v) ? ms * 1000 : ms;
  }

  setActive(0);

  /* Two input sources, one piece of state — never two selection systems.
     On the split layout the cursor drives it. On the pinned layout the list
     scrolls under the render and position drives it, with a tap able to
     take over: the first tap selects and previews, a second tap on the
     already-active item opens it.

     The hover binding is switched off on the pinned layout rather than
     gated on pointer type, and the focus preview is limited to
     :focus-visible — a tap emits compatibility mouseenter and focus events
     that would otherwise make the item active before its own click. */
  var pinned = window.matchMedia('(max-width: 900px)');

  items.forEach(function (el, i) {
    el.addEventListener('mouseenter', function () { if (!pinned.matches) setActive(i); });
    el.addEventListener('focus', function () {
      try { if (!el.matches(':focus-visible')) return; } catch (err) {}
      setActive(i);
    });
    el.addEventListener('click', function (e) {
      if (pinned.matches && i !== active) { e.preventDefault(); setActive(i); }
    });
  });

  /* Position-driven selection under the pinned render. The line sits just
     below the render; the item nearest it wins, and hitting the bottom of
     the page always resolves to the last item so a short list still gives
     every project its turn. */
  var io = null;
  var inBand = [];

  function resolve() {
    if (document.body.classList.contains('is-about')) return;
    var atEnd = window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4;
    if (atEnd) { setActive(items.length - 1); return; }
    if (!inBand.length) return;
    var stage = document.querySelector('.stage');
    var line = (stage ? stage.getBoundingClientRect().bottom : 0) +
               window.innerHeight * 0.06;
    var best = null, bestD = Infinity;
    inBand.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var d = Math.abs(r.top + r.height / 2 - line);
      if (d < bestD) { bestD = d; best = el; }
    });
    if (best) setActive(items.indexOf(best));
  }

  function observe() {
    if (io || !('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var at = inBand.indexOf(entry.target);
        if (entry.isIntersecting && at === -1) inBand.push(entry.target);
        if (!entry.isIntersecting && at !== -1) inBand.splice(at, 1);
      });
      resolve();
    }, { rootMargin: '-40% 0px -12% 0px', threshold: 0 });
    items.forEach(function (el) { io.observe(el); });
    window.addEventListener('scroll', resolve, { passive: true });
  }

  function unobserve() {
    if (!io) return;
    io.disconnect(); io = null; inBand = [];
    window.removeEventListener('scroll', resolve);
  }

  function sync() { pinned.matches ? observe() : unobserve(); }
  sync();
  pinned.addEventListener ? pinned.addEventListener('change', sync)
                          : pinned.addListener(sync);

})();

/* Case study: the floating back circle and the blurred band behind it both
   step aside once the footer scrolls into view, so neither lands on the
   contact button. The footer carries its own link back. */
(function () {
  var back = document.querySelector('.case-rail .back');
  var foot = document.querySelector('.case-foot');
  if (!back || !foot || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (entries) {
    document.body.classList.toggle('foot-in-view', entries[0].isIntersecting);
  }, { threshold: 0 }).observe(foot);
})();
