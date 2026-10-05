const translations = {
  ru: {
    brand: 'PRO*КЛЯНИ', heading: 'Прокляни', description: 'Назови имя, изложи причину — и пусть случай решит, какое проклятие настигнет виновного.',
    name: 'Имя', namePlaceholder: 'Кого проклинаем?', reason: 'За что проклинаю', reasonPlaceholder: 'Опиши проступок во всех подробностях…',
    curse: 'Проклинаю', footer: 'Никакой магии. Только заслуженное облегчение.', because: 'за то, что', verdict: 'Приговор',
    pardon: 'Помиловать', pardoned: 'Помилован', again: 'Проклясть ещё', share: 'Поделиться', download: 'Сохранить картинку', telegram: 'Открыть Telegram',
    fallback: 'Сохрани картинку и прикрепи её в выбранном чате.', curseNumber: 'Проклятие №', mercy: 'Милость дарована.',
    pardonVerdict: 'Проклятие снято. Сегодня тьма отпускает с миром.',
    imageError: 'Картинка не загрузилась. Нажми «Поделиться», чтобы попробовать ещё раз.',
    imageReady: 'Картинка готова. Нажми «Поделиться» для отправки.',
    unsupported: 'Здесь системная отправка файлов недоступна. Сохрани картинку для отправки.',
    shareError: 'Окно отправки недоступно. Картинку можно сохранить и отправить вручную.',
    meta: 'Назови имя и причину — получи одно из двадцати проклятий.', language: 'Язык'
  },
  en: {
    brand: 'PRO*КЛЯНИ', heading: 'Curse', description: 'Name the culprit, tell us why — and let fate pick the curse they deserve.',
    name: 'Name', namePlaceholder: 'Who deserves a curse?', reason: 'What did they do?', reasonPlaceholder: 'Tell us every wicked detail…',
    curse: 'I curse you', footer: 'No magic. Just well-earned relief.', because: 'for', verdict: 'Verdict',
    pardon: 'Pardon', pardoned: 'Pardoned', again: 'Curse again', share: 'Share', download: 'Save image', telegram: 'Open Telegram',
    fallback: 'Save the image and attach it in the chat of your choice.', curseNumber: 'Curse No.', mercy: 'Mercy granted.',
    pardonVerdict: 'The curse is lifted. Today, the darkness lets you go in peace.',
    imageError: 'The image could not load. Tap Share to try again.', imageReady: 'Your image is ready. Tap Share to send it.',
    unsupported: 'File sharing is unavailable here. Save the image to send it.',
    shareError: 'The share window is unavailable. Save the image and send it manually.',
    meta: 'Name the culprit and tell us why — get one of twenty curses.', language: 'Language'
  }
};

const englishVariants = [
  ['The algorithm abandoned you', 'May your feed forever be full of hustle courses, exes, and videos you have already watched three times.'],
  ['Main character revoked', 'May every dramatic exit end with you coming back for your forgotten phone.'],
  ['The selfie camera has spoken', 'May your camera always open from below, by accident, with the screen at full brightness.'],
  ['Humor left the chat', 'May everyone ask you to repeat your joke, until it sounds like an incident report.'],
  ['One percent forever', 'May your phone hit 1% whenever you need a ticket, an address, or receipts from the chat.'],
  ['Wi-Fi passed judgment', 'May you always have full signal and not a single message that will load.'],
  ['The typo is permanent', 'May you spot the typo in your most dramatic message only after it is marked as read.'],
  ['Your exes are trending', 'May the algorithm keep showing you how beautifully everyone from your past is living without you.'],
  ['The voice note never ends', 'May every voice note you send last 4:59, begin with a cough, and end with “anyway, I forgot.”'],
  ['Cringe is immortal', 'May your brain replay your greatest humiliations in 4K every night, with no skip button.'],
  ['Silence will expose you', 'May your chair make an indecent noise at every important meeting and in every quiet room.'],
  ['The courier knows', 'May deliveries call only when you are in the shower, without pants, or finally asleep.'],
  ['That meme expired', 'May every meme you send be one everyone already saw at their previous job.'],
  ['A like from the past', 'May you accidentally like a photo from 2017 while stalking someone in secret.'],
  ['Autocorrect chose evil', 'May autocorrect turn your most serious messages into something tender, weird, and impossible to explain.'],
  ['The queue is cursed', 'May every queue you choose freeze while the one beside it moves at the speed of light.'],
  ['Your bank loves drama', 'May your card decline on a date despite having money, with the notification arriving ten minutes later.'],
  ['That wave was not for you', 'May you always wave back at someone who was greeting the person behind you.'],
  ['Your mic was on', 'May mute betray you exactly when you crunch, sigh, or share your honest opinion about the call.'],
  ['Karma landed a combo', 'May a wet sock, a forgotten password, a dead phone, and “we need to talk” all arrive on the same day.']
];
