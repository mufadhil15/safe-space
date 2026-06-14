// =====================================================
// SAFE SPACE - JavaScript SPA Controller
// =====================================================

let currentPage = 1;
const totalPages = 8;
let clickedCards = new Set();
let checkedItems = new Set();

// ---- Navigation ----
function showPage(n) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active', 'fade-in'));
  const target = document.getElementById('page' + n);
  target.classList.add('active');
  requestAnimationFrame(() => target.classList.add('fade-in'));
  currentPage = n;
  updateNavDots();
  if (n === 8) triggerBadge();
}

function updateNavDots() {
  document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    const pg = i + 1;
    dot.classList.remove('active', 'done');
    if (pg === currentPage) dot.classList.add('active');
    else if (pg < currentPage) dot.classList.add('done');
  });
}

// ---- HALAMAN 1: BERANDA ----
document.getElementById('btn-start').addEventListener('click', () => {
  const msg = document.getElementById('welcome-msg');
  msg.style.display = 'block';
  document.getElementById('btn-start').disabled = true;
  setTimeout(() => { showPage(2); msg.style.display = 'none'; document.getElementById('btn-start').disabled = false; }, 2000);
});

// ---- HALAMAN 2: FLIP CARD ----
const flipWrapper = document.querySelector('.flip-card-wrapper');
flipWrapper.addEventListener('click', () => flipWrapper.classList.toggle('flipped'));

document.getElementById('btn-to-page3').addEventListener('click', () => showPage(3));

// ---- HALAMAN 3: BENTUK KEKERASAN ----
const violenceData = [
  { id: 'v1', icon: '👊', title: 'Kekerasan Fisik', desc: 'Tindakan menyakiti tubuh secara langsung seperti memukul, menendang, mendorong, atau mencubit.', detail: 'Kekerasan fisik adalah bentuk yang paling terlihat. Termasuk memukul, menendang, mendorong, mencakar, menarik rambut, hingga menggunakan benda untuk menyakiti. Meninggalkan bekas luka fisik yang nyata.', examples: ['Memukul dengan tangan atau benda', 'Mendorong hingga jatuh', 'Mencubit hingga memar', 'Menarik rambut'] },
  { id: 'v2', icon: '💬', title: 'Kekerasan Verbal', desc: 'Penggunaan kata-kata untuk menyakiti, mempermalukan, atau mengintimidasi seseorang.', detail: 'Kata-kata bisa melukai lebih dalam dari pukulan. Kekerasan verbal meliputi penghinaan, ancaman lisan, nama panggilan yang merendahkan, dan teriakan yang menakuti.', examples: ['Mengejek dan menghina', 'Mengancam dengan kata-kata', 'Mempermalukan di depan umum', 'Memaki dengan kata kasar'] },
  { id: 'v3', icon: '😔', title: 'Kekerasan Psikologis', desc: 'Tindakan memanipulasi, mengisolasi, atau mengintimidasi yang merusak kesehatan mental.', detail: 'Kekerasan psikologis tidak meninggalkan bekas fisik namun sangat merusak. Termasuk manipulasi emosi, isolasi sosial, gaslighting, dan pengendalian perilaku yang membuat korban merasa tidak berdaya.', examples: ['Mengontrol dan memanipulasi', 'Mengisolasi dari teman/keluarga', 'Membuat merasa bersalah terus', 'Gaslighting (memutarbalikkan fakta)'] },
  { id: 'v4', icon: '📱', title: 'Cyberbullying', desc: 'Pelecehan, intimidasi, atau penyebaran konten berbahaya melalui media digital dan internet.', detail: 'Di era digital, kekerasan bisa terjadi 24 jam. Cyberbullying meliputi penyebaran rumor online, komentar jahat di media sosial, doxxing, dan penyebaran foto/video privat tanpa izin.', examples: ['Komentar jahat di medsos', 'Menyebar rumor online', 'Mengecualikan dari grup chat', 'Membuat akun palsu untuk menghina'] },
  { id: 'v5', icon: '🚫', title: 'Kekerasan Seksual', desc: 'Segala tindakan seksual yang dilakukan tanpa persetujuan, termasuk pelecehan dan serangan seksual.', detail: 'Kekerasan seksual mencakup spektrum luas dari komentar tidak pantas hingga sentuhan tanpa izin. Setiap tindakan seksual tanpa persetujuan (consent) adalah kekerasan, apapun hubungan pelaku dengan korban.', examples: ['Sentuhan tanpa izin', 'Komentar/candaan seksual', 'Memaksa melihat konten vulgar', 'Pelecehan seksual verbal'] }
];

