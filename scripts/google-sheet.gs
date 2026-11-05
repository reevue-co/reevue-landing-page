// Google Apps Script bound to the Google Sheet that receives the leads.
// Setup: see README ("Formulário de contato"). Script property needed: SECRET.
const HEADERS = [
  "Fecha", "Nombre", "Perfil", "Inmobiliaria", "País", "Estado/Provincia", "Ciudad", "WhatsApp",
  "Correo", "Interés", "Solución", "Tiene sitio", "Sitio web", "Dificultad", "Idioma",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== PropertiesService.getScriptProperties().getProperty("SECRET")) {
      return out({ ok: false });
    }
    const sheet = SpreadsheetApp.getActiveSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    const row = [
      new Date().toISOString(), d.name, d.profile, d.agencyName, d.country, d.state, d.city, d.phone,
      d.email, d.interest, d.solution, d.hasSite, d.site, d.difficulty, d.locale,
    ];
    // Plain-text format so values like "=1+1" or "+55 ..." are never parsed as formulas.
    const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length);
    range.setNumberFormat("@").setValues([row]);
    return out({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
