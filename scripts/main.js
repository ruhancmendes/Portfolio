const CERTS = [
  { img: 'assets/certificado-fullstack.png', title: 'Fullstack', sub: 'Rocketseat · 28/11/2025' },
  { img: 'assets/certificado-introducao-ao-react.png', title: 'Introdução ao React', sub: 'Rocketseat · 28/11/2025' },
  { img: 'assets/certificado-introducao-ao-nodejs.png', title: 'Introdução ao Node.js', sub: 'Rocketseat · 29/09/2025' },
  { img: 'assets/certificado-java.png', title: 'JavaScript', sub: 'Rocketseat · 23/06/2025' },
  { img: 'assets/certificado-html-e-css.png', title: 'Fundamentos de HTML e CSS', sub: 'Rocketseat · 13/01/2025' },
  { img: 'assets/certificado-git-e-github.png', title: 'O básico de Git e GitHub', sub: 'Rocketseat · 27/11/2024' },
  { img: 'assets/certificado-discover.png', title: 'Discover', sub: 'Rocketseat · 26/11/2024' },
];

const PROJECTS = {
  zingen: { img: 'assets/zingen-captura.png', alt: 'Captura da landing page Zingen', title: 'Zingen', kicker: 'DESAFIO ROCKETSEAT', desc: 'Landing page responsiva de um aplicativo fictício, desenvolvida como desafio prático da formação Full-Stack da Rocketseat. O objetivo foi criar um site que funcione bem tanto no desktop quanto no mobile, com foco em responsividade, abordagem mobile first e media queries. Prototipado no Figma e versionado com Git e GitHub.', tags: ['HTML', 'CSS', 'FIGMA', 'MOBILE FIRST'], code: 'https://github.com/ruhancmendes/Projeto-Zingen', site: 'https://ruhancmendes.github.io/Projeto-Zingen/' },
  jogo: { img: 'assets/jogo-captura.png', alt: 'Captura do Jogo da Palavra', title: 'Jogo da Palavra', kicker: 'PROJETO DE ESTUDOS', desc: 'Aplicação web de um jogo de adivinhar a palavra, desenvolvida no curso Full-Stack da Rocketseat para aplicar os conceitos de React. O jogo conta com validações, histórico de tentativas, dicas e palpites.', tags: ['REACT', 'TYPESCRIPT', 'VITE', 'CSS MODULES'], code: 'https://github.com/ruhancmendes/projeto-jogo', site: 'https://projeto-adivinhe-three.vercel.app/' },
  lp: { img: 'assets/lp-captura.png', alt: 'Captura da landing page Encantos Literários', title: 'Encantos Literários', kicker: 'FORMAÇÃO FULL-STACK', desc: 'Landing page responsiva para um clube de assinatura de livros, desenvolvida na formação Full-Stack da Rocketseat. O objetivo foi criar uma página responsiva explorando animações e transições feitas em CSS, com foco em CSS Animations, CSS Transitions, CSS Functions e responsividade. Prototipada no Figma e versionada com Git e GitHub.', tags: ['HTML', 'CSS', 'FIGMA', 'ANIMAÇÕES'], code: 'https://github.com/ruhancmendes/Projeto-LP-Clube-de-Assinantes', site: 'https://ruhancmendes.github.io/Projeto-LP-Clube-de-Assinantes/' },
  refund: { img: 'assets/refund-captura.png', alt: 'Captura do sistema Refund', title: 'Refund', kicker: 'FORMAÇÃO FULL-STACK', desc: 'Sistema de solicitação de reembolso desenvolvido em JavaScript na formação Full-Stack da Rocketseat. O usuário informa o nome, a categoria e o valor da despesa, e as solicitações são listadas com o total somado. O foco do projeto foi JavaScript, funções, eventos e usabilidade. Prototipado no Figma e versionado com Git e GitHub.', tags: ['HTML', 'CSS', 'JAVASCRIPT', 'FIGMA'], code: 'https://github.com/ruhancmendes/Projeto-Refund', site: 'https://ruhancmendes.github.io/Projeto-Refund/' },
  lista: { img: 'assets/lista-captura.png', alt: 'Captura da lista de compras Quicklist', title: 'Quicklist', kicker: 'FORMAÇÃO FULL-STACK', desc: 'Site responsivo de lista de compras onde o usuário pode adicionar e remover itens, desenvolvido na formação Full-Stack da Rocketseat. O objetivo foi estudar os conceitos introdutórios de JavaScript, com foco em manipulação da DOM, funções e eventos. Prototipado no Figma e versionado com Git e GitHub.', tags: ['HTML', 'CSS', 'JAVASCRIPT', 'DOM'], code: 'https://github.com/ruhancmendes/Projeto-Lista-de-compras', site: 'https://ruhancmendes.github.io/Projeto-Lista-de-compras/' },
};

const $ = (sel) => document.querySelector(sel);
const root = document.documentElement;

/* ---------- theme ---------- */
const themeBtn = $('#theme-toggle');
const pfp = $('#pfp');

function applyTheme(theme) {
  root.dataset.theme = theme;
  pfp.src = theme === 'light' ? 'assets/pfp_claro.jpg' : 'assets/pfp_escuro.jpg';
  themeBtn.textContent = theme === 'light' ? '☾ Noite' : '☀ Dia';
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
applyTheme(saved === 'light' ? 'light' : 'dark');

themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

/* ---------- certificates ---------- */
const certGrid = $('#cert-grid');
CERTS.forEach((c, i) => {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'cert';
  el.dataset.cert = i;
  el.innerHTML = `<img src="${c.img}" alt="Certificado ${c.title} — Rocketseat" loading="lazy">
    <span class="cert__body"><span class="cert__title">${c.title}</span><span class="cert__sub">${c.sub}</span></span>`;
  certGrid.appendChild(el);
});

/* ---------- dialogs ---------- */
const projOverlay = $('#proj-dialog');
const certOverlay = $('#cert-dialog');

function openProject(key) {
  const p = PROJECTS[key];
  $('#proj-img').src = p.img;
  $('#proj-img').alt = p.alt;
  $('#proj-title').textContent = p.title;
  $('#proj-kicker').textContent = p.kicker;
  $('#proj-desc').textContent = p.desc;
  $('#proj-tags').innerHTML = p.tags.map((t) => `<span>${t}</span>`).join('');
  $('#proj-code').href = p.code;
  $('#proj-site').href = p.site;
  projOverlay.classList.add('is-open');
}

function openCert(i) {
  const c = CERTS[i];
  $('#cert-img').src = c.img;
  $('#cert-img').alt = `Certificado ${c.title} — Rocketseat`;
  $('#cert-title').textContent = c.title;
  $('#cert-sub').textContent = c.sub;
  certOverlay.classList.add('is-open');
}

function closeAll() {
  projOverlay.classList.remove('is-open');
  certOverlay.classList.remove('is-open');
}

document.addEventListener('click', (e) => {
  const proj = e.target.closest('[data-project]');
  if (proj) return openProject(proj.dataset.project);
  const cert = e.target.closest('[data-cert]');
  if (cert) return openCert(Number(cert.dataset.cert));
  if (e.target.closest('[data-close]') || e.target.classList.contains('overlay')) closeAll();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAll();
});
