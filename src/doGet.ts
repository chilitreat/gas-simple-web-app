import { HTTPClient } from './utils/HTTPClient';

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export function doGet() {
  const client = new HTTPClient(UrlFetchApp);
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const response = client.request<Post>(url);

  const payload = JSON.stringify({
    method: 'GET',
    message: response.json(),
  });
  return ContentService.createTextOutput(payload).setMimeType(
    ContentService.MimeType.JSON
  );
}
