const variants = [
  ['Проклятие № 01', 'Алгоритмы отвернулись', 'Пусть его рекомендации навеки заполнят курсы успеха, бывшие и ролики, которые он уже видел трижды.', 'I', '#c31b3a', '#620817'],
  ['Проклятие № 02', 'Главная роль отменена', 'Пусть каждый его эффектный уход заканчивается возвращением за забытым телефоном.', 'II', '#aa122e', '#520510'],
  ['Проклятие № 03', 'Фронталка рассудила', 'Пусть камера всегда открывается снизу, случайно и при максимальной яркости экрана.', 'III', '#d24758', '#72101e'],
  ['Проклятие № 04', 'Юмор покинул чат', 'Пусть каждую его шутку переспрашивают, а после повторения она звучит как объяснительная.', 'IV', '#911027', '#41030d'],
  ['Проклятие № 05', 'Один процент навечно', 'Пусть телефон показывает 1% именно тогда, когда нужен билет, адрес или доказательство в переписке.', 'V', '#c72e45', '#670817'],
  ['Проклятие № 06', 'Wi-Fi вынес приговор', 'Пусть у него всегда будут все полоски связи и ни одного загруженного сообщения.', 'VI', '#b61a34', '#590612'],
  ['Проклятие № 07', 'Ошибка закреплена', 'Пусть ошибку в самом пафосном сообщении он замечает только после отметки «прочитано».', 'VII', '#d13a4f', '#75101e'],
  ['Проклятие № 08', 'Бывшие рекомендуются', 'Пусть алгоритм регулярно показывает ему, как прекрасно без него живут люди из прошлого.', 'VIII', '#9d142a', '#48040e'],
  ['Проклятие № 09', 'Голосовое затянулось', 'Пусть каждое его голосовое длится 4:59, начинается кашлем и заканчивается словами «короче, забыл».', 'IX', '#bc203b', '#610715'],
  ['Проклятие № 10', 'Кринж бессмертен', 'Пусть перед сном память включает лучшие моменты его позора в качестве 4K и без кнопки пропуска.', 'X', '#e05262', '#801322'],
  ['Проклятие № 11', 'Тишина его выдаст', 'Пусть его стул издаёт неприличный звук на каждой важной встрече и в каждом тихом помещении.', 'XI', '#a50d28', '#4d030e'],
  ['Проклятие № 12', 'Курьер всё знает', 'Пусть доставка звонит только тогда, когда он в душе, без штанов или наконец уснул.', 'XII', '#c82641', '#6b0918'],
  ['Проклятие № 13', 'Мем уже протух', 'Пусть каждый отправленный им мем оказывается баяном, который все видели ещё на прошлой работе.', 'XIII', '#8c0b22', '#3e020a'],
  ['Проклятие № 14', 'Лайк из прошлого', 'Пусть он случайно ставит сердечко фотографии 2017 года человеку, за которым тайно следил.', 'XIV', '#d03a51', '#74101d'],
  ['Проклятие № 15', 'Автозамена выбрала зло', 'Пусть автозамена делает его самые серьёзные сообщения нежными, странными и необъяснимыми.', 'XV', '#b51733', '#590512'],
  ['Проклятие № 16', 'Очередь проклята', 'Пусть любая выбранная им очередь замирает, пока соседние движутся со скоростью света.', 'XVI', '#cb2c46', '#6d0a18'],
  ['Проклятие № 17', 'Банк добавил драму', 'Пусть карта отклоняется на свидании, даже когда деньги есть, а уведомление приходит через десять минут.', 'XVII', '#961026', '#43030c'],
  ['Проклятие № 18', 'Приветствие не принято', 'Пусть он всегда машет в ответ человеку, который здоровался с кем-то у него за спиной.', 'XVIII', '#d94559', '#79121f'],
  ['Проклятие № 19', 'Микрофон был включён', 'Пусть кнопка mute предаёт его ровно в момент хруста, вздоха или честного мнения о созвоне.', 'XIX', '#ad1730', '#520511'],
  ['Проклятие № 20', 'Карма собрала комбо', 'Пусть мокрый носок, забытый пароль, разряженный телефон и сообщение «нам надо поговорить» приходят в один день.', 'XX', '#c4203d', '#650716'],
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
document.documentElement.classList.toggle('telegram-miniapp', Boolean(telegram?.initData));
telegram?.ready(); telegram?.expand();
telegram?.setHeaderColor?.('#130406'); telegram?.setBackgroundColor?.('#100204'); telegram?.setBottomBarColor?.('#100204');

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
