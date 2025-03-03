interface IHTTPClient {
  request<T>(
    url: string,
    options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions
  ): Response<T>;
}

class Response<T> {
  constructor(
    private readonly response: GoogleAppsScript.URL_Fetch.HTTPResponse
  ) {
    this.response = response;
  }

  public json(): T {
    const response = this.response.getContentText();
    return JSON.parse(response);
  }

  public raw(): string {
    return this.response.getContentText();
  }

  public headers(): object {
    return this.response.getAllHeaders();
  }

  public statusCode(): number {
    return this.response.getResponseCode();
  }
}

export class HTTPClient implements IHTTPClient {
  constructor(private readonly client: GoogleAppsScript.URL_Fetch.UrlFetchApp) {
    this.client = client;
  }

  public request<T>(
    url: string,
    options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: 'get',
      contentType: 'application/json',

    }
  ): Response<T> {
    try {
      const response = this.client.fetch(url, options);
      return new Response<T>(response);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
  }
}
