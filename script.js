// 行動版導覽列
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.textContent = opened ? '✕' : '☰';
  });
}

// 表單採用隱藏 iframe 送出，避免跳離 GitHub Pages 網站。
// Google Apps Script 的 doPost 會寄送通知信；此方式無法讀取伺服器回傳內容，
// 因此畫面顯示的是「已送出請求」，不是郵件已成功送達的保證。
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) {
  let submitted = false;
  const status = document.getElementById('formStatus');
  inquiryForm.addEventListener('submit', () => {
    if (!inquiryForm.reportValidity()) return;
    submitted = true;
    status.textContent = '正在送出表單，請稍候……';
    const button = inquiryForm.querySelector('button[type="submit"]');
    button.disabled = true;
    button.querySelector('.submit-label').textContent = '送出中…';
    setTimeout(() => {
      if (submitted) {
        status.textContent = '表單已送出請求！若資料完整，系統將寄送通知至網站管理者信箱。';
        inquiryForm.reset();
        button.disabled = false;
        button.querySelector('.submit-label').textContent = '送出訊息';
        submitted = false;
      }
    }, 1800);
  });
}
