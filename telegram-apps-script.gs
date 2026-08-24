const BOT_TOKEN = "8251696774:AAEn3S2mosCd7UIq90YuoNguvswnpvIdlf4";
const CHAT_ID = "5924051507";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    const text = "💌 Новое подтверждение на свадьбу\n\n" +
      "👤 Имя: " + (data.name || "—") + "\n" +
      "📌 Ответ: " + (data.answer || "—") + "\n" +
      "💬 Сообщение: " + (data.message || "—") + "\n" +
      "📅 Дата: " + (data.date || "—") + "\n" +
      "🕐 Время: " + (data.time || "—") + "\n" +
      "📍 Место: " + (data.venue || "—");
    const url = "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage";
    const response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({chat_id: CHAT_ID, text: text}),
      muteHttpExceptions: true
    });
    return ContentService.createTextOutput(JSON.stringify({ok: response.getResponseCode() === 200})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Wedding RSVP Telegram webhook is running.");
}
