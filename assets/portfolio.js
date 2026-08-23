/* One piece of state. The pill and the screen slot both read from it.
   Two input sources feed it — pointer hover and scroll position — but there
   is only one selection system (CLAUDE.md §1, interaction model). */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-project]'));
  var shots = Array.prototype.slice.call(document.querySelectorAll('[data-shot]'));
  if (!items.length || !shots.length) return;

  var active = -1;

  function setActive(i) {
    if (i === active || i < 0 || i >= items.length) return;
    active = i;
    var key = items[i].getAttribute('data-project');
    items.forEach(function (el, n) {
      el.classList.toggle('is-active', n === i);
      el.setAttribute('aria-current', n === i ? 'true' : 'false');
    });
    shots.forEach(function (img) {
      img.classList.toggle('is-active', img.getAttribute('data-shot') === key);
    });
  }

  setActive(0);

  /* pointer: the desktop equivalent of the same coupling */
  items.forEach(function (el, i) {
    el.addEventListener('mouseenter', function () { setActive(i); });
    el.addEventListener('focus', function () { setActive(i); });
  });

  /* position: as the list moves under the pinned render, the active pill
     advances and the screen swaps to match */
  var positionDriven = window.matchMedia('(max-width: 900px)');
  var io = null;
  var inBand = [];

  /* the item nearest the selection line wins — a short list means several
     can sit in the band at once */
  function resolve() {
    if (!inBand.length) return;
    var line = window.innerHeight * 0.46;
    var best = null, bestD = Infinity;
    inBand.forEach(function (el) {
      var r = el.getBoundingClientRect();
      var d = Math.abs(r.top + r.height / 2 - line);
      if (d < bestD) { bestD = d; best = el; }
    });
    if (best) setActive(items.indexOf(best));
  }

  function observe() {
    if (io) return;
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var at = inBand.indexOf(entry.target);
        if (entry.isIntersecting && at === -1) inBand.push(entry.target);
        if (!entry.isIntersecting && at !== -1) inBand.splice(at, 1);
      });
      resolve();
    }, { rootMargin: '-40% 0px -20% 0px', threshold: 0 });
    items.forEach(function (el) { io.observe(el); });
    window.addEventListener('scroll', resolve, { passive: true });
  }

  function unobserve() {
    if (!io) return;
    io.disconnect();
    io = null;
    inBand = [];
    window.removeEventListener('scroll', resolve);
  }

  function sync() { positionDriven.matches ? observe() : unobserve(); }
  sync();
  positionDriven.addEventListener
    ? positionDriven.addEventListener('change', sync)
    : positionDriven.addListener(sync);
})();
