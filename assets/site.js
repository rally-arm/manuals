
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
// ===== ロゴの文字を画像に差し替える（画像本来の比率で表示） =====
document.querySelectorAll('.logo').forEach(a => {
  if (a.querySelector('.logo-mark')) return;
  a.innerHTML = '<img class="logo-mark" src="https://manual.rally-arm.com/assets/arm-logo.png" alt="ARM products">';
});

// ===== マニュアル一覧：各カードに GNSS／Speed signal のアイコンを表示 =====
(function(){
  const cards = document.querySelectorAll('.mcard');
  if (!cards.length) return;
  // アイコン（トップページと同じ図柄）を1回だけ定義
  let grooves = '';
  for (let a = 0; a < 360; a += 15) grooves += '<rect x="252" y="50" width="8" height="20" rx="2" transform="rotate(' + a + ' 256 256)"/>';
  let lugs = '';
  for (let a = 0; a < 360; a += 45) lugs += '<rect x="242" y="156" width="28" height="30" rx="4" transform="rotate(' + a + ' 256 256)"/>';
  let pins = '';
  [-45, -18, 9, 36].forEach(x => { pins += '<rect x="' + x + '" y="-76" width="12" height="18" rx="4"/><rect x="' + x + '" y="58" width="12" height="18" rx="4"/>'; });
  [-42, -15, 12, 39].forEach(y => { pins += '<rect x="-86" y="' + y + '" width="18" height="12" rx="4"/><rect x="68" y="' + y + '" width="18" height="12" rx="4"/>'; });
  document.body.insertAdjacentHTML('afterbegin',
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<mask id="armi-tire"><rect width="512" height="512" fill="black"/><circle cx="256" cy="256" r="205" fill="white"/><circle cx="256" cy="256" r="142" fill="black"/><g fill="black">' + grooves + '</g></mask>' +
    '<mask id="armi-hub"><rect width="512" height="512" fill="black"/><circle cx="256" cy="256" r="130" fill="white"/><circle cx="256" cy="256" r="114" fill="black"/><circle cx="256" cy="256" r="78" fill="white"/><g fill="white">' + lugs + '</g><circle cx="256" cy="256" r="28" fill="black"/></mask>' +
    '<symbol id="armi-gnss" viewBox="56 91 366 366"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="18"><path d="M 155 135 A 160 160 0 0 1 380 355"/><path d="M 185 175 A 115 115 0 0 1 340 325"/><path d="M 215 215 A 70 70 0 0 1 300 295"/></g>' +
      '<line x1="230" y1="282" x2="255" y2="257" stroke="currentColor" stroke-width="14" stroke-linecap="round"/><circle cx="258" cy="254" r="14" fill="currentColor"/>' +
      '<g transform="translate(185,330) rotate(35)"><g fill="currentColor">' + pins + '</g><rect x="-70" y="-60" width="140" height="120" rx="22" fill="none" stroke="currentColor" stroke-width="14"/><rect x="-54" y="-44" width="108" height="88" rx="12" fill="none" stroke="currentColor" stroke-width="6"/></g></symbol>' +
    '<symbol id="armi-speed" viewBox="41 41 430 430"><circle cx="256" cy="256" r="225" fill="currentColor" mask="url(#armi-tire)"/><circle cx="256" cy="256" r="225" fill="currentColor" mask="url(#armi-hub)"/></symbol>' +
    '</defs></svg>');
  cards.forEach(card => {
    const shot = card.querySelector('.shot');
    if (!shot || shot.querySelector('.mtype')) return;
    const txt = ((card.querySelector('.model') || {}).textContent || '') + ' ' + ((card.querySelector('h3') || {}).textContent || '');
    const type = card.dataset.type || (/GPS|TT Raid|G-Trip/i.test(txt) ? 'gnss' : 'speed');
    shot.insertAdjacentHTML('beforeend',
      '<span class="mtype mtype-' + type + '"><svg aria-hidden="true"><use href="#armi-' + type + '"/></svg>' + (type === 'gnss' ? 'GNSS' : 'Speed signal') + '</span>');
  });
})();
