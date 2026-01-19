import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {TimeOff} from '@shared/interfaces';
import {AbstractApi} from '@shared/apis/abstract.api';

@Injectable({ providedIn: 'root' })
export class TimeOffApi extends AbstractApi<TimeOff> {

  protected readonly endpoint: string = '/time-off';

  public autofill(): Observable<void> {
    return this.httpClient.post<void>(`${this.endpoint}/autofill`, {});
  }
}
