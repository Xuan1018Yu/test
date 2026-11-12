/**
 * NEXORA 聯絡表單 - Google Apps Script
 * 1. 將 ADMIN_EMAIL 改成接收通知的信箱
 * 2. 部署為網頁應用程式，執行身分選「我」，存取權選「所有人」
 * 3. 複製部署網址，貼到 contact.html 的 form action
 */
const ADMIN_EMAIL = "your-email@gmail.com";
const SITE_NAME = "NEXORA 網站聯絡表單";

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};

    // 隱藏欄位被填入時視為垃圾機器人，仍回傳簡單頁面以結束請求
    if (p.website) {
      return HtmlService.createHtmlOutput("OK");
    }

    const name = clean(p.name, 80);
    const email = clean(p.email, 120);
    const subject = clean(p.subject, 120);
    const budget = clean(p.budget, 80);
    const message = clean(p.message, 5000);
    const consent = clean(p.consent, 20);

    if (!name || !email || !subject || !message || consent !== "同意") {
      throw new Error("表單資料不完整");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("電子郵件格式不正確");
    }

    const safeSubject = subject.replace(/[\r\n]/g, " ");
    const mailSubject = "【NEXORA 網站新詢問】" + safeSubject;
    const body =
      "收到一筆新的網站聯絡表單：\n\n" +
      "姓名：" + name + "\n" +
      "Email：" + email + "\n" +
      "聯絡主題：" + subject + "\n" +
      "預算範圍：" + (budget || "未提供") + "\n\n" +
      "專案內容：\n" + message + "\n\n" +
      "— " + SITE_NAME;

    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: mailSubject,
      body: body,
      replyTo: email,
      name: SITE_NAME
    });

    return HtmlService.createHtmlOutput("已收到表單");
  } catch (err) {
    // 錯誤會記錄在 Apps Script 的「執行項目」中
    console.error(err);
    return HtmlService.createHtmlOutput("表單處理失敗，請稍後再試。");
  }
}

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

// 可在 Apps Script 編輯器手動執行此函式，確認通知信權限。
function testEmail() {
  MailApp.sendEmail(
    ADMIN_EMAIL,
    "NEXORA 表單測試信",
    "Google Apps Script 郵件通知設定正常。"
  );
}