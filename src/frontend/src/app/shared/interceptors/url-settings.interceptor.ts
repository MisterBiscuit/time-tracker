import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DebugSettings {
  serverUrl: string;
  websocketUrl: string;
}

@Injectable()
export class UrlSettingsInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.startsWith('/')) {
      const apiUrl: string = 'http://localhost:3000';
      const cloned = request.clone({
        url: `${apiUrl}/api${request.url}`,
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }

}
