import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  // GET requests
  get(url: string, params?: Record<string, any>, headers?: Record<string, any>): Observable<any> {
    const httpOptions = {
        withCredentials: true,
        headers: new HttpHeaders(headers),
    };

    let newUrl = url;
    if (params) {
        newUrl = this.generateQueryString(url, params);
    }

    return this.httpClient.get<any>(newUrl, httpOptions).pipe(
        tap(() => {
            this.log({
                isError: false,
                message: `GET response received for ${newUrl}`,
            });
        })
    );
  }

  // POST requests
  post(
      url: string,
      params: Record<string, any>,
      headers?: Record<string, any>,
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
  ): Observable<any> {
      const httpOptions: Record<string, any> = {
          withCredentials: true,
          headers: new HttpHeaders(headers),
      };
      if (responseType) {
          httpOptions['responseType'] = responseType;
      }

      return this.httpClient.post<any>(url, params, httpOptions).pipe(
          tap(() => {
              this.log({
                  isError: false,
                  message: `POST response received for ${url}`,
              });
          })
      );
  }

  // Public method: generates a new URL with query strings passed
  generateQueryString(url: string, params: Record<string, any>): string {
    // This method will only handle one level deep key value pairs
    let newUrl = url;
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
        if (url.indexOf('?') > -1) {
            newUrl = `${url}&${queryString}`;
        } else {
            newUrl = `${url}?${queryString}`;
        }
    }
    return newUrl;
  }

  private log({ message, isError }: { message: string; isError: boolean }): void {
    if (isError) {
        console.error(message);
        return;
    }
    console.log(message);
  }
}
