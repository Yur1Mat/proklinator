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
].map(([kicker, title, verdict, symbol], index) => {
  const palette = ['#ff438f', '#e0ff45', '#d887ff', '#ff7650', '#58f5dd'];
  const accent = palette[index % palette.length];
  return { id: index + 1, kicker, title, verdict, symbol, accent, glow: accent };
});

const DRAFT_KEY = 'proklimet:draft';
const HISTORY_KEY = 'proklimet:history';
const formScreen = document.querySelector('#form-screen');
const resultScreen = document.querySelector('#result-screen');
const form = document.querySelector('#curse-form');
const nameInput = document.querySelector('#name');
const reasonInput = document.querySelector('#reason');
const counter = document.querySelector('#reason-counter');
let currentCurse = null;
const actionStatus = document.querySelector('#action-status');
const BOT_URL = 'https://t.me/proklinayu_bot';
const shareButton = document.querySelector('#share-button');
let shareFile = null;
let shareObjectUrl = null;
let cardRevision = 0;
let currentLanguage = 'ru';
const LANGUAGE_KEY = 'proklimet:language';

function t(key, language = currentLanguage) {
  return translations[language][key];
}

function setLanguage(language) {
  currentLanguage = language === 'en' ? 'en' : 'ru';
  document.documentElement.lang = currentLanguage;
  document.title = t('brand');
  document.querySelector('meta[name="description"]').setAttribute('content', t('meta'));
  const labels = {
    '.intro h1': 'heading', '.description': 'description', 'label[for="name"]': 'name',
    'label[for="reason"]': 'reason', '.curse-button span': 'curse', 'footer': 'footer',
    '.reason-label': 'because', '.verdict span': 'verdict', '#pardon-button': 'pardon',
    '#reset-button': 'again', '#share-button': 'share', '#download-card': 'download',
    '#telegram-share': 'telegram', '#share-fallback p': 'fallback'
  };
  for (const [selector, key] of Object.entries(labels)) document.querySelector(selector).textContent = t(key);
  nameInput.placeholder = t('namePlaceholder');
  reasonInput.placeholder = t('reasonPlaceholder');
  document.querySelector('.language-switch').setAttribute('aria-label', t('language'));
  for (const locale of ['ru', 'en']) document.querySelector(`#language-${locale}`).setAttribute('aria-pressed', String(locale === currentLanguage));
  try { localStorage.setItem(LANGUAGE_KEY, currentLanguage); } catch { /* Language still works without storage. */ }
}

function loadCardImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image unavailable'));
    image.src = src;
  });
}

function cardText(ctx, text, y, font, color, width, lineHeight) {
  ctx.font = font;
  ctx.fillStyle = color;
  const lines = [];
  let line = '';
  for (const char of text) {
    if (char === '\n' || ctx.measureText(line + char).width > width) {
      lines.push(line.trim());
      line = char === '\n' ? '' : char;
    } else line += char;
  }
  if (line) lines.push(line.trim());
  for (const item of lines) { ctx.fillText(item, 540, y); y += lineHeight; }
  return y;
}

