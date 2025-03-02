export function doPost(e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent) {
  const payload = JSON.stringify({
    method: 'POST',
    message: 'doPost function called',
  });
  return ContentService.createTextOutput(payload).setMimeType(
    ContentService.MimeType.JSON
  );
}
