import {HttpClient} from '@angular/common/http';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';

export abstract class AbstractApi<T> {
  protected abstract endpoint: string;

  protected readonly httpClient = inject(HttpClient);

  public list(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.endpoint);
  }

  public get(id: string): Observable<T> {
    return this.httpClient.get<T>(`${this.endpoint}/${id}`);
  }

  public create(payload: Omit<T, 'id'>): Observable<T> {
    return this.httpClient.post<T>(this.endpoint, payload);
  }

  public update(id: string, payload: Partial<T>): Observable<T> {
    return this.httpClient.put<T>(`${this.endpoint}/${id}`, payload);
  }

  public remove(id: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.endpoint}/${id}`);
  }
}