const cardsContainer = document.getElementById('violence-cards');
violenceData.forEach(v => {
  const card = document.createElement('div');
  card.className = 'violence-card';
  card.dataset.id = v.id;
  card.innerHTML = `<div class="card-check">✓</div><div class="card-icon">${v.icon}</div><h3>${v.title}</h3><p>${v.desc}</p>`;
  card.addEventListener('click', () => {
    clickedCards.add(v.id);
    card.classList.add('clicked');
    updateViolenceProgress();
    openModal(v);
  });
  cardsContainer.appendChild(card);
});

function updateViolenceProgress() {
  const pct = (clickedCards.size / violenceData.length) * 100;
  document.getElementById('violence-progress').style.width = pct + '%';
  document.getElementById('violence-progress-text').textContent = `${clickedCards.size} dari ${violenceData.length} bentuk kekerasan dipelajari`;
  document.getElementById('btn-to-page4').disabled = clickedCards.size < violenceData.length;
}

function openModal(v) {
  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-icon').textContent = v.icon;
  document.getElementById('modal-title').textContent = v.title;
  document.getElementById('modal-desc').textContent = v.detail;
  const list = document.getElementById('modal-examples');
  list.innerHTML = v.examples.map(e => `<li>${e}</li>`).join('');
  overlay.classList.add('show');
}

document.getElementById('modal-close').addEventListener('click', () => document.getElementById('modal-overlay').classList.remove('show'));
document.getElementById('modal-overlay').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('show'); });
document.getElementById('btn-to-page4').addEventListener('click', () => showPage(4));
updateViolenceProgress();

// ---- HALAMAN 4: SIMULASI CHAT ----
const chatScenario = {
  messages: [
    { from: 'left', text: 'Hei... aku mau cerita sesuatu. Tapi aku takut kamu nggak percaya.' },
    { from: 'left', text: 'Teman sekelasku, Rio, udah beberapa kali nyenggol aku di koridor. Katanya bercanda, tapi itu sakit banget. 😢' },
    { from: 'left', text: 'Kemarin dia ambil tasmu dan lempar ke tempat sampah di depan semua orang...' },
  ],
  choices: [
    { label: '😰 "Yaelah, lebay deh. Mungkin dia cuma bercanda doang."', key: 'dismiss' },
    { label: '🤝 "Aku percaya kamu. Itu bukan bercanda, itu kekerasan. Kamu mau cerita lebih lanjut?"', key: 'support' },
    { label: '😤 "Udah bales aja! Pukul balik dia!"', key: 'aggressive' },
  ],
  outcomes: {
    dismiss: { effect: '😔 Temanmu merasa tidak dipercaya dan menarik diri. Ia semakin terisolasi dan tidak berani cerita lagi.', lesson: '💡 Pelajaran: Meremehkan pengalaman korban adalah salah satu hambatan terbesar bagi mereka untuk mencari bantuan.' },
    support:  { effect: '💚 Temanmu merasa lega dan didengar. Ia berani menceritakan lebih banyak dan bersama-sama kalian mencari bantuan ke BK.', lesson: '💡 Pelajaran: Mendengarkan dengan empati adalah tindakan paling penting yang bisa kamu lakukan untuk seorang teman.' },
    aggressive: { effect: '⚠️ Situasi makin panas. Rio balik marah dan tindakan kekerasan meningkat. Keduanya malah kena masalah di sekolah.', lesson: '💡 Pelajaran: Membalas kekerasan dengan kekerasan bukan solusi. Eskalasi hanya memperburuk keadaan.' },
  }
};

