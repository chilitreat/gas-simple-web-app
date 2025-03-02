export function doGet() {
  const payload = JSON.stringify({
    method: 'GET',
    message: 'doGet function called',
  });
  return ContentService.createTextOutput(payload).setMimeType(
    ContentService.MimeType.JSON
  );
}
