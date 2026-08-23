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

  /* Two input sources, one piece of state. On the split layout the cursor
     drives selection continuously. On the one-screen layout there is no
     scroll position left to read, so the first tap selects and previews and
     a second tap on the already-active item opens it.

     The hover binding is switched off there rather than gated on pointer
     type: a tap emits compatibility mouse events, so mouseenter would
     otherwise make the item active before its own click could see it. */
  var onePane = window.matchMedia('(max-width: 900px)');

  items.forEach(function (el, i) {
    el.addEventListener('mouseenter', function () { if (!onePane.matches) setActive(i); });
    el.addEventListener('focus', function () {
      /* keyboard focus previews; the focus a tap incidentally gives the link
         must not, or the tap's own click would find it already active */
      try { if (!el.matches(':focus-visible')) return; } catch (err) {}
      setActive(i);
    });
    el.addEventListener('click', function (e) {
      if (onePane.matches && i !== active) { e.preventDefault(); setActive(i); }
    });
  });

})();
