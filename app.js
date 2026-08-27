const variants = [
  ['Печать первая', 'Слово принято тьмой', 'Пусть каждый носок на его пути будет чуть влажным.', 'I', '#ff4d1c', '#ff7048'],
  ['Печать вторая', 'Ворон услышал', 'Пусть нужный автобус закрывает двери ровно перед ним.', 'II', '#c8ff37', '#8fc800'],
  ['Печать третья', 'Чаша переполнена', 'Пусть заряд его телефона всегда замирает на одном проценте.', 'III', '#f5c542', '#bd8100'],
  ['Печать четвёртая', 'Имя внесено в книгу', 'Пусть его рукава цепляются за каждую дверную ручку.', 'IV', '#ff63b6', '#d82786'],
  ['Печать пятая', 'Зеркало запомнило', 'Пусть камера всегда включается на фронтальную без предупреждения.', 'V', '#70e1ff', '#1595ba'],
  ['Печать шестая', 'Гром уже близко', 'Пусть очередь рядом всегда движется быстрее.', 'VI', '#b58cff', '#7540d8'],
  ['Печать седьмая', 'Свеча погасла', 'Пусть пароль оказывается неверным с первой попытки.', 'VII', '#ff8266', '#cf3e21'],
  ['Печать восьмая', 'Тени согласны', 'Пусть крышка всегда падает маслом вниз.', 'VIII', '#8dff9a', '#28a83b'],
  ['Печать девятая', 'Маятник качнулся', 'Пусть лифт уезжает за секунду до его прихода.', 'IX', '#ffd166', '#cb8d00'],
  ['Печать десятая', 'Проклятие обрело форму', 'Пусть чай остывает, а кофе остаётся слишком горячим.', 'X', '#f279ff', '#aa2fb5'],
  ['Печать одиннадцатая', 'Круг замкнулся', 'Пусть наушники запутываются даже в пустом кармане.', 'XI', '#4fe0c1', '#008a70'],
  ['Печать двенадцатая', 'Ночь поставила подпись', 'Пусть обновление начинается только когда он спешит.', 'XII', '#ff5f72', '#b91e33'],
  ['Печать тринадцатая', 'Знак оказался верным', 'Пусть пакет рвётся ровно у подъезда.', 'XIII', '#c5ff5a', '#7aaf13'],
  ['Печать четырнадцатая', 'Эхо повторило имя', 'Пусть любимая песня заедает на самом скучном месте.', 'XIV', '#60a5fa', '#1d66bd'],
  ['Печать пятнадцатая', 'Пепел лёг ровно', 'Пусть сдача всегда приходит мелочью.', 'XV', '#fbbf24', '#b77900'],
  ['Печать шестнадцатая', 'Звёзды отвернулись', 'Пусть реклама начинается перед самой важной сценой.', 'XVI', '#e879f9', '#9b2cab'],
  ['Печать семнадцатая', 'Чернила не сотрутся', 'Пусть нужная сторона USB находится только с третьей попытки.', 'XVII', '#34d399', '#087d58'],
  ['Печать восемнадцатая', 'Ветер унёс оправдания', 'Пусть подушка всегда будет тёплой с обеих сторон.', 'XVIII', '#fb7185', '#b42840'],
  ['Печать девятнадцатая', 'Судьба сделала пометку', 'Пусть интернет тормозит именно на последней минуте фильма.', 'XIX', '#a78bfa', '#6544bd'],
  ['Печать двадцатая', 'Проклимёт выстрелил', 'Пусть крошка в его кровати будет вечной и неуловимой.', 'XX', '#ff3d00', '#ff7a52'],
].map(([kicker, title, verdict, symbol, accent, glow], index) => ({ id: index + 1, kicker, title, verdict, symbol, accent, glow }));

const DRAFT_KEY = 'proklimet:draft';
const HISTORY_KEY = 'proklimet:history';
const formScreen = document.querySelector('#form-screen');
const resultScreen = document.querySelector('#result-screen');
const form = document.querySelector('#curse-form');
const nameInput = document.querySelector('#name');
const reasonInput = document.querySelector('#reason');
const counter = document.querySelector('#reason-counter');

const telegram = window.Telegram?.WebApp;
telegram?.ready(); telegram?.expand();
telegram?.setHeaderColor?.('#0b0a0d'); telegram?.setBackgroundColor?.('#0b0a0d'); telegram?.setBottomBarColor?.('#0b0a0d');

function syncViewport() {
  const stableHeight = telegram?.viewportStableHeight || window.visualViewport?.height || window.innerHeight;
  const visibleHeight = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty('--app-height', `${Math.round(stableHeight)}px`);
  document.documentElement.style.setProperty('--visual-viewport-height', `${Math.round(visibleHeight)}px`);
  document.documentElement.classList.toggle('keyboard-open', visibleHeight < stableHeight * 0.78);
}

syncViewport();
telegram?.onEvent?.('viewportChanged', syncViewport);
telegram?.onEvent?.('safeAreaChanged', syncViewport);
telegram?.onEvent?.('contentSafeAreaChanged', syncViewport);
window.visualViewport?.addEventListener('resize', syncViewport);
window.addEventListener('orientationchange', syncViewport);

try {
  const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
  nameInput.value = draft.name || ''; reasonInput.value = draft.reason || '';
} catch { localStorage.removeItem(DRAFT_KEY); }
counter.textContent = `${reasonInput.value.length}/300`;

function saveDraft() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify({ name: nameInput.value, reason: reasonInput.value }));
  counter.textContent = `${reasonInput.value.length}/300`;
}
nameInput.addEventListener('input', saveDraft);
reasonInput.addEventListener('input', saveDraft);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim(); const reason = reasonInput.value.trim();
  if (!name || !reason) return;
  let history = [];
  try { history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { history = []; }
  const previousVariant = history[0]?.variantId || 0;
  const pool = variants.filter((variant) => variant.id !== previousVariant);
  const variant = pool[Math.floor(Math.random() * pool.length)];
  const record = { id: crypto.randomUUID(), name, reason, variantId: variant.id, createdAt: new Date().toISOString() };
  localStorage.setItem(HISTORY_KEY, JSON.stringify([record, ...history].slice(0, 20)));
  telegram?.HapticFeedback?.impactOccurred('heavy');

  resultScreen.style.setProperty('--accent', variant.accent);
  resultScreen.style.setProperty('--glow', variant.glow);
  document.querySelector('#result-kicker').textContent = `${variant.kicker} · ${variant.symbol}`;
  document.querySelector('#result-symbol').textContent = variant.symbol;
  document.querySelector('#result-title').textContent = variant.title;
  document.querySelector('#result-name').textContent = name;
  document.querySelector('#result-reason').textContent = `«${reason}»`;
  document.querySelector('#result-verdict').textContent = variant.verdict;
  formScreen.classList.add('hidden'); resultScreen.classList.remove('hidden');
  telegram?.BackButton?.show();
  document.querySelector('#result-title').focus(); window.scrollTo(0, 0);
});

function resetCurse() {
  resultScreen.classList.add('hidden'); formScreen.classList.remove('hidden');
  nameInput.value = ''; reasonInput.value = ''; counter.textContent = '0/300';
  telegram?.BackButton?.hide();
  localStorage.removeItem(DRAFT_KEY); window.scrollTo(0, 0); nameInput.focus();
}

document.querySelector('#reset-button').addEventListener('click', resetCurse);
telegram?.BackButton?.onClick(resetCurse);