let chatPhase = 'intro'; // intro | choices | result
let msgIndex = 0;

function initChat() {
  const chatArea = document.getElementById('chat-area');
  const choiceArea = document.getElementById('choice-area');
  chatArea.innerHTML = '';
  choiceArea.innerHTML = '';
  const resultEl = document.getElementById('chat-result');
  if (resultEl) resultEl.remove();
  msgIndex = 0;
  chatPhase = 'intro';
  document.getElementById('btn-to-page5').style.display = 'none';
  showNextMessage();
}

function showNextMessage() {
  if (msgIndex >= chatScenario.messages.length) {
    showChoices();
    return;
  }
  const chatArea = document.getElementById('chat-area');
  const dots = document.createElement('div');
  dots.className = 'typing-dots';
  dots.innerHTML = '<span></span><span></span><span></span>';
  chatArea.appendChild(dots);
  chatArea.scrollTop = chatArea.scrollHeight;
  setTimeout(() => {
    dots.remove();
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bubble-left';
    bubble.textContent = chatScenario.messages[msgIndex].text;
    chatArea.appendChild(bubble);
    chatArea.scrollTop = chatArea.scrollHeight;
    msgIndex++;
    setTimeout(showNextMessage, 800);
  }, 1200);
}

function showChoices() {
  const choiceArea = document.getElementById('choice-area');
  const label = document.createElement('p');
  label.style.cssText = 'font-size:0.8rem;color:#64748B;font-weight:600;margin-bottom:4px;';
  label.textContent = 'Pilih responsmu:';
  choiceArea.appendChild(label);
  chatScenario.choices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = c.label;
    btn.addEventListener('click', () => handleChoice(c.key));
    choiceArea.appendChild(btn);
  });
}

function handleChoice(key) {
  const chatArea = document.getElementById('chat-area');
  const choiceArea = document.getElementById('choice-area');
  const outcome = chatScenario.outcomes[key];
  const chosen = chatScenario.choices.find(c => c.key === key);
  const myBubble = document.createElement('div');
  myBubble.className = 'chat-bubble bubble-right';
  myBubble.textContent = chosen.label.replace(/^[\S]+ /, '');
  chatArea.appendChild(myBubble);
  chatArea.scrollTop = chatArea.scrollHeight;
  choiceArea.innerHTML = '';
  const result = document.createElement('div');
  result.id = 'chat-result';
  result.className = 'result-card';
  result.innerHTML = `<h4>Akibat Pilihanmu:</h4><p>${outcome.effect}</p><p class="lesson">${outcome.lesson}</p>`;
  document.querySelector('.phone-mockup').appendChild(result);
  const tryAgain = document.createElement('button');
  tryAgain.className = 'choice-btn';
  tryAgain.textContent = '🔄 Coba Pilihan Lain';
  tryAgain.addEventListener('click', initChat);
  const nextBtn = document.createElement('button');
  nextBtn.className = 'choice-btn';
  nextBtn.style.cssText = 'background: linear-gradient(135deg, #14B8A6, #3B82F6); color: white; border-color: transparent; font-weight: 600;';
  nextBtn.textContent = '▶ Lanjut ke Dampak';
  nextBtn.addEventListener('click', () => showPage(5));
  choiceArea.appendChild(tryAgain);
  choiceArea.appendChild(nextBtn);
}

document.addEventListener('DOMContentLoaded', () => {
  initChat();
  // Re-init when page4 becomes active
  const observer = new MutationObserver(() => {
    if (document.getElementById('page4').classList.contains('active') && chatPhase === 'intro' && msgIndex === 0) initChat();
  });
});

