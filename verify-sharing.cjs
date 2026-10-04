const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const nodes = new Map(), saved = new Map();
function node(id) {
  if (!nodes.has(id)) {
    const classes = new Set();
    nodes.set(id, { value: '', textContent: '', handlers: {}, style: { setProperty() {} },
      classList: { add: x => classes.add(x), remove: x => classes.delete(x), contains: x => classes.has(x), toggle() {} },
      focus() {}, addEventListener(type, fn) { this.handlers[type] = fn; } });
  }
  return nodes.get(id);
}
const context = { measureText: text => ({ width: text.length * 20 }), fillText() {}, fillRect() {}, strokeRect() {},
  drawImage() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, createRadialGradient: () => ({ addColorStop() {} }) };
let shared;
const pageEvents = {}, telegramEvents = {};
saved.set('proklimet:draft', JSON.stringify({ name: 'Старое имя', reason: 'Старая причина' }));
const ctx = {
  crypto: require('crypto').webcrypto, Uint8Array, File, URL,
  Image: class { set src(value) { this.onload(); } },
  document: { fonts: { ready: Promise.resolve() }, querySelector: node, documentElement: node('root'),
    createElement: () => ({ getContext: () => context, toBlob: callback => callback(new Blob(['png'], { type: 'image/png' })) }) },
  window: { innerHeight: 800, addEventListener: (type, fn) => { pageEvents[type] = fn; }, scrollTo() {}, Telegram: { WebApp: { ready() {}, expand() {}, platform: 'web', onEvent: (type, fn) => { telegramEvents[type] = fn; } } } },
  localStorage: { getItem: k => saved.get(k) || null, setItem: (k,v) => saved.set(k,v), removeItem: k => saved.delete(k) },
  navigator: { canShare: ({files}) => files[0].type === 'image/png', share: async data => { shared = data; } }
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('app.js', 'utf8'), ctx);
const settle = () => new Promise(resolve => setImmediate(resolve));
(async () => {
  assert.equal(node('#name').value, '');
  assert.equal(node('#reason').value, '');
  assert(!saved.has('proklimet:draft'));
  for (const reenter of [pageEvents.pageshow, telegramEvents.activated]) {
    node('#name').value = 'Черновик'; node('#reason').value = 'Причина';
    node('#reason').handlers.input();
    assert.equal(node('#reason-counter').textContent, '7/300');
    assert(!saved.has('proklimet:draft'));
    reenter();
    assert.equal(node('#name').value, ''); assert.equal(node('#reason').value, '');
    assert.equal(node('#reason-counter').textContent, '0/300');
  }
  node('#name').value = 'Имя'.repeat(20).slice(0,60);
  node('#reason').value = 'Причина '.repeat(50).slice(0,300);
  node('#curse-form').handlers.submit({ preventDefault() {} });
  await settle();
  assert.equal(node('#share-button').disabled, false);
  assert.equal(node('#result-symbol').src, './app/ram-skull.png');
  await node('#share-button').handlers.click();
  assert.equal(shared.files[0].type, 'image/png');
  assert.equal(shared.text, 'https://t.me/proklinayu_bot');
  node('#pardon-button').handlers.click();
  await settle();
  assert(node('#result-screen').classList.contains('pardoned'));
  assert.equal(node('#result-symbol').src, './app/angel-wings.png');
  assert.equal(node('#result-title').textContent, 'Помилован');
  assert(JSON.parse(saved.get('proklimet:history'))[0].pardoned);
  ctx.navigator.canShare = () => false;
  await node('#share-button').handlers.click();
  assert(!node('#share-fallback').classList.contains('hidden'));
  ctx.navigator.canShare = () => true;
  ctx.navigator.share = async () => { throw Object.assign(new Error(), { name: 'NotAllowedError' }); };
  await node('#share-button').handlers.click();
  assert(node('#action-status').textContent.includes('недоступно'));
  node('#reset-button').handlers.click();
  node('#curse-form').handlers.submit({ preventDefault() {} });
  console.log('PNG preparation, file sharing, pardon state, stored status and unsupported-browser fallback passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
