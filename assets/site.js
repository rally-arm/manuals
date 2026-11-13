
(function(){
  const G = {'0':'abcdef','1':'bc','2':'abged','3':'abgcd','4':'fgbc','5':'afgcd','6':'afgedc','7':'abc','8':'abcdefg','9':'abcdfg',
    'A':'abcefg','a':'abcdeg','b':'cdefg','B':'cdefg','C':'adef','c':'deg','d':'bcdeg','D':'bcdeg','E':'adefg','e':'abdefg','F':'aefg','f':'aefg','G':'acdef','g':'abcdfg',
    'H':'bcefg','h':'cefg','I':'ef','i':'c','J':'bcde','L':'def','l':'ef','n':'ceg','N':'abcef','o':'cdeg','O':'abcdef','P':'abefg','p':'abefg','r':'eg','R':'eg',
    'S':'afgcd','s':'afgcd','t':'defg','T':'defg','U':'bcdef','u':'cde','y':'bcdfg','Y':'bcdfg','-':'g','_':'d','°':'abfg',' ':''};
  const W = 30, H = 52, T = 6, SK = 5, GAP = 9;
  function seg(x, name){
    const L = x, R = x + W, mid = H / 2, g = 1.2;
    const hz = (y, x1, x2) => [[x1+g,y],[x1+g+T/2,y-T/2],[x2-g-T/2,y-T/2],[x2-g,y],[x2-g-T/2,y+T/2],[x1+g+T/2,y+T/2]];
    const vt = (xx, y1, y2) => [[xx,y1+g],[xx+T/2,y1+g+T/2],[xx+T/2,y2-g-T/2],[xx,y2-g],[xx-T/2,y2-g-T/2],[xx-T/2,y1+g+T/2]];
    const P = {a:hz(T/2,L,R), g:hz(mid,L,R), d:hz(H-T/2,L,R), f:vt(L+T/2,T/2,mid), b:vt(R-T/2,T/2,mid), e:vt(L+T/2,mid,H-T/2), c:vt(R-T/2,mid,H-T/2)}[name];
    return P.map(([px,py]) => (px + SK * (H - py) / H).toFixed(1) + ',' + py.toFixed(1)).join(' ');
  }
  function draw(el, text){
    const cells = [];
    for (const ch of text){ if (ch === '.' && cells.length) cells[cells.length - 1].dp = true; else cells.push({ch, dp:false}); }
    let svg = '', x = 2;
    cells.forEach(c => {
      const on = G[c.ch] || '';
      'abcdefg'.split('').forEach(s => { svg += '<polygon points="' + seg(x, s) + '" fill="' + (on.includes(s) ? '#ff3b2a' : '#2a1a19') + '"/>'; });
      svg += '<circle cx="' + (x + W + 4.5) + '" cy="' + (H - 3) + '" r="3" fill="' + (c.dp ? '#ff3b2a' : '#2a1a19') + '"/>';
      x += W + GAP + 3;
    });
    el.innerHTML = '<svg viewBox="0 0 ' + (x + SK) + ' ' + H + '" aria-hidden="true">' + svg + '</svg>';
    el.setAttribute('aria-label', text.trim());
  }
  document.querySelectorAll('[data-seg]').forEach(el => draw(el, el.dataset.seg));
  // live clock on clock examples
  const clocks = document.querySelectorAll('.lcd[data-clock] .lrow:first-child');
  if (clocks.length){
    const p2 = n => (n < 10 ? '0' : '') + n;
    const tick = () => { const d = new Date(); const t = (d.getHours() < 10 ? ' ' : '') + d.getHours() + '.' + p2(d.getMinutes()) + '.' + p2(d.getSeconds()); clocks.forEach(c => draw(c, t)); };
    tick(); setInterval(tick, 1000);
  }
})();

const nav = document.querySelector('.nav'), btn = document.getElementById('menuBtn');
if (btn) { btn.addEventListener('click', () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); }); }

// ===== メニューを全ページで rally-arm.com と同じ構成にそろえる（Store を追加） =====
(function(){
  const STORE = 'https://rallymonitor.saleshop.jp/';
  const items = [
    ['Home', 'https://www.rally-arm.com/'],
    ['GNSS models', 'https://www.rally-arm.com/p/gnss-model.html'],
    ['Speed-signal models', 'https://www.rally-arm.com/p/speed-signal-model.html'],
    ['User manuals', 'https://manual.rally-arm.com/'],
    ['Application', 'https://www.rally-arm.com/p/arm.html'],
    ['About', 'https://www.rally-arm.com/p/about-us.html'],
    ['Contact', 'https://www.rally-arm.com/p/contact-us.html']
  ];
  const menu = document.getElementById('menu');
  if (menu) {
    menu.innerHTML = items.map(([t, u]) => '<li><a href="' + u + '">' + t + '</a></li>').join('')
      + '<li class="sm-only"><a href="' + STORE + '">Store</a></li>';
  }
  const cta = document.querySelector('.nav .cta');
  if (cta) { cta.href = STORE; cta.textContent = 'Store'; }
  const fl = document.querySelector('footer ul');
  if (fl && !fl.querySelector('a[href^="' + STORE + '"]')) {
    fl.insertAdjacentHTML('beforeend', '<li><a href="' + STORE + '">Store</a></li>');
  }
})();
