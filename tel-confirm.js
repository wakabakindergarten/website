/* 電話をかける前に確認画面を表示する（全ページ共通） */
(function () {
  'use strict';
  if (typeof HTMLDialogElement === 'undefined') return; // 非対応ブラウザでは通常の電話リンクのまま

  var TEL_HREF = 'tel:0527823651';
  var TEL_LABEL = '052-782-3651';
  var LABEL_SELECTOR = '.ct-call > span, div.call > span'; // 「お電話でのお問い合わせ」の文字

  var style = document.createElement('style');
  style.textContent =
    '.tc-label{cursor:pointer}' +
    '.tc-label:hover{text-decoration:underline}' +
    '.tc-label:focus-visible{outline:2px solid #f3c94a;outline-offset:2px;border-radius:4px}' +
    '.tc-dialog{width:min(340px,calc(100vw - 32px));margin:auto;padding:26px 22px 22px;border:0;border-radius:24px;background:#fff;color:#1d2b21;color-scheme:light;font-family:"Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans",sans-serif;text-align:center;box-shadow:0 18px 44px rgba(30,77,43,.28)}' +
    '.tc-dialog::backdrop{background:rgba(29,43,33,.55)}' +
    '.tc-q{margin:0;font-size:17px;font-weight:700;line-height:1.6}' +
    '.tc-num{margin:8px 0 2px;font-size:28px;font-weight:900;letter-spacing:.03em;color:#1e4d2b;line-height:1.3}' +
    '.tc-note{margin:0 0 20px;font-size:13px;color:#5a6b5f;line-height:1.6}' +
    '.tc-btns{display:flex;gap:10px}' +
    '.tc-btns>*{flex:1 1 0;display:flex;align-items:center;justify-content:center;min-height:48px;padding:8px;border-radius:999px;font:inherit;font-size:15px;font-weight:700;line-height:1.3;text-decoration:none;cursor:pointer;box-sizing:border-box}' +
    '.tc-no{background:#fff;color:#1e4d2b;border:2px solid #c6dbb0}' +
    '.tc-yes{background:#1e4d2b;color:#fff;border:2px solid #1e4d2b}';
  document.head.appendChild(style);

  var dialog = document.createElement('dialog');
  dialog.className = 'tc-dialog';
  dialog.setAttribute('aria-labelledby', 'tc-q');
  dialog.innerHTML =
    '<p class="tc-q" id="tc-q">この電話番号にかけますか？</p>' +
    '<p class="tc-num">' + TEL_LABEL + '</p>' +
    '<p class="tc-note">わかば幼稚園（受付時間　平日 9:00〜15:00）</p>' +
    '<div class="tc-btns">' +
    '<button type="button" class="tc-no">キャンセル</button>' +
    '<a class="tc-yes" href="' + TEL_HREF + '">電話をかける</a>' +
    '</div>';
  document.body.appendChild(dialog);

  function close() { dialog.close(); }
  dialog.querySelector('.tc-no').addEventListener('click', close);
  dialog.querySelector('.tc-yes').addEventListener('click', close);
  // 確認画面の外側をクリックしたら閉じる
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });

  function open() { if (!dialog.open) dialog.showModal(); }

  // ページ内のすべての電話リンクは、まず確認画面を開く
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="tel:"]');
    if (!link || dialog.contains(link)) return;
    e.preventDefault();
    open();
  });

  // 「お電話でのお問い合わせ」の文字からも確認画面を開けるようにする
  Array.prototype.forEach.call(document.querySelectorAll(LABEL_SELECTOR), function (label) {
    label.classList.add('tc-label');
    label.setAttribute('role', 'button');
    label.setAttribute('tabindex', '0');
    label.addEventListener('click', open);
    label.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
})();