// ---- HALAMAN 5: DAMPAK ----
const impacts = [
  { icon: '🧠', title: 'Dampak Psikologis', desc: 'Korban dapat mengalami trauma jangka panjang, kecemasan kronis (anxiety), depresi, PTSD, hingga gangguan kepercayaan diri yang parah. Mereka sering merasa bersalah atas kejadian yang menimpa mereka.' },
  { icon: '📚', title: 'Dampak Akademik', desc: 'Penurunan drastis prestasi belajar, sulit berkonsentrasi di kelas, sering bolos, dan kehilangan minat pada sekolah. Dampak ini bisa mempengaruhi masa depan pendidikan dan karir.' },
  { icon: '👥', title: 'Dampak Sosial', desc: 'Korban cenderung menarik diri dari pergaulan, kesulitan membangun kepercayaan, kehilangan teman-teman, dan mengalami isolasi sosial yang berkepanjangan.' },
  { icon: '💪', title: 'Dampak Fisik', desc: 'Selain luka fisik langsung, stres akibat kekerasan menyebabkan gangguan tidur, sakit kepala, gangguan makan, dan penurunan imunitas tubuh yang mempengaruhi kesehatan jangka panjang.' },
];

const impactGrid = document.getElementById('impact-grid');
impacts.forEach(imp => {
  const card = document.createElement('div');
  card.className = 'impact-card';
  card.innerHTML = `<div class="impact-icon">${imp.icon}</div><h3>${imp.title}</h3><p style="font-size:0.85rem;color:#64748B;">Klik untuk selengkapnya ▾</p><div class="impact-expand"><p>${imp.desc}</p></div>`;
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    card.querySelector('p:not(.impact-expand p)').textContent = card.classList.contains('expanded') ? 'Klik untuk tutup ▴' : 'Klik untuk selengkapnya ▾';
  });
  impactGrid.appendChild(card);
});
document.getElementById('btn-to-page6').addEventListener('click', () => showPage(6));

// ---- HALAMAN 6: CHECKLIST ----
const checkItems = [
  { id: 'c1', label: 'Berani Bersuara', desc: 'Laporkan kekerasan kepada guru, orang tua, atau orang dewasa yang dipercaya.' },
  { id: 'c2', label: 'Jadi Bystander Aktif', desc: 'Jika melihat kekerasan, jangan diam. Tawarkan bantuan kepada korban dengan aman.' },
  { id: 'c3', label: 'Jaga Perkataan & Tindakan', desc: 'Sadar akan dampak kata-katamu. Hindari candaan yang merendahkan orang lain.' },
  { id: 'c4', label: 'Empati & Dengarkan', desc: 'Latih kemampuan mendengarkan aktif. Validasi perasaan teman yang bercerita.' },
  { id: 'c5', label: 'Kenali & Sebarkan Informasi', desc: 'Pelajari lebih lanjut tentang kekerasan dan bagikan pengetahuan kepada lingkunganmu.' },
];
const praiseMessages = [
  '🌟 Luar biasa! Kamu selangkah lebih dekat menjadi agen perubahan!',
  '💪 Bagus sekali! Komitmenmu sangat berarti!',
  '🎉 Keren! Terus semangat, kamu bisa!',
  '✨ Hebat! Lingkunganmu beruntung punya kamu!',
  '🏆 Sempurna! Kamu adalah pahlawan bagi sekitarmu!',
];
const checklistContainer = document.getElementById('checklist-items');
checkItems.forEach((item, i) => {
  const el = document.createElement('div');
  el.className = 'check-item';
  el.dataset.id = item.id;
  el.innerHTML = `<div class="custom-check"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="check-label"><p>${item.label}</p><span>${item.desc}</span></div>`;
  el.addEventListener('click', () => {
    if (checkedItems.has(item.id)) {
      checkedItems.delete(item.id);
      el.classList.remove('checked');
    } else {
      checkedItems.add(item.id);
      el.classList.add('checked');
      showToast(praiseMessages[i]);
    }
    const allDone = checkedItems.size >= checkItems.length;
    document.getElementById('btn-to-page7').style.display = allDone ? 'inline-flex' : 'none';
  });
  checklistContainer.appendChild(el);
});
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
document.getElementById('btn-to-page7').addEventListener('click', () => showPage(7));