async function prepareShareCard() {
  const revision = ++cardRevision;
  const curse = { ...currentCurse };
  shareFile = null;
  shareButton.disabled = true;
  document.querySelector('#share-fallback').classList.add('hidden');
  if (shareObjectUrl) URL.revokeObjectURL(shareObjectUrl);
  shareObjectUrl = null;
  try {
    await document.fonts.ready;
    const emblem = await loadCardImage(curse.pardoned ? './app/angel-wings.png' : './app/ram-skull.png');
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 2600;
    const ctx = canvas.getContext('2d');
    const accent = curse.pardoned ? '#b5ff45' : curse.accent;
    const background = ctx.createRadialGradient(540, 350, 30, 540, 650, 1300);
    background.addColorStop(0, curse.pardoned ? '#246138' : '#581449');
    background.addColorStop(1, curse.pardoned ? '#06140b' : '#100312');
    ctx.fillStyle = background; ctx.fillRect(0, 0, 1080, 2600);
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    let y = cardText(ctx, `${t('curseNumber', curse.language).toUpperCase()} ${curse.code}`, 85, '26px "Old Standard TT"', accent, 920, 36);
    ctx.drawImage(emblem, 355, y + 10, 370, 370);
    y = cardText(ctx, curse.pardoned ? t('pardoned', curse.language) : curse.title, y + 400, '64px "Ruslan Display"', '#e9dfd2', 900, 70);
    y = cardText(ctx, curse.name, y + 32, '52px "Ruslan Display"', accent, 900, 60);
    y = cardText(ctx, t('because', curse.language).toUpperCase(), y + 28, '24px "Old Standard TT"', '#b4a89b', 900, 30);
    y = cardText(ctx, `«${curse.reason}»`, y + 16, 'italic 32px "Old Standard TT"', '#e9dfd2', 900, 42);
    ctx.strokeStyle = accent; ctx.beginPath(); ctx.moveTo(90, y + 25); ctx.lineTo(990, y + 25); ctx.stroke();
    y = cardText(ctx, t(curse.pardoned ? 'mercy' : 'verdict', curse.language).toUpperCase(), y + 55, '26px "Old Standard TT"', accent, 900, 34);
    y = cardText(ctx, curse.pardoned ? t('pardonVerdict', curse.language) : curse.verdict, y + 20, '34px "Old Standard TT"', '#e9dfd2', 900, 44);
    const footerY = Math.max(1625, y + 80);
    cardText(ctx, t('brand', curse.language), footerY, '38px "Ruslan Display"', accent, 900, 48);
    cardText(ctx, BOT_URL, footerY + 70, '30px "Old Standard TT"', '#e9dfd2', 900, 38);
    const output = document.createElement('canvas');
    output.width = 1080; output.height = footerY + 175;
    const outputContext = output.getContext('2d');
    outputContext.drawImage(canvas, 0, 0);
    outputContext.strokeStyle = accent; outputContext.lineWidth = 2;
    outputContext.strokeRect(30, 30, 1020, output.height - 60);
    const blob = await new Promise((resolve, reject) => output.toBlob(value => value ? resolve(value) : reject(new Error('Export failed')), 'image/png'));
    if (revision !== cardRevision) return;
    shareFile = new File([blob], `proklimet-${curse.code}.png`, { type: 'image/png' });
    shareObjectUrl = URL.createObjectURL(blob);
    const download = document.querySelector('#download-card');
    download.href = shareObjectUrl; download.download = shareFile.name;
    document.querySelector('#telegram-share').href = `https://t.me/share/url?url=${encodeURIComponent(BOT_URL)}&text=${encodeURIComponent(`${curse.name} — ${curse.pardoned ? t('pardoned', curse.language) : curse.title}`)}`;
  } catch {
    if (revision === cardRevision) actionStatus.textContent = t('imageError');
  } finally {
    if (revision === cardRevision) shareButton.disabled = false;
  }
}

function createCurseCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code;
  do {
    code = Array.from(crypto.getRandomValues(new Uint8Array(9)), value => alphabet[value % alphabet.length]).join('');
  } while (!/[A-Z]/.test(code) || !/[2-9]/.test(code));
  return code;
}

const telegram = window.Telegram?.WebApp;
let initialLanguage = telegram?.initDataUnsafe?.user?.language_code?.startsWith('en') ? 'en' : 'ru';
try {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  if (savedLanguage === 'ru' || savedLanguage === 'en') initialLanguage = savedLanguage;
} catch { /* Use the initial language. */ }
setLanguage(initialLanguage);
document.querySelector('#language-ru').addEventListener('click', () => setLanguage('ru'));
document.querySelector('#language-en').addEventListener('click', () => setLanguage('en'));
document.documentElement.classList.toggle('telegram-miniapp', Boolean(telegram?.initData));
telegram?.ready(); telegram?.expand();
telegram?.setHeaderColor?.('#130406'); telegram?.setBackgroundColor?.('#100204'); telegram?.setBottomBarColor?.('#100204');

function requestMobileFullscreen() {
  const isMobileTelegram = ['ios', 'android'].includes(telegram?.platform);
  if (!isMobileTelegram || telegram.isFullscreen ||
      !telegram.isVersionAtLeast?.('8.0') || typeof telegram.requestFullscreen !== 'function') return;
  try {
    telegram.requestFullscreen();
  } catch {
    // Older clients can reject fullscreen; the expanded Mini App remains usable.
    syncViewport();
  }
}

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
telegram?.onEvent?.('fullscreenChanged', syncViewport);
telegram?.onEvent?.('fullscreenFailed', syncViewport);
window.visualViewport?.addEventListener('resize', syncViewport);
window.addEventListener('orientationchange', syncViewport);
requestMobileFullscreen();

