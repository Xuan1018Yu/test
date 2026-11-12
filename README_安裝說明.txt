NEXORA 高科技形象網站｜GitHub Pages + Google Apps Script

【檔案內容】
index.html             首頁
about.html             關於我們
contact.html           聯絡我們（含回傳表單）
style.css              全站響應式高科技風格
script.js              行動版選單與表單互動
GoogleAppsScript.gs    Google Apps Script 郵件通知程式

一、先設定 Google Apps Script（必要）
1. 登入 Google 帳號，開啟 https://script.google.com/
2. 建立「新專案」。
3. 將預設程式碼刪除，把 GoogleAppsScript.gs 全部貼上。
4. 修改最上方：
   const ADMIN_EMAIL = "your-email@gmail.com";
   將 your-email@gmail.com 改成你要接收通知的 Gmail。
5. 按「部署」→「新增部署作業」。
6. 類型選「網頁應用程式」。
7. 執行身分選「我」；誰可以存取選「所有人」。
8. 按部署，依 Google 提示授權寄送郵件。
9. 複製「網頁應用程式 URL」，通常以 /exec 結尾。

二、把 Apps Script 網址貼到 contact.html
找到這一行：
<form id="inquiryForm" action="YOUR_GOOGLE_SCRIPT_WEB_APP_URL" method="POST" target="hidden_iframe">

將 YOUR_GOOGLE_SCRIPT_WEB_APP_URL 替換成剛剛複製的完整網址，例如：
<form id="inquiryForm" action="https://script.google.com/macros/s/你的部署識別碼/exec" method="POST" target="hidden_iframe">

注意：請保留雙引號，並確認網址不是 /dev，而是正式部署的 /exec。

三、上傳 GitHub
1. 開啟你的 GitHub Repository。
2. 將這六個網站檔案放在同一層（根目錄）：
   index.html、about.html、contact.html、style.css、script.js
   README_安裝說明.txt 可留在專案中。
3. Repository → Settings → Pages。
4. Build and deployment 選 Deploy from a branch。
5. Branch 選 main，資料夾選 /(root)，按 Save。
6. 等待 GitHub Pages 部署完成，開啟顯示的網站網址。

四、測試表單
1. 用已發布的 GitHub Pages 網址進入 contact.html。
2. 填寫表單並送出。
3. 到 Google Apps Script 左側「執行項目」確認 doPost 是否執行。
4. 檢查 ADMIN_EMAIL 收件匣及垃圾郵件匣。

重要提醒
- 這是純前端 GitHub Pages 網站，表單通知由 Google Apps Script 代為寄送。
- 隱藏 iframe 送出方式不會把訪客帶離網站，但瀏覽器無法可靠讀取 Apps Script 的寄信結果；前端提示代表已送出請求，不等於郵件一定送達。請務必實際測試。
- 第一次部署或程式更新後，若有修改 Apps Script，請到「部署 → 管理部署作業 → 編輯 → 新版本 → 部署」更新。
- 請勿在 HTML 放入 Gmail 密碼、Google API 金鑰或任何私人憑證。
- 此範例沒有資料庫，不會保存聯絡資料；通知信是主要收件方式。若要長期保存，可再串接 Google Sheets。
- Google Apps Script 有每日寄信配額與使用限制，請參考 Google 官方說明。