// ---- HALAMAN 7: TEMAN BUTUH BANTUAN ----
document.querySelectorAll('.friend-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('open'));
});
document.getElementById('btn-to-page8').addEventListener('click', () => showPage(8));

// ---- HALAMAN 8: PENUTUP ----
function triggerBadge() {
  const badge = document.querySelector('.badge-animation');
  badge.style.animation = 'none';
  void badge.offsetWidth;
  badge.style.animation = 'badgePop 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
}
document.getElementById('btn-pledge').addEventListener('click', () => {
  const btn = document.getElementById('btn-pledge');
  btn.textContent = '🌟 Terima Kasih! Kamu adalah Agen Lingkungan Aman!';
  btn.style.background = 'linear-gradient(135deg, #FBBF24, #F59E0B)';
  btn.disabled = true;
  confettiBurst();
});
function confettiBurst() {
  const colors = ['#3B82F6','#14B8A6','#FBBF24','#F43F5E','#8B5CF6'];
  for (let i = 0; i < 60; i++) {
    const conf = document.createElement('div');
    conf.style.cssText = `position:fixed;top:${Math.random()*40+30}%;left:${Math.random()*100}%;width:${Math.random()*10+5}px;height:${Math.random()*10+5}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};pointer-events:none;z-index:9999;animation:confettiDrop 2s ease-out forwards;animation-delay:${Math.random()*0.5}s;`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 2500);
  }
}
const confettiStyle = document.createElement('style');
confettiStyle.textContent = '@keyframes confettiDrop{to{transform:translateY(100vh) rotate(720deg);opacity:0;}}';
document.head.appendChild(confettiStyle);

// ---- INIT ----
showPage(1);
document.querySelectorAll('.nav-dot').forEach((dot, i) => {
  dot.addEventListener('click', () => showPage(i + 1));
});

// ---- AUDIO FEEDBACK SYSTEM (Web Audio API — no file needed) ----
(function initAudio() {
  let ctx = null;

  // Lazy-init AudioContext on first user gesture (required by browsers)
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Hover: lembut "tick" — sine wave pendek, frekuensi tinggi, volume kecil
  function playHover() {
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain);
      gain.connect(c.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, c.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, c.currentTime + 0.07);
      gain.gain.setValueAtTime(0.08, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.1);
      osc.start(c.currentTime);
      osc.stop(c.currentTime + 0.1);
    } catch (e) {}
  }

  // Click: tegas "pop" konfirmasi — dua nada naik cepat
  function playClick() {
    try {
      const c = getCtx();
      [0, 0.06].forEach((delay, i) => {
        const osc = c.createOscillator();
        const gain = c.createGain();
        osc.connect(gain);
        gain.connect(c.destination);
        osc.type = 'triangle';
        const freq = i === 0 ? 520 : 780;
        osc.frequency.setValueAtTime(freq, c.currentTime + delay);
        gain.gain.setValueAtTime(0.18, c.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + delay + 0.12);
        osc.start(c.currentTime + delay);
        osc.stop(c.currentTime + delay + 0.12);
      });
    } catch (e) {}
  }

  // Selector semua varian kartu
  const cardSelectors = [
    '.flip-card-wrapper',
    '.violence-card',
    '.impact-card',
    '.friend-card',
    '.check-item',
  ];

  function attachAudio(el) {
    if (el._audioAttached) return; // cegah duplikasi listener
    el._audioAttached = true;
    el.addEventListener('mouseenter', playHover);
    el.addEventListener('click', playClick);
  }

  // Elemen statis yang sudah ada saat script berjalan
  document.querySelectorAll(cardSelectors.join(',') + ', button').forEach(attachAudio);

  // Elemen dinamis (dibuat oleh JS seperti .violence-card & .impact-card)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const isCard = cardSelectors.some(sel => node.matches && node.matches(sel));
        if (isCard || node.matches('button')) attachAudio(node);
        node.querySelectorAll(cardSelectors.join(',') + ', button').forEach(attachAudio);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