function clearInputs() {
  nameInput.value = '';
  reasonInput.value = '';
  counter.textContent = '0/300';
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* Storage may be unavailable. */ }
}

clearInputs();
window.addEventListener('pageshow', clearInputs);
telegram?.onEvent?.('activated', clearInputs);

function updateReasonCounter() {
  counter.textContent = `${reasonInput.value.length}/300`;
}
reasonInput.addEventListener('input', updateReasonCounter);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim(); const reason = reasonInput.value.trim();
  if (!name || !reason) return;
  let history = [];
  try { history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { history = []; }
  const previousVariant = history[0]?.variantId || 0;
  const pool = variants.filter((variant) => variant.id !== previousVariant);
  const variant = pool[Math.floor(Math.random() * pool.length)];
  const record = { id: crypto.randomUUID(), code: createCurseCode(), name, reason, variantId: variant.id, createdAt: new Date().toISOString() };
  const [title, verdict] = currentLanguage === 'en' ? englishVariants[variant.id - 1] : [variant.title, variant.verdict];
  currentCurse = { ...record, title, verdict, language: currentLanguage, accent: variant.accent, pardoned: false };
  actionStatus.textContent = '';
  document.querySelector('#pardon-button').disabled = false;
  resultScreen.classList.remove('pardoned');
  localStorage.setItem(HISTORY_KEY, JSON.stringify([record, ...history].slice(0, 20)));
  telegram?.HapticFeedback?.impactOccurred('heavy');

  resultScreen.style.setProperty('--accent', variant.accent);
  resultScreen.style.setProperty('--glow', variant.glow);
  document.querySelector('#result-kicker').textContent = `${t('curseNumber')} ${record.code}`;
  document.querySelector('#result-symbol').src = './app/ram-skull.png';
  document.querySelector('#result-title').textContent = title;
  document.querySelector('#result-name').textContent = name;
  document.querySelector('#result-reason').textContent = `«${reason}»`;
  document.querySelector('#result-verdict').textContent = verdict;
  formScreen.classList.add('hidden'); resultScreen.classList.remove('hidden');
  telegram?.BackButton?.show();
  document.querySelector('#result-title').focus(); window.scrollTo(0, 0);
  prepareShareCard();
});

function resetCurse() {
  currentCurse = null;
  cardRevision++;
  shareFile = null;
  if (shareObjectUrl) URL.revokeObjectURL(shareObjectUrl);
  shareObjectUrl = null;
  resultScreen.classList.add('hidden'); formScreen.classList.remove('hidden');
  clearInputs();
  telegram?.BackButton?.hide();
  window.scrollTo(0, 0); nameInput.focus();
}

document.querySelector('#reset-button').addEventListener('click', resetCurse);
telegram?.BackButton?.onClick(resetCurse);

document.querySelector('#pardon-button').addEventListener('click', () => {
  if (!currentCurse || currentCurse.pardoned) return;
  currentCurse.pardoned = true;
  let history = [];
  try { history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { /* No saved history. */ }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.map(record => record.id === currentCurse.id ? { ...record, pardoned: true } : record)));
  document.querySelector('#result-title').textContent = t('pardoned');
  document.querySelector('#result-verdict').textContent = t('pardonVerdict');
  resultScreen.classList.add('pardoned');
  document.querySelector('#result-symbol').src = './app/angel-wings.png';
  document.querySelector('#pardon-button').disabled = true;
  actionStatus.textContent = t('mercy');
  telegram?.HapticFeedback?.notificationOccurred('success');
  prepareShareCard();
});

document.querySelector('#share-button').addEventListener('click', async () => {
  if (!currentCurse) return;
  actionStatus.textContent = '';
  if (!shareFile) {
    await prepareShareCard();
    if (shareFile) actionStatus.textContent = t('imageReady');
    return;
  }
  try {
    if (navigator.share && navigator.canShare?.({ files: [shareFile] })) {
      await navigator.share({ title: t('brand'), files: [shareFile], text: BOT_URL });
    } else {
      document.querySelector('#share-fallback').classList.remove('hidden');
      actionStatus.textContent = t('unsupported');
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      document.querySelector('#share-fallback').classList.remove('hidden');
      actionStatus.textContent = t('shareError');
    }
  }
});
